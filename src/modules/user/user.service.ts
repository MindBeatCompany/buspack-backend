import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, In, Not, Repository } from "typeorm";
import { generate } from "generate-password";
import { validate } from "class-validator";
import { readdirSync, unlinkSync } from "fs";
import { readFile, utils } from "xlsx";
import { UserEntity } from "./entities/user.entity";
import { CrudOperations } from "../../shared/interfaces/crud-operations.interface";
import {
  UpdatePreferenceDto,
  UpdateUserDto,
  PreferenceUserDto,
  CreateUserDto,
  UpdateStatusUserDto,
  CreateMultiUserDto,
  UserCreatedDto,
  PassResetDto,
} from "./dtos";
import { RoleEntity } from "../role/entities/role.entity";
import { AppRoles } from "src/shared/config/app.roles";
import { UserLoggedDto } from "../auth/dtos/user-logged.dto";
import { AccountEntity } from "../account/entities/account.entity";
import { MailService } from "../mail/mail.service";
import { DEFAULT_ACCOUNT_NAME, MIMETYPES } from "../../shared/config/constants";
import messages from "src/shared/config/strings-constants";
import returnMessage from "src/shared/return-messages";
import { TariffEntity } from "./entities";
import { join } from "path";
@Injectable()
export class UserService implements CrudOperations {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private rolRepository: Repository<RoleEntity>,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    private readonly mailService: MailService,
    @InjectRepository(TariffEntity)
    private tariffRepository: Repository<TariffEntity>
  ) {}

  public async findOne(
    id: number,
    userLogged?: UserLoggedDto
  ): Promise<UserEntity> {
    const user = await this.userRepository
      .findOne({ relations: ["role", "account"], where: { id } })
      .then((user) =>
        !userLogged
          ? user
          : !!user && userLogged.companyName === user.account.companyName
          ? user
          : null
      );
    if (!user) throw new Error(`${messages.noUserUnauthorized}`);
    return user;
  }

  public async findAuthUser(userName: string) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where({ email: userName })
      .orWhere("user.userName = :userName", { userName: userName })
      .addSelect("user.password")
      .addSelect("user.isActive")
      .addSelect("user.firstTimeLogged")
      .loadAllRelationIds()
      .getOne();
    return user;
  }

  public async findAll(userLogged?: UserLoggedDto): Promise<UserCreatedDto[]> {
    if (userLogged && userLogged.roles === AppRoles.USER_ADMIN) {
      const users = await this.userRepository.find({
        relations: ["role", "account"],
        where: {
          account: await this.accountRepository.findOne({
            companyName: userLogged.companyName,
          }),
          isActive: true,
        },
      });
      if (!users) {
        throw new Error(messages.userNotFound);
      }
      return users;
    } else if (!userLogged) {
      const users = await this.userRepository.find({
        relations: ["role", "account"],
      });
      if (!users) throw new Error(messages.userNotFound);
      return users;
    }
    throw new Error(messages.unauthorized);
  }

  public async findAllAdmins(user: UserEntity): Promise<UserEntity[]> {
    if (user) {
      const adminUsers = await this.userRepository
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.role", "role")
        .innerJoinAndSelect("user.account", "account")
        .where("account.id= :id", { id: user.account })
        .orHaving("role.name LIKE :userAdmin OR role.name LIKE :admin", {
          userAdmin: AppRoles.USER_ADMIN,
          admin: AppRoles.ADMIN,
        })
        .getMany();
      return adminUsers;
    } else {
      const rolRoot = await this.rolRepository.findOne({
        name: AppRoles.ADMIN,
      });
      const rootAdmins = await this.userRepository.find({
        relations: ["role"],
        where: { role: rolRoot },
      });
      return rootAdmins;
    }
  }

  public async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      relations: ["role", "account"],
      where: { id },
    });
  }

  public async create(
    newUser: CreateUserDto,
    userLogged: UserLoggedDto
  ): Promise<UserEntity> {
    const rol = await this.rolRepository
      .findOne({ id: newUser.rol })
      .then(async (result) => {
        if (result && result.id !== 1) {
          return result;
        }
      });
    if (!rol) throw new NotFoundException("Rol doesn't exists");
    const account = await this.accountRepository
      .findOne({ companyName: "nueva" ? "nueva".toUpperCase() : null })
      .then(async (result) => {
        if (result && result.companyName !== DEFAULT_ACCOUNT_NAME) {
          return result;
        } else if (userLogged.roles === AppRoles.ADMIN) {
          const newAccount = this.accountRepository.create({
            companyName: "nueva",
            codeECO: "25634565",
          });
          return await this.accountRepository.save(newAccount);
        }
      });
    if (!account) throw new NotFoundException("Account doesn't exists");

    const entity = this.userRepository.create({
      userName: newUser.userName,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      isActive: true,
      email: newUser.email,
      password: generate({
        length: 10,
        numbers: true,
        symbols: true,
      }),
      role: rol,
      account: account,
    });
    const userExists = await this.userRepository.findOne(
      {
        email: entity.email,
      },
      { withDeleted: true }
    );
    if (userExists)
      throw new HttpException("User already exists", HttpStatus.FOUND);
    await this.mailService.sendUserCredentials(entity);
    return await this.userRepository.save(entity).then(async (result) => {
      delete result.password;
      return result;
    });
  }

  public async updateTariff(file: Express.Multer.File, accountId: number) {
    return getConnection().transaction(async (transaction) => {
      const account = await this.accountRepository
        .findOne({
          id: accountId,
        })
        .then(async (result) => {
          if (result) {
            result.filePath = file.filename;
            return await transaction.save(result);
          }
        });
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(TariffEntity)
        .where("accountId = :accountId", { accountId: accountId })
        .execute();
      const tariff = this.validateFile(file);
      await Promise.all(
        tariff.map(async (t) => {
          t.account = account;
          return await transaction.save(t);
        })
      );
    });
  }

  public async createMultiAcounts(
    users: CreateMultiUserDto,
    file: Express.Multer.File
  ): Promise<UserCreatedDto[]> {
    return getConnection().transaction(async (transaction) => {
      const tariff = this.validateFile(file);
      if (tariff) {
        const account = await this.accountRepository
          .findOne({
            companyName: users.companyName,
          })
          .then(async (result) => {
            if (result) {
              result.filePath = file.filename;
              return await transaction.save(result);
            } else {
              const newAccount = this.accountRepository.create({
                companyName: users.companyName,
                idClientEntity: users.idClientEntity,
                idClientAgent: users.idClientAgent,
                cuit: users.cuit,
                addressStreet: users.addressStreet,
                addressNumber: users.addressNumber,
                addressBuilding: users.addressBuilding,
                addressFloor: users.addressFloor,
                addressApartment: users.addressApartment,
                locality: users.locality,
                province: users.province,
                country: users.country,
                codeECO: users.codeEco,
                accountType: users.accountType,
                filePath: file.filename,
                tariffType: users.tariffType
              });
              return await transaction.save(newAccount);
            }
          });

        await Promise.all(
          tariff.map(async (t) => {
            t.account = account;
            return await transaction.save(t);
          })
        );
        const newUsers = await Promise.all(
          users.users.map(async (user) => {
            const rol = await this.rolRepository.findOne({ id: user.rol });
            return this.userRepository.create({
              userName: user.userName,
              firstName: user.firstName,
              lastName: user.lastName,
              role: rol,
              email: user.email,
              password: generate({
                strict: true,
                length: 10,
                numbers: true,
                symbols: true,
              }),
              account: account,
              isActive: true,
            });
          })
        );
        await this.findDuplicateUsers(newUsers);

        return await Promise.all(
          newUsers.map(async (u) => {
            await this.mailService.sendUserCredentials(u);
            const user = await transaction.save(u);
            delete user.password;
            return user;
          })
        );
      } else {
        throw new Error(messages.invalidFile);
      }
    });
  }

  public async createCorporateUsers(
    users: CreateMultiUserDto,
  ): Promise<UserCreatedDto[]> {
    return getConnection().transaction(async (transaction) => {
    
        const account = await this.accountRepository
          .findOne({
            companyName: users.companyName,
          });

        const newUsers = await Promise.all(
          users.users.map(async (user) => {
            const rol = await this.rolRepository.findOne({ id: user.rol });
            return this.userRepository.create({
              userName: user.userName,
              firstName: user.firstName,
              lastName: user.lastName,
              role: rol,
              email: user.email,
              password: generate({
                strict: true,
                length: 10,
                numbers: true,
                symbols: true,
              }),
              account: account,
              isActive: true,
            });
          })
        );
        await this.findDuplicateUsers(newUsers);

        return await Promise.all(
          newUsers.map(async (u) => {
            await this.mailService.sendUserCredentials(u);
            const user = await transaction.save(u);
            //delete user.password;
            return user;
          })
        );
      
    });
  }

  public async update(
    id: number,
    newValue: UpdateUserDto,
    userLogged?: UserLoggedDto
  ): Promise<UserEntity> {
    let user: UserEntity;
    if (userLogged.roles === AppRoles.ADMIN) {
      user = await this.findOne(id);
    } else {
      user = await this.findOne(id, userLogged);
    }
    const rol = await this.rolRepository.findOne({ id: newValue.rol });
    if (rol) {
      user.role = rol;
    }
    const changeUser = this.userRepository.merge(user, newValue);
    await this.findDuplicate(user, newValue);
    if (newValue.passReset) {
      await this.userPasswordReset({ ids: [user.id] });
    }
    return await this.userRepository.save(changeUser);
  }

  public async delete(
    id: number,
    userLogged: UserLoggedDto
  ): Promise<UserCreatedDto> {
    const user = await this.userRepository.findOne(
      { id },
      { relations: ["role", "account"] }
    );
    if (!user) throw new NotFoundException("User does not exists");
    const account = await this.accountRepository.findOne({
      id: user.account.id,
    });
    const rol = await this.rolRepository.findOne({ id: user.role.id });
    if (
      userLogged.companyName !== account.companyName &&
      userLogged.roles !== AppRoles.ADMIN
    )
      throw new ForbiddenException("Unauthorized");
    if (user.userName === userLogged.userName)
      throw new Error("Account could not be deleted");
    return await this.userRepository.softRemove(user).then((result) => {
      const userDeleted: UserCreatedDto = {
        id: result.id,
        userName: result.userName,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        isActive: result.isActive,
        role: rol,
        account: account,
        sessionTime: result.sessionTime,
        createdAt: result.createdAt,
      };
      return userDeleted;
    });
  }

  public async addRole(idUser: number, idsRole: number[]) {
    const user = await this.findOne(idUser);
    const roles = idsRole.map(async (id) => {
      return await this.rolRepository.findOne({ id });
    });
    if (!roles) throw new NotFoundException("Rol doesn't exist");

    return this.userRepository.save(user);
  }

  public async getUserPreferences(
    id: number,
    userLogged?: UserLoggedDto
  ): Promise<PreferenceUserDto> {
    const user = await this.findOne(id, userLogged);
    if (userLogged.roles === AppRoles.USER_ADMIN) {
      const preferences: PreferenceUserDto = {
        sessionTime: user.sessionTime,
      };
      return preferences;
    } else if (userLogged.id === user.id) {
      const preferences: PreferenceUserDto = {
        sessionTime: user.sessionTime,
      };
      return preferences;
    }
    throw new Error(messages.unauthorized);
  }

  public async updateUserPreferences(
    id: number,
    body: UpdatePreferenceDto,
    userLogged?: UserLoggedDto
  ) {   
    const user = await this.findOne(id, userLogged);
    const changePreference = this.userRepository.merge(user, body);
    const preferences: PreferenceUserDto = { sessionTime: user.sessionTime };

    if (userLogged && userLogged.roles === AppRoles.USER_ADMIN) {
      await this.userRepository.save(changePreference);
      preferences.sessionTime = user.sessionTime;
      return preferences;
    } else if (userLogged && userLogged.id === user.id) {
      await this.userRepository.save(changePreference);
      return preferences;
    } else if (!userLogged) {
      await this.userRepository.save(changePreference);
      return preferences;
    }
    throw new Error(messages.unauthorized);
  }

  public async setStatus(
    body: UpdateStatusUserDto,
    userLogged: UserLoggedDto
  ): Promise<UserCreatedDto[]> {
    const { isActive, ids } = body;
    const users = await this.userRepository.find({
      relations: ["role", "account"],
      where: { id: In(ids) },
    });

    if (!users.length) throw new Error(messages.userNotFound);

    users.map((u) => {
      if (userLogged.roles === AppRoles.ADMIN) {
        return (u.isActive = isActive);
      } else if (
        userLogged.roles === AppRoles.USER_ADMIN &&
        u.account.companyName === userLogged.companyName
      ) {
        return (u.isActive = isActive);
      } else {
        throw new Error(messages.unauthorized);
      }
    });
    return await this.userRepository.save(users);
  }

  public async updateUserPass(
    user: UserEntity,
    newPass: string,
    firstTimeLogged: boolean
  ) {
    user.password = newPass;
    user.firstTimeLogged = firstTimeLogged;
    user.isActive = true;
    return await this.userRepository.save(user);
  }

  public async setSessionCounter(id: number, wrong: boolean) {
    if (wrong) {
      const user = await this.userRepository
        .createQueryBuilder("user")
        .where({ id })
        .addSelect("user.wrongSessionCounter")
        .getOne();
      if (user.wrongSessionCounter != 0) {
        user.wrongSessionCounter -= 1;
        await this.userRepository.save(user);
      }
      return user.wrongSessionCounter;
    } else {
      return await this.userRepository.findOne({ id }).then(async (result) => {
        result.wrongSessionCounter = 4;
        await this.userRepository.save(result);
        return result.wrongSessionCounter;
      });
    }
  }

  public async blockUser(id: number) {
    const user = await this.userRepository.findOne({ id });
    user.isActive = false;
    user.firstTimeLogged = true;
    return await this.userRepository.save(user);
  }

  public async userPasswordReset(body: PassResetDto) {
    const { ids } = body;
    const users = await this.userRepository.findByIds(ids);
    return await Promise.all(
      users.map(async (u) => {
        u.password = generate({
          strict: true,
          length: 10,
          numbers: true,
          symbols: true,
        });
        u.firstTimeLogged = true;
        u.isActive = true;
        await this.mailService.resendUserCredentials(u);
        await this.userRepository.save(u);
        delete u.password;
        return u;
      })
    );
  }

  private validateFile(file: Express.Multer.File): TariffEntity[] {
    if (!file) {
      throw new Error(messages.invalidFile);
    } else if (!MIMETYPES.includes(file.mimetype)) {
      unlinkSync(file.path);
      throw new Error(messages.invalidFileFormat);
    }
    const workbook = readFile(file.path);
    workbook.Sheets[workbook.SheetNames[0]]["!ref"] = "A2:M102";
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const header = [
      "weightFrom",
      "weightTo",
      "caba",
      "amba",
      "inside_pba",
      "inside1",
      "inside2",
      "inside3",
      "inside4",
      "insurance",
      "homeDelivery",
      "homeWithdrawal",
      "otherAmounts",
    ];
    const letter = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
    ];
    const fillData = utils.sheet_to_json(worksheet, {
      header,
      range: "C2:M102",
    });

    const rawData = utils.sheet_to_json(worksheet, {
      header,
      range: "A3:M102",
    });
    const tariff: TariffEntity[] = [];

    if (fillData.length > 0) {
      const errors = [];
      rawData.forEach((row_col) => {
        const data = Object.values(row_col);
        data.forEach((d, index) => {
          if (typeof d !== "number") {
            if (errors.length < 5) {
              errors.push({
                col: letter[header.indexOf(Object.keys(row_col)[index])],
                row: row_col["__rowNum__"] + 1,
              });
            }
          }
        });
        if (Object.keys(row_col).length > 2) {
          tariff.push(this.tariffRepository.create(row_col));
        }
      });
      if (errors.length > 0) {
        unlinkSync(file.path);
        throw new Error(
          messages.invalidFile +
            " " +
            errors.map((e) => `[Columna: ${e.col} - Fila: ${e.row}]`)
        );
      }
    } else {
      unlinkSync(file.path);
      throw new Error(messages.invalidFile);
    }
    return tariff;
  }

  private async findDuplicateUsers(newUsers: UserEntity[]) {
    const users = await Promise.all(
      newUsers.map(async (u) => {
        return await this.userRepository.findOne({
          where: [{ email: u.email }, { userName: u.userName }],
          withDeleted: true,
        });
      })
    );
    if (users.some((u) => u !== undefined)) {
      const foundUsers = users.filter((u) => u !== undefined);
      throw new NotFoundException({
        message: messages.userExist,
        users: foundUsers,
      });
    }
  }

  private async findDuplicate(user: UserEntity, newValue: UpdateUserDto) {
    const { email, userName } = newValue;
    const userFound = await this.userRepository.find({
      where: [
        { email, id: Not(user.id) },
        { userName, id: Not(user.id) },
      ],
      withDeleted: true,
    });
    if (userFound.length) {
      throw new NotFoundException({
        message: messages.userExist,
        users: userFound,
      });
    }
  }

  public async validateBody(body: any) {
    const jsonBody = JSON.parse(body);
    const dto = new CreateMultiUserDto();
    dto.companyName = jsonBody.companyName;

    if(jsonBody.idClientAgent===""){
      dto.idClientAgent=null;
    }else{
      dto.idClientAgent = parseInt(jsonBody.idClientAgent);
    }

    if(jsonBody.idClientEntity===""){
      dto.idClientEntity=null;
    }else{
      dto.idClientEntity = parseInt(jsonBody.idClientEntity);
    }
    
    dto.cuit = jsonBody.cuit;
    dto.addressStreet = jsonBody.addressStreet,
    dto.addressNumber = jsonBody.addressNumber;
    dto.addressBuilding = jsonBody.addressBuilding;
    dto.addressFloor = jsonBody.addressFloor;
    dto.addressApartment = jsonBody.addressApartment;
    dto.locality = jsonBody.locality;
    dto.province = jsonBody.province;
    dto.country = jsonBody.country;
    dto.accountType = jsonBody.accountType;
    dto.codeEco = jsonBody.codeEco;
    dto.users = jsonBody.users;
    dto.tariffType = jsonBody.tariffType;

    await validate(dto).then((error) => {
      if (error.length > 0) {
        console.log("error:",error);
        throw new BadRequestException();
      }
    });

    for (let u in dto.users) {
      let valid = new CreateUserDto();
      valid.email = dto.users[u].email;
      valid.firstName = dto.users[u].firstName;
      valid.isActive = dto.users[u].isActive;
      valid.lastName = dto.users[u].lastName;
      valid.rol = dto.users[u].rol;
      valid.userName = dto.users[u].userName;
      await validate(valid).then((error) => {
        if (error.length > 0) {
          throw new BadRequestException();
        }
        dto.users[u] = valid;
      });
    }
    return dto;
  }

  public async downloadFile(accountId: number) {
    const account = await this.accountRepository.find({
      where: { id: accountId },
    });
    let options: { root: string; file: string };
    if (account.length === 0 || !account[0].filePath) {
      options = {
        root: join(__dirname, "../../shared/template-files/"),
        file: "tarifario.xlsx",
      };
    } else {
      options = {
        root: join(__dirname, "../account/tarifarios/"),
        file: account[0].filePath,
      };
    }
    try {
      if (readdirSync(options.root).includes(options.file)) {
        return options;
      } else {
        throw new Error(messages.fileNotFound);
      }
    } catch (error) {
      throw new Error(messages.fileNotFound);
    }
  }
}

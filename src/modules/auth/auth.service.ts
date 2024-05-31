import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { generate } from "generate-password";
import {
  LoginDto,
  RegisterDto,
  UserLoggedDto,
  UpdatePasswordDto,
  AccountRecoveryDto,
} from "./dtos";
import { UserEntity } from "../user/entities/user.entity";
import { RoleService } from "../role/role.service";
import { AccountService } from "../account/account.service";
import { MailService } from "../mail/mail.service";
import messages from "src/shared/config/strings-constants";
import returnMessage from "src/shared/return-messages";
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly accountService: AccountService,
    private readonly mailService: MailService
  ) {}

  public async validateUser(payload: LoginDto): Promise<UserLoggedDto> {
    const { password, userName } = payload;
    const user = await this.usersService.findAuthUser(userName);
    if (user) {
      if (await compare(password, user.password)) {
        const counter = await this.usersService.setSessionCounter(
          user.id,
          false
        );
        return await this.createToken(user);
      } else {
        const counter = await this.usersService.setSessionCounter(
          user.id,
          true
        );
        if (counter > 0) {
          throw new Error(
            messages.failedCredencials +
              `\n Quedan ${counter} intentos antes de bloquear su cuenta.`
          );
        } else {
          this.usersService.blockUser(user.id);
          throw new Error(`${messages.blockUser}`);
        }
      }
    } else {
      throw new Error(messages.failedCredencials);
    }
  }

  public async createToken(user: UserEntity) {
    const { id, email, role, ...rest } = user;
    if (user.isActive) {
      const rol = await this.roleService
        .findOne({ id: role })
        .catch(() => null);
      const account = await this.accountService
        .findOne({ id: user.account })
        .catch(() => null);
      const payload = { id, email };
      const userLogged: UserLoggedDto = {
        id: id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        firstTimeLogged: user.firstTimeLogged,
        sessionTime: user.sessionTime,
        createdAt: user.createdAt,
        companyName: account.companyName,
        codeECO: account.codeECO,
        account,
        roles: rol.name,
        token: this.jwtService.sign(payload),
      };
      return userLogged;
    }
    throw new Error(messages.inactiveUser);
  }

  public async newUser(body: RegisterDto) {
    const user = await this.usersService.findAuthUser(body.email);
    if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    /* return await this.usersService.create(body,user); */
  }

  public async changePass(
    body: UpdatePasswordDto,
    userLogged: UserLoggedDto
  ): Promise<UserLoggedDto> {
    const user = await this.usersService.findAuthUser(userLogged.userName);
    if (await compare(body.oldPass, user.password)) {
      return await this.usersService
        .updateUserPass(user, body.newPass, false)
        .then(async (result) => await this.createToken(result));
    }
    throw new Error(messages.passNoMatch);
  }

  public async recovery(body: AccountRecoveryDto) {
    const { userName } = body;
    const user = await this.usersService.findAuthUser(userName);
    if (user) {
      const newPass = generate({
        strict: true,
        length: 10,
        numbers: true,
        symbols: false,
      });
        
      return await this.usersService
        .updateUserPass(user, newPass, true)
        .then(async (result) => {
          result.password = newPass;
            await this.mailService.resendUserCredentials(result);
            this.sendNotify(result, true);
            return returnMessage(messages.recoveryMessage);
        });
    }
    this.sendNotify(null, false, body);
    return returnMessage(messages.recoveryMessage);
  }

  private async sendNotify(
    user: UserEntity,
    correct: boolean,
    body?: AccountRecoveryDto
  ) {
    if (correct) {
      const usersAdmin = await this.usersService.findAllAdmins(user);
      usersAdmin.map(async (admin) => {
        await this.mailService.sendRecoveryPass(user, admin);
      });
    } else {
      const usersAdmin = await this.usersService.findAllAdmins(user);
      usersAdmin.map(async (admin) => {
        await this.mailService.sendWrongRecovery(body, admin);
      });
    }
  }
}

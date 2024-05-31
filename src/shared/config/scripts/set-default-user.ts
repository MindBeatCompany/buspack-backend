import { ConfigService } from "@nestjs/config";
import { AccountEntity } from "../../../modules/account/entities/account.entity";
import { RoleEntity } from "src/modules/role/entities/role.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { getRepository } from "typeorm";
import {
  DEFAULT_ACCOUNT_NAME,
  DEFAULT_ROLES,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_NAME,
  DEFAULT_USER_PASSWORD,
} from "../constants";

const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<UserEntity>(UserEntity);
  const rolRepository = getRepository<RoleEntity>(RoleEntity);
  const accountRepository = getRepository<AccountEntity>(AccountEntity);

  const defaultRoles = await rolRepository
    .createQueryBuilder()
    .where("name IN (:roles)", {
      roles: config.get<string>(DEFAULT_ROLES).split(","),
    })
    .getMany()
    .then(async (result) => {
      if (result.length < 3) {
        const rol1 = rolRepository.create({
          name: config.get<string>(DEFAULT_ROLES).split(",")[0],
        });

        const rol2 = rolRepository.create({
          name: config.get<string>(DEFAULT_ROLES).split(",")[1],
        });

        const rol3 = rolRepository.create({
          name: config.get<string>(DEFAULT_ROLES).split(",")[2],
        });
        return await rolRepository.save([rol1, rol2, rol3]);
      } else {
        return result;
      }
    });
  const defaultAccount = await accountRepository
    .findOne({
      where: { companyName: config.get<string>(DEFAULT_ACCOUNT_NAME) },
    })
    .then(async (result) => {
      if (!result) {
        return await accountRepository.save({
          companyName: config.get<string>(DEFAULT_ACCOUNT_NAME),
          codeECO: "0000",
          accountType: config.get<string>(DEFAULT_ACCOUNT_NAME),
        });
      } else {
        return result;
      }
    });

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where("email=:email", { email: config.get<string>(DEFAULT_USER_EMAIL) })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      firstName: "Admin",
      lastName: "Admin",
      isActive: true,
      userName: config.get<string>(DEFAULT_USER_NAME),
      email: config.get<string>(DEFAULT_USER_EMAIL),
      password: config.get<string>(DEFAULT_USER_PASSWORD),
      role: defaultRoles.find((rol) => rol.name === "ADMINISTRADOR"),
      account: defaultAccount,
    });
    return await userRepository.save(adminUser);
  }
};
export default setDefaultUser;

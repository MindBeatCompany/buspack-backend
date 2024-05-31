"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_entity_1 = require("../../../modules/account/entities/account.entity");
const role_entity_1 = require("../../../modules/role/entities/role.entity");
const user_entity_1 = require("../../../modules/user/entities/user.entity");
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const setDefaultUser = async (config) => {
    const userRepository = typeorm_1.getRepository(user_entity_1.UserEntity);
    const rolRepository = typeorm_1.getRepository(role_entity_1.RoleEntity);
    const accountRepository = typeorm_1.getRepository(account_entity_1.AccountEntity);
    const defaultRoles = await rolRepository
        .createQueryBuilder()
        .where("name IN (:roles)", {
        roles: config.get(constants_1.DEFAULT_ROLES).split(","),
    })
        .getMany()
        .then(async (result) => {
        if (result.length < 3) {
            const rol1 = rolRepository.create({
                name: config.get(constants_1.DEFAULT_ROLES).split(",")[0],
            });
            const rol2 = rolRepository.create({
                name: config.get(constants_1.DEFAULT_ROLES).split(",")[1],
            });
            const rol3 = rolRepository.create({
                name: config.get(constants_1.DEFAULT_ROLES).split(",")[2],
            });
            return await rolRepository.save([rol1, rol2, rol3]);
        }
        else {
            return result;
        }
    });
    const defaultAccount = await accountRepository
        .findOne({
        where: { companyName: config.get(constants_1.DEFAULT_ACCOUNT_NAME) },
    })
        .then(async (result) => {
        if (!result) {
            return await accountRepository.save({
                companyName: config.get(constants_1.DEFAULT_ACCOUNT_NAME),
                codeECO: "0000",
                accountType: config.get(constants_1.DEFAULT_ACCOUNT_NAME),
            });
        }
        else {
            return result;
        }
    });
    const defaultUser = await userRepository
        .createQueryBuilder()
        .where("email=:email", { email: config.get(constants_1.DEFAULT_USER_EMAIL) })
        .getOne();
    if (!defaultUser) {
        const adminUser = userRepository.create({
            firstName: "Admin",
            lastName: "Admin",
            isActive: true,
            userName: config.get(constants_1.DEFAULT_USER_NAME),
            email: config.get(constants_1.DEFAULT_USER_EMAIL),
            password: config.get(constants_1.DEFAULT_USER_PASSWORD),
            role: defaultRoles.find((rol) => rol.name === "ADMINISTRADOR"),
            account: defaultAccount,
        });
        return await userRepository.save(adminUser);
    }
};
exports.default = setDefaultUser;
//# sourceMappingURL=set-default-user.js.map
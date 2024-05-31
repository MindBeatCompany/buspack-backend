import { ConfigService } from "@nestjs/config";
import { UserEntity } from "src/modules/user/entities/user.entity";
declare const setDefaultUser: (config: ConfigService) => Promise<UserEntity>;
export default setDefaultUser;

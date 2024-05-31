import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../../user/user.service";
import { JWT_SECRET } from "../../../shared/config/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>(JWT_SECRET),
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    const userRol = await this.userService.findById(id).catch((error) => {
      throw new BadRequestException("Error");
    });
    return {
      ...userRol,
      roles: userRol.role.name,
      companyName: userRol.account.companyName,
    };
  }
}

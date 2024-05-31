import { Strategy } from "passport-local";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "userName", // 'email'
      passwordField: "password", // 'passport'
    });
  }

  async validate(userName: string, password: string) {
    const user = await this.authService
      .validateUser({
        password,
        userName,
      })
      .catch((error) => error);
    return user;
  }
}

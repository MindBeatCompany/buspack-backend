import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { join } from "path";
import { AccountRecoveryDto } from "../auth/dtos";
import { UserEntity } from "../user/entities/user.entity";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserCredentials(user: UserEntity) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Bienvenido/a a Hubbpack!",
      template: join(__dirname, "/templates/sendcredentials"),
      context: {
        name: user.firstName,
        url: process.env.URL_FRONTEND,
        username: user.userName,
        pass: user.password,
      },
    });
  }

  async resendUserCredentials(user: UserEntity) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Solicitud de Recupero Contraseña",
      template: join(__dirname, "/templates/resendcredentials"),
      context: {
        name: user.firstName,
        username: user.userName,
        pass: user.password,
      },
    });
  }
  async sendRecoveryPass(user: UserEntity, userAdmin: UserEntity) {
    await this.mailerService.sendMail({
      to: userAdmin.email,
      subject: "Pedido Recupero Contraseña",
      template: join(__dirname, "/templates/recoverypass"),
      context: {
        name: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }

  async sendWrongRecovery(user: AccountRecoveryDto, userAdmin: UserEntity) {
    await this.mailerService.sendMail({
      to: userAdmin.email,
      subject: "Pedido Recupero Contraseña Incorrecto",
      template: join(__dirname, "/templates/wrongrecovery"),
      context: {
        name: user.userName,
      },
    });
  }
}

import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_PASSWORD,
  MAIL_USER,
} from "src/shared/config/constants";
import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get(MAIL_HOST),
          port: config.get(MAIL_PORT),
         // requireTLS: true,
          secure: false,
          auth: {
            user: config.get(MAIL_USER),
            pass: config.get(MAIL_PASSWORD),
          },
        },
        defaults: {
          from: `"No-Reply" <${config.get(MAIL_USER)}>`,
        },
        template: {
          dir: join(__dirname, "/templates/sendcredentials.hbs"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  generateTypeormConfigFile,
  setDefaultUser,
} from "./shared/config/scripts";
import { API_PORT } from "./shared/config/constants";
import { Logger, ValidationPipe } from "@nestjs/common";
import { initSwagger } from "./app.swagger";
import { useContainer } from "class-validator";

import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  const logger = new Logger();
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(API_PORT));
  app.enableCors({
    origin: [
      'http://127.0.0.1:8080/',
      'http://localhost:8080/',
      'http://127.0.0.1:8080',
      'http://localhost:8080',
      'https://test.derservicios.com.ar/',
      'https://test.derservicios.com.ar',
      'http://192.168.156.131:8080',
      'http://192.168.156.131:8080/',
      'https://api-test.derservicios.com.ar',
      'https://api-test.derservicios.com.ar/',
      'https://api-empresas.buspack.com.ar/',
      'https://api-empresas.buspack.com.ar',
      'https://corp.buspack.com.ar/',
      'https://corp.buspack.com.ar',
      'https://192.168.156.119:8081/',
      'https://192.168.156.119:8081',
      'https://192.168.156.119:8080/',
      'https://192.168.156.119:8080',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });
  app.setGlobalPrefix("v1/api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  setDefaultUser(config);
  generateTypeormConfigFile(config);
  initSwagger(app);
  await app.listen(port);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();

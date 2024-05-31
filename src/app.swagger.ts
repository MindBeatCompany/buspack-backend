import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Backend-Nest')
    .setDescription('A template project')
    .build();
  const documment = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/doc', app, documment);
};

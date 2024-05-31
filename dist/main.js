"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const scripts_1 = require("./shared/config/scripts");
const constants_1 = require("./shared/config/constants");
const common_1 = require("@nestjs/common");
const app_swagger_1 = require("./app.swagger");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    class_validator_1.useContainer(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    const logger = new common_1.Logger();
    const config = app.get(config_1.ConfigService);
    const port = parseInt(config.get(constants_1.API_PORT));
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
        ],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true,
    });
    app.setGlobalPrefix("v1/api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    scripts_1.setDefaultUser(config);
    scripts_1.generateTypeormConfigFile(config);
    app_swagger_1.initSwagger(app);
    await app.listen(port);
    logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
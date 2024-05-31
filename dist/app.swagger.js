"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const initSwagger = (app) => {
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Backend-Nest')
        .setDescription('A template project')
        .build();
    const documment = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('/doc', app, documment);
};
exports.initSwagger = initSwagger;
//# sourceMappingURL=app.swagger.js.map
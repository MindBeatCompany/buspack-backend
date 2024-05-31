"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const configDB = () => {
    return {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [path_1.join(__dirname, '../../**/**/*/*entity{.ts,.js}')],
        autoLoadEntities: false,
        migrationsRun: process.env.APP_ENV === 'production',
        migrations: [path_1.join(__dirname, '../../migration/**/*{.ts,.js}')],
        migrationsTableName: 'migrations',
        cli: {
            migrationsDir: 'src/migration',
        },
        synchronize: false,
    };
};
exports.default = config_1.registerAs('database', () => ({ config: configDB() }));
//# sourceMappingURL=database.config.js.map
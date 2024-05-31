import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const configDB = (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../../**/**/*/*entity{.ts,.js}')], //['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: false,
    migrationsRun: process.env.APP_ENV === 'production',
    migrations: [join(__dirname, '../../migration/**/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    cli: {
      migrationsDir: 'src/migration',
    },
    synchronize: false,
  };
};
export default registerAs('database', () => ({ config: configDB() }));

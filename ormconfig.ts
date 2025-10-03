import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL || '';

const isPostgres = !!databaseUrl;

const AppDataSource = new DataSource({
  type: isPostgres ? 'postgres' : 'sqlite',
  url: isPostgres ? databaseUrl : undefined,
  database: isPostgres ? undefined : 'db.sqlite',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
} as any);

export default AppDataSource;


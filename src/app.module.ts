
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CasesModule } from './cases/cases.module';
import { LeadsController } from './leads/leads.controller';
import { AppConfigModule } from './config/config.module';
import { WorkspaceMiddleware } from './common/middleware/workspace.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cliente } from './cliente.entity';
import { Processo } from './processo.entity';

const databaseUrl = process.env.DATABASE_URL;

@Module({
  imports: [
    AppConfigModule,
    ClientsModule,
    CasesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')) || 5432,
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        // load all entity files from src folders (works in TS and in compiled JS)
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
      }),
    }),
  ],
  controllers: [AppController, LeadsController],
  providers: [AppService],
})
export class AppModule {}
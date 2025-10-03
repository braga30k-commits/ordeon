import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './case.entity';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Client } from '../clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Case, Client])],
  providers: [CasesService],
  controllers: [CasesController],
  exports: [CasesService],
})
export class CasesModule {}

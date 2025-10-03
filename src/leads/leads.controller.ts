import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CasesService } from '../cases/cases.service';
import { CreateCaseDto } from '../cases/dto/create-case.dto';
import { WorkspaceId } from '../common/decorators/workspace-id.decorator';
import { CaseStage } from '../cases/case-stage.enum';

@Controller('api/leads')
export class LeadsController {
  constructor(private cases: CasesService) {}

  @Get()
  findAll(@WorkspaceId() workspaceId: string) {
    return this.cases.findAll(workspaceId, undefined, CaseStage.PRE_CONTRATO);
  }

  @Post()
  create(@WorkspaceId() workspaceId: string, @Body() dto: CreateCaseDto) {
    dto.stage = CaseStage.PRE_CONTRATO;
    return this.cases.create(workspaceId, dto);
  }

  @Post(':id/convert')
  convert(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.cases.moveStage(workspaceId, id, CaseStage.CONTRATO_ASSINADO);
  }
}

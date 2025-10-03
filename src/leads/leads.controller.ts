import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
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
  async create(@WorkspaceId() workspaceId: string, @Body() dto: CreateCaseDto) {
    try {
      dto.stage = CaseStage.PRE_CONTRATO;
      return await this.cases.create(workspaceId, dto);
    } catch (error) {
      if (error.message === 'clientId is required' || error.message === 'clientId not found in workspace') {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Post(':id/convert')
  convert(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.cases.moveStage(workspaceId, id, CaseStage.CONTRATO_ASSINADO);
  }
}

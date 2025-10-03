import { Controller, Post, Body, Get, Query, Param, Patch, Delete } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { MoveCaseStageDto } from './dto/move-case-stage.dto';
import { WorkspaceId } from '../common/decorators/workspace-id.decorator';

@Controller('api/cases')
export class CasesController {
  constructor(private svc: CasesService) {}

  @Post()
  create(@WorkspaceId() workspaceId: string, @Body() dto: CreateCaseDto) {
    return this.svc.create(workspaceId, dto);
  }

  @Get()
  findAll(@WorkspaceId() workspaceId: string, @Query('clientId') clientId?: string, @Query('stage') stage?: any, @Query('number') number?: string, @Query('page') page = '1', @Query('pageSize') pageSize = '20') {
    return this.svc.findAll(workspaceId, clientId, stage, number, Number(page), Number(pageSize));
  }

  @Get(':id')
  findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.svc.findOne(workspaceId, id);
  }

  @Patch(':id')
  update(@WorkspaceId() workspaceId: string, @Param('id') id: string, @Body() dto: UpdateCaseDto) {
    return this.svc.update(workspaceId, id, dto);
  }

  @Post(':id/move-stage')
  moveStage(@WorkspaceId() workspaceId: string, @Param('id') id: string, @Body() body: MoveCaseStageDto) {
    return this.svc.moveStage(workspaceId, id, body.stage);
  }

  @Delete(':id')
  remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.svc.remove(workspaceId, id);
  }
}

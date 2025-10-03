import { Controller, Post, Body, Get, Query, Param, Patch, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { WorkspaceId } from '../common/decorators/workspace-id.decorator';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('api/clients')
export class ClientsController {
  constructor(private svc: ClientsService) {}

  @Post()
  create(@WorkspaceId() workspaceId: string, @Body() dto: CreateClientDto) {
    return this.svc.create(workspaceId, dto);
  }

  @ApiOperation({ summary: 'List clients with optional search and pagination' })
  @ApiQuery({ name: 'q', required: false, description: 'Search query for client name' })
  @ApiQuery({ name: 'cpfCnpj', required: false, description: 'Filter by CPF/CNPJ' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', example: 20 })
  @Get()
  findAll(@WorkspaceId() workspaceId: string, @Query('q') q?: string, @Query('cpfCnpj') cpfCnpj?: string, @Query('page') page = '1', @Query('pageSize') pageSize = '20') {
    return this.svc.findAll(workspaceId, q, cpfCnpj, Number(page), Number(pageSize));
  }

  @Get(':id')
  findOne(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.svc.findOne(workspaceId, id);
  }

  @Patch(':id')
  update(@WorkspaceId() workspaceId: string, @Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.svc.update(workspaceId, id, dto);
  }

  @Delete(':id')
  remove(@WorkspaceId() workspaceId: string, @Param('id') id: string) {
    return this.svc.remove(workspaceId, id);
  }
}

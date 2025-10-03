import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProcessoService } from './processo.service';

@Controller('processos')
export class ProcessoController {
  constructor(private readonly processoService: ProcessoService) {}

  @Get()
  findAll() {
    return this.processoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processoService.findOne(id);
  }

  @Post()
  create(@Body() processo: any) {
    return this.processoService.create(processo);
  }

  @Post(':id/clientes/:clienteId')
  addCliente(@Param('id') id: string, @Param('clienteId') clienteId: string) {
    return this.processoService.addCliente(id, clienteId);
  }
}

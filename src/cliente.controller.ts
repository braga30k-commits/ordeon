import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Post()
  create(@Body() cliente: any) {
    return this.clienteService.create(cliente);
  }

  @Post(':id/processos/:processoId')
  addProcesso(@Param('id') id: string, @Param('processoId') processoId: string) {
    return this.clienteService.addProcesso(id, processoId);
  }
}

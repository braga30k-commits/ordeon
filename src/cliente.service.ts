import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({ relations: ['processos'] });
  }

  findOne(id: string): Promise<Cliente | null> {
    return this.clienteRepository.findOne({ where: { id }, relations: ['processos'] })
      .then(cliente => {
        if (!cliente) throw new Error('Cliente não encontrado');
        return cliente;
      });
  }

  create(cliente: Partial<Cliente>): Promise<Cliente> {
    const novoCliente = this.clienteRepository.create(cliente);
    return this.clienteRepository.save(novoCliente);
  }

  async addProcesso(clienteId: string, processoId: string) {
    const cliente = await this.findOne(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    cliente.processos = [...(cliente.processos || []), { id: processoId } as any];
    return this.clienteRepository.save(cliente);
  }
}

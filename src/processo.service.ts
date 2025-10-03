import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Processo } from './processo.entity';

@Injectable()
export class ProcessoService {
  constructor(
    @InjectRepository(Processo)
    private processoRepository: Repository<Processo>,
  ) {}

  findAll(): Promise<Processo[]> {
    return this.processoRepository.find({ relations: ['clientes'] });
  }

  findOne(id: string): Promise<Processo | null> {
    return this.processoRepository.findOne({ where: { id }, relations: ['clientes'] });
  }

  create(processo: Partial<Processo>): Promise<Processo> {
    const novoProcesso = this.processoRepository.create(processo);
    return this.processoRepository.save(novoProcesso);
  }

  async addCliente(processoId: string, clienteId: string) {
    const processo = await this.findOne(processoId);
    if (!processo) {
      throw new Error('Processo não encontrado');
    }
    processo.clientes = [...(processo.clientes || []), { id: clienteId } as any];
    return this.processoRepository.save(processo);
  }
}

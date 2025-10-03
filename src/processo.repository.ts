import { EntityRepository, Repository } from 'typeorm';
import { Processo } from './processo.entity';

@EntityRepository(Processo)
export class ProcessoRepository extends Repository<Processo> {}

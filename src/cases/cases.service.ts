import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Case } from './case.entity';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CaseStage } from './case-stage.enum';
import { Client } from '../clients/client.entity';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Case)
    private repo: Repository<Case>,
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  async create(workspaceId: string, dto: CreateCaseDto) {
    if (!dto.clientId) throw new BadRequestException('clientId is required');
    const client = await this.clientRepo.findOne({ where: { id: dto.clientId, workspaceId } });
    if (!client) throw new BadRequestException('clientId not found in workspace');
    const c = this.repo.create({ ...dto, workspaceId });
    if (!c.stage) c.stage = CaseStage.PRE_CONTRATO;
    return this.repo.save(c);
  }

  async findAll(workspaceId: string, clientId?: string, stage?: CaseStage, number?: string, page = 1, pageSize = 20) {
    const qb = this.repo.createQueryBuilder('c').where('c.workspaceId = :ws', { ws: workspaceId });
    if (clientId) qb.andWhere('c.clientId = :clientId', { clientId });
    if (stage) qb.andWhere('c.stage = :stage', { stage });
    if (number) qb.andWhere('c.number = :number', { number });
    qb.skip((page - 1) * pageSize).take(pageSize);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, pageSize };
  }

  async findOne(workspaceId: string, id: string) {
    const c = await this.repo.findOne({ where: { id, workspaceId } });
    if (!c) throw new NotFoundException('Case not found');
    return c;
  }

  async update(workspaceId: string, id: string, dto: UpdateCaseDto) {
    const c = await this.findOne(workspaceId, id);
    Object.assign(c, dto);
    return this.repo.save(c);
  }

  async moveStage(workspaceId: string, id: string, stage: CaseStage) {
    const c = await this.findOne(workspaceId, id);
    c.stage = stage;
    return this.repo.save(c);
  }

  async remove(workspaceId: string, id: string) {
    const c = await this.findOne(workspaceId, id);
    await this.repo.remove(c);
    return { success: true };
  }
}

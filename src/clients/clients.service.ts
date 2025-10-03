import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private repo: Repository<Client>,
  ) {}

  async create(workspaceId: string, dto: CreateClientDto) {
    const client = this.repo.create({ ...dto, workspaceId });
    return this.repo.save(client);
  }

  async findAll(workspaceId: string, q?: string, cpfCnpj?: string, page = 1, pageSize = 20) {
    const qb = this.repo.createQueryBuilder('c').where('c.workspaceId = :ws', { ws: workspaceId });
    if (q) qb.andWhere('c.name ILIKE :q', { q: `%${q}%` });
    if (cpfCnpj) qb.andWhere('c.cpfCnpj = :cpfCnpj', { cpfCnpj });
    qb.skip((page - 1) * pageSize).take(pageSize);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, pageSize };
  }

  async findOne(workspaceId: string, id: string) {
    const client = await this.repo.findOne({ where: { id, workspaceId } });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async update(workspaceId: string, id: string, dto: UpdateClientDto) {
    const client = await this.findOne(workspaceId, id);
    Object.assign(client, dto);
    return this.repo.save(client);
  }

  async remove(workspaceId: string, id: string) {
    const client = await this.findOne(workspaceId, id);
    const count = await this.repo.manager.count('cases', { where: { clientId: id, workspaceId } });
    if (count > 0) throw new ConflictException('Client has linked cases');
    await this.repo.remove(client);
    return { success: true };
  }
}

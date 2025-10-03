import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index, JoinColumn, Unique } from 'typeorm';
import { Client } from '../clients/client.entity';
import { CaseStage } from './case-stage.enum';

@Entity('cases')
@Index(['workspaceId', 'stage'])
@Unique(['workspaceId', 'number'])
export class Case {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  workspaceId: string;

  @ManyToOne(() => Client, client => client.cases, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column({ type: 'uuid' })
  clientId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  number: string | null;

  // use varchar for portability (sqlite during local dev), enum validation enforced by DTOs
  @Column({ type: 'varchar', length: 50, default: CaseStage.PRE_CONTRATO })
  stage: CaseStage;

  @Column({ type: 'varchar', length: 255, nullable: true })
  externalStatus: string | null;

  @Column({ type: 'int', nullable: true })
  valueCents: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

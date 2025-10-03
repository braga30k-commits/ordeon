import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index, Unique } from 'typeorm';
import { Case } from '../cases/case.entity';

@Entity('clients')
@Index(['workspaceId', 'name'])
@Unique(['workspaceId', 'cpfCnpj'])
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  workspaceId: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 2 })
  type: 'PF' | 'PJ';

  @Column({ type: 'varchar', length: 64, nullable: true })
  cpfCnpj: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  phone: string | null;

  @OneToMany(() => Case, c => c.client)
  cases: Case[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

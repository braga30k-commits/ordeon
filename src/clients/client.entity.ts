import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index, Unique } from 'typeorm';
import { Case } from '../cases/case.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('clients')
@Index(['workspaceId', 'name'])
@Unique(['workspaceId', 'cpfCnpj'])
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Workspace ID', example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6' })
  @Column()
  @Index()
  workspaceId: string;

  @ApiProperty({ description: 'Client name', example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Client type', example: 'PF' })
  @Column({ type: 'varchar', length: 2 })
  type: 'PF' | 'PJ';

  @ApiProperty({ description: 'Client CPF/CNPJ', example: '123.456.789-09' })
  @Column({ type: 'varchar', length: 64, nullable: true })
  cpfCnpj: string | null;

  @ApiProperty({ description: 'Client email', example: 'john.doe@example.com' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @ApiProperty({ description: 'Client phone', example: '(11) 91234-5678' })
  @Column({ type: 'varchar', length: 32, nullable: true })
  phone: string | null;

  @OneToMany(() => Case, c => c.client)
  cases: Case[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

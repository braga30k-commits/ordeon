import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('processos')
export class Processo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @ManyToMany(() => Cliente, cliente => cliente.processos)
  clientes: Cliente[];
}

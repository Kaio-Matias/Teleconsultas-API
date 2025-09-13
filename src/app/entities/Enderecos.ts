import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Clinic } from './Clinic';

@Entity('enderecos')
export class Endereco {
  @PrimaryGeneratedColumn()
  id_endereco: number;

  @ManyToOne(() => Clinic, clinic => clinic.enderecos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_clinica' })
  clinica: Clinic;

  @RelationId((endereco: Endereco) => endereco.clinica)
  id_clinica: number;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 255 })
  logradouro: string;

  @Column({ length: 10, nullable: true })
  numero: string;

  @Column({ length: 100, nullable: true })
  complemento: string;

  @Column({ length: 100 })
  bairro: string;

  @Column({ length: 100 })
  cidade: string;

  @Column({ length: 2 })
  estado: string;

  @Column({ length: 50 })
  pais: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId
} from 'typeorm';
import { Clinic } from './Clinic';

@Entity('clinic_promotions')
export class ClinicPromotion {
  @PrimaryGeneratedColumn()
  id_promocao: number;

  @ManyToOne(() => Clinic, clinic => clinic.promocoes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_clinica' })
  clinica: Clinic;

  @RelationId((promotion: ClinicPromotion) => promotion.clinica)
  id_clinica: number;

  @Column({ length: 100 })
  titulo: string;

  @Column('text')
  descricao: string;

  @Column('date')
  validade_inicio: Date;

  @Column('date')
  validade_fim: Date;

  @Column({ length: 255, nullable: true })
  imagem_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

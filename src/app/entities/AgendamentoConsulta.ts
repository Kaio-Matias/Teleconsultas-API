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

@Entity('agendamentos_consultas')
export class AgendamentoConsulta {
  @PrimaryGeneratedColumn()
  id_consulta: number;

  @Column()
  id_usuario_paciente: number;

  @Column()
  id_usuario_profissional: number;

  @ManyToOne(() => Clinic, { eager: false })
  @JoinColumn({ name: 'id_clinica' })
  clinica: Clinic;

  @RelationId((consulta: AgendamentoConsulta) => consulta.clinica)
  id_clinica: number;

  @Column('timestamp')
  data_hora_inicio: Date;

  @Column('timestamp')
  data_hora_fim: Date;

  @Column({ length: 50 })
  tipo_consulta: string;

  @Column({ length: 300 })
  motivo: string;

  @Column({ length: 255, nullable: true })
  link_sala: string;

  @Column('text', { nullable: true })
  comentarios: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

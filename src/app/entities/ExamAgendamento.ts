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
import { ExamPayment } from './ExamPayment';
import { ClinicExam } from './ClinicExam';

@Entity('exam_agendamentos')
export class ExamAgendamento {
  @PrimaryGeneratedColumn()
  id_agendamento: number;

  @Column()
  id_usuario_paciente: number;

  @ManyToOne(() => ClinicExam)
  @JoinColumn({ name: 'id_exame' })
  exame: ClinicExam;

  @RelationId((ag: ExamAgendamento) => ag.exame)
  id_exame: number;

  @ManyToOne(() => ExamPayment, { nullable: true })
  @JoinColumn({ name: 'id_pagamento' })
  pagamento: ExamPayment;

  @RelationId((ag: ExamAgendamento) => ag.pagamento)
  id_pagamento: number;

  @Column('timestamp')
  data_hora: Date;

  @Column({ length: 20, default: 'Pendente' })
  status_pagamento: string;

  @Column({ default: false })
  lembrete_enviado: boolean;

  @Column('float', { nullable: true })
  altura_m: number;

  @Column('float', { nullable: true })
  peso_kg: number;

  @Column('int', { nullable: true })
  pressao_sistolica: number;

  @Column('int', { nullable: true })
  pressao_diastolica: number;

  @Column({ default: false })
  atualizar_minha_saude: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

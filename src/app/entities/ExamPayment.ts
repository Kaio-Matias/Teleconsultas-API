import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('exam_payments')
export class ExamPayment {
  @PrimaryGeneratedColumn()
  id_pagamento: number;

  @Column({ length: 50 })
  metodo_pagamento: string;

  @Column({ length: 50 })
  tipo: string;

  @Column('numeric')
  valor: number;

  @Column('int', { nullable: true })
  parcelas: number;

  @Column({ length: 20, default: 'Confirmado' })
  status: string;

  @Column()
  id_mp_payment: number;

  @CreateDateColumn()
  data_pagamento: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

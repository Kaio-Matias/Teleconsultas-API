import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Clinic } from './Clinic';

@Entity('conexoes_profissionais_clinicas')
export class ConexaoProfissionalClinica {
  @PrimaryGeneratedColumn()
  id_conexao: number;

  @Column()
  id_profissional: number;

  @ManyToOne(() => Clinic, clinic => clinic.conexoes)
  @JoinColumn({ name: 'id_clinica' })
  clinica: Clinic;

  @RelationId((conexao: ConexaoProfissionalClinica) => conexao.clinica)
  id_clinica: number;

  @Column({ type: 'varchar' })
  status: 'pendente' | 'aceito' | 'rejeitado';

  @CreateDateColumn()
  data_convite: Date;

  @Column({ nullable: true, type: 'timestamp' })
  data_aceite: Date;

  @Column({ nullable: true })
  mensagem: string;
}

import { ExamAgendamento,ExamPayment } from '../../entities';
import { IExamAgendamento,IExamPayment } from '../exam';
import { FindOptionsWhere } from 'typeorm';

export interface IExamAgendamentoRepository {
  save(data: IExamAgendamento): Promise<ExamAgendamento>;
  update(id: number, data: IExamAgendamento): Promise<ExamAgendamento | null>;
  findById(id: number): Promise<ExamAgendamento | undefined>;
  findByQuery(query: FindOptionsWhere<ExamAgendamento> | FindOptionsWhere<ExamAgendamento>[]): Promise<ExamAgendamento[]>;
  findByQueryOne(query: FindOptionsWhere<ExamAgendamento> | FindOptionsWhere<ExamAgendamento>[]): Promise<ExamAgendamento | undefined>;
  findAll(): Promise<ExamAgendamento[]>;
  delete(id: number): Promise<null>;
}

export interface IExamPaymentRepository {
  save(data: IExamPayment): Promise<ExamPayment>;
  update(id: number, data: IExamPayment): Promise<ExamPayment | null>;
  findById(id: number): Promise<ExamPayment | undefined>;
  findByQuery(query: FindOptionsWhere<ExamPayment> | FindOptionsWhere<ExamPayment>[]): Promise<ExamPayment[]>;
  findByQueryOne(query: FindOptionsWhere<ExamPayment> | FindOptionsWhere<ExamPayment>[]): Promise<ExamPayment | undefined>;
  findAll(): Promise<ExamPayment[]>;
  delete(id: number): Promise<null>;
}

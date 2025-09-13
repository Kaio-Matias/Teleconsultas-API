import { AgendamentoConsulta } from '../../entities';
import { IAgendamentoConsulta } from '../agendamento';
import { FindOptionsWhere } from 'typeorm';

export interface IAgendamentoConsultaRepository {
  save(data: IAgendamentoConsulta): Promise<AgendamentoConsulta>;
  update(id: number, data: IAgendamentoConsulta): Promise<AgendamentoConsulta | null>;
  findById(id: number): Promise<AgendamentoConsulta | undefined>;
  findByQuery(query: FindOptionsWhere<AgendamentoConsulta> | FindOptionsWhere<AgendamentoConsulta>[]): Promise<AgendamentoConsulta[]>;
  findByQueryOne(query: FindOptionsWhere<AgendamentoConsulta> | FindOptionsWhere<AgendamentoConsulta>[]): Promise<AgendamentoConsulta | undefined>;
  findAll(): Promise<AgendamentoConsulta[]>;
  delete(id: number): Promise<null>;
}

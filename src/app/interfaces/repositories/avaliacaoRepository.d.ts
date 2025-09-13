import { Avaliacao } from '../../entities';
import { IAvaliacao } from '../avaliacao';
import { FindOptionsWhere } from 'typeorm';

export interface IAvaliacaoConsultaRepository {
  save(data: IAvaliacao): Promise<Avaliacao>;
  update(id: number, data: IAvaliacao): Promise<Avaliacao | null>;
  findById(id: number): Promise<AgendamentoConsulta | undefined>;
  findByQuery(query: FindOptionsWhere<IAvaliacao> | FindOptionsWhere<IAvaliacao>[]): Promise<Avaliacao[]>;
  findByQueryOne(query: FindOptionsWhere<IAvaliacao> | FindOptionsWhere<IAvaliacao>[]): Promise<Avaliacao | undefined>;
  findAll(): Promise<AgendamentoConsulta[]>;
  delete(id: number): Promise<null>;
}

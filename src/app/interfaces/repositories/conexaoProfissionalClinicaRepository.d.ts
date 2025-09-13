import { ConexaoProfissionalClinica } from '../../entities';
import { IConexaoProfissionalClinica } from '../conexaoProfissionalClinic';
import { FindOptionsWhere } from 'typeorm';

export interface IConexaoProfissionalClinicaConsultaRepository {
  save(data: IConexaoProfissionalClinica): Promise<ConexaoProfissionalClinica>;
  update(id: number, data: IConexaoProfissionalClinica): Promise<ConexaoProfissionalClinica | null>;
  findById(id: number): Promise<AgendamentoConsulta | undefined>;
  findByQuery(query: FindOptionsWhere<IConexaoProfissionalClinica> | FindOptionsWhere<IConexaoProfissionalClinica>[]): Promise<ConexaoProfissionalClinica[]>;
  findByQueryOne(query: FindOptionsWhere<IConexaoProfissionalClinica> | FindOptionsWhere<IConexaoProfissionalClinica>[]): Promise<ConexaoProfissionalClinica | undefined>;
  findAll(): Promise<ConexaoProfissionalClinica[]>;
  delete(id: number): Promise<null>;
}

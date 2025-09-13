import { Endereco } from '../../entities';
import { IEndereco } from '../endereco';
import { FindOptionsWhere } from 'typeorm';

export interface IEnderecoConsultaRepository {
  save(data: IEndereco): Promise<Endereco>;
  update(id: number, data: IEndereco): Promise<Endereco | null>;
  findById(id: number): Promise<Endereco | undefined>;
  findByQuery(query: FindOptionsWhere<IEndereco> | FindOptionsWhere<IEndereco>[]): Promise<Endereco[]>;
  findByQueryOne(query: FindOptionsWhere<IEndereco> | FindOptionsWhere<IEndereco>[]): Promise<Endereco | undefined>;
  findAll(): Promise<Endereco[]>;
  delete(id: number): Promise<null>;
}

import { Documento } from '../../entities';
import { IDocumento } from '../documento';
import { FindOptionsWhere } from 'typeorm';

export interface IDocumentoRepository {
  save(data: IDocumento): Promise<Documento>;
  update(id: number, data: IDocumento): Promise<Documento | null>;
  findById(id: number): Promise<Documento | undefined>;
  findByQuery(query: FindOptionsWhere<Documento> | FindOptionsWhere<Documento>[]): Promise<Documento[]>;
  findByQueryOne(query: FindOptionsWhere<Documento> | FindOptionsWhere<Documento>[]): Promise<Documento | undefined>;
  findAll(): Promise<Documento[]>;
  delete(id: number): Promise<null>;
}

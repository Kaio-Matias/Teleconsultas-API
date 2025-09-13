import { Usuario } from '../../entities';
import { IUsuario } from '../usuario';
import { FindOptionsWhere } from 'typeorm';

export interface IUsuarioRepository {
  save(data: IUsuario): Promise<Usuario>;
  update(id: number, data: IUsuario): Promise<Usuario | null>;
  findById(id: number): Promise<Usuario | undefined>;
  findByQuery(query: FindOptionsWhere<Usuario> | FindOptionsWhere<Usuario>[]): Promise<Usuario[]>;
  findByQueryOne(query: FindOptionsWhere<Usuario> | FindOptionsWhere<Usuario>[]): Promise<Usuario | undefined>;
  findAll(): Promise<Usuario[]>;
  delete(id: number): Promise<null>;
}

import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { ConexaoProfissionalClinica } from '../entities/ConexaoProfissionalClinica';
import { IConexaoProfissionalClinica } from '../interfaces/conexaoProfissionalClinic';
import { IConexaoProfissionalClinicaConsultaRepository } from '../interfaces/repositories/conexaoProfissionalClinicaRepository';

export class ConexaoProfissionalClinicaRepository implements IConexaoProfissionalClinicaConsultaRepository {
  private repository: Repository<ConexaoProfissionalClinica> = dataSource.getRepository(ConexaoProfissionalClinica);

  async save(data: IConexaoProfissionalClinica & { clinica: { id_clinica: number } }) {
    const agendamento = this.repository.create(data);
    return await this.repository.save(agendamento);
  }

  async findAll() {
    return await this.repository.find({ relations: ['clinica'] });
  }

  async findById(id: number) {
    return await this.repository.findOne({
      where: { id_conexao: id },
      relations: ['clinica'],
    });;
  }

  async findByQuery(
    query: FindOptionsWhere<IConexaoProfissionalClinica> & { skip: number; take: number; order: any; } | FindOptionsWhere<IConexaoProfissionalClinica>[] & { skip: number; take: number; order: any; }
  ): Promise<ConexaoProfissionalClinica[]> {
    const objectFilter = { skip: query.skip, take: query.take, order: query.order }

    if (!query.skip) {
      delete objectFilter.skip
    }
    if (!query.take) {
      delete objectFilter.take
    }
    if (!query.order) {
      delete objectFilter.order
    }
    delete query.skip;
    delete query.take;
    delete query.order;

    console.log("Object Filter:", query);

    if ((objectFilter.skip || objectFilter.take || objectFilter.order) && Object.keys(query).length == 0) {
      return await this.repository.find({ ...objectFilter });
    }


    if (objectFilter.skip || objectFilter.take || objectFilter.order) {
      return await this.repository.find({ where: { ...query }, relations: ['clinica'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['clinica'] });
  }

  async findByQueryOne(
    query: any,
  ): Promise<ConexaoProfissionalClinica | undefined> {
    const objectFilter = { skip: query.skip, take: query.take, order: query.order }

    if (!query.skip) {
      delete objectFilter.skip
    }
    if (!query.take) {
      delete objectFilter.take
    }
    if (!query.order) {
      delete objectFilter.order
    }
    delete query.skip;
    delete query.take;
    delete query.order;

    console.log("Object Filter:", query);

    if ((objectFilter.skip || objectFilter.take || objectFilter.order) && Object.keys(query).length == 0) {
      return await this.repository.findOne({ ...objectFilter });
    }


    if (objectFilter.skip || objectFilter.take || objectFilter.order) {
      return await this.repository.findOne({ where: { ...query }, relations: ['clinica'], ...objectFilter });
    }
    const response = await this.repository.findOne({ where: { ...query }, relations: ['clinica'] });
    return response
  }

  async update(id: number, data: Partial<IConexaoProfissionalClinica>) {
    const agendamento = await this.findById(id);
    if (!agendamento) return null;
    Object.assign(agendamento, data);
    return await this.repository.save(agendamento);
  }

  async delete(id: number) {
    const agendamento = await this.findById(id);
    if (!agendamento) return null;
    await this.repository.remove(agendamento);
    return null;
  }
}

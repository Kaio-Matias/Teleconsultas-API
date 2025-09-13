import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { AgendamentoConsulta } from '../entities/AgendamentoConsulta';
import { IAgendamentoConsulta } from '../interfaces/agendamento';
import { IAgendamentoConsultaRepository } from '../interfaces/repositories/agendamentoRepository';

export class AgendamentoConsultaRepository implements IAgendamentoConsultaRepository {
  private repository: Repository<AgendamentoConsulta> = dataSource.getRepository(AgendamentoConsulta);

  async save(data: IAgendamentoConsulta) {
    const agendamento = this.repository.create(data);
    return await this.repository.save(agendamento);
  }

  async findAll() {
    return await this.repository.find({ relations: ['clinica',] });
  }

  async findById(id: number) {
    return await this.repository.findOne({
      where: { id_consulta: id },
      relations: ['clinica'],
    });;
  }

  async findByQuery(
    query: FindOptionsWhere<IAgendamentoConsulta> & { skip: number; take: number; order:any; } | FindOptionsWhere<IAgendamentoConsulta>[] & { skip: number; take: number; order:any; },
  ): Promise<AgendamentoConsulta[]> {
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

    if ((objectFilter.skip || objectFilter.take || objectFilter.order) && Object.keys(query).length == 0) {
      return await this.repository.find({ ...objectFilter });
    }

    if (objectFilter.skip || objectFilter.take || objectFilter.order) {
      return await this.repository.find({ where: { ...query }, relations: ['clinica'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['clinica',] });
  }

  async findByQueryOne(
    query: any,
  ): Promise<AgendamentoConsulta | undefined> {
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

  async update(id: number, data: Partial<IAgendamentoConsulta>) {
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

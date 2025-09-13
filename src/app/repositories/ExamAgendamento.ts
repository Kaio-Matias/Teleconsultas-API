import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { ExamAgendamento } from '../entities';
import { IExamAgendamento } from '../interfaces/exam';
import { IExamAgendamentoRepository } from '../interfaces/repositories/examRepository';

export class ExamAgendamentoRepository implements IExamAgendamentoRepository {
  private repository: Repository<ExamAgendamento> = dataSource.getRepository(ExamAgendamento);

  async save(data: IExamAgendamento & { clinica: { id_clinica: number }, exame: { id_exame: number } }) {
    const clinic = this.repository.create(data);
    return await this.repository.save(clinic);
  }

  async findAll() {
    return await this.repository.find({ relations: ['pagamento', 'exame'] });
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id_agendamento: id }, relations: ['pagamento', 'exame'] });
  }

  async findByQuery(
    query: FindOptionsWhere<IExamAgendamento> & { skip: number; take: number; order: any; } | FindOptionsWhere<IExamAgendamento>[] & { skip: number; take: number; order: any; },
  ): Promise<ExamAgendamento[]> {
    const objectFilter = { skip: query.skip, take: query.take, order: query.order };

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
      return await this.repository.find({ where: { ...query }, relations: ['pagamento', 'exame'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['pagamento', 'exame'] });
  }

  async findByQueryOne(
    query: any,
  ): Promise<ExamAgendamento | undefined> {
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
      return await this.repository.findOne({ where: { ...query }, relations: ['pagamento', 'exame'], ...objectFilter });
    }
    return await this.repository.findOne({ where: { ...query }, relations: ['pagamento', 'exame'] });
  }

  async update(id: number, data: Partial<IExamAgendamento>) {
    const clinic = await this.findById(id);
    if (!clinic) return null;
    Object.assign(clinic, data);
    return await this.repository.save(clinic);
  }

  async delete(id: number) {
    const clinic = await this.findById(id);
    if (!clinic) return null;
    await this.repository.remove(clinic);
    return null;
  }
}


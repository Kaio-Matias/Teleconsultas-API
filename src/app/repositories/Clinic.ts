import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { Clinic, } from '../entities/Clinic';
import { IClinic, } from '../interfaces/clinic';
import { IClinicRepository } from '../interfaces/repositories/clinicRepository';

export class ClinicRepository implements IClinicRepository {
  private repository: Repository<Clinic> = dataSource.getRepository(Clinic);

  async save(data: IClinic) {
    const clinic = this.repository.create(data);
    return await this.repository.save(clinic);
  }

  async findAll() {
    return await this.repository.find({ relations: ['exames', 'promocoes', 'agendamentos', 'conexoes', 'enderecos'] });
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id_clinica: id }, relations: ['exames', 'promocoes', 'agendamentos', 'conexoes', 'enderecos'] });
  }

  async findByQuery(
    query: FindOptionsWhere<IClinic> & { skip: number; take: number; order: any; } | FindOptionsWhere<IClinic>[] & { skip: number; take: number; order: any; },
  ): Promise<Clinic[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['exames', 'promocoes', 'agendamentos', 'conexoes', 'enderecos'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['exames', 'promocoes', 'agendamentos', 'conexoes', 'enderecos'] });
  }

  async findByQueryOne(
    query: any,
  ): Promise<Clinic | undefined> {
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
    return await this.repository.findOne({ where: { ...query }, relations: ['exames', 'promocoes', 'agendamentos', 'conexoes', 'enderecos'] });
  }

  async update(id: number, data: Partial<IClinic>) {
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


import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { ExamPayment } from '../entities';
import { IExamPayment } from '../interfaces/exam';
import { IExamPaymentRepository } from '../interfaces/repositories/examRepository';

export class ExamPaymentRepository implements IExamPaymentRepository {
  private repository: Repository<ExamPayment> = dataSource.getRepository(ExamPayment);

  async save(data: IExamPayment) {
    const clinic = this.repository.create(data);
    return await this.repository.save(clinic);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: number) {
    return await this.repository.findOneBy({ id_pagamento: id });
  }

  async findByQuery(
    query: FindOptionsWhere<IExamPayment> & { skip: number; take: number; order: any; } | FindOptionsWhere<IExamPayment>[] & { skip: number; take: number; order: any; },
  ): Promise<ExamPayment[]> {
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
      return await this.repository.find({ where: { ...query }, ...objectFilter });
    }
    return await this.repository.findBy(query);
  }

  async findByQueryOne(
    query: any,
  ): Promise<ExamPayment | undefined> {
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
      return await this.repository.findOne({ where: { ...query }, ...objectFilter });
    }
    return await this.repository.findOneBy(query);
  }

  async update(id: number, data: Partial<IExamPayment>) {
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


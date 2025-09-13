import { Repository, FindOptionsWhere } from 'typeorm';
import dataSource from '../../database/typeorm';
import { ClinicPromotion } from '../entities';
import { IClinicPromotion } from '../interfaces/clinic';
import { IClinicPromotionRepository } from '../interfaces/repositories/clinicRepository';

export class ClinicPromocaoRepository implements IClinicPromotionRepository {
  private repository: Repository<ClinicPromotion> = dataSource.getRepository(ClinicPromotion);

  async save(data: IClinicPromotion & { clinica: { id_clinica: number } }) {
    const clinic = this.repository.create(data);
    return await this.repository.save(clinic);
  }

  async findAll() {
    return await this.repository.find({ relations: ['clinica'] });
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id_promocao: id }, relations: ['clinica'] });
  }

  async findByQuery(
    query: FindOptionsWhere<IClinicPromotion> & { skip: number; take: number; order: any; } | FindOptionsWhere<IClinicPromotion>[] & { skip: number; take: number; order: any; },
  ): Promise<ClinicPromotion[]> {
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
    return await this.repository.find({ where: { ...query }, relations: ['clinica'] });
  }

  async findByQueryOne(
    query: any,
  ): Promise<ClinicPromotion | undefined> {
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
    return await this.repository.findOne({ where: { ...query }, relations: ['clinica'] });
  }

  async update(id: number, data: Partial<IClinicPromotion>) {
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


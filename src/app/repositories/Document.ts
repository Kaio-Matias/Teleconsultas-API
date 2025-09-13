import { FindOptionsWhere, Repository } from 'typeorm';
import { Documento } from '../entities';
import dataSource from '../../database/typeorm';
import { IDocumentoRepository } from '../interfaces/repositories/documentoRepository';
import { IDocumento } from '../interfaces/documento';

export class DocumentoRepository implements IDocumentoRepository {
  private repository: Repository<Documento>;

  constructor() {
    this.repository = dataSource.getRepository(Documento);
  }

  async save(data: Partial<Documento>) {
    const document = this.repository.create(data);
    return await this.repository.save(document);
  }

  async findAll(): Promise<Documento[]> {
    return await this.repository.find({ relations: ['consulta'] });
  }

  async findById(id_documento: number): Promise<Documento | null> {
    return await this.repository.findOne({ where: { id_documento }, relations: ['consulta'] });
  }

  async findByQuery(
    query: FindOptionsWhere<Documento> & { skip: number; take: number; order: any; } | FindOptionsWhere<Documento>[] & { skip: number; take: number; order: any; },
  ): Promise<Documento[]> {
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
      return await this.repository.find({ where: { ...query }, relations: ['consulta'], ...objectFilter });
    }
    return await this.repository.find({ where: { ...query }, relations: ['consulta'] });
  }

  async findByQueryOne(
    query: any,
  ): Promise<Documento | undefined> {
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
    return await this.repository.findOne({ where: { ...query }, relations: ['consulta'] });
  }

  async update(id_documento: number, data: Partial<Documento>) {
    await this.repository.update(id_documento, data);
    return await this.findById(id_documento);
  }

  async delete(id_documento: number) {
    const document = await this.findById(id_documento);
    if (!document) return null;
    await this.repository.remove(document);
    return null;
  }
}

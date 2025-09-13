import { Clinic, ClinicExam, ClinicPromotion } from '../../entities';
import { IClinic, IClinicExam, IClinicPromotion } from '../clinic';
import { FindOptionsWhere } from 'typeorm';

export interface IClinicRepository {
  save(data: IClinic): Promise<Clinic>;
  update(id: number, data: IClinic): Promise<Clinic | null>;
  findById(id: number): Promise<Clinic | undefined>;
  findByQuery(query: FindOptionsWhere<Clinic> | FindOptionsWhere<Clinic>[]): Promise<Clinic[]>;
  findByQueryOne(query: FindOptionsWhere<Clinic> | FindOptionsWhere<Clinic>[]): Promise<Clinic | undefined>;
  findAll(): Promise<Clinic[]>;
  delete(id: number): Promise<null>;
}

export interface IClinicExamRepository {
  save(data: IClinicExam): Promise<ClinicExam>;
  update(id: number, data: IClinicExam): Promise<ClinicExam | null>;
  findById(id: number): Promise<ClinicExam | undefined>;
  findByQuery(query: FindOptionsWhere<ClinicExam> | FindOptionsWhere<ClinicExam>[]): Promise<ClinicExam[]>;
  findByQueryOne(query: FindOptionsWhere<ClinicExam> | FindOptionsWhere<ClinicExam>[]): Promise<ClinicExam | undefined>;
  findAll(): Promise<ClinicExam[]>;
  delete(id: number): Promise<null>;
}

export interface IClinicPromotionRepository {
  save(data: IClinicPromotion): Promise<ClinicPromotion>;
  update(id: number, data: IClinicPromotion): Promise<ClinicPromotion | null>;
  findById(id: number): Promise<ClinicPromotion | undefined>;
  findByQuery(query: FindOptionsWhere<ClinicPromotion> | FindOptionsWhere<ClinicPromotion>[]): Promise<ClinicPromotion[]>;
  findByQueryOne(query: FindOptionsWhere<ClinicPromotion> | FindOptionsWhere<ClinicPromotion>[]): Promise<ClinicPromotion | undefined>;
  findAll(): Promise<ClinicPromotion[]>;
  delete(id: number): Promise<null>;
}

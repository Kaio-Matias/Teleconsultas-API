import { IClinic } from '../interfaces/clinic';
import { CLINIC_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { ClinicRepository } from "../repositories/Clinic";

export class ClinicService {
  private repository: ClinicRepository

  constructor() {
    this.repository = new ClinicRepository();
  }

  async createClinic(data: IClinic) {
    const dataFilter = filterProps(data, [...CLINIC_FIELDS] as (keyof IClinic)[])

    if (
      !dataFilter.cidade ||
      !dataFilter.cnpj ||
      !dataFilter.email ||
      !dataFilter.especialidades ||
      !dataFilter.especialidades ||
      !dataFilter.estado ||
      !dataFilter.infraestrutura ||
      !dataFilter.nome_fantasia ||
      !dataFilter.telefone
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const clinic = await this.repository.save(dataFilter);

    return clinic
  }

  async getClinics({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_clinica: id });
      return resultItems;
    }

    if (queries) {
      resultItems = await this.repository.findByQuery({ ...queries });
    }

    if (id) {
      resultItems = await this.repository.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    resultItems = await this.repository.findAll();
    return resultItems;
  }

  async updateClinic(id: number, data: Partial<IClinic>) {
    const clinic = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...CLINIC_FIELDS] as (keyof IClinic)[])
    if (!clinic) return null;
   if (
      !dataFilter.cidade ||
      !dataFilter.cnpj ||
      !dataFilter.email ||
      !dataFilter.especialidades ||
      !dataFilter.especialidades ||
      !dataFilter.estado ||
      !dataFilter.infraestrutura ||
      !dataFilter.nome_fantasia ||
      !dataFilter.telefone
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    return await this.repository.update(id, dataFilter);
  }

  async deleteExam(id: number) {
    const clinic = await this.repository.findById(id);
    if (!clinic) return null;
    await this.repository.delete(id);
    return null;
  }
}

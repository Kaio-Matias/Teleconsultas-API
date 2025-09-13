import { IClinicPromotion } from '../interfaces/clinic';
import { CLINIC_PROMOTION_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { ClinicPromocaoRepository } from "../repositories/ClinicPromocao";

export class ClinicPromocaoService {
  private repository: ClinicPromocaoRepository

  constructor() {
    this.repository = new ClinicPromocaoRepository();
  }

  async createClinicPromocao(data: IClinicPromotion) {
    const dataFilter = filterProps(data, [...CLINIC_PROMOTION_FIELDS] as (keyof IClinicPromotion)[])

    if (
      !dataFilter.descricao ||
      !dataFilter.id_clinica ||
      !dataFilter.imagem_url ||
      !dataFilter.titulo ||
      !dataFilter.validade_inicio ||
      !dataFilter.validade_fim
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const clinicPromocao = await this.repository.save({ ...dataFilter, clinica: { id_clinica: dataFilter.id_clinica } });

    return clinicPromocao
  }

  async getClinicPromocao({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_promocao: id });
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

  async updateClinicPromocao(id: number, data: Partial<IClinicPromotion>) {
    const ClinicPromocao = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...CLINIC_PROMOTION_FIELDS] as (keyof IClinicPromotion)[])
    if (!ClinicPromocao) return null;
    if (
      !dataFilter.descricao ||
      !dataFilter.titulo
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    return await this.repository.update(id, dataFilter);
  }

  async deleteClinicPromocao(id: number) {
    const clinicPromocao = await this.repository.findById(id);
    if (!clinicPromocao) return null;
    await this.repository.delete(id);
    return null;
  }
}

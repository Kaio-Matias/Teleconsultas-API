import { IAvaliacao } from '../interfaces/avaliacao';
import { AVALIACAO_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { AvaliacaoRepository } from "../repositories/Avaliacao";

export class AvaliacaoService {
  private repository: AvaliacaoRepository

  constructor() {
    this.repository = new AvaliacaoRepository();
  }

  async createAvaliacao(data: IAvaliacao) {
    const dataFilter = filterProps(data, [...AVALIACAO_FIELDS] as (keyof IAvaliacao)[])

    if (
      !dataFilter.comentario ||
      !dataFilter.consulta_id ||
      !dataFilter.exame_id ||
      !dataFilter.nota ||
      !dataFilter.unidade_id
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const avaliacao = await this.repository.save(dataFilter);

    return avaliacao
  }

  async getAvaliacao({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries,  id_avaliacao: id });
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

  async updateAvaliacao(id: number, data: Partial<IAvaliacao>) {
    const avaliacao = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...AVALIACAO_FIELDS] as (keyof IAvaliacao)[])
    if (!avaliacao) return null;

    return await this.repository.update(id, dataFilter);
  }

  async deleteAvaliacao(id: number) {
    const agendamento = await this.repository.findById(id);
    if (!agendamento) return null;
    await this.repository.delete(id);
    return null;
  }
}

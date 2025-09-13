import { IEndereco } from '../interfaces/endereco';
import { ENDERECO_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { EnderecoRepository } from "../repositories/Enderecos";

export class EnderecoService {
  private repository: EnderecoRepository

  constructor() {
    this.repository = new EnderecoRepository();
  }

  async createEndereco(data: IEndereco) {
    const dataFilter = filterProps(data, [...ENDERECO_FIELDS] as (keyof IEndereco)[])

    if (
      !dataFilter.bairro ||
      !dataFilter.cep||
      !dataFilter.cidade ||
      !dataFilter.complemento ||
      !dataFilter.estado ||
      !dataFilter.id_clinica ||
      !dataFilter.logradouro ||
      !dataFilter.numero ||
      !dataFilter.pais
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const endereco = await this.repository.save({ ...dataFilter, clinica: { id_clinica: dataFilter.id_clinica } });

    return endereco
  }

  async getEnderecos({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_endereco: id });
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

  async updateEnderecos(id: number, data: Partial<IEndereco>) {
    const endereco = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...ENDERECO_FIELDS] as (keyof IEndereco)[])
    if (!endereco) return null;
     if (
      !dataFilter.bairro ||
      !dataFilter.cep||
      !dataFilter.cidade ||
      !dataFilter.complemento ||
      !dataFilter.estado ||
      !dataFilter.logradouro ||
      !dataFilter.numero ||
      !dataFilter.pais
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    return await this.repository.update(id, dataFilter);
  }

  async deleteEnderecos(id: number) {
    const endereco = await this.repository.findById(id);
    if (!endereco) return null;
    await this.repository.delete(id);
    return null;
  }
}

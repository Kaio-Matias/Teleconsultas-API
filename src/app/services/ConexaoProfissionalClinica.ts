import { IConexaoProfissionalClinica } from '../interfaces/conexaoProfissionalClinic';
import { CONEXAO_PROFISSIONAL_CLINICA_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { ConexaoProfissionalClinicaRepository } from "../repositories/ConexaoProfissionalClinica";

export class ConexaoProfissionalClinicaService {
  private repository: ConexaoProfissionalClinicaRepository

  constructor() {
    this.repository = new ConexaoProfissionalClinicaRepository();
  }

  async createConexaoProfissionalClinica(data: IConexaoProfissionalClinica) {
    const dataFilter = filterProps(data, [...CONEXAO_PROFISSIONAL_CLINICA_FIELDS] as (keyof IConexaoProfissionalClinica)[])

    if (
      !dataFilter.data_convite ||
      !dataFilter.id_clinica ||
      !dataFilter.id_profissional ||
      !dataFilter.mensagem ||
      !dataFilter.status
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const agendamento = await this.repository.save({ ...dataFilter, clinica: { id_clinica: dataFilter.id_clinica } });

    return agendamento
  }

  async getConexaoProfissionalClinica({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_conexao: id });
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

  async updateConexaoProfissionalClinica(id: number, data: Partial<IConexaoProfissionalClinica>) {
    const conexaoProfissionalClinica = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...CONEXAO_PROFISSIONAL_CLINICA_FIELDS] as (keyof IConexaoProfissionalClinica)[])
    if (!conexaoProfissionalClinica) return null;
    if (
      !dataFilter.status
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    if (dataFilter.status === "aceito") {
      dataFilter.data_aceite = new Date()
    }

    return await this.repository.update(id, dataFilter);
  }

  async deleteConexaoProfissionalClinica(id: number) {
    const conexaoProfissionalClinica = await this.repository.findById(id);
    if (!conexaoProfissionalClinica) return null;
    await this.repository.delete(id);
    return null;
  }
}

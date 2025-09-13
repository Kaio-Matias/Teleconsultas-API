import { IAgendamentoConsulta } from '../interfaces/agendamento';
import { AGENDAMENTO_CONSULTA_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { AgendamentoConsultaRepository } from "../repositories/Agendamento";

export class AgendamentosConsultaService {
  private repository: AgendamentoConsultaRepository

  constructor() {
    this.repository = new AgendamentoConsultaRepository();
  }

  async createAgendamentosConsulta(data: IAgendamentoConsulta) {
    const dataFilter = filterProps(data, [...AGENDAMENTO_CONSULTA_FIELDS] as (keyof IAgendamentoConsulta)[])

    if (
      !dataFilter.comentarios ||
      !dataFilter.data_hora_inicio ||
      !dataFilter.id_clinica ||
      !dataFilter.id_usuario_paciente ||
      !dataFilter.id_usuario_profissional ||
      !dataFilter.link_sala ||
      !dataFilter.motivo ||
      !dataFilter.tipo_consulta
    ) {
      return { message: 'Campos obrigatórios ausentes' }
    }

    const agendamento = await this.repository.save(dataFilter);

    return agendamento
  }

  async getAgendamentosConsulta({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_consulta: id });
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

  async updateAgendamentosConsulta(id: number, data: Partial<IAgendamentoConsulta>) {
    const agendamento = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...AGENDAMENTO_CONSULTA_FIELDS] as (keyof IAgendamentoConsulta)[])
    if (!agendamento) return null;
    if (
      !dataFilter.comentarios ||
      !dataFilter.data_hora_inicio ||
      !dataFilter.id_consulta ||
      !dataFilter.id_clinica ||
      !dataFilter.id_usuario_paciente ||
      !dataFilter.id_usuario_profissional ||
      !dataFilter.link_sala ||
      !dataFilter.motivo ||
      !dataFilter.tipo_consulta
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    return await this.repository.update(id, dataFilter);
  }

  async deleteAgendamentosConsulta(id: number) {
    const agendamento = await this.repository.findById(id);
    if (!agendamento) return null;
    await this.repository.delete(id);
    return null;
  }
}

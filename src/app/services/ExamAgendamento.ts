import { IExamAgendamento } from '../interfaces/exam';
import { EXAM_AGENDAMENTO_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { ExamAgendamentoRepository } from "../repositories/ExamAgendamento";

export class ExamAgendamentoService {
  private repository: ExamAgendamentoRepository

  constructor() {
    this.repository = new ExamAgendamentoRepository();
  }

  async createExamAgendamento(data: IExamAgendamento) {
    const dataFilter = filterProps(data, [...EXAM_AGENDAMENTO_FIELDS] as (keyof IExamAgendamento)[])

    if (
      !dataFilter.id_clinica ||
      !dataFilter.altura_m ||
      !dataFilter.atualizar_minha_saude ||
      !dataFilter.data_hora ||
      !dataFilter.id_clinica ||
      !dataFilter.id_exame ||
      !dataFilter.id_usuario_paciente ||
      !dataFilter.peso_kg ||
      !dataFilter.pressao_diastolica
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const examAgendamento = await this.repository.save({ ...dataFilter, clinica: { id_clinica: dataFilter.id_clinica }, exame: { id_exame: dataFilter.id_exame } });

    return examAgendamento
  }

  async getExamAgendamento({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_agendamento: id });
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

  async updateExamAgendamento(id: number, data: Partial<IExamAgendamento>) {
    const examAgendamento = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...EXAM_AGENDAMENTO_FIELDS] as (keyof IExamAgendamento)[])
    if (!examAgendamento) return null;

    return await this.repository.update(id, dataFilter);
  }

  async deleteExamAgendamento(id: number) {
    const examAgendamento = await this.repository.findById(id);
    if (!examAgendamento) return null;
    await this.repository.delete(id);
    return null;
  }
}

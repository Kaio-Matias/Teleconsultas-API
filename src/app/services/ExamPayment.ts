import { IExamPayment } from '../interfaces/exam';
import { EXAM_PAYMENT_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { ExamPaymentRepository } from "../repositories/ExamPayment";

export class ExamPaymentService {
  private repository: ExamPaymentRepository

  constructor() {
    this.repository = new ExamPaymentRepository();
  }

  async createExamPayment(data: IExamPayment) {
    const dataFilter = filterProps(data, [...EXAM_PAYMENT_FIELDS] as (keyof IExamPayment)[])

    const examAgendamento = await this.repository.save(dataFilter);

    return examAgendamento
  }

  async getExamPayment({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_pagamento: id });
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

  async updateExamPayment(id: number, data: Partial<IExamPayment>) {
    const endereco = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...EXAM_PAYMENT_FIELDS] as (keyof IExamPayment)[])
    if (!endereco) return null;
    if (
      !dataFilter.data_pagamento ||
      !dataFilter.metodo_pagamento ||
      !dataFilter.parcelas ||
      !dataFilter.status ||
      !dataFilter.tipo ||
      !dataFilter.valor
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    return await this.repository.update(id, dataFilter);
  }

  async deleteExamPayment(id: number) {
    const examAgendamento = await this.repository.findById(id);
    if (!examAgendamento) return null;
    await this.repository.delete(id);
    return null;
  }
}

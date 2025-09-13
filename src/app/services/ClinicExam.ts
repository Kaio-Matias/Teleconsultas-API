import { IClinicExam } from '../interfaces/clinic';
import { CLINIC_EXAM_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { ClinicExamRepository } from "../repositories/ClinicExam";

export class ClinicExamService {
  private repository: ClinicExamRepository

  constructor() {
    this.repository = new ClinicExamRepository();
  }

  async createClinicExam(data: IClinicExam) {
    const dataFilter = filterProps(data, [...CLINIC_EXAM_FIELDS] as (keyof IClinicExam)[])

    if (
      !dataFilter.id_clinica ||
      !dataFilter.nome_exame ||
      !dataFilter.prazo_resultado ||
      !dataFilter.preco ||
      !dataFilter.tipo ||
      !dataFilter.descricao
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const clinicExam = await this.repository.save({ ...dataFilter, clinica: { id_clinica: dataFilter.id_clinica } });

    return clinicExam
  }

  async getExams({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_exame: id });
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

  async updateExam(id: number, data: Partial<IClinicExam>) {
    const clinicExam = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...CLINIC_EXAM_FIELDS] as (keyof IClinicExam)[])
    if (!clinicExam) return null;

    return await this.repository.update(id, dataFilter);
  }

  async deleteExam(id: number) {
    const clinicExam = await this.repository.findById(id);
    if (!clinicExam) return null;
    await this.repository.delete(id);
    return null;
  }
}

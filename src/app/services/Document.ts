import { IDocumento } from '../interfaces/documento';
import { DOCUMENTO_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { DocumentoRepository } from "../repositories/Document";

export class DocumentService {
  private repository: DocumentoRepository

  constructor() {
    this.repository = new DocumentoRepository();
  }

  async createDocument(data: IDocumento) {
    const dataFilter = filterProps(data, [...DOCUMENTO_FIELDS] as (keyof IDocumento)[])

    if (
      !dataFilter.consulta_id ||
      !dataFilter.criado_na_plataforma ||
      !dataFilter.observacoes ||
      !dataFilter.paciente_id ||
      !dataFilter.profissional_id ||
      !dataFilter.tipo ||
      !dataFilter.url_arquivo ||
      !dataFilter.visivel_paciente
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    const document = await this.repository.save(dataFilter);

    return document
  }

  async getDocument({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_documento: id });
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

  async updateDocument(id: number, data: Partial<IDocumento>) {
    const document = await this.repository.findById(id);
    const dataFilter = filterProps(data, [...DOCUMENTO_FIELDS] as (keyof IDocumento)[])
    if (!document) return null;
    if (
        !dataFilter.criado_na_plataforma ||
      !dataFilter.observacoes ||
      !dataFilter.tipo ||
      !dataFilter.url_arquivo ||
      !dataFilter.visivel_paciente
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    return await this.repository.update(id, dataFilter);
  }

  async deleteDocument(id: number) {
    const document = await this.repository.findById(id);
    if (!document) return null;
    await this.repository.delete(id);
    return null;
  }
}

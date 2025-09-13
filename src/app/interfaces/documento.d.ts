export interface IDocumento {
  id_documento?: number;
  tipo: string;
  url_arquivo: string;
  dt_upload?: Date;
  criado_na_plataforma: boolean;
  paciente_id: number;
  profissional_id: number;
  consulta_id: number;
  visivel_paciente: boolean;
  observacoes?: string;
  updated_at?: Date;
}

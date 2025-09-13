export interface IAvaliacao {
  id_avaliacao?: number;
  paciente_id: string;
  consulta_id?: number | null;
  exame_id?: number | null;
  profissional_id?: string | null;
  unidade_id?: string | null;
  nota: number;
  comentario?: string | null;
  dt_avaliacao?: Date;
  updated_at?: Date;
}

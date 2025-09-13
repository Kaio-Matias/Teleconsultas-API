export interface IAgendamentoConsulta {
  id_consulta?: number;
  id_usuario_paciente: number;
  id_usuario_profissional: number;
  id_clinica: number;
  data_hora_inicio: Date;
  data_hora_fim: Date;
  tipo_consulta: string;
  motivo: string;
  link_sala?: string;
  comentarios?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IExamPayment {
  id_pagamento?: number;
  metodo_pagamento: string;
  tipo: string;
  valor: number;
  parcelas?: number;
  status?: string;
  data_pagamento?: Date;
  updated_at?: Date;
}

export interface IExamAgendamento {
  id_clinica?: number;
  id_agendamento?: number;
  id_usuario_paciente: number;
  id_exame: number;
  data_hora: Date;
  status_pagamento?: string;
  lembrete_enviado?: boolean;
  altura_m?: number;
  peso_kg?: number;
  pressao_sistolica?: number;
  pressao_diastolica?: number;
  atualizar_minha_saude?: boolean;
  id_pagamento?: number;
  created_at?: Date;
  updated_at?: Date;
}

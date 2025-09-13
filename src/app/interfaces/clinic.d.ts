export interface IClinic {
  id_clinica?: number;
  cnpj: string;
  nome_fantasia: string;
  telefone?: string;
  email?: string;
  cidade: string;
  estado: string;
  especialidades?: string;
  infraestrutura?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IClinicExam {
  id_exame?: number;
  id_clinica: number;
  nome_exame: string;
  descricao?: string;
  preco: number;
  prazo_resultado: string;
  tipo?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IClinicPromotion {
  id_promocao?: number;
  id_clinica: number;
  titulo: string;
  descricao: string;
  validade_inicio: Date;
  validade_fim: Date;
  imagem_url?: string;
  created_at?: Date;
  updated_at?: Date;
}


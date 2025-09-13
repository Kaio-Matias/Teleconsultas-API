export interface IEndereco {
  id_endereco?: number;
  id_clinica: number;
  cep: string;
  logradouro: string;
  numero?: string | null;
  complemento?: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  created_at?: Date;
  updated_at?: Date;
}

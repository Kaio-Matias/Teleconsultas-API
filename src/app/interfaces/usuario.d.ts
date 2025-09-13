
export interface IUsuario {
  id_usuario?: number;
  usuario_tipo: string;
  cpfcnpj: string;
  nome: string;
  genero?: string;
  cpf: string;
  ft_perfil?: string;
  senha_hash: string;
  is_verificado?: boolean;
  dt_nascimento: Date;
  is_ativo?: boolean;
  descricao_bio?: string;
  criado_em?: Date;
}

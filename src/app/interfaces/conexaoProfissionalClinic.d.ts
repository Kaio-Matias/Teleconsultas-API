export interface IConexaoProfissionalClinica {
  id_conexao?: number;
  id_profissional: number;
  id_clinica: number;
  status: 'pendente' | 'aceito' | 'rejeitado';
  data_convite?: Date;
  data_aceite?: Date | null;
  mensagem?: string | null;
}

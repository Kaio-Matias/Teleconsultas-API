// AgendamentoConsulta
export const AGENDAMENTO_CONSULTA_FIELDS = [
  "id_usuario_paciente",
  "id_usuario_profissional",
  "id_clinica",
  "data_hora_inicio",
  "data_hora_fim",
  "tipo_consulta",
  "motivo",
  "link_sala",
  "comentarios",
  "clinica"
] as const;

// Clinic
export const CLINIC_FIELDS = [
  "cnpj",
  "nome_fantasia",
  "telefone",
  "email",
  "cidade",
  "estado",
  "especialidades",
  "infraestrutura",
] as const;

// ClinicExam
export const CLINIC_EXAM_FIELDS = [
  "id_clinica",
  "nome_exame",
  "descricao",
  "preco",
  "prazo_resultado",
  "tipo",
] as const;

// ClinicPromotion
export const CLINIC_PROMOTION_FIELDS = [
  "id_clinica",
  "titulo",
  "descricao",
  "validade_inicio",
  "validade_fim",
  "imagem_url",
] as const;

// Documento
export const DOCUMENTO_FIELDS = [
  "tipo",
  "url_arquivo",
  "criado_na_plataforma",
  "consulta_id",
  "profissional_id",
  "paciente_id",
  "visivel_paciente",
  "observacoes",
  "consulta"
] as const;

// ExamAgendamento
export const EXAM_AGENDAMENTO_FIELDS = [
  "id_usuario_paciente",
  "id_exame",
  "data_hora",
  "status_pagamento",
  "lembrete_enviado",
  "altura_m",
  "peso_kg",
  "pressao_sistolica",
  "pressao_diastolica",
  "atualizar_minha_saude",
  "id_pagamento",
  'id_clinica',
] as const;

// ExamPayment
export const EXAM_PAYMENT_FIELDS = [
  "metodo_pagamento",
  "tipo",
  "valor",
  "parcelas",
  "status",
] as const;

// Usuario
export const USUARIO_FIELDS = [
  "usuario_tipo",
  "cpfcnpj",
  "nome",
  "genero",
  "cpf",
  "ft_perfil",
  "senha_hash",
  "is_verificado",
  "dt_nascimento",
  "is_ativo",
  "descricao_bio",
] as const;

export const AVALIACAO_FIELDS = [
  "paciente_cpf",
  "consulta_id",
  "exame_id",
  "profissional_cpf",
  "unidade_id",
  "nota",
  "comentario",
  "dt_avaliacao",
] as const;

export const CONEXAO_PROFISSIONAL_CLINICA_FIELDS = [
  "id_profissional",
  "id_clinica",
  "status",
  "data_convite",
  "data_aceite",
  "mensagem",
] as const;

export const ENDERECO_FIELDS = [
  "id_clinica",
  "cep",
  "logradouro",
  "numero",
  "complemento",
  "bairro",
  "cidade",
  "estado",
  "pais",
] as const;



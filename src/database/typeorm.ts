import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Garante que o .env da raiz do projeto seja carregado
const envPath = path.resolve(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

import {
  AgendamentoConsulta,
  Clinic,
  ClinicExam,
  ClinicPromotion,
  Documento,
  ExamAgendamento,
  ExamPayment,
  ConexaoProfissionalClinica,
  Avaliacao,
  Endereco
} from '../app/entities';

import { CreateAgendamentosConsultasTable1689786456780 } from './migrations/2025-04-28_10-39-01_create_agendamentos_consultas';
import { createClinicsTable1689786456780 } from './migrations/2025-04-28_10-39-00_create_clinics';
import { createDocumentosTable1689786456780 } from './migrations/2025-04-28_10-39-01_create_documentos';
import { createAvaliacoesTable1689786456780 } from './migrations/2025-04-28_10-39-02_create_avaliacoes';
import { createClinicExamsTable1689786456780 } from './migrations/2025-04-28_10-39-02_create_clinic_exams';
import { createClinicPromotionsTable1689786456780 } from './migrations/2025-04-28_10-39-02_create_clinic_promotions';
import { createEnderecosTable1689786456780 } from './migrations/2025-04-28_10-39-02_create_enderecos';
import { createExamAgendamentosTable16897864567801 } from './migrations/2025-04-28_10-39-02_create_exam_agendamentos';
import { createExamPaymentsTable1689786456780 } from './migrations/2025-04-28_10-39-02_create_exam_payments';
import { CreateConexoesProfissionaisClinicas1720000000000 } from './migrations/2025-04-28_10-39-02_create_conexoes_profissionais_clinicas';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.BD_HOST || 'localhost', // Correção aplicada
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    AgendamentoConsulta,
    Clinic,
    ClinicExam,
    ClinicPromotion,
    Documento,
    ExamAgendamento,
    ExamPayment,
    ConexaoProfissionalClinica,
    Avaliacao,
    Endereco
  ],
  migrations: [
    createClinicsTable1689786456780,
    CreateAgendamentosConsultasTable1689786456780,
    createExamAgendamentosTable16897864567801,
    createDocumentosTable1689786456780,
    createClinicExamsTable1689786456780,
    createClinicPromotionsTable1689786456780,
    createEnderecosTable1689786456780,
    createExamPaymentsTable1689786456780,
    CreateConexoesProfissionaisClinicas1720000000000,
    createAvaliacoesTable1689786456780,
  ],
});

export default dataSource;

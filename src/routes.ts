import express from 'express';

// CORREÇÃO: Usando a sintaxe de importação nomeada para corresponder à exportação em auth.ts
import { authentication } from './app/middlewares/auth';

import DefaultControllersUsers from './app/controllers/DefaultControllers';

import AgendamentoConsultaRoutes from './app/routes/AgendamentoConsultaRoutes';
import AvaliacaoRoutes from './app/routes/AvaliacaoRoutes';
import Clinic from './app/routes/ClinicRoutes';
import ClinicExamRoutes from './app/routes/ClinicExamRoutes';
import ClinicPromocaoRoutes from './app/routes/ClinicPromocaoRoutes';
import ConexaoProfissionalClinicaRoutes from './app/routes/ConexaoProfissionalClinicaRoutes';
import DocumentRoutes from './app/routes/DocumentRoutes';
import ExamAgendamentoRoutes from './app/routes/ExamAgendamentoRoutes';
import ExamPaymentRoutes from './app/routes/ExamPaymentRoutes';
import EnderecosRoutes from './app/routes/EnderecosRoutes';

import UploadRoutes from './app/routes/UploadRoutes';

const router = express.Router();

//default
router.get('/', authentication, DefaultControllersUsers)
router.get('/api', authentication, DefaultControllersUsers)

router.use('/api/agendamento-consulta', authentication, AgendamentoConsultaRoutes);
router.use('/api/avaliacao', authentication, AvaliacaoRoutes);
router.use('/api/clinic', authentication, Clinic);
router.use('/api/exam', authentication, ClinicExamRoutes);
router.use('/api/agendamento', authentication, ExamAgendamentoRoutes);
router.use('/api/promocao', authentication, ClinicPromocaoRoutes);
router.use('/api/payment', authentication, ExamPaymentRoutes);
router.use('/api/conexao-profissional-clinic', authentication, ConexaoProfissionalClinicaRoutes);
router.use('/api/document', authentication, DocumentRoutes);
router.use('/api/endereco', authentication, EnderecosRoutes);

router.use('/api/upload-files', UploadRoutes);

export default router;


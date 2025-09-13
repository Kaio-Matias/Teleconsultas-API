import { Router } from 'express';

import {
  CreateExamAgendamento,
  DeleteExamAgendamento,
  GetExamAgendamento,
  UpdateExamAgendamento
} from "../controllers/ExamAgendamento"

const routes = Router();

routes.post('/create', CreateExamAgendamento);
routes.get('/:id?', GetExamAgendamento);
routes.put('/:id', UpdateExamAgendamento);
routes.delete('/:id', DeleteExamAgendamento);

export default routes;

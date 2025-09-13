import { Router } from 'express';

import {
  CreateExamPayment,
  DeleteExamPayment,
  GetExamPayment,
  UpdateExamPayment
} from "../controllers/ExamPayment"

const routes = Router();

routes.post('/create', CreateExamPayment);
routes.get('/:id?', GetExamPayment);
routes.put('/:id', UpdateExamPayment);
routes.delete('/:id', DeleteExamPayment);

export default routes;

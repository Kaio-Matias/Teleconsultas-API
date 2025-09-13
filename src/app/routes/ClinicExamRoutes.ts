import { Router } from 'express';

import {
  CreateClinicExam,
  DeleteClinicExam,
  GetClinicExam,
  UpdateClinicExam
} from "../controllers/ClinicExam"

const routes = Router();

routes.post('/create', CreateClinicExam);
routes.get('/:id?', GetClinicExam);
routes.put('/:id', UpdateClinicExam);
routes.delete('/:id', DeleteClinicExam);

export default routes;

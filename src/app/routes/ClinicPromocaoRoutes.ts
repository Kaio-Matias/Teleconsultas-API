import { Router } from 'express';

import {
  CreateClinicPromocao,
  DeleteClinicPromocao,
  GetClinicPromocao,
  UpdateClinicPromocao
} from "../controllers/ClinicPromocao"

const routes = Router();

routes.post('/create', CreateClinicPromocao);
routes.get('/:id?', GetClinicPromocao);
routes.put('/:id', UpdateClinicPromocao);
routes.delete('/:id', DeleteClinicPromocao);

export default routes;

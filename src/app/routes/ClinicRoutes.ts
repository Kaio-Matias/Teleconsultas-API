import { Router } from 'express';

import {
  CreateClinic,
  DeleteClinic,
  GetClinic,
  UpdateClinic
} from "../controllers/Clinic"

const routes = Router();

routes.post('/create', CreateClinic);
routes.get('/:id?', GetClinic);
routes.put('/:id', UpdateClinic);
routes.delete('/:id', DeleteClinic);

export default routes;

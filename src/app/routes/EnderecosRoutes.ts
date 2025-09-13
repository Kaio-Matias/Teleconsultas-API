import { Router } from 'express';

import {
  CreateEndereco,
  DeleteEndereco,
  GetEndereco,
  UpdateEndereco
} from "../controllers/Enderecos"

const routes = Router();

routes.post('/create', CreateEndereco);
routes.get('/:id?', GetEndereco);
routes.put('/:id', UpdateEndereco);
routes.delete('/:id', DeleteEndereco);

export default routes;

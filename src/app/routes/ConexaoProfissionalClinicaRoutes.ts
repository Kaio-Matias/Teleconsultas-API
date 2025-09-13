import { Router } from 'express';

import {
  CreateConexaoProfissionalClinica,
  DeleteConexaoProfissionalClinica,
  GetConexaoProfissionalClinica,
  UpdateConexaoProfissionalClinica
} from "../controllers/ConexaoProfissionalClinica"

const routes = Router();

routes.post('/create', CreateConexaoProfissionalClinica);
routes.get('/:id?', GetConexaoProfissionalClinica);
routes.put('/:id', UpdateConexaoProfissionalClinica);
routes.delete('/:id', DeleteConexaoProfissionalClinica);

export default routes;

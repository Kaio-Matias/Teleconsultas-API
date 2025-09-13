import { Router } from 'express';

import {
  CreateAgendamentoConsulta,
  DeleteAgendamentoConsulta,
  GetAgendamentoConsulta,
  UpdateAgendamentoConsulta
} from "../controllers/AgendamentoConsulta"

const routes = Router();

routes.post('/create', CreateAgendamentoConsulta);
routes.get('/:id?', GetAgendamentoConsulta);
routes.put('/:id', UpdateAgendamentoConsulta);
routes.delete('/:id', DeleteAgendamentoConsulta);

export default routes;

import { Router } from 'express';

import {
 CreateAvaliacao,
 DeleteAvaliacao,
 GetAvaliacao,
 UpdateAvaliacao
} from "../controllers/Avaliacao"

const routes = Router();

routes.post('/create', CreateAvaliacao);
routes.get('/:id?', GetAvaliacao);
routes.put('/:id', UpdateAvaliacao);
routes.delete('/:id', DeleteAvaliacao);

export default routes;

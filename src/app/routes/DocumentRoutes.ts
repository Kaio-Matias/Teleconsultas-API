import { Router } from 'express';

import {
  CreateDocument,
  DeleteDocument,
  GetDocument,
  UpdateDocument
} from "../controllers/Document"

const routes = Router();

routes.post('/create', CreateDocument);
routes.get('/:id?', GetDocument);
routes.put('/:id', UpdateDocument);
routes.delete('/:id', DeleteDocument);

export default routes;

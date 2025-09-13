import { Router } from 'express';

import {
  uploadFiles
} from "../controllers/Upload/Files"
import multer from 'multer';

const routes = Router();

const upload = multer({ dest: 'temp/' });

routes.post('/', upload.single('file'), uploadFiles);

export default routes;

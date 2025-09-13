import express from 'express';
import cluster from 'cluster';
import * as os from 'os';
import { useExpressApp } from './useApp';
import dataSource from './database/typeorm';

export const app = express();

export function server() {

  useExpressApp(app);
  dataSource
    .initialize()
    .then(() => {
      app.listen(parseInt(process.env.PORT_API) || 80, () => {
        console.log('servidor rodando');
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

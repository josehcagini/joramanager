import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import './database/index.js';

import swaggerUI from 'swagger-ui-express';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerDocument from './swagger-doc.js';

import UsuarioRoute from './router/UsuarioRoute.js';

const currentdirname = dirname(fileURLToPath(import.meta.url));
const pathEnv = join(currentdirname, '..', '.env');

dotenv.config({ path: pathEnv });

class App {
  constructor() {
    this.app = express();
    this.midlleswares();
    this.routes();
  }

  midlleswares() {
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    this.app.use(cors({}));
    this.app.use(helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/usuario', UsuarioRoute);
  }
}

export default new App().app;

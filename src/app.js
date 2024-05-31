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
import LoginRoute from './router/LoginRoute.js';

const currentdirname = dirname(fileURLToPath(import.meta.url));
const pathEnv = join(currentdirname, '..', '.env');

dotenv.config({ path: pathEnv });

class App {
  constructor() {
    this.app = express();
    this.midlleswares();
    this.routes();
    this.routeTeste();
  }

  midlleswares() {
    this.app.use(express.json());
    this.app.use(cors({}));
    this.app.use(helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  }

  routes() {
    this.app.use('/usuario', UsuarioRoute);
    this.app.use('/login', LoginRoute);
  }

  routeTeste() {
    this.app.use('/teste', (req, res) => res.status(200).json({ response: 'OK!' }));
  }
}

export default new App().app;

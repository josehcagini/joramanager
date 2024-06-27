import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import './database/index.js';

import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerDocument from './config/swagger-doc.js';

import UsuarioRoute from './router/UsuarioRoute.js';
import LoginRoute from './router/LoginRoute.js';
import AtividadeRoute from './router/AtividadeRoute.js';
import ArtefatoRoute from './router/ArtefatoRoute.js';

import GrupoRoute from './router/GrupoRoute.js';

const currentdirname = dirname(fileURLToPath(import.meta.url));
const pathEnv = join(currentdirname, '..', '.env');

dotenv.config({ path: pathEnv });

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/router/*.js'], // Caminho para seus arquivos de rotas
};

const swaggerSpec = swaggerJsdoc(options);

const whiteList = [
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  origin(origin, callBack) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callBack(null, true);
    } else {
      callBack(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.midlleswares();
    this.routes();
    this.routeTeste();
  }

  midlleswares() {
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use(helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  }

  routes() {
    this.app.use('/usuario', UsuarioRoute);
    this.app.use('/login', LoginRoute);
    this.app.use('/atividade', AtividadeRoute);
    this.app.use('/artefato', ArtefatoRoute);
    this.app.use('/grupo', GrupoRoute);
  }

  routeTeste() {
    this.app.use('/teste', (req, res) => res.status(200).json({ response: 'OK!' }));
  }
}

export default new App().app;

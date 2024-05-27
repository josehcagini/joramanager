import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController.js';

const router = new Router();

router.post('/', UsuarioController.create);

export default router;

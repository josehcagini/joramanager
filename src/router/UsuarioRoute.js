import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController.js';

const router = new Router();

router.post('/', UsuarioController.create);
router.get('/:usuarioId', UsuarioController.show);
// router.get('/', UsuarioController.index);

export default router;

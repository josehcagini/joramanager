import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController.js';

const router = new Router();

router.post('/', UsuarioController.store);
router.get('/:usuarioId', UsuarioController.show);
router.get('/', UsuarioController.index);
router.delete('/:usuarioId', UsuarioController.delete);
router.put('/:usuarioId', UsuarioController.update);

export default router;

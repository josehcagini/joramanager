import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController.js';
import AuthToken from '../middleware/AuthToken.js';
import hasAccess from '../middleware/hasAccess.js';

import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';

const router = new Router();

router.post('/', UsuarioController.store);
router.get('/:usuarioId', UsuarioController.show);
router.get('/', UsuarioController.index);
router.delete('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.DELETEOTHERS]), UsuarioController.delete);
router.put('/:usuarioId', UsuarioController.update);

export default router;

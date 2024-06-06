import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController.js';
import AuthToken from '../middleware/AuthToken.js';
import hasAccess from '../middleware/hasAccess.js';

import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';

const router = new Router();

router.post('/', AuthToken, hasAccess([TipoOperacaoEnum.CREATE]), UsuarioController.store);
router.get('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVEOTHERS, TipoOperacaoEnum.RETRIEVESELF]), UsuarioController.show);
router.get('/', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVEOTHERS]), UsuarioController.index);
router.delete('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.DELETEOTHERS]), UsuarioController.delete);
router.put('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.UPDATEOTHERS, TipoOperacaoEnum.UPDATESELF]), UsuarioController.update);

export default router;

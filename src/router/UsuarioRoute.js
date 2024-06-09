import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController.js';
import AuthToken from '../middleware/AuthToken.js';
import hasAccess from '../middleware/hasAccess.js';

import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';
import ModuloEnum from '../enum/ModuloEnum.js';

const router = new Router();

router.post('/', AuthToken, hasAccess([TipoOperacaoEnum.CREATE], ModuloEnum.USUARIO), UsuarioController.store);
router.get('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVEOTHERS, TipoOperacaoEnum.RETRIEVESELF], ModuloEnum.USUARIO), UsuarioController.show);
router.get('/', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), UsuarioController.index);
router.delete('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.DELETEOTHERS], ModuloEnum.USUARIO), UsuarioController.delete);
router.put('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.UPDATEOTHERS, TipoOperacaoEnum.UPDATESELF], ModuloEnum.USUARIO), UsuarioController.update);

export default router;

import {Router} from "express";
import ArtefatoController from "../controller/ArtefatoController.js";
import AuthToken from '../middleware/AuthToken.js';
import hasAccess from '../middleware/hasAccess.js';
import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';
import ModuloEnum from '../enum/ModuloEnum.js';

const router = new Router();

router.get('/', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), ArtefatoController.index);
router.get('/:artefatoId', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), ArtefatoController.show);
router.post('/', AuthToken, hasAccess([TipoOperacaoEnum.CREATE], ModuloEnum.USUARIO), ArtefatoController.store);
router.put('/:artefatoId', AuthToken, hasAccess([TipoOperacaoEnum.UPDATESELF, TipoOperacaoEnum.UPDATEOTHERS], ModuloEnum.USUARIO), ArtefatoController.update);
router.delete('/:artefatoId', AuthToken, hasAccess([TipoOperacaoEnum.DELETESELF, TipoOperacaoEnum.DELETEOTHERS], ModuloEnum.USUARIO), ArtefatoController.delete);

export default router;
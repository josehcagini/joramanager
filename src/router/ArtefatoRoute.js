import {Router} from "express";
import ArtefatoController from "../controller/ArtefatoController.js";
import AuthToken from '../middleware/AuthToken.js';
import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';

const router = new Router();

router.get('/', AuthToken([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS]), ArtefatoController.index);
router.get('/:artefatoId', AuthToken([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS]), ArtefatoController.show);
router.post('/', AuthToken([TipoOperacaoEnum.CREATE]), ArtefatoController.store);
router.put('/:artefatoId', AuthToken([TipoOperacaoEnum.UPDATESELF, TipoOperacaoEnum.UPDATEOTHERS]), ArtefatoController.update);
router.delete('/:artefatoId', AuthToken([TipoOperacaoEnum.DELETESELF, TipoOperacaoEnum.DELETEOTHERS]), ArtefatoController.delete);

export default router;
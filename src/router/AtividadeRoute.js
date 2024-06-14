import {Router} from 'express';
import AtividadeController from '../controller/AtividadeController.js';
import AuthToken from '../middleware/AuthToken.js';
import hasAccess from '../middleware/hasAccess.js';
import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';
import ModuloEnum from '../enum/ModuloEnum.js';

const router = new Router();

router.get('/', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), AtividadeController.index);
router.get('/:atividadeId', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), AtividadeController.show);
router.post('/', AuthToken, hasAccess([TipoOperacaoEnum.CREATE], ModuloEnum.USUARIO), AtividadeController.store);
router.put('/:atividadeId', AuthToken, hasAccess([TipoOperacaoEnum.UPDATESELF, TipoOperacaoEnum.UPDATEOTHERS], ModuloEnum.USUARIO), AtividadeController.update);
router.delete('/:atividadeId', AuthToken, hasAccess([TipoOperacaoEnum.DELETESELF, TipoOperacaoEnum.DELETEOTHERS], ModuloEnum.USUARIO), AtividadeController.delete);

export default router;
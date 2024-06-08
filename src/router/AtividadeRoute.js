import {Router} from 'express';
import AtividadeController from '../controller/AtividadeController.js';
import AuthToken from '../middleware/AuthToken.js';
import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';

const router = new Router();

router.get('/', AuthToken([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS]), AtividadeController.index);
router.get('/:atividadeId', AuthToken([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS]), AtividadeController.show);
router.post('/', AuthToken([TipoOperacaoEnum.CREATE]), AtividadeController.store);
router.put('/:atividadeId', AuthToken([TipoOperacaoEnum.UPDATESELF, TipoOperacaoEnum.UPDATEOTHERS]), AtividadeController.update);
router.delete('/:atividadeId', AuthToken([TipoOperacaoEnum.DELETESELF, TipoOperacaoEnum.DELETEOTHERS]), AtividadeController.delete);

export default router;
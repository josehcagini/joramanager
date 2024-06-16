import { Router } from 'express';
import AuthToken from '../middleware/AuthToken.js';

import GrupoController from '../controller/GrupoController.js';

const router = new Router();

router.get('/:grupoId/acessos', AuthToken, GrupoController.getAcessoGrupoPage);

export default router;

import { Router } from 'express';
import AuthToken from '../middleware/AuthToken.js';

import GrupoController from '../controller/GrupoController.js';

const router = new Router();

/**
 * @swagger
 * /grupo/{grupoId}/acessos:
 *   get:
 *     summary: Obtém os acessos de um grupo específico
 *     tags: [Grupo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: grupoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do grupo
 *     responses:
 *       200:
 *         description: Acessos do grupo retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acesso:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       acessosEnum:
 *                         type: string
 *                         description: Enumeração de acessos
 *                       path:
 *                         type: string
 *                         description: Caminho associado ao acesso
 *                       hasAccess:
 *                         type: boolean
 *                         description: Indica se o grupo possui acesso
 *                       isRegEx:
 *                         type: boolean
 *                         description: Indica se o caminho é um RegEx
 *                       selfEdit:
 *                         type: boolean
 *                         description: Indica se o acesso permite edição própria
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Grupo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:grupoId/acessos', AuthToken, GrupoController.getAcessoGrupoPage);

export default router;

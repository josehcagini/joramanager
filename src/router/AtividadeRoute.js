import { Router } from 'express';
import AtividadeController from '../controller/AtividadeController.js';
import AuthToken from '../middleware/AuthToken.js';
import hasAccess from '../middleware/hasAccess.js';
import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';
import ModuloEnum from '../enum/ModuloEnum.js';

const router = new Router();

/**
 * @swagger
 * /atividade:
 *   get:
 *     summary: Obtém todas as atividades
 *     tags: [Atividade]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Atividades retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 atividades:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Atividade'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 *
 *   post:
 *     summary: Cria uma nova atividade
 *     tags: [Atividade]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               atividade:
 *                 $ref: '#/components/schemas/AtividadeInput'
 *     responses:
 *       201:
 *         description: Atividade criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 novaAtividade:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       409:
 *         description: Conflito, título já em uso
 *       500:
 *         description: Erro interno do servidor
 *
 * /atividade/{atividadeId}:
 *   get:
 *     summary: Obtém uma atividade específica pelo ID
 *     tags: [Atividade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: atividadeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da atividade a ser obtida
 *     responses:
 *       200:
 *         description: Atividade retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Atividade'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Atividade não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     summary: Atualiza uma atividade existente pelo ID
 *     tags: [Atividade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: atividadeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da atividade a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtividadeInput'
 *     responses:
 *       200:
 *         description: Atividade atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Atividade'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Atividade não encontrada
 *       409:
 *         description: Conflito, título já em uso
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     summary: Deleta uma atividade pelo ID
 *     tags: [Atividade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: atividadeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da atividade a ser deletada
 *     responses:
 *       200:
 *         description: Atividade deletada com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Atividade não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

router.get('/', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), AtividadeController.index);
router.get('/:atividadeId', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), AtividadeController.show);
router.post('/', AuthToken, hasAccess([TipoOperacaoEnum.CREATE], ModuloEnum.USUARIO), AtividadeController.store);
router.put('/:atividadeId', AuthToken, hasAccess([TipoOperacaoEnum.UPDATESELF, TipoOperacaoEnum.UPDATEOTHERS], ModuloEnum.USUARIO), AtividadeController.update);
router.delete('/:atividadeId', AuthToken, hasAccess([TipoOperacaoEnum.DELETESELF, TipoOperacaoEnum.DELETEOTHERS], ModuloEnum.USUARIO), AtividadeController.delete);

export default router;

import { Router } from 'express';
import ArtefatoController from '../controller/ArtefatoController.js';
import AuthToken from '../middleware/AuthToken.js';
import hasAccess from '../middleware/hasAccess.js';
import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';
import ModuloEnum from '../enum/ModuloEnum.js';

const router = new Router();

/**
 * @swagger
 * /artefato:
 *   get:
 *     summary: Obtém todos os artefatos
 *     tags: [Artefato]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Artefatos retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 artefatos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Artefato'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 *
 *   post:
 *     summary: Cria um novo artefato
 *     tags: [Artefato]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtefatoInput'
 *     responses:
 *       201:
 *         description: Artefato criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 novoArtefato:
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
 * /artefato/{artefatoId}:
 *   get:
 *     summary: Obtém um artefato específico pelo ID
 *     tags: [Artefato]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: artefatoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do artefato a ser obtido
 *     responses:
 *       200:
 *         description: Artefato retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artefato'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Artefato não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     summary: Atualiza um artefato existente pelo ID
 *     tags: [Artefato]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: artefatoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do artefato a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArtefatoInput'
 *     responses:
 *       200:
 *         description: Artefato atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artefato'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Artefato não encontrado
 *       409:
 *         description: Conflito, título já em uso
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     summary: Deleta um artefato pelo ID
 *     tags: [Artefato]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: artefatoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do artefato a ser deletado
 *     responses:
 *       200:
 *         description: Artefato deletado com sucesso
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Artefato não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.get('/', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), ArtefatoController.index);
router.get('/:artefatoId', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVESELF, TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), ArtefatoController.show);
router.post('/', AuthToken, hasAccess([TipoOperacaoEnum.CREATE], ModuloEnum.USUARIO), ArtefatoController.store);
router.put('/:artefatoId', AuthToken, hasAccess([TipoOperacaoEnum.UPDATESELF, TipoOperacaoEnum.UPDATEOTHERS], ModuloEnum.USUARIO), ArtefatoController.update);
router.delete('/:artefatoId', AuthToken, hasAccess([TipoOperacaoEnum.DELETESELF, TipoOperacaoEnum.DELETEOTHERS], ModuloEnum.USUARIO), ArtefatoController.delete);

export default router;

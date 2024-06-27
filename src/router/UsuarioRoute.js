import { Router } from 'express';
import UsuarioController from '../controller/UsuarioController.js';
import AuthToken from '../middleware/AuthToken.js';
import hasAccess from '../middleware/hasAccess.js';

import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';
import ModuloEnum from '../enum/ModuloEnum.js';

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Usuário
 *   description: Operações de usuário
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: object
 *                 required:
 *                   - nome
 *                   - senha
 *                 properties:
 *                   nome:
 *                     type: string
 *                     example: "João"
 *                   senha:
 *                     type: string
 *                     example: "senhaSegura"
 *                   grupoId:
 *                     type: integer
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 novoUsuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                 paths:
 *                   type: object
 *                   properties:
 *                     login:
 *                       type: string
 *                       example: "/login"
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Proibido
 *       409:
 *         description: Nome já em uso
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', AuthToken, hasAccess([TipoOperacaoEnum.CREATE], ModuloEnum.USUARIO), UsuarioController.store);

/**
 * @swagger
 * /usuarios/{usuarioId}:
 *   get:
 *     summary: Obtém informações de um usuário específico
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     grupoId:
 *                       type: integer
 *                 paths:
 *                   type: object
 *                   properties:
 *                     home:
 *                       type: string
 *                       example: "/"
 *       400:
 *         description: Request sem usuárioId
 *       401:
 *         description: Sem permissão
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.get('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVEOTHERS, TipoOperacaoEnum.RETRIEVESELF], ModuloEnum.USUARIO), UsuarioController.show);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       grupoId:
 *                         type: integer
 *                 paths:
 *                   type: object
 *                   properties:
 *                     home:
 *                       type: string
 *                       example: "/"
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', AuthToken, hasAccess([TipoOperacaoEnum.RETRIEVEOTHERS], ModuloEnum.USUARIO), UsuarioController.index);

/**
 * @swagger
 * /usuarios/{usuarioId}:
 *   delete:
 *     summary: Exclui um usuário específico
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       400:
 *         description: Request sem usuárioId
 *       401:
 *         description: Sem permissão
 *       500:
 *         description: Erro interno do servidor
 */

router.delete('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.DELETEOTHERS], ModuloEnum.USUARIO), UsuarioController.delete);

/**
 * @swagger
 * /usuarios/{usuarioId}:
 *   put:
 *     summary: Atualiza as informações de um usuário específico
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               senha:
 *                 type: string
 *               grupoId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     grupoId:
 *                       type: integer
 *                 paths:
 *                   type: object
 *                   properties:
 *                     home:
 *                       type: string
 *                       example: "/"
 *       400:
 *         description: Request sem usuárioId
 *       401:
 *         description: Sem permissão
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:usuarioId', AuthToken, hasAccess([TipoOperacaoEnum.UPDATEOTHERS, TipoOperacaoEnum.UPDATESELF], ModuloEnum.USUARIO), UsuarioController.update);

export default router;

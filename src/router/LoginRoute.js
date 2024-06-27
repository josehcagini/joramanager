import { Router } from 'express';
import LoginController from '../controller/LoginController.js';

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Operações de login
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
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
 *                       example: '/'
 *       400:
 *         description: Credenciais inválidas
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Senha incorreta
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', LoginController.store);

export default router;

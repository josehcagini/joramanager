import {StatusCodes} from 'http-status-codes';
import GenericError from '../error/GenericError.js';

import AtividadeRepo from '../repository/AtividadeRepo.js';
import AtividadeEntity from '../entity/AtividadeEntity.js';
import StatusEnum from '../enum/StatusEnum.js';
import ArtefatoController from './ArtefatoController.js';

class AtividadeController {
    static async validarNovaAtividade(novaAtividade) {
      if (!novaAtividade) {
        throw new GenericError('corpo da requisicao nao possui atividade', { status: StatusCodes.BAD_REQUEST });
      }

      if (!novaAtividade.titulo) {
        throw new GenericError('atividade nao possui titulo', { status: StatusCodes.BAD_REQUEST });
      }

      if (!novaAtividade.descricao) {
        throw new GenericError('atividade nao possui descricao', { status: StatusCodes.BAD_REQUEST });
      }

      if (!novaAtividade.dtentrega) {
        throw new GenericError('atividade nao possui data de entrega', { status: StatusCodes.BAD_REQUEST });
      }

      if (!novaAtividade.usuario_id) {
        throw new GenericError('atividade nao possui data de usuario', { status: StatusCodes.BAD_REQUEST });
      }

      if(!StatusEnum.isValidCode(novaAtividade.status)) {
        throw new GenericError('atividade nao possui status', { status: StatusCodes.BAD_REQUEST });
      }
  
      const atividadeExiste = await AtividadeRepo.findOne({ where: { titulo: novaAtividade.titulo } });
  
      if (atividadeExiste) {
        throw new GenericError('titulo ja em uso', { status: StatusCodes.CONFLICT });
      }
      console.log("Teste 1")
      if (novaAtividade.artefato) {
        console.log("Teste 2")
        for (const artefato of novaAtividade.artefato) {
            await ArtefatoController.validarNovoArtefato(artefato);
            console.log("Teste 3")
        }
      }
    }

    async store(req, res) {
      try {
        const { atividade } = req.body;
        console.log(atividade)
        await AtividadeController.validarNovaAtividade(atividade);
        console.log(atividade)
        const atividadeSave = AtividadeEntity.fromJson(atividade);
        console.log(atividade)
        const novoAtividade = await AtividadeRepo.create(atividadeSave, {
          include: [
            {
              association: "artefato",
            },
          ],
        });
  
        const retjson = {
          novoAtividade: {
            id: novoAtividade.id,
          },
          paths: {
            login: '/login',
          },
        };
  
        return res.status(StatusCodes.CREATED).json(retjson);
      } catch (error) {
        console.log(error);
  
        const status = error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;
  
        return res.status(status).json({
          error: {
            message: error.message,
            ...error,
          },
          paths: {
            home: '/',
          },
        });
      }
    }
  
    async show(req, res) {
      try {
        const { atividadeId } = req.params;
  
        if (!atividadeId) {
          throw new GenericError('request sem atividadeId', { status: StatusCodes.BAD_REQUEST });
        }
  
        const atividade = await AtividadeRepo.findByPk(atividadeId);
  
        return res.status(StatusCodes.OK).json({ atividades: atividade });
      } catch (error) {
        console.log(error);
  
        const status = error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;
        const retjson = {
          error: {
            message: error.message,
            ...error,
          },
          paths: {
            home: '/',
          },
        };
        return res.status(status).json(retjson);
      }
    }
  
    async index(req, res) {
      try {
        const atividades = await AtividadeRepo.findAll();
  
        return res.status(StatusCodes.OK).json(atividades);
      } catch (error) {
        console.log(error);
  
        const status = error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;
        const retjson = {
          error: {
            message: error.message,
            ...error,
          },
          paths: {
            home: '/',
          },
        };
        return res.status(status).json(retjson);
      }
    }
  
    async delete(req, res) {
      try {
        const { atividadeId } = req.params;
        if (!atividadeId) {
          throw new GenericError('atividadeId nao enviado', { status: StatusCodes.BAD_REQUEST });
        }
  
        const atividade = await AtividadeRepo.delete(atividadeId);
  
        return res.status(StatusCodes.OK).json(atividade);
      } catch (error) {
        const status = error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;
        const retjson = {
          error: {
            message: error.message,
            ...error,
          },
          paths: {
            home: '/',
          },
        };
        return res.status(status).json(retjson);
      }
    }
  
    async update(req, res) {
      try {
        const { atividadeId } = { ...req.params };
        if (!atividadeId) {
          throw new GenericError('atividadeId nao enviado', { status: StatusCodes.BAD_REQUEST });
        }
  
        const valuesUpdate = { ...req.body };
        if (!valuesUpdate) {
          throw new GenericError('body vazio', { status: StatusCodes.BAD_REQUEST });
        }
  
        const camposUpdate = AtividadeEntity.fromJson(valuesUpdate);
  
        const atividadeUpdate = await AtividadeRepo.update(atividadeId, camposUpdate);
  
        console.log('retorno', atividadeUpdate);
  
        return res.status(StatusCodes.OK).json(atividadeUpdate);
      } catch (error) {
        const status = error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;
        const retjson = {
          error: {
            message: error.message,
            ...error,
          },
          paths: {
            home: '/',
          },
        };
        return res.status(status).json(retjson);
      }
    }
}

export default new AtividadeController();
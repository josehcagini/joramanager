import GenericError from '../error/GenericError.js';
import {StatusCodes} from 'http-status-codes';
import ArtefatoRepo from '../repository/ArtefatoRepo.js';
import ArtefatoEntity from '../entity/ArtefatoEntity.js';

class ArtefatoController {
    async validarNovoArtefato(novoArtefato) {
      if (!novoArtefato) {
        throw new GenericError('corpo da requisicao nao possui artefato', { status: StatusCodes.BAD_REQUEST });
      }

      if (!novoArtefato.titulo) {
        throw new GenericError('artefato nao possui titulo', { status: StatusCodes.BAD_REQUEST });
      }

      if (!novoArtefato.descricao) {
        throw new GenericError('artefato nao possui descricao', { status: StatusCodes.BAD_REQUEST });
      }

      if (!novoArtefato.originalname) {
        throw new GenericError('artefato nao possui nome original', { status: StatusCodes.BAD_REQUEST });
      }

      if (!novoArtefato.filename) {
        throw new GenericError('artefato nao possui nome de arquivo', { status: StatusCodes.BAD_REQUEST });
      }

      if(novoArtefato.url) {
        throw new GenericError('artefato nao possui url', { status: StatusCodes.BAD_REQUEST });
      }
  
      const artefatoExiste = await ArtefatoRepo.findOne({ where: { titulo: novoArtefato.titulo } });
  
      if (artefatoExiste) {
        throw new GenericError('titulo ja em uso', { status: StatusCodes.CONFLICT });
      }
    }
    
    async store(req, res) {
      try {
        const { artefato } = req.body;
  
        await ArtefatoController.validarNovoArtefato(artefato);
  
        const artefatoSave = ArtefatoEntity.fromJson(artefato);
  
        const novoArtefato = await ArtefatoRepo.create(artefatoSave);
  
        const retjson = {
          novoArtefato: {
            id: novoArtefato.id,
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
        const { artefatoId } = req.params;
  
        if (!artefatoId) {
          throw new GenericError('request sem artefatoId', { status: StatusCodes.BAD_REQUEST });
        }
  
        const artefato = await ArtefatoRepo.findByPk(artefatoId);
  
        return res.status(StatusCodes.OK).json({ artefatos: artefato });
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
        const artefatos = await ArtefatoRepo.findAll();
  
        return res.status(StatusCodes.OK).json(artefatos);
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
        const { artefatoId } = req.params;
        if (!artefatoId) {
          throw new GenericError('artefatoId nao enviado', { status: StatusCodes.BAD_REQUEST });
        }
  
        const artefato = await ArtefatoRepo.delete(artefatoId);
  
        return res.status(StatusCodes.OK).json(artefato);
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
        const { artefatoId } = { ...req.params };
        if (!artefatoId) {
          throw new GenericError('artefatoId nao enviado', { status: StatusCodes.BAD_REQUEST });
        }
  
        const valuesUpdate = { ...req.body };
        if (!valuesUpdate) {
          throw new GenericError('body vazio', { status: StatusCodes.BAD_REQUEST });
        }
  
        const camposUpdate = ArtefatoEntity.fromJson(valuesUpdate);
  
        const artefatoUpdate = await ArtefatoRepo.update(artefatoId, camposUpdate);
  
        console.log('retorno', artefatoUpdate);
  
        return res.status(StatusCodes.OK).json(artefatoUpdate);
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

export default new ArtefatoController();
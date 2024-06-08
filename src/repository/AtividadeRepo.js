import { StatusCodes } from 'http-status-codes';
import Atividade from '../model/Atividade.js';
import GenericError from '../error/GenericError.js';
import AtividadeEntity from '../entity/AtividadeEntity.js';

class AtividadeRepo {
  async findByPk(atividadeId) {
    let atividade;

    try {
      const res = await Atividade.findByPk(atividadeId);
      if (!res) {
        return res;
      }
      atividade = AtividadeEntity.fromModel(res.toJSON());
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

    return atividade;
  }

  async findAll() {
    try {
      const res = await Atividade.findAll();

      const atividades = res.map((atividade) => AtividadeEntity.fromModel(atividade.toJSON()));

      return atividades;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async create(value, options) {
    const res = await Atividade.create(value, options);

    if (!res) {
      throw new GenericError('erro ao gravar novo atividade', { status: 500, error_dbcreate: res });
    }

    const novoAtividade = AtividadeEntity.fromModel(await res.dataValues);

    return novoAtividade;
  }

  async delete(atividadeId) {
    try {
      const atividade = await Atividade.findByPk(atividadeId);
      if (!atividade) {
        throw new GenericError('atividade nao existe', { status: StatusCodes.NOT_FOUND });
      }

      const atividadeDeletado = AtividadeEntity.fromModel(atividade.toJSON());
      await atividade.destroy();

      return atividadeDeletado;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async update(atividadeId, values) {
    try {
      const atividade = await Atividade.findByPk(atividadeId);
      if (!atividade) {
        throw new GenericError('atividade nao existe', { status: StatusCodes.NOT_FOUND });
      }

      await atividade.update(values);
      const atividadeUpdated = AtividadeEntity.fromModel(atividade);

      return atividadeUpdated;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }
}

export default new AtividadeRepo();

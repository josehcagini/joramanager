import Artefato from '../model/Artefato.js';
import GenericError from '../error/GenericError.js';
import ArtefatoEntity from '../entity/ArtefatoEntity.js';

class ArtefatoRepo {
  async findByPk(artefatoId) {
    let artefato;

    try {
      const res = await Artefato.findByPk(artefatoId);
      if (!res) {
        return res;
      }
      artefato = ArtefatoEntity.fromModel(res.toJSON());
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

    return artefato;
  }

  async findAll() {
    try {
      const res = await Artefato.findAll();

      const artefatos = res.map((artefato) => ArtefatoEntity.fromModel(artefato.toJSON()));

      return artefatos;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async create(value, options) {
    const res = await Artefato.create(value, options);

    if (!res) {
      throw new GenericError('erro ao gravar novo artefato', { status: 500, error_dbcreate: res });
    }

    const novoArtefato = ArtefatoEntity.fromModel(await res.dataValues);

    return novoArtefato;
  }

  async delete(artefatoId) {
    try {
      const artefato = await Artefato.findByPk(artefatoId);
      if (!artefato) {
        throw new GenericError('artefato nao existe', { status: StatusCodes.NOT_FOUND });
      }

      const artefatoDeletado = ArtefatoEntity.fromModel(artefato.toJSON());
      await artefato.destroy();

      return artefatoDeletado;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async update(artefatoId, values) {
    try {
      const artefato = await Artefato.findByPk(artefatoId);
      if (!artefato) {
        throw new GenericError('artefato nao existe', { status: StatusCodes.NOT_FOUND });
      }

      await artefato.update(values);
      const artefatoUpdated = ArtefatoEntity.fromModel(artefato);

      return artefatoUpdated;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }
}

export default new ArtefatoRepo();
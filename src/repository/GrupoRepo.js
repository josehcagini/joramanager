import { StatusCodes } from 'http-status-codes';
import GenericError from '../error/GenericError.js';
import Grupo from '../model/Grupo.js';
import GrupoEntity from '../entity/GrupoEntity.js';

class GrupoRepo {
  async findByPk(grupoId) {
    let grupo;

    try {
      const res = await Grupo.findByPk(grupoId);
      if (!res) {
        return res;
      }
      grupo = GrupoEntity.fromModel(res.toJSON());

      grupo;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

    return grupo;
  }
}

export default new GrupoRepo();

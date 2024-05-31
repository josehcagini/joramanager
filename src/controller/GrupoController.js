import { StatusCodes } from 'http-status-codes';
import GenericError from '../error/GenericError.js';
import GrupoRepo from '../repository/GrupoRepo.js';

class GrupoController {
  async hasAccess(tipoOperacao, grupoId) {
    const grupo = await GrupoRepo.findByPk(grupoId);

    if (!grupo) {
      throw new GenericError('grupo nao encontrado', { status: StatusCodes.NOT_FOUND });
    }

    return grupo;
  }
}

export default new GrupoController();

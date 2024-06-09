import { StatusCodes } from 'http-status-codes';
import GenericError from '../error/GenericError.js';
import GrupoRepo from '../repository/GrupoRepo.js';

class GrupoController {
  async hasAccess(tipoOperacao, modulo, grupoId) {
    try {
      const grupo = await GrupoRepo.findByPk(grupoId, true);

      if (!grupo) {
        throw new GenericError('grupo nao encontrado', { status: StatusCodes.NOT_FOUND });
      }

      // eslint-disable-next-line max-len
      const grupoPermissao = grupo.permissoes.filter((permissao) => modulo === permissao.modulo && tipoOperacao.includes(permissao.tipoOperacao) && (!permissao.bloqueado));
      return grupoPermissao;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }
}

export default new GrupoController();

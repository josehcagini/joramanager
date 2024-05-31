import { StatusCodes } from 'http-status-codes';
import GenericError from '../error/GenericError.js';
import GrupoRepo from '../repository/GrupoRepo.js';

class GrupoController {
  async hasAccess(tipoOperacao, grupoId) {
    try {
      const grupo = await GrupoRepo.findByPk(grupoId);

      if (!grupo) {
        throw new GenericError('grupo nao encontrado', { status: StatusCodes.NOT_FOUND });
      }

      // eslint-disable-next-line max-len
      const grupoPermissao = grupo.permissoes.find((permissao) => tipoOperacao.includes(permissao.tipoOperacao) && (!permissao.bloqueado));
      console.log(grupoPermissao);
      return !!grupoPermissao;
    } catch (error) {
      return false;
    }
  }
}

export default new GrupoController();

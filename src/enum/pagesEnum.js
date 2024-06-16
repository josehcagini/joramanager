import acessosEnum from './acessosEnum.js';

export default [
  { path: '/usuario/registrar', acessosEnum: acessosEnum.REGISTRARUSUARIO },
  { path: '\\/usuario\\/\\d+\\/editar', acessosEnum: acessosEnum.EDITARRUSUARIO, isRegEx: true },
  { path: '\\/usuario\\/\\d+\\/editar', acessosEnum: acessosEnum.EDITARRUSUARIOPROPRIO, isRegEx: true },
  { path: '/usuario/listar', acessosEnum: acessosEnum.LISTARUSUARIO },
  { path: '/', acessosEnum: acessosEnum.HOME },
  { path: '/login', acessosEnum: acessosEnum.LOGIN },
  { path: '/logout', acessosEnum: acessosEnum.LOGOUT },
  { path: '/atividade/registrar', acessosEnum: acessosEnum.REGISTRARATIVIDADE },
  { path: '\\/atividade\\/\\d+\\/editar', acessosEnum: acessosEnum.EDITARATIVIDADE, isRegEx: true },
  { path: '/atividade/listar', acessosEnum: acessosEnum.LISTARATIVIDADE },
];

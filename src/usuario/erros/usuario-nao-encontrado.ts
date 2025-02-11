import ErroNegocioException from 'src/core/erros/erro-negocio';

export class UsuarioNaoEncontradoException extends ErroNegocioException {
  constructor() {
    super(404, 'USUARIO_NAO_ENCONTRADO', 'Usuário não encontrado');
  }
}

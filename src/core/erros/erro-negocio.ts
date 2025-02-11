import { HttpException } from '@nestjs/common';

export default class ErroNegocioException extends HttpException {
  constructor(status: number, codigoErro: string, mensagem: string) {
    super({ codigo: codigoErro, mensagem: mensagem }, status);
  }
}

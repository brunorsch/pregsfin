import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {
  identificar(cpf?: string) {
    return 'Identificação de usuário';
  }
}

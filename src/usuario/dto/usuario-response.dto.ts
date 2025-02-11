import { Usuario } from '../data/usuario.entity';

export class UsuarioResponseDto {
  id: number;
  nomeCompleto: string;
  email: string;
  numeroChat: string;
  criadoEm: Date;
  atualizadoEm?: Date;
}

export function fromUsuario(usuario: Usuario): UsuarioResponseDto {
  return {
    id: usuario.id,
    nomeCompleto: usuario.nomeCompleto,
    email: usuario.email,
    numeroChat: usuario.numeroChat,
    criadoEm: usuario.criadoEm,
    atualizadoEm: usuario.atualizadoEm,
  };
}

import { Injectable } from '@nestjs/common';
import { Usuario } from './data/usuario.entity';
import { EntityRepository } from '@mikro-orm/core';
import naoNuloOuException from 'src/core/erros/nao-nulo-ou-exception.util';
import { UsuarioNaoEncontradoException } from './erros/usuario-nao-encontrado';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: EntityRepository<Usuario>,
  ) {}

  async consultar(id: number): Promise<Usuario> {
    const usuarioNaoEncontrado = await this.repository.findOne(id);

    return naoNuloOuException(
      usuarioNaoEncontrado,
      new UsuarioNaoEncontradoException(),
    );
  }

  async identificarPorNumero(numero?: string): Promise<Usuario> {
    const usuarioNaoEncontrado = await this.repository.findOne({
      numeroChat: numero,
    });

    return naoNuloOuException(
      usuarioNaoEncontrado,
      new UsuarioNaoEncontradoException(),
    );
  }
}

import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { Despesa } from './data/depesa.entity';
import { EntityRepository } from '@mikro-orm/core';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class EntradaService {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: EntityRepository<Despesa>,
    private readonly usuarioService: UsuarioService,
  ) {}

  async criarDespesa(idUsuario: number, novaDespesa: Despesa): Promise<number> {
    Logger.log(
      `Criando nova despesa para usuario ID ${idUsuario}: ${JSON.stringify(novaDespesa)}`,
    );

    const usuario = await this.usuarioService.consultar(idUsuario);
    novaDespesa.usuario = usuario;

    return await this.despesaRepository.insert(novaDespesa);
  }
}

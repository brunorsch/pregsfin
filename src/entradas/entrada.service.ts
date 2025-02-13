import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { Despesa } from './data/depesa.entity';
import { EntityRepository } from '@mikro-orm/core';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/usuario/data/usuario.entity';

@Injectable()
export class EntradaService {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: EntityRepository<Despesa>,
    private readonly usuarioService: UsuarioService,
  ) {}

  async criarDespesaParaChat(
    numeroChat: string,
    novaDespesa: Despesa,
  ): Promise<Despesa> {
    Logger.log(
      `Criando nova despesa para usuario número ${numeroChat}: ${JSON.stringify(novaDespesa)}`,
    );

    const usuario = await this.usuarioService.identificarPorNumero(numeroChat);

    const id = await this.criarDespesa(usuario, novaDespesa);

    novaDespesa.id = id;

    return novaDespesa;
  }

  async criarDespesaParaIdUsuario(
    idUsuario: number,
    novaDespesa: Despesa,
  ): Promise<number> {
    Logger.log(
      `Criando nova despesa para usuario ID ${idUsuario}: ${JSON.stringify(novaDespesa)}`,
    );

    const usuario = await this.usuarioService.consultar(idUsuario);

    return await this.criarDespesa(usuario, novaDespesa);
  }

  private async criarDespesa(usuario: Usuario, novaDespesa: Despesa) {
    novaDespesa.usuario = usuario;
    return await this.despesaRepository.insert(novaDespesa);
  }

  async listarDespesasPorChat(numeroChat: string): Promise<Despesa[]> {
    Logger.log(`Listando despesas para usuário número ${numeroChat}`);

    return await this.despesaRepository.find({ usuario: { numeroChat } });
  }
}

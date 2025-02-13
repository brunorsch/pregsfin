import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { PregsContext } from './types/pregs-context';
import { Comando } from './comandos/comando';

@Injectable()
export class ComandoService {
  constructor(
    @Inject('ComandosChatbot')
    private readonly comandos: Comando[],
    private readonly orm: MikroORM,
  ) {}

  @CreateRequestContext()
  processarComando(ctx: PregsContext): void {
    const mensagem = ctx.message!.text!;
    const numeroChat = ctx.from!.id.toString();

    Logger.debug(`Comando recebido: ${mensagem} - Usuário ID ${numeroChat}`);

    const comandoEncontrado = this.comandos.find((comando) =>
      comando.match(mensagem, ctx),
    );

    if (!comandoEncontrado) {
      Logger.debug('Comando não identificado');
      void ctx.reply('Desculpa, não consegui entender o que você disse.');
      return;
    }

    Logger.debug(`Comando identificado: ${comandoEncontrado.nomeExibicao}`);

    void comandoEncontrado.executar(mensagem, numeroChat, ctx);
  }
}

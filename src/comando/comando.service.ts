import { Injectable, Logger } from '@nestjs/common';
import { isNumberString } from 'class-validator';
import { EntradaService } from 'src/entradas/entrada.service';
import { PregsContext } from './telegram-bot/telegram-bot.service';
import { Despesa } from 'src/entradas/data/depesa.entity';
import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import currency from 'currency.js';

const BRLFormat = { symbol: 'R$', decimal: ',', separator: '.' };

@Injectable()
export class ComandoService {
  constructor(
    private readonly entradaService: EntradaService,
    private readonly orm: MikroORM,
  ) {}

  @CreateRequestContext()
  async processarComando(ctx: PregsContext): Promise<void> {
    const mensagem = ctx.message!.text!;
    const numeroChat = ctx.from!.id.toString();

    Logger.debug(`Comando recebido: ${mensagem} - Usuário ID ${numeroChat}`);

    const comando = mensagem.split(' ');

    if (ctx.session.isAguarandoValorDespesa) {
      if (isNumberString(comando[0])) {
        await this.criarDespesaEResponderChat(
          numeroChat,
          ctx.session.descricaoUltimaDespesa!,
          comando[0],
          ctx,
        );
      } else {
        await ctx.reply(
          'Valor informado não é um número. Por favor, informe o valor da despesa.',
        );
      }
    }

    if (comando.length === 2) {
      Logger.debug(`Comando identificado: Criar despesa`);

      const [descricao, valor] = comando;

      if (!isNumberString(valor)) {
        Logger.debug(`Valor informado não é um número: ${valor}`);

        ctx.session.descricaoUltimaDespesa = descricao;
        ctx.session.isAguarandoValorDespesa = true;

        await ctx.reply(
          'Certo, qual é o valor dessa despesa? Edite a mensagem ou responda com o valor da despesa.',
        );

        return;
      }

      await this.criarDespesaEResponderChat(numeroChat, descricao, valor, ctx);
    }
  }

  private async criarDespesaEResponderChat(
    numeroChat: string,
    descricao: string,
    valor: string,
    ctx: PregsContext,
  ) {
    const despesa = new Despesa();
    despesa.descricao = descricao;
    despesa.valor = valor;

    const despesaCriada = await this.entradaService.criarDespesaParaChat(
      numeroChat,
      despesa,
    );

    await ctx.reply(
      '*Despesa cadastrada com sucesso!*\n\n' +
        `*Descrição*: ${despesaCriada.descricao}\n` +
        `*Valor*: ${currency(despesaCriada.valor).format(BRLFormat)}\n\n` +
        `_#${despesaCriada.id}_`,
      { parse_mode: 'Markdown' },
    );
  }
}

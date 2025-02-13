import { Injectable, Logger } from '@nestjs/common';
import { Comando } from './comando';
import { PregsContext } from '../types/pregs-context';
import { isNumberString } from 'class-validator';
import { EntradaService } from 'src/entradas/entrada.service';
import { Despesa } from 'src/entradas/data/depesa.entity';
import currency from 'currency.js';
import { BRLFormat } from '../etc/brl-format';

@Injectable()
export class CriarDespesaComando implements Comando {
  constructor(private readonly entradaService: EntradaService) {}

  nomeExibicao = 'Criar despesa';

  match(mensagem: string, ctx: PregsContext): boolean {
    const comando = mensagem.split(' ');

    return !!(
      comando.length === 2 ||
      (ctx.session.isAguarandoValorDespesa && isNumberString(comando[0]))
    );
  }

  async executar(
    mensagem: string,
    numeroChat: string,
    ctx: PregsContext,
  ): Promise<void> {
    const [descricao, valor] = mensagem.split(' ');

    if (ctx.session.isAguarandoValorDespesa && isNumberString(descricao)) {
      await this.criarDespesaEResponderChat(
        numeroChat,
        ctx.session.descricaoUltimaDespesa!,
        descricao,
        ctx,
      );
    } else {
      await ctx.reply(
        'Valor informado não é um número. Por favor, informe o valor da despesa.',
      );
    }

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

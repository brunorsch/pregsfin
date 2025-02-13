import { Injectable } from '@nestjs/common';
import { EntradaService } from 'src/entradas/entrada.service';
import currency from 'currency.js';
import { PregsContext } from '../types/pregs-context';
import { BRLFormat } from '../etc/brl-format';
import { Comando } from './comando';

@Injectable()
export class ListarDespesasComando implements Comando {
  constructor(private readonly entradaService: EntradaService) {}

  nomeExibicao = 'Listar despesas';

  match(mensagem: string): boolean {
    return !!mensagem.match(
      /(?:[Ll]istar?.*(?:[Dd]espesas?.*)|(?:[Mm]inhas?)?\s*(?:[Dd]espesas?).*m[êe]s*.)/,
    );
  }

  async executar(
    mensagem: string,
    numeroChat: string,
    ctx: PregsContext,
  ): Promise<void> {
    const despesas =
      await this.entradaService.listarDespesasPorChat(numeroChat);

    if (despesas.length === 0) {
      await ctx.reply('Nenhuma despesa encontrada.');
      return;
    }

    const total: ReturnType<typeof currency> = despesas.reduce(
      (acc, despesa) => acc.add(despesa.valor),
      currency(0),
    );

    const despesasFormatadas = despesas
      .map(
        (despesa) =>
          `${despesa.descricao}: *${currency(despesa.valor).format(BRLFormat)}* (_#${despesa.id}_)`,
      )
      .join('\n');

    void ctx.reply(
      `*Despesas do mês:*\n\n${despesasFormatadas}\n\n` +
        `*Total: ${total.format(BRLFormat)}*`,
      { parse_mode: 'Markdown' },
    );

    return;
  }
}

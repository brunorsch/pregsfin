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
    const ultimoArgumento = comando[comando.length - 1];

    return !!(comando.length >= 2 && isNumberString(ultimoArgumento));
  }

  async executar(
    mensagem: string,
    numeroChat: string,
    ctx: PregsContext,
  ): Promise<void> {
    const comandoSplitted = mensagem.split(' ');
    const valor = comandoSplitted.pop()!;
    const descricao = comandoSplitted.join(' ');

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

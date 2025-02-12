import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Bot, Context, session, SessionFlavor } from 'grammy';
import { ComandoService } from '../comando.service';

interface SessionData {
  descricaoUltimaDespesa?: string;
  isAguarandoValorDespesa?: boolean;
}

export type PregsContext = Context & SessionFlavor<SessionData>;

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: Bot<PregsContext>;
  private readonly comandoService: ComandoService;

  constructor(comandoService: ComandoService) {
    this.bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
    this.comandoService = comandoService;
  }

  onModuleInit() {
    this.startBot();
  }

  startBot() {
    this.bot.use(session({ initial: () => ({ lastQuestion: null }) }));

    this.bot.command('start', async (ctx) => {
      const autor = await ctx.getAuthor();
      void ctx.reply(
        `Para começar a usar o bot, faça seu cadastro em: https://pregsfin.app.br/cadastro?telegram=${autor.user.id}`,
      );
    });

    this.bot.on(['message:text', 'edited_message:text'], async (ctx) => {
      await this.comandoService.processarComando(ctx);
    });

    void this.bot.start();
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot, session } from 'grammy';
import { ComandoService } from '../comando.service';
import { PregsContext } from '../types/pregs-context';

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

    this.bot.on(['message:text', 'edited_message:text'], (ctx) => {
      this.comandoService.processarComando(ctx);
    });

    void this.bot.start();
  }
}

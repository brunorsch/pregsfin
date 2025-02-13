import { Module } from '@nestjs/common';
import { ComandoService } from './comando.service';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';
import { EntradaModule } from 'src/entradas/entrada.module';

@Module({
  imports: [EntradaModule],
  providers: [ComandoService, TelegramBotService],
})
export class ComandoModule {}

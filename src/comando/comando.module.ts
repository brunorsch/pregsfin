import { InjectionToken, Module, Provider } from '@nestjs/common';
import { ComandoService } from './comando.service';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';
import { EntradaModule } from 'src/entradas/entrada.module';
import { ListarDespesasComando } from './comandos/listar-despesas.comando';

const comandosChatbot: InjectionToken[] = [ListarDespesasComando];

const comandosChatbotProvider: Provider = {
  provide: 'ComandosChatbot',
  useFactory: (...strategies) => strategies,
  inject: [...comandosChatbot],
};

@Module({
  imports: [EntradaModule],
  providers: [ComandoService, TelegramBotService, comandosChatbotProvider],
})
export class ComandoModule {}

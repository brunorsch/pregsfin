import { InjectionToken, Module, Provider } from '@nestjs/common';
import { ComandoService } from './comando.service';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';
import { EntradaModule } from 'src/entradas/entrada.module';
import { ListarDespesasComando } from './comandos/listar-despesas.comando';
import { CriarDespesaComando } from './comandos/criar-despesa.comando';

const comandosChatbot: InjectionToken[] = [
  ListarDespesasComando,
  CriarDespesaComando,
];

const comandosChatbotProvider: Provider = {
  provide: 'ComandosChatbot',
  useFactory: (...strategies) => strategies,
  inject: [...comandosChatbot],
};

@Module({
  imports: [EntradaModule],
  providers: [
    ComandoService,
    TelegramBotService,
    comandosChatbotProvider,
    ListarDespesasComando,
    CriarDespesaComando,
  ],
})
export class ComandoModule {}

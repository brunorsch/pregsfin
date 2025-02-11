import { Module } from '@nestjs/common';
import { EntradaService } from './entrada.service';
import { EntradaController } from './entrada.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cartao } from './data/cartao.entity';
import { Despesa } from './data/depesa.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Despesa, Cartao])],
  providers: [EntradaService],
  controllers: [EntradaController],
})
export class EntradaModule {}

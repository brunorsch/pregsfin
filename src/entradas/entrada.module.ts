import { Module } from '@nestjs/common';
import { EntradaService } from './entrada.service';
import { EntradaController } from './entrada.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cartao } from './data/cartao.entity';
import { Despesa } from './data/depesa.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [MikroOrmModule.forFeature([Despesa, Cartao]), UsuarioModule],
  providers: [EntradaService],
  controllers: [EntradaController],
  exports: [EntradaService],
})
export class EntradaModule {}

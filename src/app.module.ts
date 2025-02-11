import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ComandoModule } from './comando/comando.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntradaModule } from './entradas/entrada.module';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    UsuarioModule,
    ComandoModule,
    EntradaModule,
  ],
})
export class AppModule {}

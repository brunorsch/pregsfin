import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ComandoModule } from './comando/comando.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    UsuarioModule,
    ComandoModule,
  ],
})
export class AppModule {}

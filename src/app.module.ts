import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ComandoModule } from './comando/comando.module';

@Module({
  imports: [UsuarioModule, ComandoModule],
})
export class AppModule {}

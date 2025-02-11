import { Module } from '@nestjs/common';
import { ComandoController } from './comando.controller';
import { ComandoService } from './comando.service';

@Module({
  controllers: [ComandoController],
  providers: [ComandoService],
})
export class ComandoModule {}

import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';

@ApiTags('usuarios')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/identificacao')
  getIdentificacao(@Query('whatsapp') cpf?: string) {
    return this.usuarioService.identificar(cpf);
  }
}

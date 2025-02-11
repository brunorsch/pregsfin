import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { fromUsuario, UsuarioResponseDto } from './dto/usuario-response.dto';

@ApiTags('usuarios')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/identificacao')
  async getIdentificacao(
    @Query('numeroChat') numeroChat?: string,
  ): Promise<UsuarioResponseDto> {
    return fromUsuario(
      await this.usuarioService.identificarPorNumero(numeroChat),
    );
  }
}

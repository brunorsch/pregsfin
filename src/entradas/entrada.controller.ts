import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CriarDespesaRequestDto,
  fromCriarDespesaRequestDto,
} from './dto/criar-despesa-request.dto';
import { EntradaService } from './entrada.service';

@ApiTags('entradas')
@Controller('entrada')
export class EntradaController {
  constructor(private readonly entradaService: EntradaService) {}

  @Post('/despesa')
  @ApiOperation({ summary: 'Cria uma nova despesa' })
  @ApiBody({
    type: CriarDespesaRequestDto,
  })
  async criarDespesa(@Body() body: CriarDespesaRequestDto): Promise<any> {
    const idDespesa = await this.entradaService.criarDespesa(
      body.usuarioId,
      fromCriarDespesaRequestDto(body),
    );

    return {
      idDespesaCriada: idDespesa,
    };
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { CategoriaDespesa } from '../data/categoria-despesa';
import { Despesa } from '../data/depesa.entity';

export class CriarDespesaRequestDto {
  @ApiProperty()
  usuarioId: number;
  @ApiProperty()
  descricao: string;
  @ApiProperty()
  valor: number;
  @ApiProperty()
  categoria: CategoriaDespesa;
  @ApiProperty()
  dataVencimento?: Date;
  @ApiProperty()
  cartaoId?: number;
  @ApiProperty()
  parcelas?: number;
  @ApiProperty()
  dataFimRecorrencia?: Date;
}

export function fromCriarDespesaRequestDto(
  dto: CriarDespesaRequestDto,
): Despesa {
  const despesa = new Despesa();
  despesa.descricao = dto.descricao;
  despesa.valor = dto.valor;
  despesa.categoria = dto.categoria;
  despesa.dataVencimento = dto.dataVencimento;
  despesa.parcelas = dto.parcelas;
  despesa.dataFimRecorrencia = dto.dataFimRecorrencia;
  return despesa;
}

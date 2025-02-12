import { ApiProperty } from '@nestjs/swagger';
import { CategoriaDespesa } from '../data/categoria-despesa';
import { Despesa } from '../data/depesa.entity';
import currency from 'currency.js';
import { IsEnum, IsNumberString, Length, Min, MinDate } from 'class-validator';

export class CriarDespesaRequestDto {
  @ApiProperty()
  usuarioId: number;

  @ApiProperty()
  @Length(1, 250)
  descricao: string;

  @ApiProperty()
  @IsNumberString()
  valor: string;

  @ApiProperty()
  @IsEnum(CategoriaDespesa)
  categoria: CategoriaDespesa;

  @ApiProperty()
  @MinDate(new Date())
  dataVencimento?: Date;

  @ApiProperty()
  @Min(1)
  cartaoId?: number;

  @ApiProperty()
  @Min(2)
  parcelas?: number;

  @ApiProperty()
  @MinDate(new Date(new Date().setMonth(new Date().getMonth() + 1)))
  dataFimRecorrencia?: Date;
}

export function fromCriarDespesaRequestDto(
  dto: CriarDespesaRequestDto,
): Despesa {
  const despesa = new Despesa();
  despesa.descricao = dto.descricao;
  despesa.valor = currency(dto.valor).toString();
  despesa.categoria = dto.categoria;
  despesa.dataVencimento = dto.dataVencimento;
  despesa.parcelas = dto.parcelas;
  despesa.dataFimRecorrencia = dto.dataFimRecorrencia;
  return despesa;
}

import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { SoftDeletable } from 'mikro-orm-soft-delete';
import { Cartao } from './cartao.entity';

@SoftDeletable({
  type: () => Despesa,
  field: 'excluidoEm',
  value: () => new Date(),
})
@Entity({ tableName: 'despesa' })
export class Despesa {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ length: 250 })
  descricao!: string;

  @Property({ columnType: 'decimal(10,2)' })
  valor!: number;

  @Property({ fieldName: 'data_vencimento', nullable: true })
  dataVencimento?: Date;

  @ManyToOne(() => Cartao, { nullable: true, fieldName: 'cartao_id' })
  cartao?: Cartao;

  @Property({ nullable: true })
  parcelas?: number;

  @Property({ fieldName: 'data_fim_recorrencia', nullable: true })
  dataFimRecorrencia?: Date;

  @Property({ fieldName: 'criado_em', default: 'current_timestamp' })
  criadoEm!: Date;

  @Property({ fieldName: 'atualizado_em', onUpdate: () => new Date() })
  atualizadoEm!: Date;

  @Property({ fieldName: 'excluido_em', nullable: true })
  excluidoEm?: Date;
}

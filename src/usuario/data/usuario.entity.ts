import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { SoftDeletable } from 'mikro-orm-soft-delete';

@SoftDeletable({
  type: () => Usuario,
  field: 'excluidoEm',
  value: () => new Date(),
})
@Entity({ tableName: 'usuario' })
export class Usuario {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ fieldName: 'nome_completo' })
  nomeCompleto!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ fieldName: 'numero_chat' })
  numeroChat!: string;

  @Property({ fieldName: 'criado_em', onCreate: () => new Date() })
  criadoEm!: Date;

  @Property({ fieldName: 'atualizado_em', onUpdate: () => new Date() })
  atualizadoEm?: Date;

  @Property({ fieldName: 'excluido_em', nullable: true })
  excluidoEm?: Date;
}

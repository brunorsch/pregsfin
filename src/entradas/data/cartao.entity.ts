import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'cartao' })
export class Cartao {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  nome!: string;
}

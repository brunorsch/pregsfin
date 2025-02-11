import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Usuario } from '../../usuario/data/usuario.entity';

@Entity({ tableName: 'cartao' })
export class Cartao {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  nome!: string;

  @ManyToOne(() => Usuario, { fieldName: 'usuario_id' })
  usuario!: Usuario;
}

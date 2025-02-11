import { Migration } from '@mikro-orm/migrations';

export class Migration20250211215210 extends Migration {
  override async up(): Promise<void> {
    await this.execute(`
      ALTER TABLE despesa
      ADD COLUMN usuario_id INT NOT NULL COMMENT 'ID do usuário que cadastrou a despesa',
      ADD CONSTRAINT fk_despesa_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id);
    `);

    await this.execute(`
      ALTER TABLE cartao
      ADD COLUMN usuario_id INT NOT NULL COMMENT 'ID do usuário dono do cartão',
      ADD CONSTRAINT fk_cartao_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id);
    `);
  }

  override async down(): Promise<void> {
    await this.execute(`
      ALTER TABLE despesa
      DROP FOREIGN KEY fk_despesa_usuario,
      DROP COLUMN usuario_id;
    `);

    await this.execute(`
      ALTER TABLE cartao
      DROP FOREIGN KEY fk_cartao_usuario,
      DROP COLUMN usuario_id;
    `);
  }
}

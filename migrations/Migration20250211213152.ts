import { Migration } from '@mikro-orm/migrations';

export class Migration20250211213152 extends Migration {
  override async up(): Promise<void> {
    await this.execute(`
      ALTER TABLE despesa
      ADD COLUMN categoria ENUM(
        'ALIMENTACAO',
        'TRANSPORTE',
        'MORADIA',
        'LAZER',
        'SAUDE',
        'EDUCACAO',
        'COMPRAS',
        'FINANCAS',
        'OUTROS'
      ) NULL DEFAULT NULL COMMENT 'Categoria da despesa';
    `);
  }

  override async down(): Promise<void> {
    await this.execute(`
      ALTER TABLE despesa
      DROP COLUMN categoria;
    `);
  }
}

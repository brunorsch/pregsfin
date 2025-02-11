import { Migration } from '@mikro-orm/migrations';

/**
 * Criando tabela Usuarios
 */
export class Migration20250211194124 extends Migration {
  override async up(): Promise<void> {
    await this.execute(`
      CREATE TABLE usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        numero_chat VARCHAR(20) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        excluido_em TIMESTAMP NULL DEFAULT NULL
      );
    `);
  }

  override async down(): Promise<void> {
    await this.execute('DROP TABLE usuario;');
  }
}

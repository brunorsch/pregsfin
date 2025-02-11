import { Migration } from '@mikro-orm/migrations';

export class Migration20250211211642 extends Migration {
  override async up(): Promise<void> {
    await this.execute(`
      CREATE TABLE IF NOT EXISTS cartao (
        id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único do cartão',
        nome VARCHAR(255) NOT NULL COMMENT 'Nome do cartão',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de criação do registro',
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data da última atualização',
        excluido_em TIMESTAMP NULL DEFAULT NULL COMMENT 'Data de exclusão lógica (soft delete)'
      );`);

    await this.execute(`
      CREATE TABLE IF NOT EXISTS despesa (
        id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identificador único da despesa',
        descricao VARCHAR(250) NOT NULL COMMENT 'Descrição da despesa',
        valor DECIMAL(10,2) NOT NULL COMMENT 'Valor da despesa',
        data_vencimento DATE NULL DEFAULT NULL COMMENT 'Data de vencimento da despesa (opcional)',
        cartao_id INT NULL DEFAULT NULL COMMENT 'ID do cartão vinculado (opcional)',
        parcelas INT NULL DEFAULT NULL COMMENT 'Número de parcelas (opcional)',
        data_fim_recorrencia DATE NULL DEFAULT NULL COMMENT 'Data de fim da recorrência (opcional)',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de criação do registro',
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data da última atualização',
        excluido_em TIMESTAMP NULL DEFAULT NULL COMMENT 'Data de exclusão lógica (soft delete)',
        CONSTRAINT fk_despesa_cartao FOREIGN KEY (cartao_id) REFERENCES cartao(id) ON DELETE SET NULL
      );`);
  }

  override async down(): Promise<void> {
    await this.execute('DROP TABLE IF EXISTS despesa;');
    await this.execute('DROP TABLE IF EXISTS cartao;');
  }
}

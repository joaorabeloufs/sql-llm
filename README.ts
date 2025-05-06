import { MigrationInterface, QueryRunner } from "typeorm";

export class LockAndNoIndexMigration1622612893832 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Criação de tabela sem índice, que pode gerar lock em grandes operações
    await queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Atualização de dados que pode gerar bloqueio (sem índice para eficiência)
    // Simulando uma atualização de grande volume de registros
    await queryRunner.query(`
      UPDATE users
      SET name = 'Updated Name'
      WHERE created_at < '2025-01-01';
    `);

    // 3. Alteração de tabela (sem índice, pode gerar lock se a tabela for grande)
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN status VARCHAR(50) DEFAULT 'active';
    `);
  }

  public async down(queryRunner:

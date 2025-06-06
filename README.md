import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIndexWithoutConcurrently1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
      CREATE INDEX idx_users_email ON users(email);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX idx_users_email;
    `);
  }
}

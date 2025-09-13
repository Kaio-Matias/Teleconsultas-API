import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConexoesProfissionaisClinicas1720000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE conexoes_profissionais_clinicas (
        id_conexao SERIAL PRIMARY KEY,
        id_profissional INTEGER NOT NULL,
        id_clinica INTEGER NOT NULL,
        status VARCHAR(20) NOT NULL,
        data_convite TIMESTAMP DEFAULT NOW(),
        data_aceite TIMESTAMP,
        mensagem VARCHAR(255),

        CONSTRAINT fk_conexao_clinica FOREIGN KEY (id_clinica)
          REFERENCES clinics(id_clinica) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE conexoes_profissionais_clinicas');
  }
}

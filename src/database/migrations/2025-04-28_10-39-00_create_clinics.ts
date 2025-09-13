/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createClinicsTable1689786456780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE clinics (
        id_clinica SERIAL PRIMARY KEY,
        cnpj VARCHAR(14) UNIQUE NOT NULL,
        nome_fantasia VARCHAR(255) NOT NULL,
        telefone VARCHAR(20),
        email VARCHAR(255) UNIQUE,
        cidade VARCHAR(100) NOT NULL,
        estado VARCHAR(2) NOT NULL,
        especialidades TEXT,
        infraestrutura TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE clinics');
  }
}


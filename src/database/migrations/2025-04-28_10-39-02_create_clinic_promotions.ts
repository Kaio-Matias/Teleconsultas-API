import { MigrationInterface, QueryRunner } from 'typeorm';

export class createClinicPromotionsTable1689786456780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE clinic_promotions (
        id_promocao SERIAL PRIMARY KEY,
        id_clinica INTEGER NOT NULL,
        titulo VARCHAR(100) NOT NULL,
        descricao TEXT NOT NULL,
        validade_inicio DATE NOT NULL,
        validade_fim DATE NOT NULL CHECK (validade_fim >= validade_inicio),
        imagem_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_clinic_promotions_clinic FOREIGN KEY (id_clinica)
          REFERENCES clinics(id_clinica) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE clinic_promotions');
  }
}

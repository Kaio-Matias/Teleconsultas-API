import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDocumentosTable1689786456780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE documentos (
        id_documento SERIAL PRIMARY KEY,
        tipo VARCHAR(50) NOT NULL,
        url_arquivo VARCHAR(255) NOT NULL,
        dt_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        criado_na_plataforma BOOLEAN NOT NULL,

        consulta_id INTEGER NOT NULL,
        profissional_id VARCHAR(11),
        paciente_id VARCHAR(11) NOT NULL,

        visivel_paciente BOOLEAN DEFAULT TRUE,
        observacoes TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_documento_consulta FOREIGN KEY (consulta_id)
          REFERENCES agendamentos_consultas(id_consulta) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE documentos');
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAvaliacoesTable1689786456780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE avaliacoes (
        id_avaliacao SERIAL PRIMARY KEY,
        paciente_cpf VARCHAR(11) NOT NULL,
        consulta_id INT,
        exame_id INT,
        profissional_cpf VARCHAR(11),
        unidade_id VARCHAR(14),
        nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),
        comentario TEXT,
        dt_avaliacao TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_avaliacao_consulta FOREIGN KEY (consulta_id)
          REFERENCES agendamentos_consultas(id_consulta) ON DELETE SET NULL,

        CONSTRAINT fk_avaliacao_exame FOREIGN KEY (exame_id)
          REFERENCES documentos(id_documento) ON DELETE SET NULL,

        CONSTRAINT fk_avaliacao_unidade FOREIGN KEY (unidade_id)
          REFERENCES clinics(cnpj) ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE avaliacoes');
  }
}

/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class createExamAgendamentosTable16897864567801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE exam_agendamentos (
        id_agendamento SERIAL PRIMARY KEY,
        id_usuario_paciente INTEGER NOT NULL,
        id_exame INTEGER NOT NULL,
        data_hora TIMESTAMP NOT NULL,
        status_pagamento VARCHAR(20) DEFAULT 'Pendente',
        lembrete_enviado BOOLEAN DEFAULT FALSE,
        altura_m FLOAT,
        peso_kg FLOAT,
        pressao_sistolica INTEGER,
        pressao_diastolica INTEGER,
        atualizar_minha_saude BOOLEAN DEFAULT FALSE,
        id_pagamento INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_exam_agendamento_exame FOREIGN KEY (id_exame)
          REFERENCES clinic_exams(id_exame) ON DELETE CASCADE,

        CONSTRAINT fk_exam_agendamento_pagamento FOREIGN KEY (id_pagamento)
          REFERENCES exam_payments(id_pagamento) ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE exam_agendamentos');
  }
}

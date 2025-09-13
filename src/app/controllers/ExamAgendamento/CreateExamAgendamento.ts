
import { Request, Response } from 'express';
import { ExamAgendamentoService } from "../../services/ExamAgendamento";

async function createExamAgendamento(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new ExamAgendamentoService();

    const result: any = await getService.createExamAgendamento(body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, message: "Agendamento criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createExamAgendamento;

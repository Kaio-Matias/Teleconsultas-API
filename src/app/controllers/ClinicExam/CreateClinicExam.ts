
import { Request, Response } from 'express';
import { ClinicExamService } from "../../services/ClinicExam";

async function createClinicExam(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new ClinicExamService();

    const result: any = await getService.createClinicExam(body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, message: "Exam criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createClinicExam;

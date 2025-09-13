
import { Request, Response } from 'express';
import { ClinicExamService } from "../../services/ClinicExam";

async function deleteClinicExam(req: Request, res: Response) {
  try {
    const { id } = req.params
    const getService = new ClinicExamService();

    const getId= parseInt(id)

    const result: any = await getService.deleteExam(getId)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default deleteClinicExam;

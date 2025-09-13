
import { Request, Response } from 'express';
import { ClinicService } from "../../services/Clinic";

async function createClinic(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new ClinicService();

    const result: any = await getService.createClinic(body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, message: "Clinica criada com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createClinic;

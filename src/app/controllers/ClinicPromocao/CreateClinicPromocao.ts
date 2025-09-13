
import { Request, Response } from 'express';
import { ClinicPromocaoService } from "../../services/ClinicPromocao";

async function createClinicPromocao(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new ClinicPromocaoService();

    const result: any = await getService.createClinicPromocao(body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, message: "Promoção criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createClinicPromocao;


import { Request, Response } from 'express';
import { AvaliacaoService } from "../../services/Avaliacao";

async function createAvaliacao(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new AvaliacaoService();

    const result: any = await getService.createAvaliacao(body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, message: "Avaliação criada com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createAvaliacao;

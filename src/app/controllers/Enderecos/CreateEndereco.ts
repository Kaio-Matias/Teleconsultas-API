
import { Request, Response } from 'express';
import { EnderecoService } from "../../services/Enderecos";

async function createEndereco(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new EnderecoService();

    const result: any = await getService.createEndereco(body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, message: "Endereco criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createEndereco;

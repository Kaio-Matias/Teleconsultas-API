
import { Request, Response } from 'express';
import { ConexaoProfissionalClinicaService } from "../../services/ConexaoProfissionalClinica";

async function createConexaoProfissionalClinica(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new ConexaoProfissionalClinicaService ();

    const result: any = await getService.createConexaoProfissionalClinica(body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, message: "Conexão criada com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createConexaoProfissionalClinica;


import { Request, Response } from 'express';
import { DocumentService } from "../../services/Document";

async function createDocument(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new DocumentService();

    const result: any = await getService.createDocument({ ...body, consulta: { id_consulta: body.consulta_id }, })

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, message: "Documento criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createDocument;

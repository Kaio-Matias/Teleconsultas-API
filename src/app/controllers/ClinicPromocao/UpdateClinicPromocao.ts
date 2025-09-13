
import { Request, Response } from 'express';
import { ClinicPromocaoService } from "../../services/ClinicPromocao";

async function updateClinicPromocaoService(req: Request, res: Response) {
  try {
    const body = req.body
    const { id } = req.params
    const getService = new ClinicPromocaoService();

    const result: any = await getService.updateClinicPromocao(parseInt(id), body)

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(200).json({ result, message: "Carrinho atualizado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default updateClinicPromocaoService;

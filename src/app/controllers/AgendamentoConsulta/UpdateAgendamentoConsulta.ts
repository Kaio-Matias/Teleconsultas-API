
import { Request, Response } from 'express';
import { AgendamentosConsultaService } from "../../services/Agendamento";

async function updateAgendamentoConsulta(req: Request, res: Response) {
  try {
    const body = req.body
    const { id } = req.params
    const getService = new AgendamentosConsultaService();

    const result: any = await getService.updateAgendamentosConsulta(parseInt(id), body)

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

export default updateAgendamentoConsulta;

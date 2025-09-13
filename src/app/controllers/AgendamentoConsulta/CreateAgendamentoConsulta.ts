
import { Request, Response } from 'express';
import { AgendamentosConsultaService } from "../../services/Agendamento";

import { v4 as uuidv4 } from 'uuid';

async function createAgendamentoConsulta(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new AgendamentosConsultaService();

    const Uuid = await uuidv4();

    const result: any = await getService.createAgendamentosConsulta({ ...body, link_sala: `https://meet.jit.si/${Uuid}`, clinica: { id_clinica: body.id_clinica } })

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, message: "Agendamento criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createAgendamentoConsulta;

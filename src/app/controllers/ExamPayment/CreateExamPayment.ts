
import { Request, Response } from 'express';
import { ExamPaymentService } from "../../services/ExamPayment";
import { MercadoPagoService } from 'src/app/services/APIPayments';

async function createExamPayment(req: Request, res: Response) {
  try {
    const body = req.body
    const getService = new ExamPaymentService();
    const newPaymentService = new MercadoPagoService();

    const result = await newPaymentService.createPayment({ ...req.body, amount: req.body.valor });

    const resultMP = await getService.createExamPayment({ ...body, id_mp_payment: result.id });

    if (result?.message == 'Campos obrigatórios ausentes') {
      return res.status(400).json({ message: result?.message });
    }

    if (result?.message) {
      return res.status(500).json({ message: result?.message });
    }

    return res.status(201).json({ result, resultMP, message: "Pagamento criado com sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default createExamPayment;

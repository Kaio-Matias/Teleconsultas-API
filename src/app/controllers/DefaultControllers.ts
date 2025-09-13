import version from 'project-version';

import { Request, Response } from 'express';
import { MercadoPagoService } from '../services/APIPayments';

async function index(req: Request, res: Response) {
  try {
    const newPaymentService = new MercadoPagoService();

    const pingResponse = await newPaymentService.pingAPI();

    return res.json({ version, pingResponse, message: "API is running successfully" });
  } catch (err) {

    return res.status(400).json({ message: err.message });
  }
}

export default index;

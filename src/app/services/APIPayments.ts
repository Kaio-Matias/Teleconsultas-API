import axios from 'axios';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const MP_BASE_URL = 'https://api.mercadopago.com';
const MP_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN;

const mpAxios = axios.create({
  baseURL: MP_BASE_URL,
  headers: {
    Authorization: `Bearer ${MP_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export class MercadoPagoService {
  async pingAPI() {
    try {
      const response = await mpAxios.get('/v1/payments/search');
      return response.data;
    } catch (error) {
      throw new Error('Credenciais inválidas ou token expirado');
    }
  }

  async createPayment(data: {
    amount: number;
    description: string;
    email: string;
    payment_method_id: string;
    installments?: number;
    token?: string;
    order_id?: string;
    payer?: any;
  }) {
    const body = {
      transaction_amount: data.amount,
      description: data.description,
      payment_method_id: data.payment_method_id,
      payer: data.payer || { email: data.email },
      installments: data.installments ?? 1,
      token: data.token,
      external_reference: data.order_id
    };

    const response = await mpAxios.post('/v1/payments', body, { headers: { 'X-Idempotency-Key': uuidv4(), } })
    return response.data;
  }

  async getPayment(id: string) {
    const response = await mpAxios.get(`/v1/payments/${id}`);
    return response.data;
  }

  async cancelPayment(id: string) {
    const response = await mpAxios.post(`/v1/payments/${id}/cancel`, {}, { headers: { 'X-Idempotency-Key': uuidv4(), } });
    return response.data;
  }
}

import axios from 'axios';
import { WebpayResponse } from '../types';

const WEBPAY_API = import.meta.env.VITE_WEBPAY_API_URL;
const WEBPAY_API_KEY = import.meta.env.VITE_WEBPAY_API_KEY;

const api = axios.create({
  baseURL: WEBPAY_API,
  headers: {
    'Tbk-Api-Key-Id': WEBPAY_API_KEY,
    'Content-Type': 'application/json',
  },
});

export async function initTransaction(amount: number, orderId: string): Promise<WebpayResponse> {
  try {
    const response = await api.post('/transactions', {
      buy_order: orderId,
      session_id: orderId,
      amount,
      return_url: `${window.location.origin}/checkout/confirm`,
    });

    return {
      token: response.data.token,
      url: response.data.url,
    };
  } catch (error) {
    console.error('Webpay transaction initialization failed:', error);
    throw new Error('Failed to initialize payment');
  }
}

export async function getTransactionStatus(token: string): Promise<any> {
  try {
    const response = await api.get(`/transactions/${token}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get transaction status:', error);
    throw new Error('Failed to verify payment status');
  }
}

export async function acknowledgeTransaction(token: string): Promise<void> {
  try {
    await api.put(`/transactions/${token}`);
  } catch (error) {
    console.error('Failed to acknowledge transaction:', error);
    throw new Error('Failed to confirm payment');
  }
}
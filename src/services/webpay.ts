//src/services/wabpay.ts
import axios from 'axios';

import {
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  Environment,
  WebpayPlus
} from "transbank-sdk"


// URL de la API de Webpay desde las variables de entorno
const WEBPAY_API = import.meta.env.VITE_WEBPAY_API_URL;
const WEBPAY_API_KEY = import.meta.env.VITE_WEBPAY_API_KEY;

// Crear una instancia de axios para interactuar con la API
const api = axios.create({
  baseURL: WEBPAY_API,
  headers: {
    'Tbk-Api-Key-Id': WEBPAY_API_KEY,
    'Content-Type': 'application/json',
  },
});




export const initTransaction = async (amount: number, buyOrder: string, returnUrl: string) => {
  try {
    const tx = new WebpayPlus.Transaction(
      new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration)
    );
    const response = await tx.create(buyOrder, buyOrder, amount, returnUrl); // Aquí también se usa buyOrder para sessionId

    // Retorna la respuesta con el token y la URL
    return { token: response.token, url: response.url };
  } catch (error) {
    console.error('Error initiating Webpay transaction', error);
    throw new Error('Webpay transaction initiation failed');
  }
};

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
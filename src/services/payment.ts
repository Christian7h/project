// src/services/payment.ts
import axios from "axios";
const WEBPAY_API_URL_CREATE = import.meta.env.VITE_WEBPAY_API_URL_CREATE;

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export const initiatePayment = async (amount: number, customerInfo: CustomerInfo) => {
  const response = await axios.post(WEBPAY_API_URL_CREATE, {
    amount,
    customerInfo, // Envía los datos del formulario
  });
  return response.data; // Contendrá la URL y token de redirección
};
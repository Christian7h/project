// src/services/payment.ts
import axios from "axios";

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
  const response = await axios.post("https://backend-luxuymotorswebpay-12684bc9e3bd.herokuapp.com/api/create-transaction", {
    amount,
    customerInfo, // Envía los datos del formulario
  });
  return response.data; // Contendrá la URL y token de redirección
};


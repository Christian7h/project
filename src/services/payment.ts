//src/services/payment.ts front end
import axios from 'axios';

export const initiatePayment = async (amount: number) => {
  const response = await axios.post('http://localhost:3000/api/create-transaction', {
    amount,
  });
  return response.data; // Contendrá la URL y token de redirección
};

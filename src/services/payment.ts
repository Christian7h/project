  //src/services/payment.ts front end
  import axios from 'axios';

  export const initiatePayment = async (amount: number) => {
    const response = await axios.post('https://backend-luxurymotors-react-nodejs-webpay.onrender.com/api/create-transaction', {
      amount,
    });
    return response.data; // Contendrá la URL y token de redirección
  };

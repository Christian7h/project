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
interface CartItem {
  vehicleId: string;
  quantity: number;
  vehicle: {
    id: string;
    name: string;
    price: string;
    image: string;
  };
}
export const initiatePayment = async (amount: number, customerInfo: CustomerInfo, cartItems: CartItem[]) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await axios.post(
      "https://backend-luxuymotorswebpay-12684bc9e3bd.herokuapp.com/api/create-transaction",
      {
        amount,
        customerInfo,
        cartItems
      },
      {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Payment initiation failed: ${error.message}`);
    }
    throw error;
  }
};

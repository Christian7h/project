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
export const initiatePayment = async (
  amount: number, 
  customerInfo: CustomerInfo, 
  cartItems: CartItem[],
  subtotal?: number,
  discount?: number,
  couponCode?: string
) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    const API_URL = import.meta.env.BACKEND_URL_API || "http://localhost:3000";

    const response = await axios.post(
      `${API_URL}/api/create-transaction`,
      {
        amount,
        customerInfo,
        cartItems,
        subtotal,
        discount,
        couponCode
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

export const initiateMercadoPagoPayment = async (
  amount: number,
  customerInfo: CustomerInfo,
  cartItems: CartItem[],
  subtotal?: number,
  discount?: number,
  couponCode?: string
) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    const API_URL = import.meta.env.BACKEND_URL_API || "http://localhost:3000";

    // Limpiar cartItems
    const sanitizedCartItems = cartItems.map(item => ({
      vehicleId: item.vehicleId,
      quantity: item.quantity,
      vehicle: {
        id: item.vehicle.id,
        name: item.vehicle.name,
        price: item.vehicle.price,
        image: item.vehicle.image
      }
    }));

    const response = await axios.post(
      `${API_URL}/api/create-mercado-pago-transaction`,
      {
        amount,
        customerInfo,
        cartItems: sanitizedCartItems,
        subtotal,
        discount,
        couponCode
      },
      {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );
console.log("🛒 Enviando a backend:", {
  amount,
  customerInfo,
  cartItems: sanitizedCartItems
});
    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Mercado Pago payment initiation failed: ${error.message}`);
    }
    throw error;
  }
};

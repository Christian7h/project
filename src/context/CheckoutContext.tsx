import React, { createContext, useContext, useState } from 'react';
import { CustomerInfo, Transaction } from '../types';
import { useCart } from './CartContext';
import { initTransaction, getTransactionStatus, acknowledgeTransaction } from '../services/webpay';

interface CheckoutContextType {
  customerInfo: CustomerInfo | null;
  setCustomerInfo: (info: CustomerInfo) => void;
  currentTransaction: Transaction | null;
  initiateCheckout: () => Promise<void>;
  confirmPayment: (token: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items, getSubtotal, clearCart } = useCart();

  const generateOrderId = () => {
    return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const initiateCheckout = async () => {
    if (!customerInfo) {
      throw new Error('Customer information is required');
    }

    setIsLoading(true);
    setError(null);

    try {
      const orderId = generateOrderId();
      const amount = getSubtotal();

      const { token, url } = await initTransaction(amount, orderId);

      const transaction: Transaction = {
        id: token,
        orderId,
        amount,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customerInfo,
        items: [...items],
      };

      setCurrentTransaction(transaction);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmPayment = async (token: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const status = await getTransactionStatus(token);
      
      if (status.status === 'AUTHORIZED') {
        await acknowledgeTransaction(token);
        
        setCurrentTransaction(prev => 
          prev ? { ...prev, status: 'completed', updatedAt: new Date().toISOString() } : null
        );
        
        clearCart();
      } else {
        throw new Error('Payment was not authorized');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment confirmation failed');
      setCurrentTransaction(prev => 
        prev ? { ...prev, status: 'failed', updatedAt: new Date().toISOString() } : null
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutContext.Provider value={{
      customerInfo,
      setCustomerInfo,
      currentTransaction,
      initiateCheckout,
      confirmPayment,
      isLoading,
      error,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
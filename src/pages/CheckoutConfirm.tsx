import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function CheckoutConfirm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { confirmPayment, currentTransaction, isLoading, error } = useCheckout();

  useEffect(() => {
    const token = searchParams.get('token_ws');
    if (token) {
      confirmPayment(token);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-bmw-blue mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Confirming your payment...</h2>
          <p className="text-gray-500">Please wait while we verify your transaction.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Payment Failed</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (currentTransaction?.status === 'completed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-2">
            Order ID: {currentTransaction.orderId}
          </p>
          <p className="text-gray-500 mb-6">
            A confirmation email has been sent to {currentTransaction.customerInfo.email}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
}
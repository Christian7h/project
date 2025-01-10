//src/pages/checkoutconfirm.tsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useCart } from '../context/CartContext';  // Asegúrate de importar el hook
import axios from 'axios';

export default function CheckoutConfirm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useLanguage(); // Obtener el idioma desde el contexto
  const { clearCart } = useCart();  // Obtén la función clearCart

  // Estados para manejar el proceso
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<{
    status: string;
    orderId: string;
    amount: number;
    customerInfo: {
      customerName: string;
      customerEmail: string;
      address: string;
      cardLast4Digits: string;
    };
  } | null>(null);

  useEffect(() => {
    const token = searchParams.get('token_ws');
    if (!token) {
      setError('No payment token found.');
      setIsLoading(false);
      return;
    }

    const confirmPayment = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post('https://backend-luxurymotors-react-nodejs-webpay.onrender.com/api/confirm-transaction', {
          token,
        });
        setPaymentResult(response.data); // Asume que el backend devuelve { status, orderId, amount, customerInfo }
        console.log('Payment confirmation response:', response.data);
      } catch (err) {
        setError('Failed to confirm the payment. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams]);
  

 // Mostrar la pantalla de carga
 if (isLoading) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-bmw-blue mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">

      {language === 'es' ? 'Confirmando su pago...' : 'Confirming your payment...'}
          
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
      {language === 'es' ? 'Por favor espere mientras verificamos su transacción.' : 'Please wait while we verify your transaction.'}
        </p>
      </div>
    </div>
  );
}

// Mostrar el error
if (error) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
      {language === 'es' ? 'Pago fallido' : 'Payment Failed'}
          </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
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

// Mostrar cuando el pago ha sido autorizado
if (paymentResult?.status === 'AUTHORIZED') {
  const { customerName, customerEmail, address, cardLast4Digits } = paymentResult.customerInfo;
  clearCart();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
      {language === 'es' ? 'Pago exitoso!' : 'Payment Successful!'}
          </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{language === 'es' ? 'Orden ID:' : 'Order ID:'}{paymentResult.orderId}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{language === 'es' ? 'Monto: $' : 'Amount: $'}{paymentResult.amount}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{language === 'es' ? 'Nombre: ' : 'Name: '}{paymentResult.customerInfo.customerName}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{language === 'es' ? 'Email: ' : 'Email: '}{customerEmail}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{language === 'es' ? 'Dirección: ' : 'Address: '}{address}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">{language === 'es' ? 'Tarjeta: ' : 'Card: '} **** **** **** {cardLast4Digits}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
        {language === 'es' ? 'Se ha enviado un correo electrónico de confirmación a' : 'A confirmation email has been sent to '}
           {customerEmail}.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
        >
          {language === 'es' ? 'Regresar al Inicio' : 'Return to Home'}
          
        </button>
      </div>
    </div>
  );
}

// Mostrar cuando haya un error inesperado
return (
  <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
    <div className="text-center">
      <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Unexpected Error</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Please contact support if the issue persists.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
      >
        Return to Home
      </button>
    </div>
  </div>
);
};
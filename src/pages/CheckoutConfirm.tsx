import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { sendEmail } from "../services/send-email";
import Confetti from "react-confetti";
import { useWindowSize } from 'react-use';

// Interfaces TypeScript
interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface CartItem {
  vehicleId: string;
  quantity: number;
  vehicle: {
    name: string;
    price: string;
    image: string;
  };
}

interface PaymentResult {
  status: string;
  orderId: string;
  amount: number;
  cardLast4Digits: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: Address;
  };
  cartItems: CartItem[];
}

// Componentes reutilizables
const ConfettiWrapper = ({ show, width, height }: { 
  show: boolean; 
  width: number; 
  height: number 
}) => (
  show && (
    <Confetti
      width={width - 20}
      height={height}
      numberOfPieces={200}
      recycle={false}
      gravity={0.1}
    />
  )
);

const LoadingState = ({ language }: { language: string }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-bmw-blue mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {language === "es" ? "Confirmando su pago..." : "Confirming your payment..."}
      </h2>
    </div>
  </div>
);

const ErrorState = ({ error, language, onRetry }: { 
  error: string; 
  language: string; 
  onRetry: () => void 
}) => (
  <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
    <div className="text-center">
      <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {language === "es" ? "Pago fallido" : "Payment Failed"}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
      >
        {language === "es" ? "Intentar nuevamente" : "Try Again"}
      </button>
    </div>
  </div>
);

const OrderDetailItem = ({ label, value }: { label: string; value?: string | number }) => (
  <p className="text-gray-700 dark:text-gray-300">
    <span className="font-semibold">{label}</span>
    {value || "-"}
  </p>
);

const ProductItem = ({ item, language }: { item: CartItem; language: string }) => {
  const totalPrice = parseInt(item.vehicle.price) * item.quantity;
  
  return (
    <div className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg ">
      <img
        src={item.vehicle.image}
        alt={item.vehicle.name}
        className="w-16 h-16 object-cover rounded mr-4"
        loading="lazy"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white">{item.vehicle.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {language === "es" ? "Cantidad" : "Quantity"}: {item.quantity}
        </p>
        <p className="text-bmw-blue dark:text-bmw-blue">
          {new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
            style: "currency",
            currency: "CLP"
          }).format(totalPrice)}
        </p>
      </div>
    </div>
  );
};

export default function CheckoutConfirm() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const hasClearedCart = useRef(false);

  // Lógica de confirmación de pago
  useEffect(() => {
    const token = searchParams.get("token_ws");
    if (!token) {
      setError(language === "es" ? "Token de pago no encontrado." : "No payment token found.");
      setIsLoading(false);
      return;
    }

    const confirmPayment = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(`https://backend-luxuymotorswebpay-12684bc9e3bd.herokuapp.com/api/confirm-transaction`, { token });
        setPaymentResult(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(language === "es" 
          ? `Error al confirmar el pago: ${errorMessage}`
          : `Failed to confirm payment: ${errorMessage}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams, language]);

  // Lógica de email y limpieza del carrito
  useEffect(() => {
    if (paymentResult?.status === "AUTHORIZED" && !hasClearedCart.current) {
      const handleSuccess = async () => {
        const emailSentKey = `email_sent_${paymentResult.orderId}`;
        if (!localStorage.getItem(emailSentKey)) {
          try {
            await sendEmail({
              to: paymentResult.customerInfo.email,
              subject: language === "es" ? "Confirmación de Pago" : "Payment Confirmation",
              firstName: paymentResult.customerInfo.firstName,
              orderId: paymentResult.orderId,
              amount: paymentResult.amount,
            });
            localStorage.setItem(emailSentKey, 'true');
          } catch (error) {
            console.error(language === "es" 
              ? "Error al enviar correo de confirmación:" 
              : "Failed to send confirmation email:", error);
          }
        }

        setShowConfetti(true);
        clearCart();
        hasClearedCart.current = true;
        setTimeout(() => setShowConfetti(false), 5000);
      };

      handleSuccess();
    }
  }, [paymentResult, clearCart, language]);

  if (isLoading) return <LoadingState language={language} />;
  if (error) return <ErrorState error={error} language={language} onRetry={() => navigate("/checkout")} />;

  if (paymentResult?.status === "AUTHORIZED") {
    const { customerInfo, cartItems } = paymentResult;
    const formattedAmount = new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
      style: "currency",
      currency: "CLP"
    }).format(paymentResult.amount);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <ConfettiWrapper show={showConfetti} width={width} height={height} />
        
        <div className="text-center max-w-2xl w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mt-24">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {language === "es" ? "¡Pago exitoso!" : "Payment Successful!"}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {language === "es"
              ? "Gracias por tu compra. Hemos enviado un correo de confirmación a:"
              : "Thank you for your purchase. A confirmation email has been sent to:"}{" "}
            <span className="font-semibold text-bmw-blue">{customerInfo.email}</span>
          </p>

          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-left space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {language === "es" ? "Detalles de la orden" : "Order Details"}
            </h3>

            <div className="space-y-2">
              <OrderDetailItem 
                label={language === "es" ? "Orden ID:" : "Order ID:"} 
                value={paymentResult.orderId}
              />
              <OrderDetailItem 
                label={language === "es" ? "Monto:" : "Amount:"} 
                value={formattedAmount}
              />
              <OrderDetailItem 
                label={language === "es" ? "Nombre:" : "Name:"} 
                value={`${customerInfo.firstName} ${customerInfo.lastName}`}
              />
              <OrderDetailItem 
                label={language === "es" ? "Teléfono:" : "Phone:"} 
                value={customerInfo.phone}
              />
              <OrderDetailItem 
                label={language === "es" ? "Dirección:" : "Address:"} 
                value={`${customerInfo.address.street}, ${customerInfo.address.city}, ${customerInfo.address.state}, ${customerInfo.address.zipCode}`}
              />
              <OrderDetailItem 
                label={language === "es" ? "Tarjeta:" : "Card:"} 
                value={`**** **** **** ${paymentResult.cardLast4Digits}`}
              />
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-6 justify-items-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {language === "es" ? "Productos comprados" : "Purchased Products"}
            </h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <ProductItem key={item.vehicleId} item={item} language={language} />
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
          >
            {language === "es" ? "Regresar al Inicio" : "Return to Home"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorState 
      error={language === "es" 
        ? "Error desconocido. Por favor contacte al soporte." 
        : "Unknown error. Please contact support."
      } 
      language={language} 
      onRetry={() => navigate("/")}
    />
  );
}
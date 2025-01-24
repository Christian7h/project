import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { sendEmail } from "../services/send-email";
import Confetti from "react-confetti";
import { useWindowSize } from 'react-use';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';

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
const VoucherPDF = ({ paymentResult, language }: { 
  paymentResult: PaymentResult;
  language: string;
}) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Luxury Motors - {language === 'es' ? 'Comprobante de Pago' : 'Payment Receipt'}</Text>
        
        <Text style={styles.subHeader}>
          {language === 'es' ? 'Detalles de la Transacción' : 'Transaction Details'}
        </Text>
        
        <View style={styles.grid}>
          <Text>{language === 'es' ? 'Orden ID: ' : 'Order ID: '}</Text>
          <Text>{paymentResult.orderId}</Text>
          
          <Text>{language === 'es' ? 'Fecha: ' : 'Date: '}</Text>
          <Text>{new Date().toLocaleDateString()}</Text>
          
          <Text>{language === 'es' ? 'Monto Total:' : 'Total Amount:'}</Text>
          <Text>{new Intl.NumberFormat(language === 'es' ? 'es-CL' : 'en-US', {
            style: 'currency',
            currency: 'CLP'
          }).format(paymentResult.amount)}</Text>
        </View>

        <Text style={styles.subHeader}>
          {language === 'es' ? 'Información del Cliente' : 'Customer Information'}
        </Text>
        
        <Text>{paymentResult.customerInfo.firstName} {paymentResult.customerInfo.lastName}</Text>
        <Text>{paymentResult.customerInfo.email}</Text>
        <Text>{paymentResult.customerInfo.phone}</Text>
        
        <Text style={styles.address}>
          {paymentResult.customerInfo.address.street}, 
          {paymentResult.customerInfo.address.city}, 
          {paymentResult.customerInfo.address.state}, 
          {paymentResult.customerInfo.address.zipCode}
        </Text>

        <Text style={styles.subHeader}>
          {language === 'es' ? 'Productos Adquiridos' : 'Purchased Items'}
        </Text>
        
        {paymentResult.cartItems.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.vehicle.name}</Text>
            <Text>{language === 'es' ? 'Cantidad:' : 'Quantity:'} {item.quantity}</Text>
            <Text>{new Intl.NumberFormat(language === 'es' ? 'es-CL' : 'en-US', {
              style: 'currency',
              currency: 'CLP'
            }).format(parseInt(item.vehicle.price) * item.quantity)}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
// Añade estos estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a365d'
  },
  subHeader: {
    fontSize: 18,
    marginVertical: 15,
    color: '#2d3748'
  },
  grid: {
    display: 'flex',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 10,
    marginBottom: 15
  },
  item: {
    marginVertical: 8,
    paddingBottom: 8,
    borderBottom: '1px solid #e2e8f0'
  },
  address: {
    marginVertical: 10,
    color: '#4a5568'
  }
});
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
      const API_URL = import.meta.env.BACKEND_URL_API || "http://localhost:3000";
      try {
        setIsLoading(true);
        const { data } = await axios.post(`${API_URL}/api/confirm-transaction`, { token });
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
              cartItems:paymentResult.cartItems
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
            <div className={`grid ${cartItems.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'} gap-4`}>
              {cartItems.map((item) => (
                <ProductItem key={item.vehicleId} item={item} language={language} />
              ))}
            </div>
          </div>
          <div className="flex gap-4 justify-center mt-6">
        <PDFDownloadLink
          document={<VoucherPDF paymentResult={paymentResult} language={language} />}
          fileName={`voucher-${paymentResult.orderId}.pdf`}
          className="bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {language === 'es' ? 'Descargar Voucher' : 'Download Voucher'}
        </PDFDownloadLink>
        
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {language === "es" ? "Regresar al Inicio" : "Return to Home"}
        </button>
      </div>
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
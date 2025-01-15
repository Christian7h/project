
// src/pages/checkoutconfirm.tsx
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { sendEmail } from "../services/send-email";

export default function CheckoutConfirm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<{
    status: string;
    orderId: string;
    amount: number;
    cardLast4Digits: string;
    customerInfo: {
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
    };
  } | null>(null);

  const hasClearedCart = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token_ws");
    if (!token) {
      setError("No payment token found.");
      setIsLoading(false);
      return;
    }
    const confirmPayment = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("https://backend-luxurymotors-react-nodejs-webpay.onrender.com/api/confirm-transaction", {
          token,
        });
        setPaymentResult(response.data);
        console.log("Response data:", response.data); // Depuración
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(`Failed to confirm the payment: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };
    confirmPayment();
  }, [searchParams]);

  useEffect(() => {
    if (paymentResult?.status === "AUTHORIZED" && !hasClearedCart.current) {
      const sendConfirmationEmail = async () => {
        try {
          await sendEmail({
            to: paymentResult.customerInfo?.email,
            subject: "Payment Confirmation",
            firstName: paymentResult.customerInfo?.firstName,
            orderId: paymentResult.orderId,
            amount: paymentResult.amount,
          });
          console.log("Confirmation email sent successfully!");
        } catch (error) {
          console.error("Failed to send confirmation email:", error);
        }
      };
      clearCart();
      hasClearedCart.current = true;
      sendConfirmationEmail();
    }
  }, [paymentResult, clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-bmw-blue mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {language === "es" ? "Confirmando su pago..." : "Confirming your payment..."}
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {language === "es" ? "Pago fallido" : "Payment Failed"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (paymentResult?.status === "AUTHORIZED") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center max-w-2xl w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {language === "es" ? "¡Pago exitoso!" : "Payment Successful!"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {language === "es"
              ? "Gracias por tu compra. Hemos enviado un correo de confirmación a:"
              : "Thank you for your purchase. A confirmation email has been sent to:"}{" "}
            <span className="font-semibold text-bmw-blue">
              {paymentResult.customerInfo?.email}
            </span>
            
          </p>

          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-left space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {language === "es" ? "Detalles de la orden" : "Order Details"}
            </h3>

            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">
                  {language === "es" ? "Orden ID:" : "Order ID:"}{" "}
                </span>
                {paymentResult.orderId}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">
                  {language === "es" ? "Monto:" : "Amount:"}{" "}
                </span>
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(paymentResult.amount)}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">
                  {language === "es" ? "Nombre:" : "Name:"}{" "}
                </span>
                {paymentResult.customerInfo?.firstName}{" "}
                {paymentResult.customerInfo?.lastName}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">
                  {language === "es" ? "Teléfono:" : "Phone:"}{" "}
                </span>
                {paymentResult.customerInfo?.phone}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">
                  {language === "es" ? "Dirección:" : "Address:"}{" "}
                </span>
                {paymentResult.customerInfo?.address.street},{" "}
                {paymentResult.customerInfo?.address.city},{" "}
                {paymentResult.customerInfo?.address.state},{" "}
                {paymentResult.customerInfo?.address.zipCode}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">
                  {language === "es" ? "Tarjeta:" : "Card:"}{" "}
                </span>
                **** **** **** {paymentResult.cardLast4Digits}
              </p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          Unexpected Error
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Please contact support if the issue persists.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
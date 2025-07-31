import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { sendEmail } from "../services/send-email";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
    id: string;
    name: string;
    price: string;
    image: string;
  };
}

interface PaymentResult {
  status: string;
  orderId: string;
  amount: number;
  subtotal?: number;  // Monto antes del descuento
  discount?: number;  // Descuento aplicado
  couponCode?: string; // Código de cupón usado
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
const ConfettiWrapper = ({
  show,
  width,
  height,
}: {
  show: boolean;
  width: number;
  height: number;
}) =>
  show && (
    <Confetti
      width={width - 20}
      height={height}
      numberOfPieces={200}
      recycle={false}
      gravity={0.1}
    />
  );

const VoucherPDF = ({
  paymentResult,
  language,
}: {
  paymentResult: PaymentResult;
  language: string;
}) => {
  // Calcular subtotal si no viene en los datos
  const subtotal = paymentResult.subtotal || 
    paymentResult.cartItems.reduce((total, item) => 
      total + (parseInt(item.vehicle.price) * item.quantity), 0
    );
  
  const discount = paymentResult.discount || 0;
  const finalAmount = paymentResult.amount;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Image style={styles.logo} src="https://project-d61.pages.dev/luxury-logo.svg" />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 8, color: "#64748b" }}>
              {new Date().toLocaleDateString(language === "es" ? "es-CL" : "en-US")}
            </Text>
            <Text style={{ fontSize: 8, color: "#64748b" }}>
              {language === "es" ? "Orden ID: " : "Order ID: "}
              {paymentResult.orderId}
            </Text>
          </View>

          <Text style={styles.header}>
            Luxury Cars - {language === "es" ? "COMPROBANTE DE COMPRA" : "PURCHASE RECEIPT"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
            }}
          >
            <View style={{ width: "48%" }}>
              <Text style={styles.subHeader}>
                {language === "es" ? "INFORMACIÓN DEL CLIENTE" : "CUSTOMER INFORMATION"}
              </Text>
              <Text style={styles.customerInfo}>
                {paymentResult.customerInfo.firstName}{" "}
                {paymentResult.customerInfo.lastName}
              </Text>
              <Text style={styles.customerInfo}>{paymentResult.customerInfo.email}</Text>
              <Text style={styles.customerInfo}>{paymentResult.customerInfo.phone}</Text>
            </View>

            <View style={{ width: "48%" }}>
              <Text style={styles.subHeader}>
                {language === "es" ? "DETALLES DE PAGO" : "PAYMENT DETAILS"}
              </Text>
              <Text style={styles.customerInfo}>
                {language === "es" ? "Método: " : "Method: "}**** **** **** {paymentResult.cardLast4Digits}
              </Text>
              <Text style={{ marginTop: 8, ...styles.customerInfo }}>
                {language === "es" ? "Estado: " : "Status: "}
                <Text style={{ color: "#16a34a", fontFamily: "Helvetica-Bold" }}>
                  {language === "es" ? "APROBADO" : "APPROVED"}
                </Text>
              </Text>
            </View>
          </View>

          {/* Dirección de Delivery */}
          <View style={styles.deliverySection}>
            <Text style={styles.subHeader}>
              {language === "es" ? "DIRECCIÓN DE ENTREGA" : "DELIVERY ADDRESS"}
            </Text>
            <Text style={styles.address}>
              {paymentResult.customerInfo.address.street}
            </Text>
            <Text style={styles.address}>
              {paymentResult.customerInfo.address.city}, {paymentResult.customerInfo.address.state}
            </Text>
            <Text style={styles.address}>
              {language === "es" ? "Código Postal: " : "Zip Code: "}{paymentResult.customerInfo.address.zipCode}
            </Text>
          </View>

          {/* Resumen Financiero */}
          <View style={styles.financialSummary}>
            <Text style={styles.subHeader}>
              {language === "es" ? "RESUMEN FINANCIERO" : "FINANCIAL SUMMARY"}
            </Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {language === "es" ? "Subtotal:" : "Subtotal:"}
              </Text>
              <Text style={styles.summaryValue}>
                {new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
                  style: "currency",
                  currency: "CLP",
                }).format(subtotal)}
              </Text>
            </View>

            {discount > 0 && (
              <>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>
                    {language === "es" ? "Descuento" : "Discount"}
                    {paymentResult.couponCode && ` (${paymentResult.couponCode})`}:
                  </Text>
                  <Text style={[styles.summaryValue, { color: "#dc2626" }]}>
                    -{new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
                      style: "currency",
                      currency: "CLP",
                    }).format(discount)}
                  </Text>
                </View>
                <View style={styles.summaryDivider} />
              </>
            )}

            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { fontFamily: "Helvetica-Bold", fontSize: 12 }]}>
                {language === "es" ? "TOTAL PAGADO:" : "TOTAL PAID:"}
              </Text>
              <Text style={[styles.summaryValue, { fontFamily: "Helvetica-Bold", fontSize: 12, color: "#16a34a" }]}>
                {new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
                  style: "currency",
                  currency: "CLP",
                }).format(finalAmount)}
              </Text>
            </View>
          </View>

          <Text style={styles.subHeader}>
            {language === "es" ? "VEHÍCULOS ADQUIRIDOS" : "PURCHASED VEHICLES"}
          </Text>
          <View style={styles.grid}>
            {paymentResult.cartItems.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
                  {item.vehicle.name}
                </Text>
                <Text style={styles.itemDetail}>
                  {language === "es" ? "Cantidad: " : "Quantity: "}
                  {item.quantity}
                </Text>
                <Text style={styles.itemDetail}>
                  {language === "es" ? "Precio unitario: " : "Unit price: "}
                  {new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
                    style: "currency",
                    currency: "CLP",
                  }).format(parseInt(item.vehicle.price))}
                </Text>
                <Text style={[styles.itemDetail, { fontFamily: "Helvetica-Bold", color: "#1a365d" }]}>
                  {language === "es" ? "Subtotal: " : "Subtotal: "}
                  {new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
                    style: "currency",
                    currency: "CLP",
                  }).format(parseInt(item.vehicle.price) * item.quantity)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Luxury Cars - Concesionario Premium</Text>
            <Text style={styles.footerText}>Av. Nueva Costanera 3737, Vitacura, Santiago</Text>
            <Text style={styles.footerText}>contacto@luxurymotors.cl - +56 2 2345 6789</Text>
            <Text style={[styles.footerText, { marginTop: 8, fontStyle: "italic" }]}>
              {language === "es" 
                ? "Gracias por confiar en nosotros para su vehículo de lujo"
                : "Thank you for trusting us with your luxury vehicle"
              }
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#f8fafc",
    fontSize: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    color: "#1a365d",
    borderBottom: "2px solid #1a365d",
    paddingBottom: 8,
    fontFamily: "Helvetica-Bold",
  },
  subHeader: {
    fontSize: 12,
    marginVertical: 8,
    color: "#1a365d",
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#e2e8f0",
    padding: 6,
    borderRadius: 4,
  },
  customerInfo: {
    fontSize: 10,
    marginBottom: 3,
    color: "#374151",
  },
  deliverySection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    borderLeft: "3px solid #1a365d",
  },
  financialSummary: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
    border: "1px solid #d1d5db",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 10,
    color: "#374151",
    flex: 1,
  },
  summaryValue: {
    fontSize: 10,
    color: "#1a365d",
    fontFamily: "Helvetica",
    textAlign: "right",
  },
  summaryDivider: {
    borderTop: "1px solid #d1d5db",
    marginVertical: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  item: {
    marginVertical: 5,
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    width: "48%",
    fontSize: 9,
  },
  itemDetail: {
    fontSize: 9,
    marginBottom: 2,
    color: "#6b7280",
  },
  address: {
    marginBottom: 4,
    color: "#4a5568",
    fontSize: 10,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logo: {
    width: 80,
    height: 40,
    marginBottom: 15,
    alignSelf: "center",
  },
  footer: {
    marginTop: 20,
    paddingTop: 15,
    borderTop: "2px solid #1a365d",
    textAlign: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#64748b",
    marginBottom: 2,
    textAlign: "center",
  },
});

const LoadingState = ({ language }: { language: string }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-bmw-blue mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {language === "es"
          ? "Confirmando su pago..."
          : "Confirming your payment..."}
      </h2>
    </div>
  </div>
);

const ErrorState = ({
  error,
  language,
  onRetry,
}: {
  error: string;
  language: string;
  onRetry: () => void;
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

const OrderDetailItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <p className="text-gray-700 dark:text-gray-300">
    <span className="font-semibold">{label}</span>
    {value || "-"}
  </p>
);

const ProductItem = ({
  item,
  language,
}: {
  item: CartItem;
  language: string;
}) => {
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
        <h4 className="font-medium text-gray-900 dark:text-white">
          {item.vehicle.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {language === "es" ? "Cantidad" : "Quantity"}: {item.quantity}
        </p>
        <p className="text-bmw-blue dark:text-bmw-blue">
          {new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
            style: "currency",
            currency: "CLP",
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
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
    null
  );
  const hasClearedCart = useRef(false);

  // Lógica de confirmación de pago
  useEffect(() => {
    const token = searchParams.get("token_ws");
    if (!token) {
      setError(
        language === "es"
          ? "Token de pago no encontrado."
          : "No payment token found."
      );
      setIsLoading(false);
      return;
    }

    const confirmPayment = async () => {
      const API_URL =
        import.meta.env.BACKEND_URL_API || "http://localhost:3000";
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          `${API_URL}/api/confirm-transaction`,
          { token }
        );
        setPaymentResult(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(
          language === "es"
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
            // Calcular subtotal si no viene en los datos
            const calculatedSubtotal = paymentResult.subtotal || 
              paymentResult.cartItems.reduce((total, item) => 
                total + (parseInt(item.vehicle.price) * item.quantity), 0
              );

            await sendEmail({
              to: paymentResult.customerInfo.email,
              subject:
                language === "es"
                  ? "Confirmación de Pago - Luxury Cars"
                  : "Payment Confirmation - Luxury Cars",
              firstName: paymentResult.customerInfo.firstName,
              orderId: paymentResult.orderId,
              amount: paymentResult.amount,
              cartItems: paymentResult.cartItems,
              subtotal: calculatedSubtotal,
              discount: paymentResult.discount,
              couponCode: paymentResult.couponCode,
            });
            localStorage.setItem(emailSentKey, "true");
          } catch (error) {
            console.error(
              language === "es"
                ? "Error al enviar correo de confirmación:"
                : "Failed to send confirmation email:",
              error
            );
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
  if (error)
    return (
      <ErrorState
        error={error}
        language={language}
        onRetry={() => navigate("/checkout")}
      />
    );

  if (paymentResult?.status === "AUTHORIZED") {
    const { customerInfo, cartItems } = paymentResult;
    
    // Calcular subtotal si no viene en los datos
    const subtotal = paymentResult.subtotal || 
      cartItems.reduce((total, item) => 
        total + (parseInt(item.vehicle.price) * item.quantity), 0
      );
    
    const discount = paymentResult.discount || 0;
    const finalAmount = paymentResult.amount;
    
    const formatCurrency = (amount: number) => 
      new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
        style: "currency",
        currency: "CLP",
      }).format(amount);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <ConfettiWrapper show={showConfetti} width={width} height={height} />

        <div className="text-center max-w-3xl w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mt-24">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {language === "es" ? "¡Pago exitoso!" : "Payment Successful!"}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {language === "es"
              ? "Gracias por tu compra. Hemos enviado un correo de confirmación a:"
              : "Thank you for your purchase. A confirmation email has been sent to:"}{" "}
            <span className="font-semibold text-bmw-blue">
              {customerInfo.email}
            </span>
          </p>

          {/* Resumen Financiero */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {language === "es" ? "Resumen de Pago" : "Payment Summary"}
            </h3>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">
                  {language === "es" ? "Subtotal:" : "Subtotal:"}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              
              {discount > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      {language === "es" ? "Descuento" : "Discount"}
                      {paymentResult.couponCode && ` (${paymentResult.couponCode})`}:
                    </span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      -{formatCurrency(discount)}
                    </span>
                  </div>
                  <hr className="border-gray-300 dark:border-gray-500" />
                </>
              )}
              
              <div className="flex justify-between items-center text-lg">
                <span className="font-bold text-gray-900 dark:text-white">
                  {language === "es" ? "Total Pagado:" : "Total Paid:"}
                </span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(finalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Detalles de la orden */}
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-left space-y-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {language === "es" ? "Detalles de la orden" : "Order Details"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <OrderDetailItem
                  label={language === "es" ? "Orden ID:" : "Order ID:"}
                  value={paymentResult.orderId}
                />
                <OrderDetailItem
                  label={language === "es" ? "Nombre:" : "Name:"}
                  value={`${customerInfo.firstName} ${customerInfo.lastName}`}
                />
                <OrderDetailItem
                  label={language === "es" ? "Teléfono:" : "Phone:"}
                  value={customerInfo.phone}
                />
              </div>
              
              <div className="space-y-2">
                <OrderDetailItem
                  label={language === "es" ? "Email:" : "Email:"}
                  value={customerInfo.email}
                />
                <OrderDetailItem
                  label={language === "es" ? "Tarjeta:" : "Card:"}
                  value={`**** **** **** ${paymentResult.cardLast4Digits}`}
                />
                <div className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">{language === "es" ? "Estado: " : "Status: "}</span>
                  <span className="text-green-600 font-semibold">
                    {language === "es" ? "APROBADO" : "APPROVED"}
                  </span>
                </div>
              </div>
            </div>
            
          </div>

          {/* Productos comprados */}
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mt-6 justify-items-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {language === "es" ? "Productos comprados" : "Purchased Products"}
            </h3>
            <div
              className={`grid ${
                cartItems.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
              } gap-4`}
            >
              {cartItems.map((item) => (
                <ProductItem
                  key={item.vehicleId}
                  item={item}
                  language={language}
                />
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 justify-center mt-6">
            <PDFDownloadLink
              document={
                <VoucherPDF paymentResult={paymentResult} language={language} />
              }
              fileName={`voucher-${paymentResult.orderId}.pdf`}
              className="bg-bmw-blue text-white px-6 py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {language === "es" ? "Descargar Voucher" : "Download Voucher"}
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
      error={
        language === "es"
          ? "Error desconocido. Por favor contacte al soporte."
          : "Unknown error. Please contact support."
      }
      language={language}
      onRetry={() => navigate("/")}
    />
  );
}

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { vehicles, coupons } from "../data";
import { initiatePayment } from "../services/payment.ts";
import { FormData, CartItem } from "../types";
import imgTransbank from "../assets/images/transbank.png";
import imgMercadopago from "../assets/images/mercadpago.png";


/**
 * TODO: Implementar Mercado Pago
 * 
 * Cuando tengas el backend listo para Mercado Pago:
 * 1. Crear función `initiateMercadoPagoPayment` en services/payment.ts
 * 2. Habilitar el botón cambiando `disabled={true}` a `disabled={isLoading}`
 * 3. Actualizar `handleMercadoPagoPayment` para llamar al backend
 * 4. Agregar manejo de estados de carga para Mercado Pago
 */

const FormField = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200 tracking-wide">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-red-500 dark:text-red-400 text-sm mt-2 flex items-center gap-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const OrderItem = ({
  vehicle,
  quantity,
  onRemove,
}: {
  vehicle: {
    id: string;
    name: string;
    price: string;
    image: string;
  };
  quantity: number;
  onRemove: (vehicleId: string) => void;
}) => {
  const total = parseInt(vehicle.price) * quantity;
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);

  return (
    <div className="group relative flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-20 h-20 object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
          {vehicle.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Cantidad: {quantity}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-bmw-blue dark:text-bmw-lightblue font-bold text-lg">
            {formatPrice(total)}
          </span>
          <div className="h-1 flex-1 bg-gradient-to-r from-bmw-blue to-bmw-lightblue rounded-full opacity-30"></div>
        </div>
      </div>
      
      {/* Botón de eliminar */}
      <div className="flex flex-col justify-center">
        <button
          onClick={() => onRemove(vehicle.id)}
          className="group/btn relative p-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-all duration-300 hover:scale-110 opacity-70 group-hover:opacity-100 hover:shadow-lg"
          title="Eliminar del carrito"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          
          {/* Tooltip mejorado */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Eliminar vehículo
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

const SecurePaymentInfo = () => (
  <div className="bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 p-6 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
        <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
        Métodos de Pago Seguros
      </h3>
    </div>
    
    <div className="space-y-3 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-bmw-blue rounded-full mt-2 flex-shrink-0"></div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Transbank (Disponible):</strong> Pago inmediato con tarjetas de crédito y débito chilenas
        </p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Mercado Pago (Próximamente):</strong> Múltiples opciones de pago, cuotas sin interés y más flexibilidad
        </p>
      </div>
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 bg-bmw-blue rounded-full mt-2 flex-shrink-0"></div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Encriptación SSL 256-bit:</strong> Tus datos están protegidos con la más alta seguridad bancaria
        </p>
      </div>
    </div>

    {/* Payment Methods Logos */}
    <div className="grid grid-cols-1 gap-4 mb-4">
      {/* Transbank */}
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <img
            src={imgTransbank}
            alt="Transbank - Pago Seguro"
            className="h-12 object-contain filter brightness-110"
            loading="lazy"
          />
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium">
            Disponible
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
      </div>

      {/* Mercado Pago Coming Soon */}
      <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-600 opacity-60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={imgMercadopago}
              alt="Mercado Pago - Próximamente"
              className="h-12 object-contain filter brightness-110"
              loading="lazy"
            />
            <span className="font-semibold text-gray-900 dark:text-white">
              Mercado Pago
            </span>
          </div>
          <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full font-medium">
            Próximamente
          </span>
        </div>
      </div>
    </div>
    
    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Certificado por entidades reguladoras de Chile
    </div>
  </div>
);

export default function Checkout() {
  const { items, getSubtotal, clearCart, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const cartTotal = getSubtotal() - discount;
  const cartItems: CartItem[] = items.map((item) => {
    const fullVehicle = vehicles.find((v) => v.id === item.vehicleId)!;
    return {
      ...item,
      vehicle: {
        id: fullVehicle.id,
        name: fullVehicle.name,
        price: fullVehicle.price,
        image: fullVehicle.image,
      },
    };
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);

  const applyCoupon = (code: string) => {
    const coupon = coupons.find((c) => c.code === code);
    if (coupon) {
      const discountAmount = (getSubtotal() * coupon.discount) / 100; // Calcula el descuento en base al porcentaje
      setDiscount(discountAmount);
      setCouponMessage(
        `Coupon applied: ${coupon.code} - ${coupon.discount}% off`
      );
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  const handleRemoveItem = (vehicleId: string) => {
    const vehicle = cartItems.find(item => item.vehicle.id === vehicleId);
    if (vehicle) {
      const confirmMessage = `¿Estás seguro de que deseas eliminar "${vehicle.vehicle.name}" del carrito?`;
      if (window.confirm(confirmMessage)) {
        removeFromCart(vehicleId);
        
        // Opcional: Mostrar notificación de éxito
        setCouponMessage(`✅ "${vehicle.vehicle.name}" eliminado del carrito`);
        setTimeout(() => {
          setCouponMessage("");
        }, 3000);
      }
    }
  };

  const handleMercadoPagoPayment = () => {
    // TODO: Implementar cuando esté listo el backend de Mercado Pago
    setCouponMessage("🚧 Mercado Pago estará disponible próximamente. Por favor usa Transbank por ahora.");
    setTimeout(() => {
      setCouponMessage("");
    }, 4000);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);
      const { url, token } = await initiatePayment(cartTotal, data, cartItems);
      if (url && token) {
        window.location.href = `${url}?token_ws=${token}`;
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-bmw-blue via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Finalizar Compra
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Complete su información para proceder con el pago seguro y la entrega de su vehículo de lujo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-bmw-blue/10 rounded-lg">
                  <svg className="w-6 h-6 text-bmw-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Información del Cliente
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    error={errors.firstName?.message}
                  >
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <FormField label="Last Name" error={errors.lastName?.message}>
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>
                </div>

                <FormField label="Email" error={errors.email?.message}>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <FormField label="Phone" error={errors.phone?.message}>
                  <input
                    {...register("phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9]{9,}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </FormField>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    Shipping Address
                  </h3>

                  <FormField
                    label="Street Address"
                    error={errors.address?.street?.message}
                  >
                    <input
                      {...register("address.street", {
                        required: "Street address is required",
                      })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label="City"
                      error={errors.address?.city?.message}
                    >
                      <input
                        {...register("address.city", {
                          required: "City is required",
                        })}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </FormField>

                    <FormField
                      label="State"
                      error={errors.address?.state?.message}
                    >
                      <input
                        {...register("address.state", {
                          required: "State is required",
                        })}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="ZIP Code"
                    error={errors.address?.zipCode?.message}
                  >
                    <input
                      {...register("address.zipCode", {
                        required: "ZIP code is required",
                      })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-bmw-blue via-blue-600 to-purple-600 hover:from-bmw-blue/90 hover:via-blue-600/90 hover:to-purple-600/90 disabled:from-gray-400 disabled:via-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3"
                  >
                    {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>{isLoading ? "Procesando..." : "Pagar con Transbank"}</span>
                  </button>

                  {/* Divider */}
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
                      o también
                    </span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                  </div>

                  {/* Mercado Pago Button */}
                  <button
                    
                    type="button"
                    onClick={handleMercadoPagoPayment}
                    disabled={true}
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3 relative"
                    title="Próximamente disponible"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 13.5l3.5 2.5L12 18.5 8.5 16l3.5-2.5z"/>
                    </svg>
                    <span>Pagar con Mercado Pago</span>
                    
                    {/* Coming Soon Badge */}
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                      Próximamente
                    </div>
                  </button>

                  {/* Info Message */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                          Mercado Pago estará disponible próximamente
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Por ahora puedes pagar de forma segura con Transbank
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700  top-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 16h.01M7 13v4a2 2 0 002 2h2M17 19a2 2 0 11-4 0 2 2 0 014 0zM9 19a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Resumen del Pedido
                  </h2>
                </div>

                <div className="space-y-4">
                  {cartItems.map(({ vehicle, quantity }) => (
                    <OrderItem
                      key={vehicle.id}
                      vehicle={vehicle}
                      quantity={quantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>

                <div className="border-t mt-6 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-white">
                    <span>Subtotal:</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-lg text-green-600 dark:text-green-400">
                      <span>Discount:</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-white">
                    <span>Total:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="w-full px-3 py-2 border rounded-lg mb-2 dark:bg-gray-700 dark:text-white"
                    onBlur={(e) => applyCoupon(e.target.value)}
                  />
                  {couponMessage && (
                    <p
                      className={`text-sm ${
                        discount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {couponMessage}
                    </p>
                  )}
                  
                  {/* Test Coupon Codes Section */}
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/30 rounded-lg">
                    <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Test Coupon Codes Available:
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex justify-between items-center py-1 px-2 bg-white/50 dark:bg-black/20 rounded border border-yellow-200/50 dark:border-yellow-700/20">
                        <code className="font-mono text-yellow-900 dark:text-yellow-200 font-semibold">BMW10</code>
                        <span className="text-yellow-700 dark:text-yellow-300">50% off</span>
                      </div>
                      <div className="flex justify-between items-center py-1 px-2 bg-white/50 dark:bg-black/20 rounded border border-yellow-200/50 dark:border-yellow-700/20">
                        <code className="font-mono text-yellow-900 dark:text-yellow-200 font-semibold">MB15</code>
                        <span className="text-yellow-700 dark:text-yellow-300">15% off</span>
                      </div>
                      <div className="flex justify-between items-center py-1 px-2 bg-white/50 dark:bg-black/20 rounded border border-yellow-200/50 dark:border-yellow-700/20">
                        <code className="font-mono text-yellow-900 dark:text-yellow-200 font-semibold">AUDI20</code>
                        <span className="text-yellow-700 dark:text-yellow-300">20% off</span>
                      </div>
                      <div className="flex justify-between items-center py-1 px-2 bg-white/50 dark:bg-black/20 rounded border border-yellow-200/50 dark:border-yellow-700/20">
                        <code className="font-mono text-yellow-900 dark:text-yellow-200 font-semibold">POR25</code>
                        <span className="text-yellow-700 dark:text-yellow-300">25% off</span>
                      </div>
                      <div className="flex justify-between items-center py-1 px-2 bg-white/50 dark:bg-black/20 rounded border border-yellow-200/50 dark:border-yellow-700/20">
                        <code className="font-mono text-yellow-900 dark:text-yellow-200 font-semibold">FER30</code>
                        <span className="text-yellow-700 dark:text-yellow-300">30% off</span>
                      </div>
                    </div>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-2 italic">
                      💡 These are test codes for development purposes
                    </p>
                  </div>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Limpiar Carrito</span>
                </button>
              </div>

              <SecurePaymentInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { vehicles } from "../data";
import { initiatePayment } from "../services/payment.ts";
import { FormData, CartItem } from "../types";

import imgTransbank from "../assets/images/transbank.png";

// Componentes reutilizables
const FormField = ({ label, error, children }: { 
  label: string; 
  error?: string; 
  children: React.ReactNode 
}) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const OrderItem = ({ vehicle, quantity }: { 
  vehicle: typeof vehicles[0]; 
  quantity: number 
}) => {
  const total = parseInt(vehicle.price) * quantity;
  const formatPrice = (price: number) => 
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP"
    }).format(price);

  return (
    <div className="flex gap-4">
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-20 h-20 object-cover rounded"
        loading="lazy"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-800 dark:text-white">
          {vehicle.name}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Quantity: {quantity}
        </p>
        <p className="text-bmw-blue font-medium dark:text-bmw-blue">
          {formatPrice(total)}
        </p>
      </div>
    </div>
  );
};

const SecurePaymentInfo = () => (
  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
    <h3 className="font-medium text-gray-800 dark:text-white mb-2">
      Secure Payment
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">
      Your payment will be processed securely through Webpay Transbank.
      All transactions are encrypted and protected.
    </p>
    <img 
      src={imgTransbank} 
      alt="Transbank" 
      className="w-full h-full object-contain mt-4"
      loading="lazy"
    />
  </div>
);

export default function Checkout() {
  const { items, getSubtotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const cartTotal = getSubtotal();
  const cartItems: CartItem[] = items.map(item => ({
    ...item,
    vehicle: vehicles.find(v => v.id === item.vehicleId)!
  }));

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP"
    }).format(price);

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
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 dark:text-white">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                Customer Information
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="First Name" error={errors.firstName?.message}>
                    <input
                      {...register("firstName", { required: "First name is required" })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <FormField label="Last Name" error={errors.lastName?.message}>
                    <input
                      {...register("lastName", { required: "Last name is required" })}
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

                  <FormField label="Street Address" error={errors.address?.street?.message}>
                    <input
                      {...register("address.street", { required: "Street address is required" })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="City" error={errors.address?.city?.message}>
                      <input
                        {...register("address.city", { required: "City is required" })}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </FormField>

                    <FormField label="State" error={errors.address?.state?.message}>
                      <input
                        {...register("address.state", { required: "State is required" })}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </FormField>
                  </div>

                  <FormField label="ZIP Code" error={errors.address?.zipCode?.message}>
                    <input
                      {...register("address.zipCode", { required: "ZIP code is required" })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </FormField>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-bmw-blue text-white py-3 rounded-lg hover:bg-bmw-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? "Processing..." : "Proceed to Payment"}
                </button>
              </form>
            </div>

            {/* Order Summary Section */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {cartItems.map(({ vehicle, quantity }) => (
                    <OrderItem key={vehicle.id} vehicle={vehicle} quantity={quantity} />
                  ))}
                </div>

                <div className="border-t mt-6 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-white">
                    <span>Total:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>

              <SecurePaymentInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
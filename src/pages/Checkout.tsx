// src/pages/checkout.tsx
import { useCart } from "../context/CartContext";
import { vehicles } from "../data";
import { Loader2 } from "lucide-react";
import { initiatePayment } from "../services/payment.ts";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
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

export default function Checkout() {
  const { items, getSubtotal } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const cartItems = items.map((item) => ({
    ...item,
    vehicle: vehicles.find((v) => v.id === item.vehicleId)!,
  }));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const totalAmount = getSubtotal();
    try {
      setIsLoading(true);
      const { url, token } = await initiatePayment(totalAmount,data);
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                Customer Information
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
                      First Name
                    </label>
                    <input
                      {...register("firstName", { required: "First name is required" })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
                      Last Name
                    </label>
                    <input
                      {...register("lastName", { required: "Last name is required" })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
                    Email
                  </label>
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
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
                    Phone
                  </label>
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
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    Shipping Address
                  </h3>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
                      Street Address
                    </label>
                    <input
                      {...register("address.street", { required: "Street address is required" })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    {errors.address?.street && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.street.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
                        City
                      </label>
                      <input
                        {...register("address.city", { required: "City is required" })}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                      {errors.address?.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
                        State
                      </label>
                      <input
                        {...register("address.state", { required: "State is required" })}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                      {errors.address?.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address.state.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-white">
                      ZIP Code
                    </label>
                    <input
                      {...register("address.zipCode", { required: "ZIP code is required" })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    {errors.address?.zipCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.zipCode.message}
                      </p>
                    )}
                  </div>
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

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {cartItems.map(({ vehicle, quantity }) => (
                    <div key={vehicle.id} className="flex gap-4">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          {vehicle.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Quantity: {quantity}
                        </p>
                        <p className="text-bmw-blue font-medium dark:text-bmw-blue">
                          {formatPrice(parseInt(vehicle.price) * quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-6 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-white">
                    <span>Total:</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                  Secure Payment
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your payment will be processed securely through Webpay
                  Transbank. All transactions are encrypted and protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
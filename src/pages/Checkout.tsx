import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import { vehicles } from '../data';
import { Loader2 } from 'lucide-react';

const customerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'Valid ZIP code is required'),
  }),
});

type CustomerFormData = z.infer<typeof customerSchema>;

export default function Checkout() {
  const { items, getSubtotal } = useCart();
  const { setCustomerInfo, initiateCheckout, isLoading, error } = useCheckout();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const cartItems = items.map(item => ({
    ...item,
    vehicle: vehicles.find(v => v.id === item.vehicleId)!
  }));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const onSubmit = async (data: CustomerFormData) => {
    setCustomerInfo(data);
    await initiateCheckout();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      {...register('firstName')}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      {...register('lastName')}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Shipping Address</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Street Address</label>
                    <input
                      {...register('address.street')}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    {errors.address?.street && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.street.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        {...register('address.city')}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                      {errors.address?.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        {...register('address.state')}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                      {errors.address?.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.address.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <input
                      {...register('address.zipCode')}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    {errors.address?.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.zipCode.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-bmw-blue text-white py-3 rounded-lg hover:bg-bmw-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isLoading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {cartItems.map(({ vehicle, quantity }) => (
                    <div key={vehicle.id} className="flex gap-4">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{vehicle.name}</h4>
                        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                        <p className="text-bmw-blue font-medium">
                          {formatPrice(parseInt(vehicle.price) * quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-6 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Secure Payment</h3>
                <p className="text-sm text-gray-600">
                  Your payment will be processed securely through Webpay Transbank.
                  All transactions are encrypted and protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
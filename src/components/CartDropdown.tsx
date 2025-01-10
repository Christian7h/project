import React from 'react';
import { useCart } from '../context/CartContext';
import { vehicles } from '../data';
import { ShoppingCart, X } from 'lucide-react';



export default function CartDropdown() {
  const { items, removeFromCart, getSubtotal } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);

  const cartItems = items.map(item => ({
    ...item,
    vehicle: vehicles.find(v => v.id === item.vehicleId)!
  }));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-bmw-blue dark:text-bmw-blue p-2 hover:bg-gray-800 rounded-full transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4">Shopping Cart</h3>
            
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {cartItems.map(({ vehicle, quantity }) => (
                    <div key={vehicle.id} className="flex items-center gap-4">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm sm:text-base">{vehicle.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Quantity: {quantity}
                        </p>
                        <p className="text-bmw-blue font-medium text-xs sm:text-sm">
                          {formatPrice(parseInt(vehicle.price))}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(vehicle.id)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-bold text-xs sm:text-sm">
                      {formatPrice(getSubtotal())}
                    </span>
                  </div>
                  <button
                    onClick={() => alert('Proceeding to checkout...')}
                    className="w-full bg-bmw-blue text-white py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

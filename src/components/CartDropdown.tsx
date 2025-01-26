import React, { useMemo, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { vehicles } from "../data";
import { ShoppingCart, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { trackEvent } from "../ga4"; // Asegúrate de que el path sea correcto

// Memoizar formato de precio fuera del componente
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(price);
};

// Crear mapa de vehículos fuera del componente para acceso rápido
const vehicleMap = new Map(vehicles.map(vehicle => [vehicle.id, vehicle]));

export default function CartDropdown() {
  const { items, removeFromCart, getSubtotal } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);
  const { language } = useLanguage();

  // Memoizar elementos del carrito
  const cartItems = useMemo(() => 
    items
      .map(item => ({
        ...item,
        vehicle: vehicleMap.get(item.vehicleId)
      }))
      .filter(item => item.vehicle), // Filtrar items inválidos
    [items]
  );

  // Manejar apertura/cierre del carrito
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);
  
  // Cerrar carrito al hacer click fuera (mejorado)
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.cart-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Traducciones memoizadas
  const translations = useMemo(() => ({
    cartTitle: language === "es" ? "Carro de la compra" : "Shopping Cart",
    emptyCart: language === "es" ? "El carrito está vacío" : "Your cart is empty",
    quantity: language === "es" ? "Cantidad" : "Quantity",
    subtotal: language === "es" ? "Subtotal:" : "Subtotal:",
    checkout: language === "es" ? "Ir al Checkout" : "Proceed to Checkout"
  }), [language]);

  return (
    <div className="relative cart-dropdown">
      <button
        onClick={toggleCart}
        className="text-bmw-blue dark:text-bmw-blue p-2 hover:bg-gray-800 rounded-full transition-colors"
        aria-label={translations.cartTitle}
      >
        <ShoppingCart className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl z-50">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-4 dark:text-white">
              {translations.cartTitle}
            </h3>

            {cartItems.length === 0 ? (
              <p className="text-bmw-blue text-center py-4">
                {translations.emptyCart}
              </p>
            ) : (
              <>
                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                  {cartItems.map(({ vehicle, quantity, vehicleId }) => (
                    <div key={vehicleId} className="flex items-center gap-4">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        loading="lazy"
                        decoding="async"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                        width={80}
                        height={80}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm sm:text-base dark:text-white">
                          {vehicle.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-white">
                          {translations.quantity}: {quantity}
                        </p>
                        <p className="text-bmw-blue font-medium text-xs sm:text-sm">
                          {formatPrice(vehicle.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(vehicleId)}
                        className="p-1 hover:bg-bmw-blue rounded-full transition-colors"
                        aria-label={language === "es" ? "Eliminar" : "Remove"}
                      >
                        <X className="w-5 h-5 dark:text-white" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium dark:text-white">
                      {translations.subtotal}
                    </span>
                    <span className="font-bold text-lg sm:text-sm dark:text-bmw-blue">
                      {formatPrice(getSubtotal())}
                    </span>
                  </div>
                  <Link 
                    to="/checkout" 
                    className="block"
                    onClick={() => {
                      setIsOpen(false); // Cierra el carrito
                      trackEvent("proceed_to_checkout", "Cart Interaction", "User proceeded to checkout"); // Rastrear evento
                    }}
                  >
                    <button
                      className="w-full bg-bmw-blue text-white py-2 rounded-lg hover:bg-bmw-blue/90 transition-colors"
                    >
                      {translations.checkout}
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../types';
import { vehicles } from '../data';

interface CartContextType {
  items: CartItem[];
  addToCart: (vehicleId: string) => void;
  removeFromCart: (vehicleId: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.vehicleId === vehicleId);
      
      if (existingItem) {
        if (existingItem.quantity >= vehicle.stock) {
          alert('No more stock available');
          return currentItems;
        }
        return currentItems.map(item =>
          item.vehicleId === vehicleId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { vehicleId, quantity: 1 }];
    });
  };

  const removeFromCart = (vehicleId: string) => {
    setItems(currentItems => 
      currentItems.filter(item => item.vehicleId !== vehicleId)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const vehicle = vehicles.find(v => v.id === item.vehicleId);
      return total + (vehicle ? parseInt(vehicle.price) * item.quantity : 0);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getItemCount,
      getSubtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
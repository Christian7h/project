import { createContext, useContext, useState, ReactNode } from "react";

// Tipo para el contexto
interface FavoriteContextProps {
  favorites: number[];
  toggleFavorite: (vehicleId: number) => void;
}

// Crear el contexto
const FavoritesContext = createContext<FavoriteContextProps | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Cargar favoritos desde el almacenamiento local
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const toggleFavorite = (vehicleId: number) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId];
      // Guardar favoritos en el almacenamiento local
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;

// /context/SoldItemsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SoldItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  imageUri: string | null;
  time: string; // timestamp
}

interface SoldItemsContextType {
  soldItems: SoldItem[];
  addSoldItems: (items: SoldItem[]) => void;
  clearSoldItems: () => void;
}

const SoldItemsContext = createContext<SoldItemsContextType | undefined>(undefined);

export const SoldItemsProvider = ({ children }: { children: ReactNode }) => {
  const [soldItems, setSoldItems] = useState<SoldItem[]>([]);

  // Add confirmed sold items
  const addSoldItems = (items: SoldItem[]) => {
    setSoldItems((prev) => [...prev, ...items]);
  };

  // Clear all sold items (optional, e.g., for testing or reset)
  const clearSoldItems = () => {
    setSoldItems([]);
  };

  return (
    <SoldItemsContext.Provider value={{ soldItems, addSoldItems, clearSoldItems }}>
      {children}
    </SoldItemsContext.Provider>
  );
};

// Hook for easier usage
export const useSoldItems = () => {
  const context = useContext(SoldItemsContext);
  if (!context) {
    throw new Error("useSoldItems must be used within a SoldItemsProvider");
  }
  return context;
};

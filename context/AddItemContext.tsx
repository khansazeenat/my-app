// context/AddItemContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Item = {
  id: string;
  itemName: string;
  itemQty: string;
  itemPrice: string;
  itemImage?: string | null;
  itemTime: string;
};

type AddItemContextType = {
  itemName: string;
  setItemName: (name: string) => void;
  itemQty: string;
  setItemQty: (qty: string) => void;
  itemPrice: string;
  setItemPrice: (price: string) => void;
  itemImage: string | null;
  setItemImage: (uri: string | null) => void;
  items: Item[];
  addItemToList: (time?: string) => void;
  resetItem: () => void;
};

const AddItemContext = createContext<AddItemContextType | undefined>(undefined);

export const AddItemProvider = ({ children }: { children: ReactNode }) => {
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  
  // 🧩 2. Paste your log handlers right here
  const handleSetItemName = (name: string) => {
    console.log("🟢 itemName updated:", name);
    setItemName(name);
  };

  const handleSetItemQty = (qty: string) => {
    console.log("🟡 itemQty updated:", qty);
    setItemQty(qty);
  };

  const handleSetItemPrice = (price: string) => {
    console.log("🟣 itemPrice updated:", price);
    setItemPrice(price);
  };

  const resetItem = () => {
    setItemName("");
    setItemQty("");
    setItemPrice("");
    setItemImage(null);
  };

  const addItemToList = (time?: string) => {
    if (!itemName || !itemQty || !itemPrice) {
      console.log("Cannot add item: missing fields", { itemName, itemQty, itemPrice });
      return;
    }

    const newItem: Item = {
      id: Date.now().toString(),
      itemName,
      itemQty,
      itemPrice,
      itemImage,
      itemTime: time || new Date().toLocaleString(),
    };

    setItems((prev) => {
      const updated = [...prev, newItem];
      console.log("Item added:", newItem);
      console.log("Updated items array:", updated);
      return updated;
    });

    resetItem();
  };

  return (
    <AddItemContext.Provider
      value={{
        itemName,
        setItemName: handleSetItemName, // 👈 use handler instead
        itemQty,
        setItemQty: handleSetItemQty,   // 👈 use handler instead
        itemPrice,
        setItemPrice: handleSetItemPrice, // 👈 use handler instead
        itemImage,
        setItemImage,
        items,
        addItemToList,
        resetItem,
      }}
    >
      {children}
    </AddItemContext.Provider>
  );
};

export const useAddItem = (): AddItemContextType => {
  const context = useContext(AddItemContext);
  if (!context) throw new Error("useAddItem must be used within an AddItemProvider");
  return context;
};

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
  deleteItem: (id: string) => void;
  reduceItemQty: (id: string, amount: number) => void;
  updateItem: (id: string, data: Partial<Omit<Item, "id">>) => void; // 🆕 added
};

const AddItemContext = createContext<AddItemContextType | undefined>(undefined);

export const AddItemProvider = ({ children }: { children: ReactNode }) => {
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const handleSetItemName = (name: string) => setItemName(name);
  const handleSetItemQty = (qty: string) => setItemQty(qty);
  const handleSetItemPrice = (price: string) => setItemPrice(price);

  const resetItem = () => {
    setItemName("");
    setItemQty("");
    setItemPrice("");
    setItemImage(null);
  };

  const addItemToList = (time?: string) => {
    if (!itemName || !itemQty || !itemPrice) return;

    const newItem: Item = {
      id: Date.now().toString(),
      itemName,
      itemQty,
      itemPrice,
      itemImage,
      itemTime: time || new Date().toLocaleString(),
    };

    setItems(prev => [...prev, newItem]);
    resetItem();
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const reduceItemQty = (id: string, amount: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, itemQty: String(Math.max(Number(item.itemQty) - amount, 0)) }
          : item
      )
    );
  };

  const updateItem = (id: string, data: Partial<Omit<Item, "id">>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  };

  return (
    <AddItemContext.Provider
      value={{
        itemName,
        setItemName: handleSetItemName,
        itemQty,
        setItemQty: handleSetItemQty,
        itemPrice,
        setItemPrice: handleSetItemPrice,
        itemImage,
        setItemImage,
        items,
        addItemToList,
        resetItem,
        deleteItem,
        reduceItemQty,
        updateItem, // 🆕 added
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

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "clothing-shop-cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(product, size, qty) {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          qty,
        },
      ];
    });
  }

  function updateQty(id, size, qty) {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, qty } : item
      )
    );
  }

  function removeItem(id, size) {
    setItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

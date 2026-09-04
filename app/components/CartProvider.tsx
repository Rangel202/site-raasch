"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  addItem,
  clearItems,
  getServerSnapshot,
  getSnapshot,
  removeItem,
  setItemQty,
  subscribe,
  type CartItem,
} from "./cartStore";

export type { CartItem };

type CartContext = {
  items: CartItem[];
  count: number;
  open: boolean;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

const Context = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);

  // Locking the page behind the drawer is a DOM concern, so it stays an effect.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const value = useMemo<CartContext>(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.qty, 0),
      open,
      add: (item) => {
        addItem(item);
        setOpen(true);
      },
      remove: removeItem,
      setQty: setItemQty,
      clear: clearItems,
      setOpen,
    }),
    [items, open],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCart() {
  const context = useContext(Context);
  if (!context) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return context;
}

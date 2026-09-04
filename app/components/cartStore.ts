export type CartItem = {
  id: string;
  name: string;
  ref?: string;
  image: string;
  href: string;
  qty: number;
};

const STORAGE_KEY = "raasch:cesto";
const EMPTY: CartItem[] = [];

/**
 * The basket lives outside React so `useSyncExternalStore` can read it: the
 * server always sees an empty basket, and the stored one arrives on subscribe,
 * which keeps hydration honest.
 */
let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // A blocked store just means the basket is session-only.
  }
}

function load() {
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length) items = parsed;
  } catch {
    // Corrupt payload: start empty rather than crash the page.
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!loaded) {
    load();
    if (items !== EMPTY) emit();
  }
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot() {
  return items;
}

export function getServerSnapshot() {
  return EMPTY;
}

function commit(next: CartItem[]) {
  items = next;
  persist();
  emit();
}

export function addItem(item: Omit<CartItem, "qty">) {
  const existing = items.find((i) => i.id === item.id);
  commit(
    existing
      ? items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      : [...items, { ...item, qty: 1 }],
  );
}

export function removeItem(id: string) {
  commit(items.filter((i) => i.id !== id));
}

export function setItemQty(id: string, qty: number) {
  commit(
    qty <= 0
      ? items.filter((i) => i.id !== id)
      : items.map((i) => (i.id === id ? { ...i, qty } : i)),
  );
}

export function clearItems() {
  commit(EMPTY);
}

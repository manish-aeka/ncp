import { useEffect, useState } from "react";
import { PRODUCTS, type Product } from "@/data/jewellery";

const WISHLIST_KEY = "ncp.wishlist";
const ADMIN_PRODUCTS_KEY = "ncp.adminProducts";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("ncp:store", { detail: key }));
}

export function useWishlist() {
  const [ids, setIds] = useState<string[]>(() => read<string[]>(WISHLIST_KEY, []));
  useEffect(() => {
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail === WISHLIST_KEY) {
        setIds(read<string[]>(WISHLIST_KEY, []));
      }
    };
    window.addEventListener("ncp:store", handler);
    return () => window.removeEventListener("ncp:store", handler);
  }, []);

  const toggle = (id: string) => {
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    write(WISHLIST_KEY, next);
    setIds(next);
  };
  return { ids, toggle, has: (id: string) => ids.includes(id) };
}

export function useAdminProducts() {
  const [items, setItems] = useState<Product[]>(() =>
    read<Product[]>(ADMIN_PRODUCTS_KEY, PRODUCTS)
  );
  useEffect(() => {
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail === ADMIN_PRODUCTS_KEY) {
        setItems(read<Product[]>(ADMIN_PRODUCTS_KEY, PRODUCTS));
      }
    };
    window.addEventListener("ncp:store", handler);
    return () => window.removeEventListener("ncp:store", handler);
  }, []);

  const save = (next: Product[]) => {
    write(ADMIN_PRODUCTS_KEY, next);
    setItems(next);
  };

  return {
    items,
    add: (p: Product) => save([p, ...items]),
    update: (id: string, patch: Partial<Product>) =>
      save(items.map((p) => (p.id === id ? { ...p, ...patch } : p))),
    remove: (id: string) => save(items.filter((p) => p.id !== id)),
    reset: () => save(PRODUCTS),
  };
}

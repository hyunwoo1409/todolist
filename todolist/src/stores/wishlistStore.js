import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set) => ({
      items: [],

      /* 목록 추가 */
      addItem: (name, price) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: Date.now(),
              name,
              price,
              purchased: false,
            },
          ],
        })),

      markAsPurchased: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, purchased: true } : item
          ),
        })),

      cancelPurchase: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, purchased: false } : item
          ),
        })),

      /* 목록삭제 */
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "wishlist-store",
    }
  )
);
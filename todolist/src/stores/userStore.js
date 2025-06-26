import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useTodoStore } from "./todoStore";
import { useWishlistStore } from "./wishlistStore";

export const useUserStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      nickname: "",
      money: 0,
      moneyHistory: [],

      login: (nickname) => {
        if (!nickname.trim()) return;
        set({
          isLoggedIn: true,
          nickname,
        });
      },

      logout: () => {
        localStorage.removeItem("user-store");
        localStorage.removeItem("wishlist-store");
        localStorage.removeItem("todo-store");

        useWishlistStore.getState().items = [];
        useTodoStore.getState().resetTodos();

        set({
          isLoggedIn: false,
          nickname: "",
          money: 0,
          moneyHistory: [],
        });
      },

      /* money 증감 + history */
      gainMoney: (amount, desc = "") => {
        const type = amount > 0 ? "획득" : "사용";
        const newHistory = {
          id: Date.now(),
          type,
          amount,
          description: desc || (type === "획득" ? "Todo 완료" : "구매"),
          date: new Date().toLocaleString(),
        };

        set((state) => ({
          money: state.money + amount,
          moneyHistory: [...state.moneyHistory, newHistory],
        }));
      },
    }),

    {
      name: "user-store",
      partialize: (state) => ({
        money: state.money,
        nickname: state.nickname,
        moneyHistory: state.moneyHistory,
      }),
    }
  )
);

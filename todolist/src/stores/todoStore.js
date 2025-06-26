import { create } from "zustand";
import { useUserStore } from "./userStore";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (text, reward) => {
        if (!text.trim()) return;
        const newTodo = {
          id: Date.now(),
          text,
          done: false,
          reward: reward || 0,
        };
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },

      toggleTodo: (id) => {
        const { todos } = get();
        const updated = todos.map((todo) => {
          if (todo.id === id) {
            const isDone = !todo.done;
            const gainMoney = useUserStore.getState().gainMoney;
            gainMoney(isDone ? todo.reward : -todo.reward);
            return { ...todo, done: isDone };
          }
          return todo;
        });
        set({ todos: updated });
      },

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      resetTodos: () => set({ todos: [] }),
    }),
    {
      name: "todo-store", 
    }
  )
);
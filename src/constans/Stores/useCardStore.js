import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartItems: [],
  addToTheCart: (product) => {
    set((state) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...product, quantity: 1 }],
        };
      }
    });
  },
  subFromTheCart: (product) => {
    set((state) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        } else {
          return {
            cartItems: state.cartItems.filter((item) => item.id !== product.id),
          };
        }
      }
      return state;
    });
  },
  clearItem: (product) => {
    set((state) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return {
          cartItems: state.cartItems.filter((item) => item.id !== product.id),
        };
      }
      return state;
    });
  },
  clearCart: () => set({ cartItems: [] }),
}));
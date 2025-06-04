import { CartItem, Product } from "@/interfaces";
import { RootState } from "@/store/store";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        (item) => item.product.id === action.payload.id
      );
      if (item) {
        item.qty++;
      } else {
        state.cartItems.push({ product: action.payload, qty: 1 });
      }
    },
    remove: (state, action: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== action.payload.id
      );
    },
    decrement: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        (item) => item.product.id === action.payload.id
      );
      if (item && item.qty > 1) {
        item.qty--;
      }
    },
  },
});

const cartItems = (state: RootState) => state.cart.cartItems;

export const totalCartItemsSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce((total: number, curr: CartItem) => (total += curr.qty), 0)
);

export const TotalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, curr: CartItem) =>
      (total += curr.qty * Number(curr.product.price)),
    0
  )
);

export const makeProductQtyInCartSelector = (productId: number) =>
  createSelector(
    [cartItems],
    (cartItems) =>
      cartItems.find((el) => Number(el.product.id) === productId)?.qty
  );
export const { increment, remove, decrement } = cartSlice.actions;
export default cartSlice.reducer;

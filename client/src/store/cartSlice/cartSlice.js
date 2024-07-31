import { createSlice } from "@reduxjs/toolkit";
import { addItemsToCart } from "./cartReducers";

const initialItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  items: initialItems,
  shippingInfo: localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.items.find((i) => i.product === item.product);
      if (isItemExist) {
        state.items = state.items.map((i) =>
          i.product === item.product ? item : i
        );
      } else {
        state.items.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.product !== id);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    saveShippingInfo : (state, action) => {
      const info = action.payload;
      state.shippingInfo = info;
      localStorage.setItem("shippingInfo", JSON.stringify(info));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.loading = false;
        cartSlice.caseReducers.addToCart(state, action);
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, saveShippingInfo } = cartSlice.actions;

export default cartSlice.reducer;

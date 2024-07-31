import { createSlice } from '@reduxjs/toolkit';
import { createOrder, getOrderDetails, getUserOrders } from './orderReducers';

const initialState = {
    orders: [],
    order: {},
    loading: false,
    error: null,
  };
  
  // Order slice
  const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      clearErrors: (state) => {
        state.error = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.order = action.payload;
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getUserOrders.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUserOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload;
        })
        .addCase(getUserOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(getOrderDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.order = action.payload;
        })
        .addCase(getOrderDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
  });

  export const { clearErrors } = orderSlice.actions;
  export default orderSlice.reducer;
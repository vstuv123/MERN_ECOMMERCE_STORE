import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlices/productSlice";
import authReducer from './authSlice/authSlice'
import profileReducer from './profileSlice/profileSlice'
import cartReducer from './cartSlice/cartSlice'
import orderReducer from './orderSlice/orderSlice'
import adminReducer from './adminSlice/adminSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    order: orderReducer,
    admin: adminReducer
  },
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/api/v1/order/new', orderData, config);
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get('/api/v1/orders/me', config);
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.get(`/api/v1/order/${id}`, config);
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
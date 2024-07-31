

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    const { loginEmail: email, loginPassword: password } = userData;
    try {
      const config = {headers: {"Content-Type": "application/json"}};
      const { data } = await axios.post('/api/v1/login', { email, password }, config);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
      try {
        const config = {headers: {"Content-Type": "application/json"}};
        const { data } = await axios.post('/api/v1/register', userData, config);
        return data.user;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get('/api/v1/my-profile');
        return data.user;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
      try {
        await axios.get('/api/v1/logout');
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

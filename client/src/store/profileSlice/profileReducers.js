import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const { data } = await axios.put('/api/v1/my-profile/update', profileData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
    'profile/updatePassword',
    async (passwordData, { rejectWithValue }) => {
      try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put('/api/v1/password/update', passwordData, config);
        return data.success;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const forgotPassword = createAsyncThunk(
    'profile/forgotPassword',
    async (emailData, { rejectWithValue }) => {
      try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post('/api/v1/password/forgot', emailData, config);
        return data.message;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

  export const resetPassword = createAsyncThunk(
    'profile/resetPassword',
    async (passwordData, { rejectWithValue }) => {
      const { token, password, confirmPassword} = passwordData;
      console.log(token);
      try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, {password, confirmPassword}, config);
        return data.success;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );

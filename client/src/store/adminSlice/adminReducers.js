import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "admin/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get("/api/v1/admin/products", config);
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(
        `/api/v1/admin/product/${id}`,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        productData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async (params, { rejectWithValue }) => {
    const {id, name, price, originalPrice, sellingPrice, description, category, stock, images} = params;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("originalPrice", originalPrice);
    formData.append("sellingPrice", sellingPrice);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);

    images.forEach((image, index) => {
      formData.append(`images`, image); // Append each image
    });
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        formData,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get("/api/v1/admin/orders", config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "admin/updateOrder",
  async (params, { rejectWithValue }) => {
    const { id, orderStatus } = params;
    const formData = new FormData();
    formData.append("orderStatus", orderStatus);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(`/api/v1/admin/order/${id}`, formData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get("/api/v1/admin/users", config);
      return data.users;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "admin/getUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`/api/v1/admin/user/${id}`, config);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async (params, { rejectWithValue }) => {
    const { id, name, email, role } = params;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(`/api/v1/admin/user/${id}`, formData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "admin/getAllReviews",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`/api/v1/reviews?id=${id}`, config);
      return data.reviews;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteReviewAdmin = createAsyncThunk(
  "admin/deleteReviewAdmin",
  async (params, { rejectWithValue }) => {
    const { reviewId, productId } = params;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    { keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0 } = {},
    { rejectWithValue }
  ) => {

    keyword = keyword || "";
    category = category || "";

    let link = `api/v1/products?keyword=${keyword}&page=${currentPage}&sellingPrice[gte]=${price[0]}&sellingPrice[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`;

    if (keyword === "" && category === ""){
      link = `api/v1/products?page=${currentPage}&sellingPrice[gte]=${price[0]}&sellingPrice[lte]=${price[1]}&rating[gte]=${rating}`
    }

    if (keyword === ""){
      link = `api/v1/products?page=${currentPage}&sellingPrice[gte]=${price[0]}&sellingPrice[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`
    }
    if (category === ""){
      link = `api/v1/products?keyword=${keyword}&page=${currentPage}&sellingPrice[gte]=${price[0]}&sellingPrice[lte]=${price[1]}&rating[gte]=${rating}`
    };
    try {
      const { data } = await axios.get(
        link
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createProductReviews = createAsyncThunk(
  "products/createProductReviews",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      }
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteReviewUser = createAsyncThunk(
  "products/deleteReviewUser",
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
import { createSlice } from "@reduxjs/toolkit";
import { createProductReviews, deleteReviewUser, getAllProducts, getProductDetails } from "./productReducers";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    error: null,
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
    loading: false,
    isReviewed: false,
    isDeletedReview: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    newReviewReset: (state) => {
      state.isReviewed = false;
    },
    deleteReviewReset: (state) => {
      state.isDeletedReview = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
        state.loading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })
      // Handle getProductDetails
      .addCase(getProductDetails.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload.product;
        state.loading = false;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createProductReviews.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createProductReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isReviewed = action.payload;
        state.loading = false;
      })
      .addCase(createProductReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteReviewUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteReviewUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isDeletedReview = action.payload;
        state.loading = false;
      })
      .addCase(deleteReviewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export const { clearErrors, newReviewReset, deleteReviewReset } = productSlice.actions;

export default productSlice.reducer;

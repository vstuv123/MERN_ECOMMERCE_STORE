import { createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteOrder, deleteProduct, deleteReviewAdmin, deleteUser, getAllOrders, getAllProducts, getAllReviews, getAllUsers, getUserDetails, updateOrder, updateProduct, updateUser } from './adminReducers';

// Define initial state
const initialState = {
  users: [],
  user: {},
  products: [],
  reviews: [],
  product: {},
  orders: [],
  totalAmount: 0,
  loading: false,
  error: null,
  isDeleted: false,
  isCreated: false,
  isUpdated: false,
  isUpdatedOrder: false,
  isDeletedOrder: false,
  isUpdatedUser: false,
  isDeletedUser: false,
  isDeletedReview: false,
};


// Create slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    deleteProductReset: (state) => {
      state.isDeleted = false;
    },
    createProductReset: (state) => {
      state.isCreated = false;
    },
    updateProductReset: (state) => {
      state.isUpdated = false;
    },
    updateOrderReset: (state) => {
      state.isUpdatedOrder = false;
    },
    deleteOrderReset: (state) => {
      state.isDeletedOrder = false;
    },
    updateUserReset: (state) => {
      state.isUpdatedUser = false;
    },
    deleteUserReset: (state) => {
      state.isDeletedUser = false;
    },
    deleteReviewReset: (state) => {
      state.isDeletedReview = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null; // Clear any previous errors on success
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.isCreated = action.payload.success;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.error = null;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdatedOrder = action.payload.orders;
        state.error = null;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeletedOrder = action.payload;
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdatedUser = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeletedUser = action.payload;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = null;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(deleteReviewAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReviewAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeletedReview = action.payload;
        state.error = null;
      })
      .addCase(deleteReviewAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
  },
});


export const { clearErrors, deleteProductReset, createProductReset, updateProductReset, updateOrderReset, deleteOrderReset, updateUserReset, deleteUserReset, deleteReviewReset } = adminSlice.actions;
export default adminSlice.reducer;

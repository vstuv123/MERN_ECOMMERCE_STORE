import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const addItemsToCart = createAsyncThunk(
    'cart/addItemsToCart',
    async (params, { rejectWithValue }) => {
        const { id, quantity } = params;
        try {
            const { data } = await axios.get(`/api/v1/product/${id}`);
            const dataObj = {
                product: data.product._id,
                name: data.product.name,
                originalPrice: data.product.originalPrice,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            }
            return dataObj;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)


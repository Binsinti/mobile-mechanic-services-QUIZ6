import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const response = await axiosInstance.get('/api/v1/orders/');
  return response.data;
});

export const createOrder = createAsyncThunk('orders/create', async (orderData) => {
  const response = await axiosInstance.post('/api/v1/orders/', orderData);
  return response.data;
});

export const updateOrder = createAsyncThunk('orders/update', async ({ id, data }) => {
  const response = await axiosInstance.patch(`/api/v1/orders/${id}/`, data);
  return response.data;
});

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results || action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default ordersSlice.reducer;

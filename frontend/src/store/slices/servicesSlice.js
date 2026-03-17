import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';

export const fetchServices = createAsyncThunk('services/fetchAll', async () => {
  const response = await axiosInstance.get('/api/v1/services/');
  return response.data;
});

export const fetchServiceDetail = createAsyncThunk('services/fetchDetail', async (id) => {
  const response = await axiosInstance.get(`/api/v1/services/${id}/`);
  return response.data;
});

const initialState = {
  list: [],
  selectedService: null,
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results || action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchServiceDetail.fulfilled, (state, action) => {
        state.selectedService = action.payload;
      });
  },
});

export default servicesSlice.reducer;

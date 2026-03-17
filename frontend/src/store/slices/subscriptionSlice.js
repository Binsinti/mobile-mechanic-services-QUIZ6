import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';

export const fetchTiers = createAsyncThunk('subscription/fetchTiers', async () => {
  const response = await axiosInstance.get('/api/v1/subscriptions/tiers/');
  return response.data;
});

export const fetchCurrentSubscription = createAsyncThunk('subscription/fetchCurrent', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/v1/subscriptions/user/current/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

export const subscribe = createAsyncThunk('subscription/subscribe', async (tierId) => {
  const response = await axiosInstance.post('/api/v1/subscriptions/user/subscribe/', { tier_id: tierId });
  return response.data;
});

const initialState = {
  tiers: [],
  currentSubscription: null,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTiers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTiers.fulfilled, (state, action) => {
        state.loading = false;
        state.tiers = action.payload.results || action.payload;
      })
      .addCase(fetchTiers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurrentSubscription.fulfilled, (state, action) => {
        state.currentSubscription = action.payload;
      })
      .addCase(subscribe.fulfilled, (state, action) => {
        state.currentSubscription = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axiosInstance.post('/api/token/', credentials);
  localStorage.setItem('access', response.data.access);
  localStorage.setItem('refresh', response.data.refresh);
  return response.data;
});

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await axiosInstance.post('/api/v1/users/', userData);
  return response.data;
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/api/v1/users/me/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data);
  }
});

const initialState = {
  user: null,
  token: localStorage.getItem('access'),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('access'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

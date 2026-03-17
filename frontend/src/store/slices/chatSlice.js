import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../services/axiosInstance';

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message) => {
  const response = await axiosInstance.post('/api/v1/chat/ask/', { message });
  return response.data;
});

export const fetchChatHistory = createAsyncThunk('chat/fetchHistory', async () => {
  const response = await axiosInstance.get('/api/v1/chat/history/');
  return response.data;
});

const initialState = {
  messages: [],
  usageLeft: 0,
  maxUsage: 0,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload.user_message);
        state.messages.push(action.payload.bot_message);
        state.usageLeft = action.payload.usage_left;
        state.maxUsage = action.payload.max_usage;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { clearError } = chatSlice.actions;
export default chatSlice.reducer;

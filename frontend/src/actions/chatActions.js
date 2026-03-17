import api from '../services/api';
import { CHAT_SEND_REQUEST, CHAT_SEND_SUCCESS, CHAT_SEND_FAIL } from '../constants/chatConstants';

export const askChatbot = (message) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_SEND_REQUEST });
    const { data } = await api.post('/chat/ask/', { message });
    dispatch({ type: CHAT_SEND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CHAT_SEND_FAIL, payload: error.response?.data?.error || 'Chat request failed' });
  }
};

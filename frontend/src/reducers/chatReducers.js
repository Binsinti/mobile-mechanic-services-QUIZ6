import { CHAT_SEND_REQUEST, CHAT_SEND_SUCCESS, CHAT_SEND_FAIL } from '../constants/chatConstants';

const initialState = {
  messages: [],
  usage: null,
  loading: false,
  error: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_SEND_REQUEST:
      return { ...state, loading: true, error: null };
    case CHAT_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload.user_message, action.payload.bot_message],
        usage: { left: action.payload.usage_left, max: action.payload.max_usage },
      };
    case CHAT_SEND_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

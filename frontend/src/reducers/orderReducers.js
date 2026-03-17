import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
} from '../constants/orderConstants';

const initialState = {
  orders: [],
  createdOrder: null,
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
    case ORDER_HISTORY_REQUEST:
      return { ...state, loading: true, error: null };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, createdOrder: action.payload };
    case ORDER_HISTORY_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case ORDER_CREATE_FAIL:
    case ORDER_HISTORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

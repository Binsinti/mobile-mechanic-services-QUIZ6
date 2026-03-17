import api from '../services/api';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
} from '../constants/orderConstants';

export const createOrder = (payload) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { data } = await api.post('/orders/create/', payload);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.response?.data || 'Could not create order' });
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_HISTORY_REQUEST });
    const { data } = await api.get('/orders/history/');
    dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data.results || data || [] });
  } catch (error) {
    dispatch({ type: ORDER_HISTORY_FAIL, payload: error.response?.data || 'Could not load order history' });
  }
};

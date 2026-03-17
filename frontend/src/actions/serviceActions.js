import api from '../services/api';
import {
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_DETAIL_REQUEST,
  SERVICE_DETAIL_SUCCESS,
  SERVICE_DETAIL_FAIL,
  SELLER_SERVICE_REQUEST,
  SELLER_SERVICE_SUCCESS,
  SELLER_SERVICE_FAIL,
} from '../constants/serviceConstants';

export const listServices = () => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_LIST_REQUEST });
    const { data } = await api.get('/services/list/');
    dispatch({ type: SERVICE_LIST_SUCCESS, payload: data.results || data || [] });
  } catch (error) {
    dispatch({ type: SERVICE_LIST_FAIL, payload: error.response?.data || 'Could not load services' });
  }
};

export const getServiceDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: SERVICE_DETAIL_REQUEST });
    const { data } = await api.get(`/services/${id}/`);
    dispatch({ type: SERVICE_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SERVICE_DETAIL_FAIL, payload: error.response?.data || 'Could not load service detail' });
  }
};

export const listSellerServices = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_SERVICE_REQUEST });
    const { data } = await api.get('/services/manage/');
    dispatch({ type: SELLER_SERVICE_SUCCESS, payload: data.results || data || [] });
  } catch (error) {
    dispatch({ type: SELLER_SERVICE_FAIL, payload: error.response?.data || 'Could not load seller services' });
  }
};

export const createSellerService = (payload) => async (dispatch) => {
  try {
    const formData = new FormData();
    Object.keys(payload).forEach((k) => formData.append(k, payload[k]));
    await api.post('/services/manage/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(listSellerServices());
  } catch (error) {
    dispatch({ type: SELLER_SERVICE_FAIL, payload: error.response?.data || 'Could not create service' });
  }
};

export const deleteSellerService = (id) => async (dispatch) => {
  await api.delete(`/services/manage/${id}/`);
  dispatch(listSellerServices());
};

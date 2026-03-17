import api from '../services/api';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL,
  AUTH_PROFILE_SUCCESS,
} from '../constants/authConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST });
    const { data } = await api.post('/users/login/', { email, password });
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AUTH_LOGIN_FAIL, payload: error.response?.data?.detail || 'Login failed' });
  }
};

export const register = (payload) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REGISTER_REQUEST });
    const { data } = await api.post('/users/register/', payload);
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AUTH_REGISTER_FAIL, payload: JSON.stringify(error.response?.data || 'Register failed') });
  }
};

export const fetchProfile = () => async (dispatch) => {
  const { data } = await api.get('/users/profile/');
  localStorage.setItem('userInfo', JSON.stringify(data));
  dispatch({ type: AUTH_PROFILE_SUCCESS, payload: data });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('userInfo');
  dispatch({ type: AUTH_LOGOUT });
};

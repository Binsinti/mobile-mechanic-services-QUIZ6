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

const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const token = localStorage.getItem('access');

export const authReducer = (state = { loading: false, userInfo, token, error: null }, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case AUTH_REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload.user, token: action.payload.access, error: null };
    case AUTH_PROFILE_SUCCESS:
      return { ...state, userInfo: action.payload };
    case AUTH_LOGIN_FAIL:
    case AUTH_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case AUTH_LOGOUT:
      return { loading: false, userInfo: null, token: null, error: null };
    default:
      return state;
  }
};

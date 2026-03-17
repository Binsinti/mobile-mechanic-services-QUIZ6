import api from '../services/api';
import { USER_LIST_SUCCESS, USER_UPDATE_SUCCESS, USER_DELETE_SUCCESS } from '../constants/userConstants';

export const listUsers = () => async (dispatch) => {
  const { data } = await api.get('/users/admin/users/');
  dispatch({ type: USER_LIST_SUCCESS, payload: data });
};

export const updateUser = (payload) => async (dispatch) => {
  const { data } = await api.patch('/users/admin/users/', payload);
  dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
};

export const deleteUser = (id) => async (dispatch) => {
  await api.delete('/users/admin/users/', { data: { id } });
  dispatch({ type: USER_DELETE_SUCCESS, payload: id });
};

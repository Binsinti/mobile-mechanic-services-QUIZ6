import api from '../services/api';
import {
  APPLICATION_SUBMIT_REQUEST,
  APPLICATION_SUBMIT_SUCCESS,
  APPLICATION_SUBMIT_FAIL,
  APPLICATION_LIST_SUCCESS,
} from '../constants/applicationConstants';

export const submitSellerApplication = () => async (dispatch) => {
  try {
    dispatch({ type: APPLICATION_SUBMIT_REQUEST });
    await api.post('/applications/apply/');
    dispatch({ type: APPLICATION_SUBMIT_SUCCESS });
  } catch (error) {
    dispatch({ type: APPLICATION_SUBMIT_FAIL, payload: error.response?.data || 'Application failed' });
  }
};

export const listApplications = () => async (dispatch) => {
  const { data } = await api.get('/applications/list/');
  dispatch({ type: APPLICATION_LIST_SUCCESS, payload: data });
};

export const approveApplication = (id, merchant_id) => async (dispatch) => {
  await api.post(`/applications/${id}/approve/`, { merchant_id });
  dispatch(listApplications());
};

export const declineApplication = (id, decline_reason) => async (dispatch) => {
  await api.post(`/applications/${id}/decline/`, { decline_reason });
  dispatch(listApplications());
};

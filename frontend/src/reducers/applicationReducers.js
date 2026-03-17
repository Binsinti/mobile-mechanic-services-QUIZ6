import {
  APPLICATION_SUBMIT_REQUEST,
  APPLICATION_SUBMIT_SUCCESS,
  APPLICATION_SUBMIT_FAIL,
  APPLICATION_LIST_SUCCESS,
} from '../constants/applicationConstants';

const initialState = {
  applications: [],
  loading: false,
  success: false,
  error: null,
};

export const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLICATION_SUBMIT_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case APPLICATION_SUBMIT_SUCCESS:
      return { ...state, loading: false, success: true };
    case APPLICATION_LIST_SUCCESS:
      return { ...state, loading: false, applications: action.payload };
    case APPLICATION_SUBMIT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

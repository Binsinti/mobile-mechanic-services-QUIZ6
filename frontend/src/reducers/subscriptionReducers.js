import {
  SUBSCRIPTION_TIERS_REQUEST,
  SUBSCRIPTION_TIERS_SUCCESS,
  SUBSCRIPTION_TIERS_FAIL,
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
  SUBSCRIPTION_CREATE_FAIL,
  SUBSCRIPTION_TRANSACTIONS_SUCCESS,
} from '../constants/subscriptionConstants';

const initialState = {
  tiers: [],
  current: null,
  transactions: [],
  loading: false,
  creating: false,
  error: null,
  successMessage: null,
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_TIERS_REQUEST:
      return { ...state, loading: true, error: null };
    case SUBSCRIPTION_CREATE_REQUEST:
      return { ...state, creating: true, error: null, successMessage: null };
    case SUBSCRIPTION_TIERS_SUCCESS:
      return { ...state, loading: false, tiers: action.payload };
    case SUBSCRIPTION_CREATE_SUCCESS:
      return { ...state, creating: false, current: action.payload, successMessage: 'Subscription activated successfully.' };
    case SUBSCRIPTION_TRANSACTIONS_SUCCESS:
      return { ...state, loading: false, transactions: action.payload };
    case SUBSCRIPTION_CREATE_FAIL:
      return { ...state, creating: false, error: action.payload };
    case SUBSCRIPTION_TIERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

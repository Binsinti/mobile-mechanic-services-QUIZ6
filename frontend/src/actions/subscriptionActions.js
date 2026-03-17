import api from '../services/api';
import {
  SUBSCRIPTION_TIERS_REQUEST,
  SUBSCRIPTION_TIERS_SUCCESS,
  SUBSCRIPTION_TIERS_FAIL,
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
  SUBSCRIPTION_CREATE_FAIL,
  SUBSCRIPTION_TRANSACTIONS_SUCCESS,
} from '../constants/subscriptionConstants';

export const listSubscriptionTiers = () => async (dispatch) => {
  try {
    dispatch({ type: SUBSCRIPTION_TIERS_REQUEST });
    const { data } = await api.get('/subscriptions/tiers/');
    dispatch({ type: SUBSCRIPTION_TIERS_SUCCESS, payload: data.results || data || [] });
  } catch (error) {
    dispatch({ type: SUBSCRIPTION_TIERS_FAIL, payload: error.response?.data || 'Could not load tiers' });
  }
};

export const createSubscription = (tier_id) => async (dispatch) => {
  try {
    dispatch({ type: SUBSCRIPTION_CREATE_REQUEST });
    const { data } = await api.post('/subscriptions/subscribe/', { tier_id });
    dispatch({ type: SUBSCRIPTION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_CREATE_FAIL,
      payload: error.response?.data?.detail || error.response?.data || 'Could not create subscription',
    });
  }
};

export const listSubscriptionTransactions = () => async (dispatch) => {
  const { data } = await api.get('/subscriptions/transactions/');
  dispatch({ type: SUBSCRIPTION_TRANSACTIONS_SUCCESS, payload: data.results || data || [] });
};

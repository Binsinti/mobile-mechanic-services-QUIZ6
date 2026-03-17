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

const initialState = {
  services: [],
  serviceDetail: null,
  sellerServices: [],
  loading: false,
  error: null,
};

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
    case SERVICE_DETAIL_REQUEST:
    case SELLER_SERVICE_REQUEST:
      return { ...state, loading: true, error: null };
    case SERVICE_LIST_SUCCESS:
      return { ...state, loading: false, services: action.payload };
    case SERVICE_DETAIL_SUCCESS:
      return { ...state, loading: false, serviceDetail: action.payload };
    case SELLER_SERVICE_SUCCESS:
      return { ...state, loading: false, sellerServices: action.payload };
    case SERVICE_LIST_FAIL:
    case SERVICE_DETAIL_FAIL:
    case SELLER_SERVICE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

import { USER_LIST_SUCCESS, USER_UPDATE_SUCCESS, USER_DELETE_SUCCESS } from '../constants/userConstants';

const initialState = {
  users: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST_SUCCESS:
      return { ...state, users: action.payload };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.payload.id ? action.payload : u)),
      };
    case USER_DELETE_SUCCESS:
      return { ...state, users: state.users.filter((u) => u.id !== action.payload) };
    default:
      return state;
  }
};

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { authReducer } from './reducers/authReducers';
import { serviceReducer } from './reducers/serviceReducers';
import { orderReducer } from './reducers/orderReducers';
import { applicationReducer } from './reducers/applicationReducers';
import { subscriptionReducer } from './reducers/subscriptionReducers';
import { chatReducer } from './reducers/chatReducers';
import { userReducer } from './reducers/userReducers';

const thunkMiddleware = ({ dispatch, getState }) => (next) => (action) =>
  typeof action === 'function' ? action(dispatch, getState) : next(action);

const reducer = combineReducers({
  auth: authReducer,
  services: serviceReducer,
  orders: orderReducer,
  applications: applicationReducer,
  subscriptions: subscriptionReducer,
  chat: chatReducer,
  users: userReducer,
});

const middleware = [thunkMiddleware];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

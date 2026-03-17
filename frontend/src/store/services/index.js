import axiosInstance from './axiosInstance';

export const userService = {
  register: (userData) => axiosInstance.post('/api/v1/users/', userData),
  getProfile: () => axiosInstance.get('/api/v1/users/me/'),
  updateProfile: (data) => axiosInstance.patch('/api/v1/users/me/', data),
};

export const serviceService = {
  getAll: () => axiosInstance.get('/api/v1/services/'),
  getById: (id) => axiosInstance.get(`/api/v1/services/${id}/`),
};

export const orderService = {
  getAll: () => axiosInstance.get('/api/v1/orders/'),
  create: (data) => axiosInstance.post('/api/v1/orders/', data),
  getById: (id) => axiosInstance.get(`/api/v1/orders/${id}/`),
  update: (id, data) => axiosInstance.patch(`/api/v1/orders/${id}/`, data),
  markCompleted: (id) => axiosInstance.post(`/api/v1/orders/${id}/mark_completed/`),
};

export const chatService = {
  sendMessage: (message) => axiosInstance.post('/api/v1/chat/ask/', { message }),
  getHistory: () => axiosInstance.get('/api/v1/chat/history/'),
};

export const subscriptionService = {
  getTiers: () => axiosInstance.get('/api/v1/subscriptions/tiers/'),
  getCurrent: () => axiosInstance.get('/api/v1/subscriptions/user/current/'),
  subscribe: (tierId) => axiosInstance.post('/api/v1/subscriptions/user/subscribe/', { tier_id: tierId }),
  createPayPalPayment: (tierId) => axiosInstance.post('/api/v1/subscriptions/user/paypal_create/', { tier_id: tierId }),
  executePayPalPayment: (data) => axiosInstance.post('/api/v1/subscriptions/user/paypal_execute/', data),
};

export const applicationService = {
  getAll: () => axiosInstance.get('/api/v1/applications/'),
  create: (data) => axiosInstance.post('/api/v1/applications/', data),
  getById: (id) => axiosInstance.get(`/api/v1/applications/${id}/`),
};

export default axiosInstance;

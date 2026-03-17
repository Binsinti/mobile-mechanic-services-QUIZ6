import axios from 'axios';

const rawApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const normalizedApiRoot = rawApiUrl.replace(/\/+$/, '').replace(/\/api\/v1$/, '');

const api = axios.create({
  baseURL: `${normalizedApiRoot}/api/v1`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

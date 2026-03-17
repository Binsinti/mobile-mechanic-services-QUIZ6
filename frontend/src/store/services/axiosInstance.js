import axios from 'axios';

const rawApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const normalizedApiRoot = rawApiUrl.replace(/\/+$/, '').replace(/\/api\/v1$/, '');

const axiosInstance = axios.create({
  baseURL: normalizedApiRoot,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refresh = localStorage.getItem('refresh');
        const response = await axios.post(`${normalizedApiRoot}/api/token/refresh/`, { refresh });
        localStorage.setItem('access', response.data.access);
        axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

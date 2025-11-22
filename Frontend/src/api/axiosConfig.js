import axios from 'axios';
import useAuthStore from '../store/authStore';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add access token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().getAccessToken();
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = useAuthStore.getState().getRefreshToken();
        
        if (!refreshToken) {
          // No refresh token, logout user
          useAuthStore.getState().logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        // Try to refresh the access token
        const response = await axios.post(
          'http://localhost:8000/api/v1/users/refresh-token',
          { refreshToken },
          { withCredentials: true }
        );
        
        if (response.data?.data?.accessToken) {
          const { accessToken, refreshToken: newRefreshToken } = response.data.data;
          
          // Update tokens in store
          useAuthStore.getState().updateTokens(accessToken, newRefreshToken || refreshToken);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
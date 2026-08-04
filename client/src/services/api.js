import axios from 'axios';

/**
 * Axios instance configured for SkyCast Backend API endpoints
 */
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response Interceptor: Extract response payload & format error messages
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = 'An unexpected error occurred.';

    if (error.response) {
      message = error.response.data?.message || `Server Error (${error.response.status})`;
    } else if (error.request) {
      message = 'Unable to connect to SkyCast backend server.';
    } else {
      message = error.message;
    }

    return Promise.reject({
      message,
      status: error.response?.status || 500,
    });
  }
);

export default api;

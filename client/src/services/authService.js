import api from './api';

/**
 * Service for interacting with Authentication API endpoints
 */
export const authService = {
  /**
   * Register new user account
   * @param {Object} userData { name, email, password }
   */
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  /**
   * Login existing user
   * @param {Object} credentials { email, password }
   */
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  /**
   * Fetch authenticated user profile
   */
  getMe: async () => {
    return api.get('/auth/me');
  },
};

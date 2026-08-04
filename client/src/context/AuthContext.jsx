import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

/**
 * Global Auth Provider managing JWT token, current user, login, register, and logout
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('skycast_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('skycast_token') || null;
  });

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Helper to persist auth payload in state & localStorage
  const handleAuthSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('skycast_user', JSON.stringify(userData));
    localStorage.setItem('skycast_token', userToken);
    setAuthError(null);
  };

  // Register Handler
  const register = async (name, email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await authService.register({ name, email, password });
      if (res.success && res.data) {
        const { token: userToken, ...userData } = res.data;
        handleAuthSuccess(userData, userToken);
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err) {
      const errMsg = err.message || 'Failed to register account.';
      setAuthError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setAuthLoading(false);
    }
  };

  // Login Handler
  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await authService.login({ email, password });
      if (res.success && res.data) {
        const { token: userToken, ...userData } = res.data;
        handleAuthSuccess(userData, userToken);
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (err) {
      const errMsg = err.message || 'Invalid email address or password.';
      setAuthError(errMsg);
      return { success: false, message: errMsg };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout Handler
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('skycast_user');
    localStorage.removeItem('skycast_token');
    setAuthError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        authLoading,
        authError,
        setAuthError,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

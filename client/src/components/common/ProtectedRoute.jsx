import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

/**
 * Higher-Order Component to protect private routes requiring JWT Authentication
 */
export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, authLoading } = useAuthContext();

  if (authLoading) {
    return (
      <div className="py-24">
        <LoadingSpinner label="Verifying security credentials..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

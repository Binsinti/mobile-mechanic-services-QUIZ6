import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { userInfo, token } = useSelector((state) => state.auth);

  if (!token || !userInfo) {
    return <Navigate to="/signin" replace />;
  }

  if (roles.length && !roles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

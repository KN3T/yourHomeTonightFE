import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem('role');

  if (role === 'ROLE_HOTEL') {
    return children;
  } else {
    <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;

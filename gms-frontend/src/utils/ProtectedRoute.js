// src/utils/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLogin = sessionStorage.getItem("isLogin");
  return isLogin ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

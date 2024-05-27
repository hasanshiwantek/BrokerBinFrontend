import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  // const token = localStorage.getItem("user");
  const token = Cookies.get('token');
  return !!token; // Returns true if token exists
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

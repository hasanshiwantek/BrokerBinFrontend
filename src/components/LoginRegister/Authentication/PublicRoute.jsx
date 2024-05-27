import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  // const token = localStorage.getItem("user");
  const token = Cookies.get('token');
  return !!token; // Returns true if the token exists
};

const PublicRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;

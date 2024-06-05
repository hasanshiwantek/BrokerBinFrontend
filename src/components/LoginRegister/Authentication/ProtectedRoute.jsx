import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  const token = Cookies.get("token");
  return !!token; // Returns true if token exists
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);

  return isAuth ? <Outlet /> : null;
};

export default ProtectedRoute;

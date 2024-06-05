import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useAuth = () => {
  // const token = localStorage.getItem("user");
  const token = Cookies.get("token");
  return !!token; // Returns true if the token exists
};

const PublicRoute = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth, navigate]);

  return !isAuth ? <Outlet /> : null;
};

export default PublicRoute;

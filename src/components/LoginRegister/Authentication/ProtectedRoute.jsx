import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAutoLogout, logoutUser } from "@/lib/authUtils";

const useAuth = () => {
  const token = Cookies.get("token");
  return !!token; // Returns true if token exists
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);

   useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");

    if (token && expiry) {
      const timeLeft = Number(expiry) - Date.now();
      if (timeLeft > 0) {
        setAutoLogout(timeLeft, dispatch, navigate);
      } else {
        logoutUser(dispatch, navigate);
      }
    }
  }, [dispatch, navigate]);

  return isAuth ? <Outlet /> : null;
};

export default ProtectedRoute;


// const useAuth = () => {
//   const [isAuth, setIsAuth] = React.useState(!!Cookies.get("token"));

//   useEffect(() => {
//     const checkAuth = () => setIsAuth(!!Cookies.get("token"));
//     window.addEventListener("storage", checkAuth);
//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   return isAuth;
// };
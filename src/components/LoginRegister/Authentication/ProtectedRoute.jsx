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


// const useAuth = () => {
//   const [isAuth, setIsAuth] = React.useState(!!Cookies.get("token"));

//   useEffect(() => {
//     const checkAuth = () => setIsAuth(!!Cookies.get("token"));
//     window.addEventListener("storage", checkAuth);
//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   return isAuth;
// };
import Cookies from "js-cookie";
import { clearUserDetails } from "../ReduxStore/UserSlice"; // adjust path
import { resetProfileState } from "@/ReduxStore/ProfleSlice";
import store from "../ReduxStore/Store.js";


export const logoutUser = (dispatch, navigate) => {
  // store.dispatch(clearUserDetails());
  // store.dispatch(resetProfileState?.()); // remove if not used
  dispatch(clearUserDetails());
  dispatch(resetProfileState?.()); // optional
  localStorage.removeItem("token");
  localStorage.removeItem("token_expiry");
  localStorage.removeItem("user");
  localStorage.removeItem("companyId");
  Cookies.remove("token");
  Cookies.remove("user_id");
  Cookies.remove("companyId");

   navigate("/login", { replace: true });
};

// export const setAutoLogout = (delay) => {
//   setTimeout(() => {
//     logoutUser();
//   }, delay);
// };

export const setAutoLogout = (delay, dispatch, navigate) => {
  setTimeout(() => {
    logoutUser(dispatch, navigate);
  }, delay);
};


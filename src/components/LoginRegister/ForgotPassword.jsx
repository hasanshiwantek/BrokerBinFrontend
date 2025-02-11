import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import css from "../../styles/LoginRegister/Login.module.css";
import { FaFacebookF, FaGooglePlusG, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import brokerLogo from "../../imgs/logo/BrokerCell Logo.svg";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const popUpRef = useRef();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "https://backend.brokercell.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        const user = result.data;
        const { access_token } = result.data;
        const { id } = result.data.user;

        Cookies.set("token", access_token, { expires: 1, secure: true });
        Cookies.set("user_id", id, { expires: 1, secure: true });
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/"); // Redirect the user
      } else {
        setErrorMessage(result.message || "Login failed, please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const arrow = "<"






  return (
    <div className={css.bg}>

      <div className="!flex !items-center !justify-evenly !gap-5 space-x-40 p-10 space-y-40">
        <div className={`${css.logoSec} `}>

          <img src={brokerLogo} alt="BrokerLogo" srcset="" />


        </div>


        <div className={css.loginContainer}>
          <span className={css.loginContainer_head}>
            <h1 className="!text-center text-blue-700">RESET PASSWORD</h1>
          </span>
          <form className={css.loginContainer_form} onSubmit={handleSubmit}>
            <span className={css.loginContainer_form_fields}>
              <label htmlFor="email" className="text-center" >USER NAME / EMAIL</label>
              <input
                type="text"
                name="userName"
                placeholder="Enter your email"
                required
              />
            </span>
            <p className="text-center text-[#444]">Enter a valid email or login and a password reset link will be sent to you</p>
            <span className={css.loginContainer_form_fields}>
            </span>
            {errorMessage && (
              <p style={{ color: "red" }} className={css.error}>
                {errorMessage}
              </p>
            )}
            <button type="submit" disabled={loading}>
              {loading ? (
                <span className={css.loader}></span> // Loader class for styling
              ) : (
                "RESET PASSWORD"
              )}
            </button>

            <div className="text-center">
              <div className="mt-5 text-[#444]">
                <NavLink to={"https://brokercell.com"} >
                 {arrow} Back to BrokerCell
                </NavLink>
              </div>
            </div>
          </form>
        </div>


      </div>
    </div>
  );
};

export default ForgotPassword;
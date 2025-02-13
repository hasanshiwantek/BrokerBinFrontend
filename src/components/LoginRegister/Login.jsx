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

const Login = () => {
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


  const submitHandle = (e) => {
    console.log(e)
  }
  return (
    <div className={css.bg}>
      <div className={`${css.loginContainerHead}!flex !items-center !justify-evenly !gap-5 space-x-40 p-10 space-y-40 `}>
        <div className={`${css.logoSec} `}>
          <img src={brokerLogo} alt="BrokerLogo" srcset="" />
        </div>
        <div className={`${css.loginContainer}`}>
          <span className={css.loginContainer_head}>
            <h1 className="!text-center text-blue-700">MEMBER LOGIN</h1>
          </span>
          <form className={css.loginContainer_form} onSubmit={handleSubmit}>
            <span className={css.loginContainer_form_fields}>
              <label htmlFor="email">USER NAME / EMAIL</label>
              <input
                type="text"
                name="userName"
                placeholder="Enter your username / email"
                required
              />
            </span>
            <span className={css.loginContainer_form_fields}>
              {/* <span className={css.loginContainer_form_forgotPassword}>
                <label htmlFor="password">PASSWORD</label>
                <a onClick={() => setForgotPassword((prev) => !prev)}>
                  Forgot password?
                </a>
              </span> */}
              <span className={css.loginContainer_form_eyeSlash}>
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="true"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className={`${css.togglePasswordButton} !bg-transparent`}
                >
                  {passwordShown ? <FaEyeSlash /> : <FaEye />}
                </button>
              </span>
            </span>
            <span className={css.loginContainer_form_rememberMe}>
              <input type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
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
                "Sign in"
              )}
            </button>

            <div className="text-center">
              <span>Forgot: <NavLink to={"/login/forgot"} className="text-blue-600">Login</NavLink> / <NavLink className="text-blue-600" to={"/password/forgot"} >Password</NavLink> </span>
              <div className="mt-5 text-[#444]">
                <NavLink to={"https://brokercell.com"} >
                  {arrow} Back to BrokerCell
                </NavLink>
              </div>
            </div>
          </form>
          {/* <div className={css.loginContainer_bottom}>
            <span className={css.loginContainer_bottom_creatAnAccount}>
              <p>New on our platform?</p>
              <a href="/register">Create an account</a>
            </span> 
          </div> */}
        </div>


      </div>

      {forgotPassword && (
        <div className={css.forgotPasswordPopup}>
          <div className={css.forgotPasswordPopup_body} ref={popUpRef}>
            <form action="" onSubmit={submitHandle}>
              <h1>enter your mail</h1>
              <input
                type="email"
                name="forgotMail"
                placeholder="Enter your email"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
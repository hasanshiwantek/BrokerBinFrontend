import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import css from "../../styles/LoginRegister/Login.module.css";
import { FaFacebookF, FaGooglePlusG, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Cookies from "js-cookie";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const popUpRef = useRef();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    "use server";
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
    // console.log(JSON.stringify(data));

    try {
      const response = await fetch(
        "https://brokerbinbackend.advertsedge.com/api/user/login",
        {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // Use the JavaScript function JSON.stringify() to convert it into a string.
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // console.log("Login successful", result);
        const user = result.data;
        console.log(user);
        const { access_token } = result.data;
        const { id } = result.data.user;
        console.log(id);
        // console.log(result.data.user.firstName, result.data.user.lastName);
        // console.log(result.data.access_token);

        // Store the token in local storage
        // Use the JavaScript function JSON.stringify() to convert it into a string.
        // localStorage.setItem("token", JSON.stringify(token));
        Cookies.set("token", access_token, { expires: 1 / 24, secure: true });
        // Cookies.set("token", "kaif abbas", { expires: 1 / 24, secure: true });
        Cookies.set("user_id", id, { expires: 1, secure: true });
        // Cookies.set('token', access_token, { expires: 1 / 1440 }); // There are 1440 minutes in a day
        // Cookies.set("token", access_token, { expires: 1 });
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect the user to another page (e.g., dashboard)
        navigate("/");
      } else {
        console.error("Login failed", result);
        setErrorMessage(result.message || "Login failed, please try again.");
      }
    } catch (error) {
      console.error("Error during login", error);
      setErrorMessage("An error occurred, please try again later.");
    }

    // e.target.reset();
  };

  // useEffect(() => {
  const handleClick = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      setForgotPassword((prev) => !prev);
    }
  };
  document.addEventListener("click", handleClick);

  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, [forgotPassword]);

  // useEffect(() => {
  //   const token = localStorage.getItem("user");
  //   if (token) {
  //     // Optional: Validate the token if needed
  //     // For simplicity, assume token is valid and redirect
  //     navigate("/");
  //   }
  //   else{
  //     navigate("/login");

  //   }
  // }, [navigate]);

  return (
    <div className={css.bg}>
      <div className={css.loginContainer}>
        <span className={css.loginContainer_head}>
          <h1>Welcome to Brokerbin</h1>
          <p>Please sign in to your account and start B2B</p>
        </span>
        <form className={css.loginContainer_form} onSubmit={handleSubmit}>
          <span className={css.loginContainer_form_fields}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="userName"
              placeholder="Enter your email"
              required
            />
          </span>
          <span className={css.loginContainer_form_fields}>
            <span className={css.loginContainer_form_forgotPassword}>
              <label htmlFor="password">Password</label>
              <a onClick={() => setForgotPassword((prev) => !prev)}>
                Forgot password?
              </a>
            </span>
            <span className={css.loginContainer_form_eyeSlash}>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
              />
              <button
                onClick={togglePasswordVisibility}
                type="button"
                className={css.togglePasswordButton}
              >
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </button>
            </span>
          </span>
          <span className={css.loginContainer_form_rememberMe}>
            <input type="checkbox" name="rememberMe" id="rememberMe" />
            <label>Remember me</label>
          </span>
          {errorMessage && (
            <p style={{ color: "red" }} className={css.error}>
              {errorMessage}
            </p>
          )}
          <button type="submit">Sign in</button>
        </form>
        <div className={css.loginContainer_bottom}>
          <span className={css.loginContainer_bottom_creatAnAccount}>
            <p>New on our platform?</p>
            <a href="/register">Create an account</a>
          </span>
          <div className={css.loginContainer_bottom_divider}>
            <div className={css.loginContainer_bottom_divider_text}>or</div>
          </div>
          <div className={css.loginContainer_bottom_socials}>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaGooglePlusG />
            </a>
            <a href="#">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
      {forgotPassword && (
        <div className={css.forgotPasswordPopup}>
          <div className={css.forgotPasswordPopup_body} ref={popUpRef}>
            <form action="">
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

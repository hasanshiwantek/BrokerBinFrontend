import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import css from "../../styles/LoginRegister/Login.module.css";
import brokerLogo from "../../imgs/logo/BrokerCell Logo.svg";
import { NavLink } from "react-router-dom";
import { brokerAPI } from "../api/BrokerEndpoint";
import PopupAlert from "@/components/Popups/PopupAlert";
const ForgotPassword = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup((prev) => ({ ...prev, show: false }));
    }, 2000);
  };
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      console.log("Submitting password reset request", data);
      const response = await fetch(`${brokerAPI}user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Response received:", result);

      if (response.ok) {
        showPopup(
          "success",
          "Password reset link sent successfully! Check your inbox."
        );

        console.log("Reset link sent successfully");
      } else {
        setErrorMessage(result.message || "Request failed, please try again.");
        showPopup("error", result.message);

        console.log("Error response:", result);
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again later.");
      console.log("Error occurred:", error);
    } finally {
      setLoading(false); // Stop loading
      console.log("Loading state set to false");
    }
  };

  const arrow = "<";

  return (
    <div className={css.bg}>
      <div className="!flex !items-center !justify-evenly !gap-5 space-x-40 p-10 space-y-40">
        <div className={`${css.logoSec} `}>
          <img src={brokerLogo} alt="BrokerLogo" srcset="" />
        </div>
        <div className={css.loginContainer}>
          <span className={css.loginContainer_head}>
            <h1 className="!text-center text-blue-700 !text-4xl font-semibold">
              RESET PASSWORD
            </h1>
          </span>
          <form className={css.loginContainer_form} onSubmit={handleSubmit}>
            <span className={css.loginContainer_form_fields}>
              <label htmlFor="email" className="text-center">
                USER NAME / EMAIL
              </label>
              <input
                type="text"
                name="email"
                placeholder="Enter your username / email"
                required
                className="text-center"
              />
            </span>
            <p className="text-center text-[#444] ">
              Enter a valid email or login and a password reset link will be
              sent to you
            </p>
            <span className={css.loginContainer_form_fields}></span>
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
                <NavLink to={"https://brokercell.com"}>
                  {arrow} Back to BrokerCell
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default ForgotPassword;

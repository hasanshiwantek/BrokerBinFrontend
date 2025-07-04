import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "../../../styles/LoginRegister/Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import brokerLogo from "../../../imgs/logo/BrokerCell Logo.svg";
import { NavLink } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { brokerAPI } from "@/components/api/BrokerEndpoint";
import PopupAlert from "@/components/Popups/PopupAlert";

const RecoverPassword = () => {
  const [passwordShown, setPasswordShown] = useState({
    newPassword: false,
    confirmPassword: false,
  });

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

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    setPasswordShown((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const token = searchParams.get("token"); // Extract token from URL

    if (!token) {
      setErrorMessage("Invalid or expired password reset link.");
      setLoading(false);
      return;
    }
    try {
      console.log("Submitting password change request", { token, ...data });
      const response = await fetch(`${brokerAPI}user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: data.password,
          password_confirmation: data.password_confirmation,
        }),
      });

      const result = await response.json();
      console.log("Response received:", result);

      if (response.ok) {
        showPopup("success", "Password changed successfully! Please log in.");

        console.log("Navigating to login page");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrorMessage(result.message || "Request failed, please try again.");
        console.log("Error response:", result);
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again later.");
      console.log("Error occurred:", error);
    } finally {
      setLoading(false);
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
              CONFIRM PASSWORD
            </h1>
            <p className="text-center text-[#444]">Enter your new password </p>
          </span>
          <form className={css.loginContainer_form} onSubmit={handleSubmit}>
            <span className={css.loginContainer_form_fields}>
              <span className={`${css.loginContainer_form_eyeSlash} mb-6`}>
                <input
                  type={passwordShown.newPassword ? "text" : "password"}
                  name="password"
                  placeholder="New Password"
                  required
                  autoComplete="true"
                />
                <button
                  onClick={() => togglePasswordVisibility("newPassword")}
                  type="button"
                  className={`${css.togglePasswordButton} !bg-transparent`}
                >
                  {passwordShown.newPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </span>
              <span className={css.loginContainer_form_eyeSlash}>
                <input
                  type={passwordShown.confirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="Confirm New Password"
                  required
                  autoComplete="true"
                />
                <button
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  type="button"
                  className={`${css.togglePasswordButton} !bg-transparent`}
                >
                  {passwordShown.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </span>
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
                "Save Password"
              )}
            </button>
          </form>

          <div className="text-center">
            <div className="mt-5 text-[#444]">
              <NavLink to={"https://brokercell.com"}>
                {arrow} Back to BrokerCell
              </NavLink>
            </div>
          </div>
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

export default RecoverPassword;

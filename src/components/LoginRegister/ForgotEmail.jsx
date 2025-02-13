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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { brokerAPI } from "../api/BrokerEndpoint";
const ForgotEmail = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const popUpRef = useRef();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            console.log("Submitting forgot password request", data);
            const response = await fetch(`${brokerAPI}user/forgot-username`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Response received:", result);

            if (response.ok) {
                toast.success("Email sent successfully! Check your inbox.");
                console.log("Forgot password email sent successfully");
            } else {
                setErrorMessage(result.message || "Request failed, please try again.");
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
    const arrow = "<"
    return (
        <div className={css.bg}>

            <div className="!flex !items-center !justify-evenly !gap-5 space-x-40 p-10 space-y-40">
                <div className={`${css.logoSec} `}>

                    <img src={brokerLogo} alt="BrokerLogo" srcset="" />


                </div>


                <div className={css.loginContainer}>
                    <span className={css.loginContainer_head}>
                        <h1 className="!text-center text-blue-700">RECOVER LOST LOGIN</h1>
                    </span>
                    <form className={css.loginContainer_form} onSubmit={handleSubmit}>
                        <span className={css.loginContainer_form_fields}>
                            <label htmlFor="email" className="text-center" >EMAIL ADDRESS</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="EMAIL ADDRESS"
                                required
                                className="text-center"

                            />
                        </span>
                        <p className="text-center text-[#444]">Enter a valid email and your login will be sent to you</p>
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
                                "RECOVER LOGIN"
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
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default ForgotEmail;
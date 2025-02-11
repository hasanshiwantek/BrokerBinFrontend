import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import css from "../../../styles/LoginRegister/Login.module.css";
import { FaFacebookF, FaGooglePlusG, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import brokerLogo from "../../../imgs/logo/BrokerCell Logo.svg";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Login = () => {


    const [passwordShown, setPasswordShown] = useState({
        newPassword: false,
        confirmPassword: false
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);



    const navigate = useNavigate();
    const popUpRef = useRef();
    const dispatch = useDispatch();

    const togglePasswordVisibility = (field) => {
        setPasswordShown(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
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
                        <h1 className="!text-center text-blue-700">CONFIRM PASSWORD</h1>
                        <p className="text-center text-[#444]">Enter your new password </p>
                    </span>
                    <form className={css.loginContainer_form} onSubmit={handleSubmit}>
                        <span className={css.loginContainer_form_fields}>
                            <span className={css.loginContainer_form_eyeSlash}>
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
                                    name="confirmPassword"
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
                            <NavLink to={"https://brokercell.com"} >
                                {arrow} Back to BrokerCell
                            </NavLink>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Login;
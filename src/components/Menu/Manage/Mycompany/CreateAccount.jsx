import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { brokerAPI } from "../../../api/BrokerEndpoint";
import Cookies from "js-cookie";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { createUser } from "@/ReduxStore/ProfleSlice";
import PopupAlert from "@/components/Popups/PopupAlert";

const CreateAccount = () => {
  const token = Cookies.get("token");
  console.log(token);

  const [showPassword, setShowPassword] = useState(false);
  const [showRetype, setShowRetype] = useState(false);
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
  const [formData, setFormData] = useState({
    userId: "",
    lastName: "",
    firstName: "",
    position: "",
    specialty: "",
    phoneNumber: "",
    tollFree: "",
    cellular: "",
    faxNumber: "",
    security: "Browse Only",
    email: "",
    imScreenNames: {
      skype: "",
      teams: "",
      whatsapp: "",
      trillian: "",
    },
    socialNetworking: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    password: "",
    retypePassword: "",
    preferredUse: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      // For `imScreenNames` nested updates
      if (["skype", "whatsapp", "trillian", "teams"].includes(name)) {
        return {
          ...prevFormData,
          imScreenNames: {
            ...prevFormData.imScreenNames,
            [name]: value,
          },
        };
      }
      // For `socialNetworking` nested updates
      if (["facebook", "linkedin", "twitter"].includes(name)) {
        return {
          ...prevFormData,
          socialNetworking: {
            ...prevFormData.socialNetworking,
            [name]: value,
          },
        };
      }
      // For non-nested updates
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.retypePassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const result = await dispatch(createUser({ formData, token }));
      if (createUser.fulfilled.match(result)) {
        showPopup(
          "success",
          result.payload.message || "Account Created Successfully"
        );

        // Reset formData to initial values
        setFormData({
          userId: "",
          lastName: "",
          firstName: "",
          position: "",
          specialty: "",
          phoneNumber: "",
          tollFree: "",
          cellular: "",
          faxNumber: "",
          security: "Browse Only",
          email: "",
          imScreenNames: {
            skype: "",
            teams: "",
            whatsapp: "",
            trillian: "",
          },
          socialNetworking: {
            facebook: "",
            twitter: "",
            linkedin: "",
          },
          password: "",
          retypePassword: "",
          preferredUse: "",
        });
        console.log("✅ User created:", result.payload.data);
      } else {
        showPopup("error", result.payload || "Error creating account");
      }
    } catch (error) {
      showPopup("error", error || "Error Creating Account.Please Try Again.");
      console.error(error);
    }
  };

  return (
    <div className={`px-5 ${css.profileLayout} `}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={`${css.profileInfo} !bg-white  border-8  !p-0`}>
          <div className={css.profileInfo_links}>
            <ul className="bg-gray-200">
              <li>
                <NavLink
                  to="/mycompany"
                  // end
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Primary Contact</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/Createaccount"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Create Account</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/companyContacts"
                  end
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Company Contacts</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mycompany/CompanyInfo"
                  end
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Company Info</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mycompany/SalesInfo"
                  end
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Sales Info</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mycompany/Photos"
                  end
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Photos</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mycompany/Billing+Info"
                  end
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  <span>Billing</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <h1 className="pt-5 p-4 !font-semibold text-[#444]">
            Create Account
          </h1>

          <div className="!flex !justify-between !space-x-[4vw] !pt-10 !p-14 ">
            <div className="!flex !flex-col !text-right !gap-5">
              <span className="space-x-4">
                <label>Login</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </span>

              <span className="space-x-4">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </span>

              <span className="space-x-4">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </span>

              <span className="space-x-4">
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </span>

              <span className="space-x-4">
                <label>Specialty (if any)</label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                />
              </span>

              <span className="space-x-4">
                <label>Direct Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </span>

              <span className="space-x-4">
                <label>Toll Free</label>
                <input
                  type="text"
                  name="tollFree"
                  value={formData.tollFree}
                  onChange={handleChange}
                />
              </span>

              <span className="space-x-4">
                <label>Cellular</label>
                <input
                  type="text"
                  name="cellular"
                  value={formData.cellular}
                  onChange={handleChange}
                />
              </span>

              <span className="space-x-4">
                <label>Fax</label>
                <input
                  type="text"
                  name="fax"
                  value={formData.fax}
                  onChange={handleChange}
                />
              </span>

              <span className="space-x-4 flex justify-start items-center ">
                <label className="w-[150px]">Security</label>
                <select
                  name="security"
                  value={formData.security}
                  onChange={handleChange}
                  className="border px-3 py-2 rounded "
                >
                  <option value="Browse Only">Browse Only</option>
                  <option value="Full Access">Full Access</option>
                </select>
              </span>

              <span className="space-x-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </span>

              <div className="space-y-4">
                {/* Password Field */}
                <div className="relative flex items-center space-x-4">
                  <label className="w-[150px] text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="absolute right-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </div>

                {/* Retype Password Field */}
                <div className="relative flex items-center space-x-4">
                  <label className="w-[150px] text-sm font-medium text-gray-700">
                    Re-Type Password
                  </label>
                  <input
                    type={showRetype ? "text" : "password"}
                    name="retypePassword"
                    value={formData.retypePassword}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="absolute right-3 cursor-pointer text-gray-500"
                    onClick={() => setShowRetype(!showRetype)}
                  >
                    {showRetype ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </div>
              </div>

              <div className="text-left">
                <h3 className="!text-2xl font-semibold">
                  Preferred Brokercell Use
                </h3>
                <div className="flex flex-col gap-8 justify-between items-center mt-4">
                  <label>
                    <input
                      type="radio"
                      name="preferredUse"
                      value="Telecom"
                      onChange={handleChange}
                    />{" "}
                    Telecom
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="preferredUse"
                      value="Computer"
                      onChange={handleChange}
                    />{" "}
                    Computer
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col text-right gap-5">
              <div className="border  p-10 flex flex-col gap-5">
                <h3 className="font-semibold text-[#444] text-left !text-2xl">
                  IM Screen Names
                </h3>

                <span className="space-x-4 flex justify-between items-center !text-[8pt]">
                  <div className="flex items-center">
                    <label>Skype</label>
                    <img
                      src="https://ben.cachefly.net/images/social_networks/tiny_skype.png"
                      alt="Skype"
                      title="Skype"
                    ></img>
                  </div>

                  <input
                    type="text"
                    name="skype"
                    value={formData.imScreenNames.skype}
                    onChange={handleChange}
                    placeholder="Screen Name"
                    className="w-[20rem]"
                  />
                </span>

                <span className="space-x-4 flex justify-between items-center !text-[8pt]">
                  <div className="flex items-center">
                    <label>Teams</label>
                    <img
                      src="https://ben.cachefly.net/images/social_networks/tiny_teams.png"
                      alt="Teams"
                      title="Teams"
                    ></img>
                  </div>

                  <input
                    type="text"
                    name="teams"
                    value={formData.imScreenNames.teams}
                    onChange={handleChange}
                    placeholder="Screen Name"
                    className="w-[20rem]"
                  />
                </span>

                <span className="space-x-4 flex justify-between items-center !text-[8pt]">
                  <div className="flex items-center ">
                    <label htmlFor="whatsapp">WhatsApp</label>
                    <img
                      src="https://ben.cachefly.net/images/social_networks/tiny_whatsapp.png"
                      alt="WhatsApp"
                      title="WhatsApp"
                    />
                  </div>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.imScreenNames.whatsapp}
                    onChange={handleChange}
                    placeholder="Screen Name"
                    className="w-[20rem]"
                  />
                </span>

                <span className="space-x-4 flex justify-between items-center !text-[8pt]">
                  <div className="flex items-center">
                    <label htmlFor="trillian">Trillian</label>
                    <img
                      src="https://ben.cachefly.net/images/social_networks/tiny_trillian.png"
                      alt="Trillian"
                      title="Trillian"
                    />
                  </div>
                  <input
                    type="text"
                    name="trillian"
                    value={formData.imScreenNames.trillian}
                    onChange={handleChange}
                    placeholder="Screen Name"
                    className="w-[20rem]"
                  />
                </span>
              </div>
              <div className="border p-10 flex flex-col gap-5">
                <h3 className="font-semibold text-[#444] text-left !text-2xl">
                  Social Networking
                </h3>

                <span className="space-x-4 flex justify-between items-center !text-[8pt]">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center">
                      <label htmlFor="facebook">Facebook</label>
                      <img
                        src="https://ben.cachefly.net/images/social_networks/tiny_facebook.png"
                        alt="Facebook"
                        title="Facebook"
                      />
                    </div>
                    <div>
                      <span className="text-base text-[#444]">Test</span>
                    </div>
                  </div>

                  <input
                    type="text"
                    name="facebook"
                    value={formData.socialNetworking.facebook || ""}
                    onChange={handleChange}
                    placeholder="Profile URL"
                    className="w-[20rem]"
                  />
                </span>

                <span className="space-x-4 flex justify-between items-center !text-[8pt]">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center">
                      <label htmlFor="twitter">Twitter</label>
                      <img
                        src="https://ben.cachefly.net/images/social_networks/tiny_twitter.png"
                        alt="Twitter"
                        title="Twitter"
                      />
                    </div>
                    <div>
                      <span className="text-base text-[#444]">Test</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.socialNetworking.twitter || ""}
                    onChange={handleChange}
                    placeholder="Profile URL"
                    className="w-[20rem]"
                  />
                </span>

                <span className="space-x-4 flex justify-between items-center !text-[8pt]">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center">
                      <label htmlFor="linkedin">LinkedIn</label>
                      <img
                        src="https://ben.cachefly.net/images/social_networks/tiny_linkedin.png"
                        alt="LinkedIn"
                        title="LinkedIn"
                      />
                    </div>
                    <div>
                      <span className="text-base text-[#444]">Test</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.socialNetworking.linkedin || ""}
                    onChange={handleChange}
                    placeholder="Profile URL"
                    className="w-[20rem]"
                  />
                </span>

                <span>
                  <p className="pt-4 italic text-gray-600 text-[7.5pt] leading-tight w-64">
                    (use the profile/url name, example 'brokercell' will result
                    in http://twitter.com/cell )
                  </p>
                </span>
              </div>

              <div className="border p-10 flex flex-col gap-5">
                <h3 className="font-semibold text-[#444] text-left !text-2xl">
                  Password Requirements
                </h3>
                <div className="text-left">
                  <p className="text-[8pt] font-semibold">
                    Your password must contain:
                  </p>
                  <ul>
                    <li className="text-[8pt]">1 uppercase letter</li>
                    <li className="text-[8pt]">1 lowercase letter</li>
                    <li className="text-[8pt]">1 digit</li>
                    <li className="text-[8pt]">8 characters minimum</li>
                    <li className="text-[8pt]">24 characters maximum</li>
                  </ul>
                  <p className="text-[8pt] font-semibold">
                    Password cannot contain:
                  </p>
                  <ul>
                    <li className="text-[8pt]">Your Login Name</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#bfbfbf]">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#2c83ec] rounded-lg  px-12 !h-16 "
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default CreateAccount;

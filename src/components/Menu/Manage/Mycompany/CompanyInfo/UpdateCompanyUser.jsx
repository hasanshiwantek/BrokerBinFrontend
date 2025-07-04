import React, { useEffect, useState } from "react";
import css from "@/styles/Menu/Manage/MyProfile.module.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { updateCompanyUserData } from "@/ReduxStore/ProfleSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PopupAlert from "@/components/Popups/PopupAlert";

const UpdateCompanyUser = () => {
  const token = Cookies.get("token");
  const { state } = useLocation();
  const contact = state?.contact;
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRetype, setShowRetype] = useState(false);

  useEffect(() => {
    if (contact) {
      setForm({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phoneNumber: contact.phoneNumber || "",
        cellular: contact.cellular || "",
        tollFree: contact.tollFree || "",
        faxNumber: contact.faxNumber || "",
        position: contact.position || "",
        specialty: contact.specialty || "",
        userId: contact.userId || "",
        company_id: contact.company_id,
        userRole: contact.userRole,
        password: contact.password || "",
        confirmPassword: contact.confirmPassword || "",
        preferredUse: contact.preferredUse || "",

        profileImage: contact.profileImage || "",
        imScreenNames: {
          skype: contact.imScreenNames?.skype || "",
          teams: contact.imScreenNames?.teams || "",
          whatsapp: contact.imScreenNames?.whatsapp || "",
          trillian: contact.imScreenNames?.trillian || "",
        },
        socialNetworking: {
          facebook: contact.socialNetworking?.facebook || "",
          twitter: contact.socialNetworking?.twitter || "",
          linkedin: contact.socialNetworking?.linkedin || "",
        },
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent] || {}),
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(
        updateCompanyUserData({
          id: contact.id,
          token,
          data: { plainData: form },
        })
      ).unwrap();

      if (result?.status === 200) {
        showPopup("success", result.message || "Contact updated successfully!");
        setTimeout(() => navigate("/companyContacts"), 1500);
      } else {
        showPopup("error", result.message || "Failed to update contact.");
      }
    } catch (error) {
      showPopup("error", "Error while updating contact. Please try again.");

      console.error("Submission error:", error);
    }
    setLoading(false);
  };

  if (!contact) {
    return (
      <div className="p-4 text-red-600">No contact selected for editing.</div>
    );
  }

  return (
    <div className={`px-5 ${css.profileLayout}`}>
      <form onSubmit={handleSubmit}>
        <div className={`${css.profileInfo} !bg-white border-8 !p-0`}>
          <div className={css.profileInfo_links}>
            <ul className="bg-gray-200">
              <li>
                <NavLink
                  to="/mycompany"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  Primary Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/companyContacts"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  Company Contacts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mycompany/CompanyInfo"
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  Company Info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mycompany/Billing+Info"
                  end
                  className={({ isActive }) => (isActive ? css.active : "")}
                >
                  Billing
                </NavLink>
              </li>
            </ul>
          </div>

          <h1 className="pt-5 p-4 !font-semibold text-[#444]">
            Edit Company Contact
          </h1>

          <div className="!flex !justify-between !space-x-[4vw] !pt-10 !p-14">
            <div className="!flex !flex-col !text-right !gap-5">
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "Position", name: "position" },
                { label: "Specialty", name: "specialty" },
                { label: "Direct Phone", name: "phoneNumber" },
                { label: "Toll Free", name: "tollFree" },
                { label: "Cellular", name: "cellular" },
                { label: "Fax", name: "faxNumber" },
                { label: "Email", name: "email" },
              ].map(({ label, name }) => (
                <span className="space-x-4" key={name}>
                  <label>{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={form[name] || ""}
                    onChange={handleChange}
                  />
                </span>
              ))}

              <div className="space-y-4">
                {/* Password Field */}
                <div className="relative flex items-center space-x-4">
                  <label className="w-[150px] text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
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
                    name="confirmPassword"
                    value={form.confirmPassword}
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

              <div className="text-left mt-20">
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
                      className="mr-2"
                    />
                    Telecom
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="preferredUse"
                      value="Computer"
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Computer
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col text-right gap-5">
              <div className="border p-10 flex flex-col gap-5">
                <h3 className="font-semibold text-[#444] text-left !text-2xl">
                  IM Screen Names
                </h3>
                {Object.entries(form.imScreenNames || {}).map(
                  ([key, value]) => (
                    <span
                      className="space-x-4 flex justify-between items-center !text-[8pt]"
                      key={key}
                    >
                      <div className="flex items-center">
                        <label>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <img
                          src={`https://ben.cachefly.net/images/social_networks/tiny_${key}.png`}
                          alt={key}
                          title={key}
                        />
                      </div>
                      <input
                        type="text"
                        name={`imScreenNames.${key}`}
                        value={value}
                        onChange={handleChange}
                        placeholder="Screen Name"
                        className="w-[20rem]"
                      />
                    </span>
                  )
                )}
              </div>

              <div className="border p-10 flex flex-col gap-5">
                <h3 className="font-semibold text-[#444] text-left !text-2xl">
                  Social Networking
                </h3>
                {Object.entries(form.socialNetworking || {}).map(
                  ([key, value]) => (
                    <span
                      className="space-x-4 flex justify-between items-center !text-[8pt]"
                      key={key}
                    >
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex items-center">
                          <label>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>
                          <img
                            src={`https://ben.cachefly.net/images/social_networks/tiny_${key}.png`}
                            alt={key}
                            title={key}
                          />
                        </div>
                        <div>
                          <span className="text-base text-[#444]">Test</span>
                        </div>
                      </div>

                      <input
                        type="text"
                        name={`socialNetworking.${key}`}
                        value={value}
                        onChange={handleChange}
                        placeholder="Profile Link"
                        className="w-[20rem]"
                      />
                    </span>
                  )
                )}
                <span>
                  <p className="pt-4 italic text-gray-600 text-[7.5pt] leading-tight w-64">
                    (use the profile/url name, example 'brokercell' will result
                    in http://twitter.com/brokercell)
                  </p>
                </span>
              </div>

              <div className="flex flex-col text-right gap-5">
                <div className="border p-10 flex flex-col  gap-5">
                  <h3 className="font-semibold text-[#444] text-left !text-2xl">
                    Profile Image
                  </h3>
                  <span className="space-x-4 flex justify-between items-center !text-[8pt]">
                    <div className="flex items-center">
                      <label htmlFor="profileImage">Upload Image</label>
                    </div>
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      onChange={handleFileChange}
                      className="w-[20rem]"
                    />
                  </span>
                  {form.profileImage && (
                    <img
                      src={form.profileImage}
                      alt="profile"
                      className="w-32 h-32 object-cover"
                    />
                  )}
                </div>
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

          <div className="bg-[#bfbfbf]  ">
            <button
              type="submit"
              className="bg-[#2c83ec] text-white rounded-lg px-12 py-3 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Changes"}
            </button>
          </div>
        </div>
      </form>

      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
};

export default UpdateCompanyUser;

import React, { useEffect, useState } from "react";
import css from "../../../styles/Menu/Manage/MyProfile.module.css";
import personalPhoto from "../../../imgs/logo/shadow.png";
import LoadingState from "../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  setFormData,
  setCustomSignature,
  setBlurWhileLoading,
  submitUserData,
  restoreInitialData,
} from "../../../ReduxStore/ProfleSlice";
import ErrorStatus from "../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { setTogglePopUp } from "../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "../../../ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import PopupAlert from "@/components/Popups/PopupAlert";

const MyProfile = () => {
  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");

  const {
    user,
    formData,
    initialData,
    blurWhileLoading,
    customSignature,
    error,
  } = useSelector((state) => state.profileStore);

  const id = user?.user?.id || user_id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fileBase64, setFileBase64] = useState("");
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
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const textAreaContent = [
    formData.sigcheckName
      ? `${formData.firstName || ""} ${formData.lastName || ""}`.trim()
      : "",
    formData.sigcheckEmailAddress ? `${formData.email || ""}` : "",
    formData.sigcheckPosition ? `${formData.position || ""}` : "",
    formData.sigcheckPhone ? `${formData.phoneNumber || ""}` : "",
    formData.sigcheckCell ? `${formData.cellular || ""}` : "",
    formData.sigcheckCompany ? `${formData?.company?.name || ""}` : "",
    formData.sigcheckToll ? `${formData.tollFree || ""}` : "",
    formData.sigcheckFax ? `${formData.faxNumber || ""}` : "",
    formData.sigcheckIM ? `${formData.specialty || ""}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const customTextAreaContent = initialData?.customSignature
    ?.filter(Boolean)
    .join("\n");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserData({ id, token }));
    };
    fetchData();
  }, [dispatch, id, token]);

  // const cleanInput = (input) => input.trimStart().replace(/\s+/g, " ");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [parentKey, childKey] = name.split("."); // Extract parent & child keys

    if (
      ["currentPassword", "newPassword", "confirmNewPassword"].includes(name)
    ) {
      setPasswords((prevPasswords) => ({
        ...prevPasswords,
        [name]: value,
      }));
    }
    // ✅ Correctly update nested objects (IM Screen Names & Social Networking)
    else if (childKey) {
      dispatch(
        setFormData({
          ...formData,
          [parentKey]: {
            ...(formData[parentKey] || {}), // Preserve existing data
            [childKey]: value, // Update only the field being changed
          },
        })
      );
    }
    // ✅ Update other fields normally
    else {
      dispatch(
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        })
      );
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const extension = String(file.name).split(".").pop().toLowerCase();
    const allowedExtensions = ["jpeg", "jpg", "png", "webp", "gif"];
    if (allowedExtensions.includes(extension)) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target.result
            .replace("data:", "")
            .replace(/^.+,/, "");
          setFileBase64(base64String);
        };
        reader.readAsDataURL(file);
      } else {
        setFileBase64("");
      }
    } else {
      alert("Format should be a jpeg, jpg, png, gif or webp");
      event.target.value = "";
      setFileBase64("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setBlurWhileLoading(false));
    console.log("🚀 Form submission started");
    const formDataApi = new FormData(event.target);

    // Build nested objects manually
    const imScreenNames = {
      skype: formData?.imScreenNames?.skype || "",
      teams: formData?.imScreenNames?.teams || "",
      whatsapp: formData?.imScreenNames?.whatsapp || "",
      trillian: formData?.imScreenNames?.trillian || "",
    };

    const socialNetworking = {
      facebook: formData?.socialNetworking?.facebook || "",
      twitter: formData?.socialNetworking?.twitter || "",
      linkedin: formData?.socialNetworking?.linkedin || "",
    };

    // Set nested objects in FormData
    formDataApi.set("imScreenNames", JSON.stringify(imScreenNames));
    formDataApi.set("socialNetworking", JSON.stringify(socialNetworking));

    const passwordChanged =
      passwords.currentPassword &&
      passwords.newPassword &&
      passwords.confirmNewPassword;

    //   // Password validation rules
    if (passwordChanged) {
      console.log("🔒 Password change detected, validating...");
      const { currentPassword, newPassword, confirmNewPassword } = passwords;
      const loginName = formData?.email?.split("@")[0] || "";
      const passwordRegex = {
        length: /^.{8,24}$/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        digit: /\d/,
        noLoginName: new RegExp(`^(?!.*${loginName}).*$`, "i"),
      };

      if (!passwordRegex.length.test(newPassword)) {
        showPopup("error", "Password must be between 8–24 characters.");

        dispatch(setBlurWhileLoading(true)); // ✅ Turn loader back off
        return;
      }
      if (!passwordRegex.uppercase.test(newPassword)) {
        showPopup(
          "error",
          "Password must include at least one uppercase letter."
        );

        dispatch(setBlurWhileLoading(true)); // ✅ Turn loader back off
        return;
      }
      if (!passwordRegex.lowercase.test(newPassword)) {
        showPopup(
          "error",
          "Password must include at least one lowercase letter."
        );

        dispatch(setBlurWhileLoading(true)); // ✅ Turn loader back off
        return;
      }
      if (!passwordRegex.digit.test(newPassword)) {
        showPopup("error", "Password must include at least one digit.");

        dispatch(setBlurWhileLoading(true)); // ✅ Turn loader back off
        return;
      }
      if (!passwordRegex.noLoginName.test(newPassword)) {
        showPopup("error", "Password cannot contain your login name.");

        dispatch(setBlurWhileLoading(true)); // ✅ Turn loader back off
        return;
      }
      if (newPassword !== confirmNewPassword) {
        showPopup("error", "New password and confirm password must match.");

        dispatch(setBlurWhileLoading(true)); // ✅ Turn loader back off
        return;
      }
      console.log("✅ Password validation passed");
    }

    // Append passwords (empty strings if not provided)
    formDataApi.set("currentPassword", passwords.currentPassword || "");
    formDataApi.set("newPassword", passwords.newPassword || "");
    formDataApi.set("confirmNewPassword", passwords.confirmNewPassword || "");

    // Handle file upload (if user uploaded an image)
    if (fileBase64) {
      const byteCharacters = atob(fileBase64);
      const byteNumbers = Array.from(byteCharacters, (char) =>
        char.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const file = new File([blob], "profileImage.jpg", { type: "image/jpeg" });
      formDataApi.set("profileImage", file);
      console.log("🖼️ Image converted to file and added to FormData");
    }

    const plainData = Object.fromEntries(formDataApi.entries());
    console.log("📤 Payload to be sent (plainData):", plainData);
    try {
      const res = await dispatch(
        submitUserData({
          id,
          token,
          data: {
            formData: formDataApi,
            plainData,
          },
        })
      );

      const responsePayload = res?.payload;
      const status = responsePayload?.status;
      const message = responsePayload?.message || "Profile updated.";

      console.log("✅ Backend Response:", responsePayload);

      // Reset passwords
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      // Success toast

      showPopup("success", message);

      if (passwordChanged) {
        Cookies.remove("token");
        Cookies.remove("user_id");
        console.log("🔐 Password updated. Logging out...");

        showPopup("info", "Navigating to Login Page");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update profile. Try again.";

      console.error("❌ Submission error:", errMsg);
      showPopup("error", errMsg);
    }
  };

  useEffect(() => {
    console.log("MyProfile component mounted");
    return () => console.log("MyProfile component unmounted");
  }, []);

  const toggleCheckAll = (value) => {
    dispatch(
      setFormData({
        sigcheckName: value,
        sigcheckEmailAddress: value,
        sigcheckPosition: value,
        sigcheckPhone: value,
        sigcheckCell: value,
        sigcheckCompany: value,
        sigcheckToll: value,
        sigcheckFax: value,
        sigcheckIM: value,
      })
    );
  };

  // if (error) {
  //   return (
  //     <>
  //       <ErrorStatus error={error} />
  //     </>
  //   );
  // }

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  const company = formData?.company;

  // Company Modal Logic
  const openCompanyModal = (company) => {
    // console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  // RESET FORM FUNCTION
  const resetForm = () => {
    try {
      console.log("🔁 RESET TRIGGERED");
      console.log("📦 initialData BEFORE transformation:", initialData);
      console.log("📦 current formData BEFORE reset:", formData);

      // Fill missing nested structures and clear sensitive fields
      const transformedInitialData = {
        ...initialData,
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
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      };

      console.log(
        "🛠 transformedInitialData TO BE DISPATCHED:",
        transformedInitialData
      );

      // Dispatch update to Redux store
      dispatch(setFormData(transformedInitialData));

      // Reset local-only password fields and image
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setFileBase64("");

      // Feedback

      showPopup("success", "Form reset successfully!");

      console.log("✅ Form Reset Successfully");
    } catch (error) {
      console.error("❌ Error resetting form:", error);
      showPopup("error", "Failed to reset form. Try again.");
    }
  };

  const currentFormData = useSelector((state) => state.profileStore.formData);

  useEffect(() => {
    console.log("🟢 Updated formData after reset:", currentFormData);
  }, [currentFormData]);

  return (
    <>
      {!blurWhileLoading && <LoadingState />}
      {blurWhileLoading && (
        <div className={`${css.profileLayout}`}>
          <form onSubmit={handleSubmit}>
            <div className={`${css.profileBtn} fixed`}>
              <h4 className="font-semibold">My Profile</h4>
              <span>
                <input
                  type="submit"
                  value="submit changes"
                  className="!text-white !capitalize !font-[400]"
                />
                <button type="button" onClick={() => openCompanyModal(company)}>
                  view profile
                </button>
              </span>
            </div>
            <div className={css.profileInfo}>
              <div className={css.profileInfo_links}>
                <ul>
                  <li>
                    <NavLink
                      to="/myprofile"
                      end // This ensures the exact match for /myprofile
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Personal Info</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myprofile/Options"
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Options</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myprofile/MyVendors"
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>My Vendors</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myprofile/MyContact"
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>My Contacts</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myprofile/broadcastfilter"
                      className={({ isActive }) => (isActive ? css.active : "")}
                    >
                      <span>Broadcast Filters</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className={css.profileInfo_form}>
                <div className={css.profileInfo_form_personalInfo}>
                  <div>
                    <span>
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={handleChange}
                        value={formData.firstName}
                        placeholder="Your first name"
                      />
                    </span>
                    <span>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={handleChange}
                        value={formData.lastName}
                        placeholder="Your last name"
                      />
                    </span>
                    <span>
                      <label htmlFor="position">Position</label>
                      <input
                        type="text"
                        name="position"
                        id="position"
                        onChange={handleChange}
                        value={formData.position}
                        placeholder="Your position"
                      />
                    </span>
                    {/* <span className="!ml-[41px]">
                      <label htmlFor="experience">Experience</label>
                      <input
                        type="date"
                        name="experience"
                        id="experience"
                        onChange={handleChange}
                        value={formData.experience}
                        placeholder="Your experience"
                      />
                    </span> */}
                    <span>
                      <label htmlFor="specialty">Specialty (if any)</label>
                      <input
                        type="text"
                        name="specialty"
                        id="specialty"
                        onChange={handleChange}
                        value={formData.specialty}
                        placeholder="Your specialty"
                      />
                    </span>
                    <span>
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="Your email"
                      />
                    </span>
                  </div>
                </div>
                <div className={css.profileInfo_form_personalPhoto}>
                  <div>
                    <h1>Personal Photo</h1>
                    <div>
                      <img src={formData?.profileImage} alt="personal photo" />
                    </div>
                  </div>

                  <div>
                    <input
                      type="file"
                      name="profileImage"
                      id="personalPhoto"
                      onChange={handleFileChange}
                    />
                    <button type="submit">Submit Changes</button>
                  </div>
                </div>
                <div className={css.profileInfo_form_IMScreenNames}>
                  <h1>IM Screen Names</h1>
                  <div>
                    <span>
                      <div className="flex items-center justify-center">
                        <label htmlFor="skype">Skype</label>
                        <img
                          src="https://ben.cachefly.net/images/social_networks/tiny_skype.png"
                          alt="Skype"
                          title="Skype"
                        ></img>
                      </div>
                      <input
                        type="text"
                        name="imScreenNames.skype"
                        id="skype"
                        onChange={handleChange}
                        value={formData?.imScreenNames?.skype || ""}
                        placeholder="Enter Skype username"
                      />
                    </span>
                    <span>
                      <div className="flex items-center justify-center">
                        <label htmlFor="teams">Teams</label>
                        <img
                          src="https://ben.cachefly.net/images/social_networks/tiny_teams.png"
                          alt="Teams"
                          title="Teams"
                        ></img>
                      </div>
                      <input
                        type="text"
                        name="imScreenNames.teams"
                        id="teams"
                        onChange={handleChange}
                        value={formData?.imScreenNames?.teams || ""}
                        placeholder="Enter Teams username"
                      />
                    </span>
                    <span>
                      <div className="flex items-center justify-center">
                        <label htmlFor="whatsapp">WhatsApp</label>
                        <img
                          src="https://ben.cachefly.net/images/social_networks/tiny_whatsapp.png"
                          alt="WhatsApp"
                          title="WhatsApp"
                        />
                      </div>
                      <input
                        type="text"
                        name="imScreenNames.whatsapp"
                        id="whatsapp"
                        onChange={handleChange}
                        value={formData?.imScreenNames?.whatsapp || ""}
                        placeholder="Enter WhatsApp number"
                      />
                    </span>
                    <span>
                      <div className="flex items-center justify-center ">
                        <label htmlFor="trillian">Trillian</label>
                        <img
                          src="https://ben.cachefly.net/images/social_networks/tiny_trillian.png"
                          alt="Trillian"
                          title="Trillian"
                        />
                      </div>
                      <input
                        type="text"
                        name="imScreenNames.trillian"
                        id="trillian"
                        onChange={handleChange}
                        value={formData?.imScreenNames?.trillian}
                        placeholder="Enter Trillian ID"
                      />
                    </span>
                  </div>
                </div>
                <div className={css.profileInfo_form_socialNetworking}>
                  <h1>Social Networking</h1>
                  <div>
                    <span>
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex items-center  justify-center">
                          <label htmlFor="facebook">Facebook</label>
                          <img
                            src="https://ben.cachefly.net/images/social_networks/tiny_facebook.png"
                            alt="Facebook"
                            title="Facebook"
                          />
                        </div>
                        <div>
                          <span
                            className="text-base text-[#444] cursor-pointer hover:underline hover:text-red-500"
                            onClick={() => {
                              const name =
                                formData?.socialNetworking?.facebook?.trim();
                              const base = "https://www.facebook.com/";
                              const url = name
                                ? `${base}${encodeURIComponent(name)}`
                                : base;
                              window.open(url, "_blank");
                            }}
                          >
                            Test
                          </span>
                        </div>
                      </div>

                      <input
                        type="text"
                        name="socialNetworking.facebook"
                        id="facebook"
                        onChange={handleChange}
                        value={formData?.socialNetworking?.facebook || ""}
                        placeholder="Facebook link"
                      />
                    </span>
                    <span>
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex items-center justify-center ">
                          <label htmlFor="twitter">Twitter</label>
                          <img
                            src="https://ben.cachefly.net/images/social_networks/tiny_twitter.png"
                            alt="Twitter"
                            title="Twitter"
                          />
                        </div>
                        <div>
                          <span
                            className="text-base text-[#444] cursor-pointer hover:underline hover:text-red-500"
                            onClick={() => {
                              const name =
                                formData?.socialNetworking?.twitter?.trim();
                              const base = "https://www.x.com/";
                              const url = name
                                ? `${base}${encodeURIComponent(name)}`
                                : base;
                              window.open(url, "_blank");
                            }}
                          >
                            Test
                          </span>
                        </div>
                      </div>

                      <input
                        type="text"
                        name="socialNetworking.twitter"
                        id="twitter"
                        onChange={handleChange}
                        value={formData?.socialNetworking?.twitter || ""}
                        placeholder="Twitter handle"
                      />
                    </span>
                    <span>
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex items-center justify-center ">
                          <label htmlFor="linkedin">LinkedIn</label>
                          <img
                            src="https://ben.cachefly.net/images/social_networks/tiny_linkedin.png"
                            alt="Linked-In"
                            title="Linked-In"
                          />
                        </div>
                        <div>
                          <span
                            className="text-base text-[#444] cursor-pointer hover:underline hover:text-red-500"
                            onClick={() => {
                              const name =
                                formData?.socialNetworking?.linkedin?.trim();
                              const base = "https://www.linkedin.com/";
                              const url = name
                                ? `${base}in/${encodeURIComponent(name)}`
                                : base;
                              window.open(url, "_blank");
                            }}
                          >
                            Test
                          </span>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="socialNetworking.linkedin"
                        id="linkedin"
                        onChange={handleChange}
                        value={formData?.socialNetworking?.linkedin || ""}
                        placeholder="LinkedIn profile"
                      />
                    </span>
                    <div className="flex  items-center justify-center my-8  w-96  ">
                      <p className="text-[8pt] text-[#444] leading-tight ">
                        (use the profile / url name, example 'brokercell' will
                        result in https://twitter.com/brokercell)
                      </p>
                    </div>
                  </div>
                </div>
                <div className={css.profileInfo_form_phone}>
                  <h1>Phone</h1>
                  <div>
                    <span>
                      <label htmlFor="phoneNumber">Direct Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={handleChange}
                        value={formData.phoneNumber}
                        placeholder="Enter direct number"
                      />
                    </span>
                    <span>
                      <label htmlFor="tollFree">Toll Free</label>
                      <input
                        type="text"
                        name="tollFree" // ✅ Correct name
                        id="tollFree"
                        onChange={handleChange}
                        value={formData?.tollFree || ""}
                        placeholder="Enter toll-free number"
                      />
                    </span>
                    <span>
                      <label htmlFor="cellular">Cellular</label>
                      <input
                        type="text"
                        name="cellular" // ✅ Correct name
                        id="cellular"
                        onChange={handleChange}
                        value={formData?.cellular || ""}
                        placeholder="Enter cellular number"
                      />
                    </span>
                    <span>
                      <label htmlFor="fax">Fax</label>

                      <input
                        type="text"
                        name="faxNumber" // ✅ Correct name
                        id="faxNumber"
                        onChange={handleChange}
                        value={formData?.faxNumber || ""}
                        placeholder="Enter fax number"
                      />
                    </span>
                  </div>
                </div>
                <div className={css.profileInfo_form_signature}>
                  <h1>Signature</h1>
                  <div className={css.profileInfo_form_signature_group}>
                    <ul className={css.profileInfo_form_signature_checkbox}>
                      <div>
                        <li>
                          <label htmlFor="sigcheckName">Name</label>
                          <input
                            type="checkbox"
                            name="sigcheckName"
                            id="sigcheckName"
                            checked={formData.sigcheckName}
                            onChange={handleChange}
                            disabled={customSignature}
                          />
                        </li>
                        <li>
                          <label htmlFor="sigcheckPosition">Position</label>
                          <input
                            type="checkbox"
                            name="sigcheckPosition"
                            id="sigcheckPosition"
                            checked={formData.sigcheckPosition}
                            onChange={handleChange}
                            disabled={customSignature}
                          />
                        </li>
                        <li>
                          <label htmlFor="sigcheckPhone">Phone</label>
                          <input
                            type="checkbox"
                            name="sigcheckPhone"
                            id="sigcheckPhone"
                            checked={formData.sigcheckPhone}
                            onChange={handleChange}
                            disabled={customSignature}
                          />
                        </li>
                      </div>
                      <div>
                        <li>
                          <label htmlFor="sigcheckCell">Cell</label>
                          <input
                            type="checkbox"
                            id="sigcheckCell"
                            name="sigcheckCell"
                            checked={formData.sigcheckCell}
                            onChange={handleChange}
                            disabled={customSignature}
                          />
                        </li>
                        <li>
                          <label htmlFor="sigcheckEmailAddress">Email</label>
                          <input
                            type="checkbox"
                            id="sigcheckEmailAddress"
                            name="sigcheckEmailAddress"
                            checked={formData.sigcheckEmailAddress}
                            onChange={handleChange}
                            disabled={customSignature}
                          />
                        </li>
                        <li>
                          <label htmlFor="sigcheckCompany">Company</label>
                          <input
                            type="checkbox"
                            id="sigcheckCompany"
                            name="sigcheckCompany"
                            checked={formData.sigcheckCompany}
                            onChange={handleChange}
                            disabled={customSignature}
                          />
                        </li>
                      </div>
                      <div>
                        <li>
                          <label htmlFor="sigcheckToll">Toll</label>
                          <input
                            type="checkbox"
                            id="sigcheckToll"
                            name="sigcheckToll"
                            checked={formData.sigcheckToll}
                            onChange={handleChange}
                            disabled={customSignature}
                          />
                        </li>
                        <li>
                          <label htmlFor="sigcheckFax">Fax</label>
                          <input
                            type="checkbox"
                            id="sigcheckFax"
                            name="sigcheckFax"
                            checked={formData.sigcheckFax}
                            onChange={handleChange}
                            disabled={customSignature}
                          />
                        </li>
                        <li>
                          <label htmlFor="sigcheckIM">IM</label>
                          <input
                            type="checkbox"
                            id="sigcheckIM"
                            name="sigcheckIM"
                            checked={formData.sigcheckIM}
                            onChange={handleChange}
                            disabled={customSignature}
                          />
                        </li>
                      </div>
                    </ul>
                  </div>
                  <div
                    className={
                      css.profileInfo_form_signature_checkbox_checkUncheck
                    }
                  >
                    <button type="button" onClick={() => toggleCheckAll(true)}>
                      Check All
                    </button>
                    <button type="button" onClick={() => toggleCheckAll(false)}>
                      Uncheck All
                    </button>
                  </div>
                  <p>
                    Uncheck Use Custom Signature to use the checkboxes above.
                  </p>
                </div>
                <div className={css.profileInfo_form_customSignature}>
                  <h1>Custom Signature</h1>
                  <div>
                    <span>
                      <label htmlFor="CustomSignature">
                        Use Custom Signature
                      </label>
                      <input
                        type="checkbox"
                        name="useCustomSignature"
                        id="useCustomSignature"
                        checked={customSignature}
                        onChange={() =>
                          dispatch(setCustomSignature(!customSignature))
                        }
                      />
                    </span>
                    <span>
                      <label htmlFor="Signature">Signature</label>
                      {customSignature ? (
                        <textarea
                          name="customSignature"
                          id="customSignature"
                          defaultValue={customTextAreaContent}
                          rows="5"
                        ></textarea>
                      ) : (
                        <textarea
                          name="signature"
                          id="signature"
                          readOnly
                          value={textAreaContent}
                          rows="5"
                        ></textarea>
                      )}
                    </span>
                  </div>
                </div>
                <h1>Update Your Password</h1>
                <div className={css.profileInfo_form_updatePassword}>
                  <div className={css.profileInfo_form_updatePassword_left}>
                    <div className="relative">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        type={showPassword.current ? "text" : "password"}
                        name="currentPassword"
                        id="currentPassword"
                        placeholder="Enter current password"
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        className="w-full pr-10"
                      />
                      <span
                        className="absolute right-2 top-[20px] cursor-pointer text-gray-500"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            current: !prev.current,
                          }))
                        }
                      >
                        {showPassword.current ? (
                          <HiEyeOff size={18} />
                        ) : (
                          <HiEye size={18} />
                        )}
                      </span>
                    </div>

                    <div className="relative  mt-4">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type={showPassword.new ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter new password"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        className="w-full pr-10"
                      />
                      <span
                        className="absolute right-2 top-[20px] cursor-pointer text-gray-500"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }))
                        }
                      >
                        {showPassword.new ? (
                          <HiEyeOff size={18} />
                        ) : (
                          <HiEye size={18} />
                        )}
                      </span>
                    </div>

                    <div className="relative  mt-4">
                      <label htmlFor="confirmNewPassword">
                        Confirm New Password
                      </label>
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        placeholder="Confirm new password"
                        value={passwords.confirmNewPassword}
                        onChange={handleChange}
                        className="w-full pr-10"
                      />
                      <span
                        className="absolute right-2 top-[20px] cursor-pointer text-gray-500"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                      >
                        {showPassword.confirm ? (
                          <HiEyeOff size={18} />
                        ) : (
                          <HiEye size={18} />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className={css.profileInfo_form_updatePassword_right}>
                    <fieldset>
                      <legend>Password Requirements</legend>
                      <strong>Your password must contain:</strong>
                      <ul>
                        <li className="text-[8pt]">1 uppercase letter</li>
                        <li className="text-[8pt]">1 lowercase letter</li>
                        <li className="text-[8pt]">1 digit</li>
                        <li className="text-[8pt]">8 characters minimum</li>
                        <li className="text-[8pt]">24 characters maximum</li>
                      </ul>
                      <strong className="text-[8pt]">
                        password can not contain:
                      </strong>
                      <ul>
                        <li className="text-[8pt]">your login name</li>
                      </ul>
                    </fieldset>
                  </div>
                </div>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <button
                  className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-7"
                  onClick={resetForm}
                  type="button"
                >
                  Reset
                </button>
                <button
                  className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-7"
                  type="submit"
                >
                  Submit Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}

      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default MyProfile;

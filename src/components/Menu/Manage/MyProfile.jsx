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
} from "../../../ReduxStore/ProfleSlice";
import ErrorStatus from "../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { Link,NavLink } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { setTogglePopUp } from "../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "../../../ReduxStore/SearchProductSlice";



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
  const [fileBase64, setFileBase64] = useState("");

  const textAreaContent = [
    formData.sigcheckName ? `${formData.firstName} ${formData.lastName}` : "",
    formData.sigcheckEmailAddress ? `${formData.email}` : "",
    formData.sigcheckPosition ? `${formData.position}` : "",
    formData.sigcheckPhone ? `${formData.phoneNumber}` : "",
    formData.sigcheckCell ? `${formData.cellular}` : "",
    formData.sigcheckCompany ? `${formData.experience}` : "",
    formData.sigcheckToll ? `${formData.tollFree}` : "",
    formData.sigcheckFax ? `${formData.faxNumber}` : "",
    formData.sigcheckIM ? `${formData.specialty}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const customTextAreaContent = initialData?.customSignature
    ?.filter(Boolean)
    .join("\n");

  useEffect(() => {
    dispatch(fetchUserData({ id, token }));
  }, [dispatch, id, token]);

  const cleanInput = (input) => input.trimStart().replace(/\s+/g, " ");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const val = type === "checkbox" ? checked : cleanInput(value);
    dispatch(setFormData({ ...formData, [name]: val }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const extension = String(file.name).split(".").pop().toLowerCase();
    const allowedExtensions = ["jpeg", "jpg", "png", "webp"];
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
      alert("Format should be a jpeg, jpg, png, or webp");
      event.target.value = "";
      setFileBase64("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Show loading state
    dispatch(setBlurWhileLoading(false));
  
    // Prepare FormData for API submission
    const formDataApi = new FormData(event.target);
  
    // Convert Base64 to Binary and append to FormData
    if (fileBase64) {
      const byteCharacters = atob(fileBase64);
      const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const file = new File([blob], "profileImage.jpg", { type: "image/jpeg" });
      formDataApi.set("profileImage", file);
    }
  
    // Extract non-file fields for debugging purposes only
    const plainData = Object.fromEntries(formDataApi.entries());

    // Exclude unchanged fields
    Object.keys(plainData).forEach((key) => {
      if (plainData[key] === initialData[key]) {
        delete plainData[key];
      }
    });

    if (!plainData.email || plainData.email === initialData.email) {
      delete plainData.email;
    }
  
    // Handle password validation
    const passwordFields = ["currentPassword", "newPassword", "confirmNewPassword"];
    const passwordValues = passwordFields.map((field) => plainData[field] || ""); // Fix: Use plainData
    const filledPasswords = passwordValues.filter((value) => value !== "");
  
    if (filledPasswords.length > 0 && filledPasswords.length < passwordFields.length) {
      return; // Exit if password fields are incomplete
    }
    if (filledPasswords.length === passwordFields.length && plainData.newPassword !== plainData.confirmNewPassword) {
      return; // Exit if passwords do not match
    }
    passwordFields.forEach((field) => {
      if (plainData[field] === "") {
        delete plainData[field]; // Remove empty password fields
      }
    });
  
    // Log for debugging (exclude file from logs)
    console.log("Prepared Data (excluding file):", plainData);
  
    try {
      // Dispatch data: pass both FormData and plainData to the thunk
      await dispatch(
        submitUserData({
          id,
          token,
          data: {
            formData: formDataApi, // Binary data (e.g., file)
            plainData, // Other fields for JSON compatibility
          },
        })
      );
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
  
  
  

  const checkAll = () => {
    dispatch(
      setFormData({
        sigcheckName: true,
        sigcheckEmailAddress: true,
        sigcheckPosition: true,
        sigcheckPhone: true,
        sigcheckCell: true,
        sigcheckCompany: true,
        sigcheckToll: true,
        sigcheckFax: true,
        sigcheckIM: true,
      })
    );
  };

  const unCheckAll = () => {
    dispatch(
      setFormData({
        sigcheckName: false,
        sigcheckEmailAddress: false,
        sigcheckPosition: false,
        sigcheckPhone: false,
        sigcheckCell: false,
        sigcheckCompany: false,
        sigcheckToll: false,
        sigcheckFax: false,
        sigcheckIM: false,
      })
    );
  };

  if (error) {
    return (
      <>
        <ErrorStatus error={error} />
      </>
    );
  }


console.log("formData",formData)  
  const { togglePopUp, popupCompanyDetail } = useSelector((state) => state.searchProductStore)
  const company =formData?.company;
  console.log("COMPANY ", company);

  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };
  console.log("popupCompanyDetail", popupCompanyDetail);
  console.log("togglePopUp", togglePopUp);



  return (
    <>
      {!blurWhileLoading && <LoadingState />}
      {blurWhileLoading && (
        <div className={css.profileLayout}>
          <form onSubmit={handleSubmit}>
            <div className={css.profileBtn}>
              <p>my profile</p>
              <span>
                <input type="submit" value="submit changes" />
                <button type="button"  onClick={() => openCompanyModal(company)}>view profile</button>
              </span>
            </div>
            <div className={css.profileInfo}>
              <div className={css.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/myprofile"
                    end  // This ensures the exact match for /myprofile
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Personal Info</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myprofile/Options"
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Options</span>
                  </NavLink>
                </li>
                  {/* <li>
                    <NavLink
                      to="/myprofile/MyVendors"
                      className={({ isActive }) => (isActive ? css.active : '')}
                    >
                      <span>My Vendors</span>
                    </NavLink>
                  </li> */}
                <li>
                  <NavLink
                    to="/myprofile/MyContact"
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>My Contacts</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/myprofile/broadcastfilter"
                    className={({ isActive }) => (isActive ? css.active : '')}
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
                    <span className="!ml-[41px]">
                      <label htmlFor="experience">Experience</label>
                      <input
                        type="date"
                        name="experience"
                        id="experience"
                        onChange={handleChange}
                        value={formData.experience}
                        placeholder="Your experience"
                      />
                    </span>
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
                      <img
                        src={
                          formData?.profileImage
                            ? formData.profileImage
                            : personalPhoto
                            
                        }
                        alt="personal photo"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      name="personalPhoto"
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
                      <img src="https://ben.cachefly.net/images/social_networks/tiny_skype.png" alt="Skype" title="Skype"></img>
                      </div>
                      <input
                        type="text"
                        name="skype"
                        id="skype"
                        onChange={handleChange}
                        value={formData.skype}
                        placeholder="Enter Skype username"
                      />
                    </span>
                    <span>
                    <div className="flex items-center justify-center"> 
                      <label htmlFor="whatsapp">WhatsApp</label>
                      <img src="https://ben.cachefly.net/images/social_networks/tiny_whatsapp.png" alt="WhatsApp" title="WhatsApp"/>
                      </div>
                      <input
                        type="text"
                        name="whatsapp"
                        id="whatsapp"
                        onChange={handleChange}
                        value={formData.whatsapp}
                        placeholder="Enter WhatsApp number"
                      />
                    </span>
                    <span>
                    <div className="flex items-center justify-center "> 
                      <label htmlFor="trillian">Trillian</label>
                      <img src="https://ben.cachefly.net/images/social_networks/tiny_trillian.png" alt="Trillian" title="Trillian"/>
                      </div>
                      <input
                        type="text"
                        name="trillian"
                        id="trillian"
                        onChange={handleChange}
                        value={formData.trillian}
                        placeholder="Enter Trillian ID"
                      />
                    </span>
                  </div>
                </div>
                <div className={css.profileInfo_form_socialNetworking}>
                  <h1>Social Networking</h1>
                  <div>
                    <span>
                    <div className="flex items-center  justify-center"> 
                      <label htmlFor="facebook">Facebook</label>
                      <img src="https://ben.cachefly.net/images/social_networks/tiny_facebook.png" alt="Facebook" title="Facebook"/>
                      </div>

                      <input
                        type="text"
                        name="facebook"
                        id="facebook"
                        onChange={handleChange}
                        value={formData.facebook}
                        placeholder="Facebook link"
                      />
                    </span>
                    <span>
                    <div className="flex items-center justify-center "> 
                      <label htmlFor="twitter">Twitter</label>
                      <img src="https://ben.cachefly.net/images/social_networks/tiny_twitter.png" alt="Twitter" title="Twitter"/>
                      </div>
                      <input
                        type="text"
                        name="twitter"
                        id="twitter"
                        onChange={handleChange}
                        value={formData.twitter}
                        placeholder="Twitter handle"
                      />
                    </span>
                    <span>
                    <div className="flex items-center justify-center "> 
                      <label htmlFor="linkedin">LinkedIn</label>
                      <img src="https://ben.cachefly.net/images/social_networks/tiny_linkedin.png" alt="Linked-In" title="Linked-In"/>
                      </div>
                      <input
                        type="text"
                        name="linkedin"
                        id="linkedin"
                        onChange={handleChange}
                        value={formData.linkedin}
                        placeholder="LinkedIn profile"
                      />
                    </span>
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
                        name="tollFree"
                        id="tollFree"
                        onChange={handleChange}
                        value={formData.tollFree}
                        placeholder="Enter toll-free number"
                      />
                    </span>
                    <span>
                      <label htmlFor="cellular">Cellular</label>
                      <input
                        type="text"
                        name="cellular"
                        id="cellular"
                        onChange={handleChange}
                        value={formData.cellular}
                        placeholder="Enter cellular number"
                      />
                    </span>
                    <span>
                      <label htmlFor="fax">Fax</label>
                      <input
                        type="text"
                        name="faxNumber"
                        id="faxNumber"
                        onChange={handleChange}
                        value={formData.faxNumber}
                        placeholder="Enter fax number"
                      />
                    </span>
                  </div>
                </div>
                <div className={css.profileInfo_form_signature}>
                  <h1>signature</h1>
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
                    <button type="button" onClick={checkAll}>
                      check all
                    </button>
                    <button type="button" onClick={unCheckAll}>
                      uncheck all
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
                        ></textarea>
                      ) : (
                        <textarea
                          name="signature"
                          id="signature"
                          readOnly
                          value={textAreaContent}
                        ></textarea>
                      )}
                    </span>
                  </div>
                </div>
                <h1>Update Your Password</h1>
                <div className={css.profileInfo_form_updatePassword}>
                  <div className={css.profileInfo_form_updatePassword_left}>
                    <div>
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmNewPassword">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <div className={css.profileInfo_form_updatePassword_right}>
                    <fieldset>
                      <legend>Password Requirements</legend>
                      <strong>Your password must contain:</strong>
                      <ul>
                        <li>1 uppercase letter</li>
                        <li>1 lowercase letter</li>
                        <li>1 digit</li>
                        <li>8 characters minimum</li>
                        <li>24 characters maximum</li>
                      </ul>
                      <strong>password can not contain:</strong>
                      <ul>
                        <li>your login name</li>
                      </ul>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {togglePopUp && <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />}

    </>
  );
};

export default MyProfile;



































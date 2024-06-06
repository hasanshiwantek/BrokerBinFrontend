import React, { useEffect, useLayoutEffect, useState } from "react";
import css from "../../../styles/Menu/Manage/MyProfile.module.css";
import personalPhoto from "../../../imgs/logo/shadow.png";
import Cookies from "js-cookie";
import LoadingState from "../../../LoadingState";
const MyProfile = () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("user_id");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.user.id || userId;
  // document.cookie = "sessionID=abc123; path=/";
  // document.cookie =
  //   "username=JohnDoe; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";
  const [customSignature, setcustomSignature] = useState(true);
  const [fileBase64, setFileBase64] = useState("");
  const [blurWhileLoading, setBlurWhileLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    experience: "",
    specialty: "",
    email: "",
    skype: "",
    whatsapp: "",
    trillian: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    phoneNumber: "",
    tollFree: "",
    cellular: "",
    faxNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    profileImage: "",
    customSignature: [],
    signature: [],
    sigcheckName: true,
    sigcheckEmailAddress: true,
    sigcheckPosition: true,
    sigcheckPhone: true,
    sigcheckCell: true,
    sigcheckCompany: true,
    sigcheckToll: true,
    sigcheckFax: true,
    sigcheckIM: true,
  });

  const textAreaContent = [
    formData.sigcheckName ? `${formData.firstName} ${formData.lastName}` : "",
    formData.sigcheckEmailAddress ? `${formData.emailAddress}` : "",
    formData.sigcheckPosition ? `${formData.position}` : "",
    formData.sigcheckPhone ? `${formData.phoneNumber}` : "",
    formData.sigcheckCell ? `${formData.cellular}` : "",
    formData.sigcheckCompany ? `${formData.experience}` : "",
    formData.sigcheckToll ? `${formData.tollFree}` : "",
    formData.sigcheckFax ? `${formData.faxNumber}` : "",
    formData.sigcheckIM ? `${formData.specialty}` : "",
  ]
    .filter(Boolean)
    .join("\n"); // Filter out empty strings and join with newline

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://brokerbinbackend.advertsedge.com/api/user/fetch/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          firstName: data.data.firstName || "",
          lastName: data.data.lastName || "",
          position: data.data.position || "",
          experience: data.data.experience || "",
          specialty: data.data.specialty || "",
          email: data.data.email || "",
          skype: data.data.skype || "",
          whatsapp: data.data.whatsapp || "",
          trillian: data.data.trillian || "",
          facebook: data.data.facebook || "",
          twitter: data.data.twitter || "",
          linkedin: data.data.linkedin || "",
          phoneNumber: data.data.phoneNumber || "",
          tollFree: data.data.tollFree || "",
          cellular: data.data.cellular || "",
          faxNumber: data.data.faxNumber || "",
          profileImage: data.data.profileImage || "",
          customSignature: data.data.customSignature || "",
          signature: data.data.signature || "",
        }));
        setBlurWhileLoading(true);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // fetchData();

  const cleanInput = (input) => input.trimStart().replace(/\s+/g, " ");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const val = type === "checkbox" ? checked : cleanInput(value); // Use checked for checkboxes, value for other inputs
    setFormData((prevFormData) => ({ ...prevFormData, [name]: val }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        setFileBase64(base64String); // Store base64 string
      };
      reader.readAsDataURL(file);
    } else {
      setFileBase64("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // let data = Object.fromEntries(formData.entries());
    const data = Object.fromEntries(
      Object.entries(Object.fromEntries(formData.entries())).map(
        ([key, value]) => {
          if (key === "signature" || key === "customSignature") {
            value = value
              .split("\n")
              .filter(Boolean)
              .map((item) => item.replace(/\s+/g, " ").trim());
          } else if (typeof value === "string") {
            value = value.replace(/\s+/g, " ").trim();
          }
          return [key, value];
        }
      )
    );

    if (customSignature) {
      delete data.signature;
    }

    // Converting string 'true' or 'false' to a boolean and then to integer 0 or 1
    data.useCustomSignature = data.useCustomSignature === "true" ? 1 : 0;

    // Encoding the file content in base64 and assigning it to the appropriate field
    if (fileBase64) {
      console.log(fileBase64);
      // assuming `fileBase64` is defined and holds the base64 string of the file
      data.profileImage = { base64: fileBase64 };
    } else {
      delete data.profileImage;
    }

    // Validate password fields
    const passwordFields = [
      "currentPassword",
      "newPassword",
      "confirmNewPassword",
    ];
    const passwordValues = passwordFields.map((field) => data[field] || "");
    const filledPasswords = passwordValues.filter((value) => value !== "");

    // If any password field is filled, ensure all are filled
    if (
      filledPasswords.length > 0 &&
      filledPasswords.length < passwordFields.length
    ) {
      alert(
        "Please fill in all password fields to update your password, or leave all empty if no update is intended."
      );
      return; // Stop the form submission
    }

    // If all password fields are filled, ensure the new passwords match
    // if (data.currentPassword !== currentPassword) {
    //   alert("Incorrect current password.");
    //   return; // Stop the form submission
    // }
    if (
      filledPasswords.length === passwordFields.length &&
      data.newPassword !== data.confirmNewPassword
    ) {
      alert("New passwords do not match.");
      return; // Stop the form submission
    }
    // If all password fields are filled, ensure the current password is correct

    // Remove password fields if empty
    passwordFields.forEach((field) => {
      if (data[field] === "") {
        delete data[field];
      }
    });

    const userName = data.firstName;
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,24}$/;
    if (data.newPassword && !regex.test(data.newPassword)) {
      alert("Password does not meet the complexity requirements.");
      return;
    }
    if (
      data.newPassword &&
      data.newPassword.toLowerCase().includes(userName.toLowerCase())
    ) {
      alert("Password cannot contain the username.");
      return;
    }

    try {
      const response = await fetch(
        `https://brokerbinbackend.advertsedge.com/api/user/edit/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(data);
      // const result = await response.json();
      if (response.ok) {
        alert("Your profile has been updated!");
        // window.location.reload();
      } else {
        alert("Incorrect Password");
      }
    } catch (err) {
      console.log("Error during login", err);
    }
  };

  const checkAll = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sigcheckName: true,
      sigcheckEmailAddress: true,
      sigcheckPosition: true,
      sigcheckPhone: true,
      sigcheckCell: true,
      sigcheckCompany: true,
      sigcheckToll: true,
      sigcheckFax: true,
      sigcheckIM: true,
    }));
  };
  const unCheckAll = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sigcheckName: false,
      sigcheckEmailAddress: false,
      sigcheckPosition: false,
      sigcheckPhone: false,
      sigcheckCell: false,
      sigcheckCompany: false,
      sigcheckToll: false,
      sigcheckFax: false,
      sigcheckIM: false,
    }));
  };

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
                {/* <button type="button">submit changes</button> */}
                <button type="button">view profile</button>
              </span>
            </div>
            <div className={css.profileInfo}>
              <div className={css.profileInfo_links}>
                <ul>
                  <li>
                    <a href="/myprofile">
                      <span>Personal Info</span>
                    </a>
                  </li>
                  <li>
                    <a href="/myprofile/Options">
                      <span>Options</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span>My Vendors</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span>My Contacts</span>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <span>Broadcast Filters</span>
                    </a>
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
                    <span>
                      <label htmlFor="experience">Experience</label>
                      <input
                        type="text"
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
                          formData.profileImage
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
                      name="profileImage"
                      id="profileImage"
                      onChange={handleFileChange}
                    />
                    <button type="submit">Submit Changes</button>
                  </div>
                </div>
                <div className={css.profileInfo_form_IMScreenNames}>
                  <h1>IM Screen Names</h1>
                  <div>
                    <span>
                      <label htmlFor="skype">Skype</label>
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
                      <label htmlFor="whatsapp">WhatsApp</label>
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
                      <label htmlFor="trillian">Trillian</label>
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
                      <label htmlFor="facebook">Facebook</label>
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
                      <label htmlFor="twitter">Twitter</label>
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
                      <label htmlFor="linkedin">LinkedIn</label>
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
                        value={customSignature}
                        checked={customSignature}
                        onChange={() => setcustomSignature((prev) => !prev)}
                      />
                    </span>
                    <span>
                      <label htmlFor="Signature">Signature</label>
                      {customSignature ? (
                        <textarea
                          name="customSignature"
                          id="customSignature"
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
    </>
  );
};

export default MyProfile;

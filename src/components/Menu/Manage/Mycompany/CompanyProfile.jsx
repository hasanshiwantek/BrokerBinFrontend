import React, { useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import personalPhoto from "../../../../imgs/logo/shadow.png";
import LoadingState from "../../../../LoadingState";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  setFormData as updateFormData,
  setCustomSignature,
  setBlurWhileLoading,
  submitUserData,
  submitCompanyLogo,
  clearLogo
} from "../../../../ReduxStore/ProfleSlice";
import ErrorStatus from "../../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";
import Footer from "../../../Footer/Footer";
import axios from "axios";
import { brokerAPI } from "../../../api/BrokerEndpoint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const MyCompany = () => {
  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");

  const [formData, setFormData] = useState({});
  const [fileBase64, setFileBase64] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    user,
    // formData,
    initialData,
    blurWhileLoading,
    customSignature,
    error,
    companyLogo,
  } = useSelector((state) => state.profileStore);
  console.log("INITAL DATA", initialData)
  console.log("FORM DATA", formData)
  console.log("COMPANY LOGO", companyLogo)
  const image = formData.data?.company?.image

  console.log("Company Image", image)


  console.log("User ", user)
  const id = user?.user?.id || user_id;

  const dispatch = useDispatch();

   useEffect(() => {
    console.log(id)
      ;
    dispatch(fetchUserData({ id, token }));
  }, []);

  const companyId = initialData?.company?.id;
  console.log("Company ID", companyId)
  console.log("TOKEN", token)

  useEffect(() => {
    if (companyId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${brokerAPI}company/show/${companyId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData(response.data); // API ka response direct set ho raha hai
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [companyId, token]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prevData) => {
  //     const updatedData = { ...prevData };
  //     if (!updatedData.data) updatedData.data = {}; // Ensure `data` exists
  //     if (!updatedData.data.company) updatedData.data.company = {}; // Ensure `company` exists
  //     if (!updatedData.data.company.primaryContact)
  //       updatedData.data.company.primaryContact = {}; // Ensure `primaryContact` exists

  //     updatedData.data.company.primaryContact[name] = cleanInput(value);
  //     return updatedData;
  //   });
  // };

  // const cleanInput = (input) => input.trimStart().replace(/\s+/g, " ");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  
  //   // Update Local State
  //   setFormData((prevData) => {
  //     const updatedData = { ...prevData };
  
  //     // Ensure nested structure exists in local state
  //     if (!updatedData.data) updatedData.data = {};
  //     if (!updatedData.data.company) updatedData.data.company = {};
  //     if (!updatedData.data.company.primaryContact)
  //       updatedData.data.company.primaryContact = {};
  
  //     updatedData.data.company.primaryContact[name] = value; // Update the local state
  //     return updatedData;
  //   });
  
  //   // Update Redux State
  //   dispatch(updateFormData((prevReduxData) => {
  //     const updatedReduxData = { ...prevReduxData };
  
  //     if (["skype", "whatsapp", "trillian"].includes(name)) {
  //       // For `imScreenNames` update
  //       updatedReduxData.imScreenNames = {
  //         ...updatedReduxData.imScreenNames,
  //         [name]: value,
  //       };
  //     } else if (["facebook", "twitter", "linkedin"].includes(name)) {
  //       // For `socialNetworking` update
  //       updatedReduxData.socialNetworking = {
  //         ...updatedReduxData.socialNetworking,
  //         [name]: value,
  //       };
  //     } else {
  //       // For other fields directly in the Redux state
  //       updatedReduxData[name] = value;
  //     }
  
  //     return updatedReduxData;
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update Local State for Nested Structure
    setFormData((prevData) => {
      const updatedData = { ...prevData };
  
      if (!updatedData.data) updatedData.data = {};
      if (!updatedData.data.company) updatedData.data.company = {};
      if (!updatedData.data.company.primaryContact)
        updatedData.data.company.primaryContact = {};
  
      updatedData.data.company.primaryContact[name] = value; // Update the nested local state
      return updatedData;
    });
  
    // Update Redux State for Flat Structure
    dispatch(
      updateFormData({
        [name]: value, // Match the flat structure for Redux state
      })
    );
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const extension = String(file.name).split(".").pop().toLowerCase();
    const allowedExtensions = ["jpeg", "jpg", "png", "webp", "svg", "gif"];
    if (allowedExtensions.includes(extension)) {
      dispatch(clearLogo())
      setFileBase64(file); // Store the actual file, not base64 string
    } else {
      alert("Format should be a jpeg, jpg, png, gif or webp");
      event.target.value = "";
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   dispatch(setBlurWhileLoading(false));
  //   const formDataApi = new FormData(event.target);

  //   const data = Object.fromEntries(
  //     Object.entries(Object.fromEntries(formDataApi.entries())).map(
  //       ([key, value]) => {
  //         if (key === "signature" || key === "customSignature") {
  //           value = value
  //             .split("\n")
  //             .filter(Boolean)
  //             .map((item) => item.replace(/\s+/g, " ").trim());
  //         } else if (typeof value === "string") {
  //           value = value.replace(/\s+/g, " ").trim();
  //         }
  //         return [key, value];
  //       }
  //     )
  //   );

  //   // Convert Base64 to Binary and append to FormData
  //   if (fileBase64) {
  //     // Dispatch the submitCompanyLogo action with the selected file
  //     dispatch(clearLogo())
  //     dispatch(submitCompanyLogo({ token, file: fileBase64 }));
  //   }

  //   // Object.keys(data).forEach((key) => {
  //   //   if (data[key] === initialData[key]) {
  //   //     delete data[key];
  //   //   }
  //   // });

  //   console.log("ID:", id, "Token:", token, "Data:", data);
  //   console.log(data);
  //   dispatch(updateFormData(data));
  //   dispatch(submitUserData({ id, token, data }));
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   dispatch(setBlurWhileLoading(false));
  //   const formDataApi = new FormData(event.target);
  
  //   const data = Object.fromEntries(
  //     Object.entries(Object.fromEntries(formDataApi.entries())).map(
  //       ([key, value]) => {
  //         if (key === "signature" || key === "customSignature") {
  //           value = value
  //             .split("\n")
  //             .filter(Boolean)
  //             .map((item) => item.replace(/\s+/g, " ").trim());
  //         } else if (typeof value === "string") {
  //           value = value.replace(/\s+/g, " ").trim();
  //         }
  //         return [key, value];
  //       }
  //     )
  //   );

  //   // Handle company logo upload separately
  //   const logoFile = formDataApi.get("image");
  //   if (logoFile && logoFile.size > 0) {
  //     dispatch(clearLogo());
  //     dispatch(submitCompanyLogo({ token, file: logoFile }));
  //   }
    
  
  //   // Dispatch updated form data to the backend
  //   dispatch(updateFormData(data));
  //   console.log("Payload being sent:", { id, token, data });
  //   dispatch(submitUserData({ id, token, data }));
  //   // console.log("Final Payload:", { id, token, data });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setBlurWhileLoading(false)); // Set blur loading state
  
    const formDataApi = new FormData(event.target);
  
    // Prepare payload
    const data = Object.fromEntries(
      Object.entries(Object.fromEntries(formDataApi.entries())).map(
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
  
    // Handle company logo upload separately
    const logoFile = formDataApi.get("image");
    if (logoFile && logoFile.size > 0) {
      dispatch(clearLogo());
      dispatch(submitCompanyLogo({ token, file: logoFile }));
    }
  
    // Direct API call to backend
    try {
      const response = await axios.post(
        `${brokerAPI}user/edit/${id}`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
  
      // If required, update Redux state here
      dispatch(updateFormData(data));
            // ✅ Show success toast with light blue color
                          toast.info("Company Data Updated Successfully", {
                           style: { fontSize:"12px" ,marginTop:"-10px",fontWeight:"bold"} , // 
                         });
    } catch (error) {
      console.error("Error updating Company Data:", error.response?.data || error.message);
      toast.error("Error Updating  Company Data", {
        style: { fontSize:"15px" ,marginTop:"-10px",fontWeight:"bold"} , // 
      });

    } finally {
      console.log("Setting loading to false");
      dispatch(setBlurWhileLoading(true)); // Reset blur loading state
    }
  
    console.log("Payload Sent:", data);
  };
  
  

  if (error) {
    return (
      <>
        <ErrorStatus error={error} />
      </>
    );
  }

  return (
    <>
      {!blurWhileLoading && <LoadingState />}
      {blurWhileLoading && (
        <div className={css.profileLayout}>
          <form onSubmit={handleSubmit}>
            <div className={css.profileInfo}>
              <div className={css.profileInfo_links}>
                <ul>
                  <li>
                    <NavLink
                      to="/mycompany"
                      end
                      className={({ isActive }) => (isActive ? css.active : '')}
                    >
                      <span>Primary Contact</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/mycompany/Createaccount"
                      className={({ isActive }) => (isActive ? css.active : '')}
                    >
                      <span>Create Account</span>
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
                      <span>My Vendors</span>
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
                <div className={`${css.profileInfo_form_personalInfo} font-thin text-left `}>
                  <h1>Primary Contact Information</h1>
                  <div className="pt-4 !text-left flex justify-start items-left">
                    <span>
                      <label htmlFor="firstName">Contact: First</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={handleChange}
                        value={formData.data?.company?.primaryContact.firstName || ""}
                        placeholder="Your first name"
                      />
                    </span>
                    <span>
                      <label htmlFor="lastName">Contact: Last</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={handleChange}
                        value={formData.data?.company?.primaryContact.lastName || ""}
                        placeholder="Your last name"
                      />
                    </span>
                    <span>
                      <label htmlFor="specialty">Contact: Title</label>
                      <input
                        type="text"
                        name="specialty"
                        id="specialty"
                        onChange={handleChange}
                        value={formData.data?.company?.primaryContact.specialty || ""}
                        placeholder="title"
                      />
                    </span>
                    <span>
                      <label htmlFor="phoneNumber">Direct Phone</label>
                      <input
                        type="phoneNumber"
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={handleChange}
                        value={formData.data?.company?.primaryContact.phoneNumber || ""}
                        placeholder="Your experience"
                      />
                    </span>
                    <span>
                      <label htmlFor="billingEmail">Billing Email</label>
                      <input
                        type="email"
                        name="billingEmail"
                        id="email"
                        onChange={handleChange}
                        value={formData.data?.company?.primaryContact.billingEmail || ""}
                        placeholder="Billing email"
                      />
                    </span>
                    <span>
                      <label htmlFor="supportEmail">Support Email</label>
                      <input
                        type="email"
                        name="supportEmail"
                        id="email"
                        onChange={handleChange}
                        value={formData.data?.company?.primaryContact.supportEmail || ""}
                        placeholder="Support Email"
                      />
                    </span>
                    <span>
                      <label htmlFor="salesEmail">Sales/RFQ Email</label>
                      <input
                        type="email"
                        name="salesEmail"
                        id="email"
                        onChange={handleChange}
                        value={formData.data?.company?.primaryContact.salesEmail || ""}
                        placeholder="Sales/RFQ Email"
                      />
                    </span>
                    <span>
                      <label htmlFor="companyInfoEmail">Company Info Email</label>
                      <input
                        type="text"
                        name="companyInfoEmail"
                        id="email"
                        onChange={handleChange}
                        value={formData.data?.company?.primaryContact.companyInfoEmail || ""}
                        placeholder="Company Info Email"
                      />
                    </span>
                  </div>
                </div>
                <div>
                  {/* <h1 className="text-[1vw] font-thin text-black">Payment Gateways</h1>
                  <span className="space-x-[8.5vw]">
                    <label htmlFor="paymentGateways">PayPal</label>
                    <input
                      type="text"
                      name="paymentGateway"
                      id="paymentGateway"
                      onChange={handleChange}
                      value={formData.data?.company?.primaryContact.paymentGateway || ""}
                      placeholder="Identifier (Username, email, etc"
                    />
                  </span> */}

                  <div className={css.profileInfo_form_personalPhoto}>
                    <div>
                      <h1>Company Logo</h1>
                      <div>
                        <img
                          src={
                            image}
                          alt="companyImage"
                        />
                      </div>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleFileChange}
                      />
                      <button type="submit" >Submit Changes</button>
                    </div>
                  </div>


                </div>
                <div className={`${css.profileInfo_form_IMScreenNames} pt-5`}>
                  <h1>IM Screen Names</h1>
                  <div className="!text-left">
                    <span>
                      <div className="flex items-center justify-center">
                        <label htmlFor="skype">Skype</label>
                        <img src="https://ben.cachefly.net/images/social_networks/tiny_skype.png" alt="Skype" title="Skype"></img>
                      </div>
                      <input
                        type="text"
                        name="imScreenNames.skype"
                        id="skype"
                        onChange={handleChange}
                        value={formData?.data?.company?.primaryContact?.imScreenNames?.skype || ""}
                        placeholder="Enter Skype username"
                        readOnly
                      />
                    </span>
                    <span>
                      <div className="flex items-center justify-center">
                        <label htmlFor="whatsapp">WhatsApp</label>
                        <img src="https://ben.cachefly.net/images/social_networks/tiny_whatsapp.png" alt="WhatsApp" title="WhatsApp" />
                      </div>
                      <input
                        type="text"
                        name="imScreenNames.whatsapp"
                        id="whatsapp"
                        onChange={handleChange}
                        value={formData?.data?.company?.primaryContact?.imScreenNames?.whatsapp || ""}
                        placeholder="Enter WhatsApp number"
                        readOnly
                      />
                    </span>
                    <span>
                      <div className="flex items-center justify-center ">
                        <label htmlFor="trillian">Trillian</label>
                        <img src="https://ben.cachefly.net/images/social_networks/tiny_trillian.png" alt="Trillian" title="Trillian" />
                      </div>
                      <input
                        type="text"
                        name="imScreenNames.trillian"
                        id="trillian"
                        onChange={handleChange}
                        value={formData?.data?.company?.primaryContact?.imScreenNames?.trillian || ""}
                        placeholder="Enter Trillian ID"
                        readOnly
                      />
                    </span>
                  </div>
                </div>
                <div className={css.profileInfo_form_socialNetworking}>
                  <h1>Social Networking</h1>
                  <div className="!text-left">
                    <span>

                      <div className="flex items-center  justify-center">
                        <label htmlFor="facebook">Facebook</label>
                        <img src="https://ben.cachefly.net/images/social_networks/tiny_facebook.png" alt="Facebook" title="Facebook" />
                      </div>

                      <input
                        type="text"
                        name="socialNetworking.facebook"
                        id="facebook"
                        onChange={handleChange}
                        value={formData?.data?.company?.primaryContact?.socialNetworking?.facebook || ""}
                        placeholder="Facebook link"
                        readOnly
                      />
                    </span>
                    <span>
                      <div className="flex items-center justify-center ">
                        <label htmlFor="twitter">Twitter</label>
                        <img src="https://ben.cachefly.net/images/social_networks/tiny_twitter.png" alt="Twitter" title="Twitter" />
                      </div>
                      <input
                        type="text"
                        name="socialNetworking.twitter"
                        id="twitter"
                        onChange={handleChange}
                        value={formData?.data?.company?.primaryContact?.socialNetworking?.twitter || ""}
                        placeholder="Twitter handle"
                        readOnly
                      />
                    </span>
                    <span>
                      <div className="flex items-center justify-center ">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <img src="https://ben.cachefly.net/images/social_networks/tiny_linkedin.png" alt="Linked-In" title="Linked-In" />
                      </div>
                      <input
                        type="text"
                        name="socialNetworking.linkedin"
                        id="linkedin"
                        onChange={handleChange}
                        value={formData?.data?.company?.primaryContact?.socialNetworking?.linkedin || ""}
                        placeholder="LinkedIn profile"
                        readOnly
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-4 !py-7"
                  type="submit">Submit Changes</button>
              </div>
            </div>
          </form>
        </div>
      )}

            <ToastContainer position="top-center" autoClose={2000} />

    </>
  );
};

export default MyCompany;
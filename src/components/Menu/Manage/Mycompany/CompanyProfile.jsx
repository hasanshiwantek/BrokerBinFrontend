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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData };
      if (!updatedData.data) updatedData.data = {}; // Ensure `data` exists
      if (!updatedData.data.company) updatedData.data.company = {}; // Ensure `company` exists
      if (!updatedData.data.company.primaryContact)
        updatedData.data.company.primaryContact = {}; // Ensure `primaryContact` exists

      updatedData.data.company.primaryContact[name] = cleanInput(value);
      return updatedData;
    });
  };

  const cleanInput = (input) => input.trimStart().replace(/\s+/g, " ");


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const extension = String(file.name).split(".").pop().toLowerCase();
    const allowedExtensions = ["jpeg", "jpg", "png", "webp"];
    if (allowedExtensions.includes(extension)) {
      dispatch(clearLogo())
      setFileBase64(file); // Store the actual file, not base64 string
    } else {
      alert("Format should be a jpeg, jpg, png, or webp");
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
  
  //   // Extract data from the form
  //   const plainData = {
  //     company: {
  //         id: formData?.data?.company?.id || null,
  //         name: formData?.data?.company?.name || "",
  //         address: formData?.data?.company?.address || "",
  //         phone_num: formData?.data?.company?.phone_num || "",
  //         primaryContact: {
  //             firstName: formData?.data?.company?.primaryContact?.firstName || "",
  //             lastName: formData?.data?.company?.primaryContact?.lastName || "",
  //             email: formData?.data?.company?.primaryContact?.email || "",
  //             phoneNumber: formData?.data?.company?.primaryContact?.phoneNumber || "",
  //             specialty: formData?.data?.company?.primaryContact?.specialty || "",
  //             imScreenNames: {
  //                 skype: formData?.data?.company?.primaryContact?.imScreenNames?.skype || "",
  //                 whatsapp: formData?.data?.company?.primaryContact?.imScreenNames?.whatsapp || "",
  //                 trillian: formData?.data?.company?.primaryContact?.imScreenNames?.trillian || "",
  //             },
  //             socialNetworking: {
  //                 facebook: formData?.data?.company?.primaryContact?.socialNetworking?.facebook || "",
  //                 twitter: formData?.data?.company?.primaryContact?.socialNetworking?.twitter || "",
  //                 linkedin: formData?.data?.company?.primaryContact?.socialNetworking?.linkedin || "",
  //             },
  //         },
  //     },
  // };
  
  //   // console.log("Form Data:", data);
  
  //   // Handle company logo upload separately
  //   const logoFile = formDataApi.get("image");
  //   if (logoFile && logoFile.size > 0) {
  //     dispatch(clearLogo());
  //     dispatch(submitCompanyLogo({ token, file: logoFile }));
  //   }
    
  
  //   // Dispatch updated form data to the backend
  //   dispatch(updateFormData(plainData));
  //   console.log("Payload being sent:", { id, token, plainData });
  //   dispatch(submitUserData({ id, token, data: plainData }));
  //   // console.log("Final Payload:", { id, token, data });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setBlurWhileLoading(false));
    // setLoading(true);
    const formDataApi = new FormData(event.target);

  
    const plainData = {
      company: {
        id: formData?.data?.company?.id || null,
        name: formData?.data?.company?.name || "",
        address: formData?.data?.company?.address || "",
        phone_num: formData?.data?.company?.phone_num || "",
        primaryContact: {
          firstName: formData?.data?.company?.primaryContact?.firstName || "",
          lastName: formData?.data?.company?.primaryContact?.lastName || "",
          email: formData?.data?.company?.primaryContact?.email || "",
          phoneNumber: formData?.data?.company?.primaryContact?.phoneNumber || "",
          specialty: formData?.data?.company?.primaryContact?.specialty || "",
          imScreenNames: {
            skype: formData?.data?.company?.primaryContact?.imScreenNames?.skype || "",
            whatsapp: formData?.data?.company?.primaryContact?.imScreenNames?.whatsapp || "",
            trillian: formData?.data?.company?.primaryContact?.imScreenNames?.trillian || "",
          },
          socialNetworking: {
            facebook: formData?.data?.company?.primaryContact?.socialNetworking?.facebook || "",
            twitter: formData?.data?.company?.primaryContact?.socialNetworking?.twitter || "",
            linkedin: formData?.data?.company?.primaryContact?.socialNetworking?.linkedin || "",
          },
        },
      },
    };
  
    // Handle company logo upload separately
    const logoFile = formDataApi.get("image");
    if (logoFile && logoFile.size > 0) {
      dispatch(clearLogo());
      dispatch(submitCompanyLogo({ token, file: logoFile }));
    }
  
    // Direct API call for plainData
    try {
      const response = await axios.post(
        `${brokerAPI}user/edit/${id}`,
        JSON.stringify(plainData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error.message);
    }
    finally {
      console.log("Setting loading to false");
      setLoading(false); // Stop loading after API response
    }
    dispatch(updateFormData(plainData));
    console.log("Payload Sent:", plainData);
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
                      <button type="submit">Submit Changes</button>
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
                        value={formData?.data?.company?.primaryContact?.imScreenNames?.trillian}
                        placeholder="Enter Trillian ID"
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
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button className="!bg-[#2c83ec] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-5"
                  type="submit">Submit Changes</button>
              </div>
            </div>
          </form>
        </div>
      )}

    </>
  );
};

export default MyCompany;
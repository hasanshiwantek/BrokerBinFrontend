// import React, { useEffect, useState } from "react";
// import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
// import personalPhoto from "../../../../imgs/logo/shadow.png";
// import LoadingState from "../../../../LoadingState";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUserData,
//   setFormData,
//   setCustomSignature,
//   setBlurWhileLoading,
//   submitUserData,
// } from "../../../../ReduxStore/ProfleSlice";
// import ErrorStatus from "../../../Error/ErrorStatus";
// import Cookies from "js-cookie";
// import { Link,NavLink } from "react-router-dom";
// import Footer from "../../../Footer/Footer";
// import axios from "axios";
// import { brokerAPI } from "../../../api/BrokerEndpoint";

// const MyProfile = () => {
//   const token = Cookies.get("token");
//   const user_id = Cookies.get("user_id");

//   const [formData, setFormData] = useState({});
//   const [fileBase64, setFileBase64] = useState("");
//   const [loading, setLoading] = useState(true);

//   const {
//     user,
//     // formData,
//     initialData,
//     blurWhileLoading,
//     customSignature,
//     error,
//   } = useSelector((state) => state.profileStore);
//   console.log("INITAL DATA",initialData)
//   console.log("FORM DATA",formData)
// console.log("User " ,user)
//   const id = user?.user?.id || user_id;

//   const dispatch = useDispatch();
//   // const [fileBase64, setFileBase64] = useState("");

//   const textAreaContent = [
//     formData.sigcheckName ? `${formData.firstName} ${formData.lastName}` : "",
//     formData.sigcheckEmailAddress ? `${formData.email}` : "",
//     formData.sigcheckPosition ? `${formData.position}` : "",
//     formData.sigcheckPhone ? `${formData.phoneNumber}` : "",
//     formData.sigcheckCell ? `${formData.cellular}` : "",
//     formData.sigcheckCompany ? `${formData.experience}` : "",
//     formData.sigcheckToll ? `${formData.tollFree}` : "",
//     formData.sigcheckFax ? `${formData.faxNumber}` : "",
//     formData.sigcheckIM ? `${formData.specialty}` : "",
//   ].filter(Boolean).join("\n");
// const customTextAreaContent = initialData?.customSignature?.filter(Boolean).join("\n");

// useEffect(() => {
//   console.log(id)
// ;
//   dispatch(fetchUserData({ id, token }));
// }, []);

// const companyId = initialData?.company?.id;
// console.log("Company ID",companyId)
//     useEffect(() => {
//       if (companyId) {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(`${brokerAPI}company/show/${companyId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setFormData(response.data); // API ka response direct set ho raha hai
//           setLoading(false);
//         } catch (error) {
//           console.error("Error fetching data", error);
//           setLoading(false);
//         }
//       };
    
//       fetchData();
//     }
//     }, [companyId, token]);

//   // const cleanInput = (input) => input.trimStart().replace(/\s+/g, " ");

//   // const handleChange = (e) => {
//   //   const { name, type, value } = e.target;
//   //   const val = type === "checkbox" ? checked : cleanInput(value);
//   //   setFormData({ ...formData, [name]: val });
//   // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     setFormData((prevData) => {
//       const updatedData = { ...prevData };
//       if (!updatedData.data) updatedData.data = {}; // Ensure `data` exists
//       if (!updatedData.data.company) updatedData.data.company = {}; // Ensure `company` exists
//       if (!updatedData.data.company.primaryContact)
//         updatedData.data.company.primaryContact = {}; // Ensure `primaryContact` exists
  
//       updatedData.data.company.primaryContact[name] = cleanInput(value);
//       return updatedData;
//     });
//   };
  
//   const cleanInput = (input) => input.trimStart().replace(/\s+/g, " ");
  
  
  

//   // const handleFileChange = (event) => {
//   //   const file = event.target.files[0];
//   //   const extension = String(file.name).split(".").pop().toLowerCase();
//   //   const allowedExtensions = ["jpeg", "jpg", "png", "webp"];
//   //   if (allowedExtensions.includes(extension)) {
//   //     if (file) {
//   //       const reader = new FileReader();
//   //       reader.onload = (e) => {
//   //         const base64String = e.target.result
//   //           .replace("data:", "")
//   //           .replace(/^.+,/, "");
//   //         setFileBase64(base64String);
//   //       };
//   //       reader.readAsDataURL(file);
//   //     } else {
//   //       setFileBase64("");
//   //     }
//   //   } else {
//   //     alert("Format should be a jpeg, jpg, png, or webp");
//   //     event.target.value = "";
//   //     setFileBase64("");
//   //   }
//   // };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     dispatch(setBlurWhileLoading(false));
//     const formDataApi = new FormData(event.target);

//     const data = Object.fromEntries(
//       Object.entries(Object.fromEntries(formDataApi.entries())).map(
//         ([key, value]) => {
//           if (key === "signature" || key === "customSignature") {
//             value = value
//               .split("\n")
//               .filter(Boolean)
//               .map((item) => item.replace(/\s+/g, " ").trim());
//           } else if (typeof value === "string") {
//             value = value.replace(/\s+/g, " ").trim();
//           }
//           return [key, value];
//         }
//       )
//     );

//     if (customSignature) {
//       delete data.signature;
//     }

//     data.useCustomSignature = data.useCustomSignature ? 1 : 0;

//     if (fileBase64) {
//       data.personalPhoto = { base64: fileBase64 };
//     } else {
//       delete data.personalPhoto;
//     }

//     // const passwordFields = [
//     //   "currentPassword",
//     //   "newPassword",
//     //   "confirmNewPassword",
//     // ];
//     // const passwordValues = passwordFields.map((field) => data[field] || "");
//     // const filledPasswords = passwordValues.filter((value) => value !== "");

//     // if (
//     //   filledPasswords.length > 0 &&
//     //   filledPasswords.length < passwordFields.length
//     // ) {
//     //   alert(
//     //     "Please fill in all password fields to update your password, or leave all empty if no update is intended."
//     //   );
//     //   return;
//     // }

//     // if (
//     //   filledPasswords.length === passwordFields.length &&
//     //   data.newPassword !== data.confirmNewPassword
//     // ) {
//     //   alert("New passwords do not match.");
//     //   return;
//     // }

//     // passwordFields.forEach((field) => {
//     //   if (data[field] === "") {
//     //     delete data[field];
//     //   }
//     // });

//     // const userName = data.firstName;
//     // const regex =
//     //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,24}$/;
//     // if (data.newPassword && !regex.test(data.newPassword)) {
//     //   alert("Password does not meet the complexity requirements.");
//     //   return;
//     // }
//     // if (
//     //   data.newPassword &&
//     //   data.newPassword.toLowerCase().includes(userName.toLowerCase())
//     // ) {
//     //   alert("Password cannot contain the username.");
//     //   return;
//     // }

//     const passwordFields = [
//       "currentPassword",
//       "newPassword",
//       "confirmNewPassword",
//     ];
//     const passwordValues = passwordFields.map((field) => data[field] || "");
//     const filledPasswords = passwordValues.filter((value) => value !== "");
    
//     // Skip validation for empty or partial passwords
//     if (
//       filledPasswords.length > 0 &&
//       filledPasswords.length < passwordFields.length
//     ) {
//       // Temporarily skipping validation
//       return;
//     }
    
//     // Skip mismatch check
//     if (
//       filledPasswords.length === passwordFields.length &&
//       data.newPassword !== data.confirmNewPassword
//     ) {
//       // Temporarily skipping validation
//       return;
//     }
    
//     // Skip regex validation and username check
//     // Cleanup empty password fields
//     passwordFields.forEach((field) => {
//       if (data[field] === "") {
//         delete data[field];
//       }
//     });

//     Object.keys(data).forEach((key) => {
//       if (data[key] === initialData[key]) {
//         delete data[key];
//       }
//     });

//     console.log(data);
//     dispatch(setFormData(data));
//     dispatch(submitUserData({ id, token, data }));
//   };

//   const checkAll = () => {
//     dispatch(
//       setFormData({
//         sigcheckName: true,
//         sigcheckEmailAddress: true,
//         sigcheckPosition: true,
//         sigcheckPhone: true,
//         sigcheckCell: true,
//         sigcheckCompany: true,
//         sigcheckToll: true,
//         sigcheckFax: true,
//         sigcheckIM: true,
//       })
//     );
//   };

//   const unCheckAll = () => {
//     dispatch(
//       setFormData({
//         sigcheckName: false,
//         sigcheckEmailAddress: false,
//         sigcheckPosition: false,
//         sigcheckPhone: false,
//         sigcheckCell: false,
//         sigcheckCompany: false,
//         sigcheckToll: false,
//         sigcheckFax: false,
//         sigcheckIM: false,
//       })
//     );
//   };

//   if (error) {
//     return (
//       <>
//         <ErrorStatus error={error} />
//       </>
//     );
//   }



  


//   return (
//     <>
//       {!blurWhileLoading && <LoadingState />}
//       {blurWhileLoading && (
//         <div className={css.profileLayout}>
//           <form onSubmit={handleSubmit}>
//             {/* <div className={css.profileBtn}>
//               <p>my profile</p>
//               <span>
//                 <input type="submit" value="submit changes" />
//                 <button type="button">view profile</button>
//               </span>
//             </div> */}
//             <div className={css.profileInfo}>
//               <div className={css.profileInfo_links}>
//               <ul>
//                 <li>
//                   <NavLink
//                     to="/mycompany"
//                     end 
//                     className={({ isActive }) => (isActive ? css.active : '')}
//                   >
//                     <span>Primary Contact</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/mycompany/Createaccount"
//                     className={({ isActive }) => (isActive ? css.active : '')}
//                   >
//                     <span>Create Account</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/myprofile/MyVendors"
//                     className={({ isActive }) => (isActive ? css.active : '')}
//                   >
//                     <span>My Vendors</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/myprofile/MyContact"
//                     className={({ isActive }) => (isActive ? css.active : '')}
//                   >
//                     <span>My Contacts</span>
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/myprofile/broadcastfilter"
//                     className={({ isActive }) => (isActive ? css.active : '')}
//                   >
//                     <span>Broadcast Filters</span>
//                   </NavLink>
//                 </li>
//               </ul>
//               </div>
//               <div className={css.profileInfo_form}>
//                 <div className={`${css.profileInfo_form_personalInfo} font-thin text-left `}>
//                   <h1>Primary Contact Information</h1>
//                   <div className="pt-4 !text-left flex justify-start items-left">
//                     <span>
//                       <label htmlFor="firstName">Contact: First</label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         id="firstName"
//                         onChange={handleChange}
//                         value={formData.data?.company?.primaryContact.firstName || ""}
//                         placeholder="Your first name"
//                       />
//                     </span>
//                     <span>
//                       <label htmlFor="lastName">Contact: Last</label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         id="lastName"
//                         onChange={handleChange}
//                         value={formData.data?.company?.primaryContact.lastName || ""}
//                         placeholder="Your last name"
//                       />
//                     </span>
//                     <span>
//                       <label htmlFor="specialty">Contact: Title</label>
//                       <input
//                         type="text"
//                         name="specialty"
//                         id="specialty"
//                         onChange={handleChange}
//                         value={formData.data?.company?.primaryContact.specialty || ""}
//                         placeholder="title"
//                       />
//                     </span>
//                     <span>
//                       <label htmlFor="phoneNumber">Direct Phone</label>
//                       <input
//                         type="phoneNumber"
//                         name="phoneNumber"
//                         id="phoneNumber"
//                         onChange={handleChange}
//                         value={formData.data?.company?.primaryContact.phoneNumber || ""}
//                         placeholder="Your experience"
//                       />
//                     </span>
//                     <span>
//                       <label htmlFor="billingEmail">Billing Email</label>
//                       <input
//                         type="email"
//                         name="billingEmail"
//                         id="email"
//                         onChange={handleChange}
//                         value={formData.data?.company?.primaryContact.email || ""}
//                         placeholder="Billing email"
//                       />
//                     </span>
//                     <span>
//                       <label htmlFor="supportEmail">Support Email</label>
//                       <input
//                         type="email"
//                         name="supportEmail"
//                         id="email"
//                         onChange={handleChange}
//                         value={formData.data?.company?.primaryContact.email || ""}
//                         placeholder="Support Email"
//                       />
//                     </span>
//                     <span>
//                       <label htmlFor="salesEmail">Sales/RFQ Email</label>
//                       <input
//                         type="email"
//                         name="salesEmail"
//                         id="email"
//                         onChange={handleChange}
//                         value={formData.data?.company?.primaryContact.email || ""}
//                         placeholder="Sales/RFQ Email"
//                       />
//                     </span>
//                     <span>
//                       <label htmlFor="companyInfoEmail">Company Info Email</label>
//                       <input
//                         type="text"
//                         name="companyInfoEmail"
//                         id="email"
//                         onChange={handleChange}
//                         value={formData.data?.company?.primaryContact.email || ""}
//                         placeholder="Company Info Email"
//                       />
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <h1 className="text-[1vw] font-thin text-black">Payment Gateways</h1>
//                   <span className="space-x-[8.5vw]">
//                       <label htmlFor="paymentGateways">PayPal</label>
//                       <input
//                         type="text"
//                         name="paymentGateway"
//                         id="paymentGateway"
//                         onChange={handleChange}
//                         value={formData.data?.company?.primaryContact.paymentGateway || ""}
//                         placeholder="Identifier (Username, email, etc"
//                       />
//                     </span>

//                 </div>
//                 <div className={`${css.profileInfo_form_IMScreenNames} pt-5`}>
//                   <h1>IM Screen Names</h1>
//                   <div className="!text-left">
//                     <span>
//                       <div className="flex items-center justify-center"> 
//                       <label htmlFor="skype">Skype</label>
//                       <img src="https://ben.cachefly.net/images/social_networks/tiny_skype.png" alt="Skype" title="Skype"></img>
//                       </div>
//                       <input
//                         type="text"
//                         name="skype"
//                         id="skype"
//                         onChange={handleChange}
//                         value={formData.skype}
//                         placeholder="Enter Skype username"
//                       />
//                     </span>
//                     <span>
//                     <div className="flex items-center justify-center"> 
//                       <label htmlFor="whatsapp">WhatsApp</label>
//                       <img src="https://ben.cachefly.net/images/social_networks/tiny_whatsapp.png" alt="WhatsApp" title="WhatsApp"/>
//                       </div>
//                       <input
//                         type="text"
//                         name="whatsapp"
//                         id="whatsapp"
//                         onChange={handleChange}
//                         value={formData.whatsapp}
//                         placeholder="Enter WhatsApp number"
//                       />
//                     </span>
//                     <span>
//                     <div className="flex items-center justify-center "> 
//                       <label htmlFor="trillian">Trillian</label>
//                       <img src="https://ben.cachefly.net/images/social_networks/tiny_trillian.png" alt="Trillian" title="Trillian"/>
//                       </div>
//                       <input
//                         type="text"
//                         name="trillian"
//                         id="trillian"
//                         onChange={handleChange}
//                         value={formData.trillian}
//                         placeholder="Enter Trillian ID"
//                       />
//                     </span>
//                   </div>
//                 </div>
//                 <div className={css.profileInfo_form_socialNetworking}>
//                   <h1>Social Networking</h1>
//                   <div className="!text-left">
//                     <span>

//                        <div className="flex items-center  justify-center"> 
//                       <label htmlFor="facebook">Facebook</label>
//                       <img src="https://ben.cachefly.net/images/social_networks/tiny_facebook.png" alt="Facebook" title="Facebook"/>
//                       </div>

//                       <input
//                         type="text"
//                         name="facebook"
//                         id="facebook"
//                         onChange={handleChange}
//                         value={formData.facebook}
//                         placeholder="Facebook link"
//                       />
//                     </span>
//                     <span>
//                     <div className="flex items-center justify-center "> 
//                       <label htmlFor="twitter">Twitter</label>
//                       <img src="https://ben.cachefly.net/images/social_networks/tiny_twitter.png" alt="Twitter" title="Twitter"/>
//                       </div>
//                       <input
//                         type="text"
//                         name="twitter"
//                         id="twitter"
//                         onChange={handleChange}
//                         value={formData.twitter}
//                         placeholder="Twitter handle"
//                       />
//                     </span>
//                     <span>
//                     <div className="flex items-center justify-center "> 
//                       <label htmlFor="linkedin">LinkedIn</label>
//                       <img src="https://ben.cachefly.net/images/social_networks/tiny_linkedin.png" alt="Linked-In" title="Linked-In"/>
//                       </div>
//                       <input
//                         type="text"
//                         name="linkedin"
//                         id="linkedin"
//                         onChange={handleChange}
//                         value={formData.linkedin}
//                         placeholder="LinkedIn profile"
//                       />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="pt-2">
//                 <button className="!bg-[#ef6421] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-5">Submit Changes</button>
//               </div>
//             </div>
//           </form>
//         </div>
//       )}

//     </>
//   );
// };

// export default MyProfile;

























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
} from "../../../../ReduxStore/ProfleSlice";
import ErrorStatus from "../../../Error/ErrorStatus";
import Cookies from "js-cookie";
import { Link,NavLink } from "react-router-dom";
import Footer from "../../../Footer/Footer";
import axios from "axios";
import { brokerAPI } from "../../../api/BrokerEndpoint";

const MyProfile = () => {
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
  } = useSelector((state) => state.profileStore);
  console.log("INITAL DATA",initialData)
  console.log("FORM DATA",formData)
console.log("User " ,user)
  const id = user?.user?.id || user_id;

  const dispatch = useDispatch();
  // const [fileBase64, setFileBase64] = useState("");

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
  ].filter(Boolean).join("\n");
const customTextAreaContent = initialData?.customSignature?.filter(Boolean).join("\n");

useEffect(() => {
  console.log(id)
;
  dispatch(fetchUserData({ id, token }));
}, []);

const companyId = initialData?.company?.id;
console.log("Company ID",companyId)
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

  // const cleanInput = (input) => input.trimStart().replace(/\s+/g, " ");

  // const handleChange = (e) => {
  //   const { name, type, value } = e.target;
  //   const val = type === "checkbox" ? checked : cleanInput(value);
  //   setFormData({ ...formData, [name]: val });
  // };

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
  
  
  

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const extension = String(file.name).split(".").pop().toLowerCase();
  //   const allowedExtensions = ["jpeg", "jpg", "png", "webp"];
  //   if (allowedExtensions.includes(extension)) {
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const base64String = e.target.result
  //           .replace("data:", "")
  //           .replace(/^.+,/, "");
  //         setFileBase64(base64String);
  //       };
  //       reader.readAsDataURL(file);
  //     } else {
  //       setFileBase64("");
  //     }
  //   } else {
  //     alert("Format should be a jpeg, jpg, png, or webp");
  //     event.target.value = "";
  //     setFileBase64("");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(setBlurWhileLoading(false));
    const formDataApi = new FormData(event.target);

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

    if (customSignature) {
      delete data.signature;
    }

    data.useCustomSignature = data.useCustomSignature ? 1 : 0;

    if (fileBase64) {
      data.personalPhoto = { base64: fileBase64 };
    } else {
      delete data.personalPhoto;
    }

    const passwordFields = [
      "currentPassword",
      "newPassword",
      "confirmNewPassword",
    ];
    const passwordValues = passwordFields.map((field) => data[field] || "");
    const filledPasswords = passwordValues.filter((value) => value !== "");
    
    // Skip validation for empty or partial passwords
    if (
      filledPasswords.length > 0 &&
      filledPasswords.length < passwordFields.length
    ) {
      // Temporarily skipping validation
      return;
    }
    
    // Skip mismatch check
    if (
      filledPasswords.length === passwordFields.length &&
      data.newPassword !== data.confirmNewPassword
    ) {
      // Temporarily skipping validation
      return;
    }
    
    // Skip regex validation and username check
    // Cleanup empty password fields
    passwordFields.forEach((field) => {
      if (data[field] === "") {
        delete data[field];
      }
    });

    Object.keys(data).forEach((key) => {
      if (data[key] === initialData[key]) {
        delete data[key];
      }
    });

    console.log("ID:", id, "Token:", token, "Data:", data);
    console.log(data);
    dispatch(updateFormData(data));
    dispatch(submitUserData({ id, token, data }));
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



  


  return (
    <>
      {!blurWhileLoading && <LoadingState />}
      {blurWhileLoading && (
        <div className={css.profileLayout}>
          <form onSubmit={handleSubmit}>
            {/* <div className={css.profileBtn}>
              <p>my profile</p>
              <span>
                <input type="submit" value="submit changes" />
                <button type="button">view profile</button>
              </span>
            </div> */}
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
                <li>
                  <NavLink
                    to="/myprofile/MyVendors"
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>My Vendors</span>
                  </NavLink>
                </li>
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
                        value={formData.data?.company?.primaryContact.email || ""}
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
                        value={formData.data?.company?.primaryContact.email || ""}
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
                        value={formData.data?.company?.primaryContact.email || ""}
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
                        value={formData.data?.company?.primaryContact.email || ""}
                        placeholder="Company Info Email"
                      />
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="text-[1vw] font-thin text-black">Payment Gateways</h1>
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
                    </span>

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
                  <div className="!text-left">
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
              </div>
              <div className="pt-2">
                <button className="!bg-[#ef6421] !h-[1.5vw] items-center flex !rounded-[.2vw] !px-5"
                type="submit">Submit Changes</button>
              </div>
            </div>
          </form>
        </div>
      )}

    </>
  );
};

export default MyProfile;










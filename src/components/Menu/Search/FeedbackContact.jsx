import React, { useEffect, useState } from "react";
import css from "@/styles/Menu/Main/Contact.module.css";
import basic from "@/styles/Menu/Basic.module.css";
import Cookies from "js-cookie";
import LoadingState2 from "@/LoadingState2";
import styles from "@/styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PopupAlert from "@/components/Popups/PopupAlert";
import { brokerAPI } from "@/components/api/BrokerEndpoint";

const Contact = () => {
  const location = useLocation();
  const feedbackData = location.state?.feedbackData;
  console.log("Navigated Feedback Data:", feedbackData);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const [navigatedPayloadData, setNavigatedPayloadData] = useState({
    companyName: user?.firstName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    contact_method: "email",
    subject: feedbackData?.feedbackIssue || "Banner Ads",
    comments: feedbackData?.feedbackPost || "",
    user_id: feedbackData?.id || "",
  });

  console.log("Navigated Payload : ", navigatedPayloadData);
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

  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNavigatedPayloadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (feedbackData) {
      setNavigatedPayloadData((prev) => ({
        ...prev,
        subject: feedbackData.feedbackIssue || "Banner Ads",
        comments: feedbackData.feedbackPost || "",
        user_id: feedbackData.id || "",
      }));
    }
  }, [feedbackData]);

  const handleReset = () => {
    setNavigatedPayloadData({
      companyName: user.firstName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      contact_method: "email",
      subject: "Banner Ads",
      comments: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        contact_method: navigatedPayloadData.contact_method,
        subject: navigatedPayloadData.subject,
        comments: navigatedPayloadData.comments,
      };

      const response = await fetch(
        `${brokerAPI}contactadmin/contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        handleReset();

        showPopup("success", "Contact form Submitted successfully!");
      } else {
        showPopup("info", "Error submitting contact form. Please try again!");
      }
    } catch (error) {
      showPopup("info", "Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const data = {
//       contact_method: formData.contact_method,
//       subject: formData.subject,
//       comments: formData.comments,
//     };

//     const response = await axios.post(`${brokerAPI}contactadmin/contact-us`, data, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       handleReset();
//       toast.info("Contact form Submitted successfully!", {
//         style: { fontSize: "14px", marginTop: "-10px" },
//       });
//     } else {
//       toast.info("Error submitting contact form. Please try again!", {
//         style: { fontSize: "14px", marginTop: "-10px" },
//       });
//     }
//   } catch (error) {
//     toast.info("❌ Network error. Please try again later.", {
//       style: { fontSize: "14px", marginTop: "-10px" },
//     });
//   } finally {
//     setLoading(false);
//   }
// };

  const predefinedSubjects = [
    "Banner Ads",
    "Billing",
    "BrokerBox",
    "Comment",
    "My Account",
    "Other",
    "Question",
    "Report an Issue",
    "Suggest Custom Reports",
    "Suggested Features",
    "Report Feedback Abuse",
    "Uploads",
    "Ethics Issue",
    "RTI Issue",
    "RTI Feedback",
    "Shield Issue",
    "Shield Feedback",
  ];

  if (loading) {
    return <LoadingState2 />;
  }

  return (
    <>
      <div className={basic.basicFormLayout}>
        <form onSubmit={handleSubmit}>
          <div className={`${basic.basic} !bg-[#e8e8e8]`}>
            <div className={styles.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/help"
                    end // This ensures the exact match for /myprofile
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <span>Help</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/feedbackContact"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <span>Contact</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ethics"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <span>Ethics</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sitemap"
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    <span>Site Map</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/badges"
                    className={({ isActive }) => (isActive ? css.active : "")}
                  >
                    <span>Badges</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className={basic.basic_form}>
              <div className={css.feedback_heading}>
                <h1>Contact</h1>
              </div>
              <div className={css.feedback_form}>
                <span>
                  <label htmlFor="companyName">Name</label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    onChange={handleChange}
                    value={navigatedPayloadData.companyName}
                  />
                </span>
                <span>
                  <label htmlFor="email">email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={navigatedPayloadData.email}
                  />
                </span>
                <span>
                  <label htmlFor="phoneNumber">Phone/Fax</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={handleChange}
                    value={navigatedPayloadData.phoneNumber}
                  />
                </span>
                <span>
                  <label htmlFor="contact_method">Contact Method</label>
                  <select
                    name="contact_method"
                    id="contact_method"
                    onChange={handleChange}
                    value={navigatedPayloadData.contact_method}
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="fax">Fax</option>
                  </select>
                </span>
                <span>
                  <label htmlFor="subject">Subject</label>
                  <select
                    name="subject"
                    id="subject"
                    onChange={handleChange}
                    value={navigatedPayloadData.subject}
                  >
                    {!predefinedSubjects.includes(
                      navigatedPayloadData.subject
                    ) && (
                      <option value={navigatedPayloadData.subject}>
                        {navigatedPayloadData.subject}
                      </option>
                    )}
                    {predefinedSubjects.map((subj) => (
                      <option key={subj} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                </span>
                <span>
                  <label htmlFor="comments">Comments</label>
                  <textarea
                    name="comments"
                    id="comments"
                    rows={5}
                    onChange={handleChange}
                    value={navigatedPayloadData.comments}
                    required
                  ></textarea>
                </span>
              </div>
            </div>
            <div className={css.feedback_btn}>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
              <input
                type="submit"
                value="Submit"
                className="cursor-pointer hover:bg-blue-600"
              />
            </div>
          </div>
        </form>
      </div>

      <PopupAlert
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default Contact;

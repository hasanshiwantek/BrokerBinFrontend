import React, { useEffect, useState } from "react";
import css from "../../../styles/Menu/Main/Contact.module.css";
import basic from "../../../styles/Menu/Basic.module.css";
import Cookies from "js-cookie";
import LoadingState2 from "../../../LoadingState2";
import { Link } from "react-router-dom";
import styles from "../../../styles/Menu/Manage/MyProfile.module.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Contact = () => {
  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");
  const { user } = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [formData, setFormData] = useState({
    companyName: user.firstName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    contact_method: "email",
    subject: "Banner Ads",
    comments: "",
    user_id: user_id,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
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
      contact_method: formData.contact_method,
      subject: formData.subject,
      comments: formData.comments,
    };

    const response = await fetch(
      "https://backend.brokercell.com/api/contact/store",
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
      toast.info("Contact form Submitted successfully!", {
        style: { fontSize: "14px", marginTop: "-10px" },
      });
    } else {
      toast.info("Error submitting contact form. Please try again!", {
        style: { fontSize: "14px", marginTop: "-10px" },
      });
    }
  } catch (error) {
    toast.info("❌ Network error. Please try again later.", {
      style: { fontSize: "14px", marginTop: "-10px" },
    });
  } finally {
    setLoading(false);
  }
};

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
                    end  // This ensures the exact match for /myprofile
                    className={({ isActive }) => (isActive ? styles.active : '')}
                  >
                    <span>Help</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/feedback"
                    className={({ isActive }) => (isActive ? styles.active : '')}
                  >
                    <span>Contact</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/ethics"
                    className={({ isActive }) => (isActive ? styles.active : '')}
                  >
                    <span>Ethics</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sitemap"
                    className={({ isActive }) => (isActive ? styles.active : '')}
                  >
                    <span>Site Map</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/badges"
                    className={({ isActive }) => (isActive ? css.active : '')}
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
                    value={formData.companyName}
                  />
                </span>
                <span>
                  <label htmlFor="email">email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </span>
                <span>
                  <label htmlFor="phoneNumber">Phone/Fax</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                  />
                </span>
                <span>
                  <label htmlFor="contact_method">Contact Method</label>
                  <select
                    name="contact_method"
                    id="contact_method"
                    onChange={handleChange}
                    value={formData.contact_method}
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
                    value={formData.subject}
                  >
                    <option value="Banner Ads">Banner Ads</option>
                    <option value="Billing">Billing</option>
                    <option value="BrokerBox">BrokerBox</option>
                    <option value="Comment">Comment</option>
                    <option value="My Account">My Account</option>
                    <option value="Other">Other</option>
                    <option value="Question">Question</option>
                    <option value="Report an Issue">Report an Issue</option>
                    <option value="Suggest Custom Reports">
                      Suggest Custom Reports
                    </option>
                    <option value="Suggested Features">Suggested Features</option>
                    <option value="Report Feedback Abuse">
                      Report Feedback Abuse
                    </option>
                    <option value="Uploads">Uploads</option>
                    <option value="Ethics Issue">Ethics Issue</option>
                    <option value="RTI Issue">RTI Issue</option>
                    <option value="RTI Feedback">RTI Feedback</option>
                    <option value="Shield Issue">Shield Issue</option>
                    <option value="Shield Feedback">Shield Feedback</option>
                  </select>
                </span>
                <span>
                  <label htmlFor="comments">Comments</label>
                  <textarea
                    name="comments"
                    id="comments"
                    rows={5}
                    onChange={handleChange}
                    value={formData.comments}
                    required
                  ></textarea>
                </span>
              </div>
            </div>
            <div className={css.feedback_btn}>
              <button type="button" onClick={handleReset}  >
                Reset
              </button>
              <input type="submit" value="Submit" className="cursor-pointer hover:bg-blue-600" />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />

    </>

  );
};

export default Contact;

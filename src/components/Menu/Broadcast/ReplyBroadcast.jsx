import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import myProfile from "../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./BroadCast.module.css";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { sendBroadcastReply } from "../../../ReduxStore/BroadCast";
import { fetchUserData } from "../../../ReduxStore/ProfleSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import CompanyDetails from "@/components/Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
const ReplyBroad = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [broadcast, setBroadcast] = useState(
    location.state?.broadcast ||
      JSON.parse(localStorage.getItem("broadcastData"))
  );
  const [loading, setLoading] = useState(false); // To track API call status

  const recipientEmail = broadcast?.user_id?.email || "";
  const currentUserID = Cookies.get("user_id");
  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");

  const { initialData, user } = useSelector((state) => state.profileStore);
  // Fallback to localStorage data if Redux data is not available
  console.log("User Data", initialData);
  const id = user?.user?.id || user_id;
  console.log(id);

  useEffect(() => {
    dispatch(fetchUserData({ id, token }))
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id, token]);

  // Now you can use `userData` for the logged-in user's data

  // Function to format comments data with <br> tags
  const formatComments = () => {
    if (!broadcast) return "Broadcast data is not available.";

    const firstName = initialData.firstName || "";
    const lastName = initialData.lastName || "";
    const companyName = initialData?.company?.name || "";
    const phoneNumber = initialData.phoneNumber || "";
    const email = initialData?.email || "";
    const signature = initialData?.company?.primaryContact?.customSignature;
    const mfg = broadcast.mfg || "";
    const partModel = broadcast.partModel || "";
    const condition = broadcast.cond || "";
    const quantity = broadcast.quantity || "";
    const price = broadcast.price || "";
    const additionalComments = broadcast.additional_comments || "";
    const description = broadcast.description || "";

    const userDetails = `${firstName} ${lastName}<br />${companyName}<br />${email}<br />${phoneNumber}<br />`;

    return `
    <br />
    <br />
    <br />
    - ------------------ -<br />
    ${userDetails} <br />

    <br />
        <br />
    - ------------------ -<br />
    Original Broadcast Details<br />
    MFG: ${mfg}<br />
    Part No: ${partModel}<br />
    Condition: ${condition}<br />
    Quantity: ${quantity}<br />
    Price: ${price}<br />
    Comments: ${additionalComments}<br />
    Description: ${description}<br />`;
  };

  const [email, setEmail] = useState({
    to: broadcast ? `${broadcast.user_id.email} ` : "",
    subject: broadcast
      ? `Re: ${broadcast.type} : ${broadcast.mfg} : ${broadcast.partModel} : ${broadcast?.additional_comments} : ${broadcast?.description}`
      : "",
    comments: broadcast ? formatComments() : "",
    sendCopy: false,
  });

  // Strip HTML tags and preserve line breaks
  const stripHtmlTagsWithLineBreaks = (html) => {
    return html
      .replace(/<\/p>/g, "\n") // Replace closing </p> with a newline
      .replace(/<p>/g, "") // Remove opening <p>
      .replace(/<br\s*\/?>/gi, "\n") // Replace <br> with a newline
      .replace(/<\/?[^>]+(>|$)/g, ""); // Remove any remaining HTML tags
  };
  useEffect(() => {
    if (broadcast && initialData?.firstName) {
      const formatted = formatComments();
      setEmail((prev) => ({
        ...prev,
        comments: formatted,
      }));
    }
  }, [broadcast, initialData]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setEmail((prevEmail) => ({
      ...prevEmail,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const plainTextComments = stripHtmlTagsWithLineBreaks(email.comments);
    const name = `${initialData.firstName || ""} ${initialData.lastName || ""}`;

    const emailData = {
      emailData: {
        to: email.to,
        subject: email.subject,
        comments: plainTextComments,
        sendCopy: email.sendCopy,
        // name,
      },
    };

    console.log("📤 Sending Email Data:", emailData);

    dispatch(sendBroadcastReply({ token, data: emailData }))
      .then((res) => {
        console.log("📥 Response:", res);

        if (res.meta.requestStatus === "fulfilled") {
          toast.info("✅ Email sent successfully!", {
            style: { fontSize: "12px", fontWeight: "bold" },
          });
          navigate("/broadcasts");
        } else {
          const errorPayload = res.payload;
          console.error("❌ Backend Rejected Response:", errorPayload);

          toast.error(
            `❌ Failed to send email: ${
              typeof errorPayload === "string"
                ? errorPayload
                : errorPayload?.message || "Unknown error"
            }`,
            {
              style: { fontSize: "12px", fontWeight: "bold" },
            }
          );
        }
      })
      .catch((err) => {
        console.error("❗Unexpected error during dispatch:", err);
        toast.error("⚠️ Unexpected error. Please try again later.", {
          style: { fontSize: "12px", fontWeight: "bold" },
        });
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  // Company Modal Logic
  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  useEffect(() => {
    console.log("Reply To Broadcast: ", broadcast);
  }, []);

  // useEffect(() => {
  //     return () => {
  //         localStorage.removeItem("broadcastData");
  //     };
  // }, []);

  return (
    <>
      <main className={myProfile.profileInfo}>
        <nav className="menu-bar">
          <ul>
            <li style={{ color: "#428bca" }}>
              <Link to={"/"}>Reply</Link>
            </li>
            <li>
              <Link to={"/sendbroad"}>Send</Link>
            </li>
            <li>
              <Link to={"/broadcasts"}>View</Link>
            </li>
            <li>
              <Link to={"/myprofile/broadcastfilter"}>Set Filters</Link>
            </li>
            <li>
              <Link to={"/broadcasthistory"}>History</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.replyform}>
          <h2>Reply To Broadcast</h2>
          <div className={styles.replySec}>
            <div className={styles.formGroup}>
              <form onSubmit={handleSubmit} className="mt-10">
                <div className="!flex !items-center justify-between gap-4">
                  <strong>To:</strong>
                  <input
                    type="text"
                    name="to"
                    value={email.to}
                    onChange={handleChange}
                    className={`${styles.input} !text-[9pt] !font-semibold cursor-pointer`}
                    readOnly
                    onClick={() => openCompanyModal(broadcast.user_id.company)}
                  />
                </div>
                <div className="!flex !items-center justify-between  gap-4">
                  <strong>Subject:</strong>
                  <input
                    type="text"
                    name="subject"
                    value={email.subject}
                    onChange={handleChange}
                    className={`${styles.input} !text-[9pt]`}
                    readOnly
                  />
                </div>
                <div>
                  <label>
                    <strong>Comments:</strong>
                  </label>
                  <ReactQuill
                    value={email.comments}
                    onChange={(value) =>
                      setEmail((prev) => ({ ...prev, comments: value }))
                    }
                    className={`${styles.textarea} !block !text-[8pt]`}
                    theme="snow"
                    modules={{
                      toolbar: [["bold", "italic", "underline"]],
                    }}
                  />
                </div>
                <div
                  className={styles.checkboxContainer}
                  style={{ marginTop: "80px" }}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="sendCopy"
                      checked={email.sendCopy}
                      onChange={handleChange}
                      style={{ marginRight: "5px" }}
                    />
                    Send a copy to myself
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.sendButton}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Send"}
          </button>
          <button
            type="button"
            onClick={() => setEmail({ comments: "", sendCopy: false })}
            className={styles.resetButton}
          >
            Reset
          </button>
        </div>
      </main>
      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default ReplyBroad;

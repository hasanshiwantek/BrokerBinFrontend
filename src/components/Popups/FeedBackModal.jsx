import React, { useState } from "react";
import styles from "../../styles/Menu/Search/FeedBackProfile.module.css";
import { brokerAPI } from "../api/BrokerEndpoint";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const FeedbackModal = ({ isOpen, onClose, company, onSucces }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    to: company.id || "",
    poNumber: "",
    feedbackIssue: "",
    feedbackRating: "",
    feedbackPost: "",
    emailACopy: 0,
  });

  const [isChecked, setIsChecked] = useState(false);

  const token = Cookies.get("token");
  console.log("TOKEN", token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${brokerAPI}feedback/store`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response: ", response);

      if (response.status === 201) {
        setShowSuccessModal(true);
        onSucces();
        console.log(response.data.message);
      } else {
        throw new Error("Feedback not accepted");
      }
    } catch (error) {
      console.log("ERROR:", error);
      toast.error(
        response.data.message || "Error submitting feedback. Please try again.",
        {
          style: { fontSize: "17px", marginTop: "-10px" },
        }
      );
    }

    setLoading(false);
  };

  const isDisabled = !formData.feedbackRating;

  return (
    <div id={`${styles.modalOverlay} `}>
      <div className={`${styles.modalContent} !w-[30vw]`}>
        <h2>Post Feedback to a Member</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <label>
              Member Name:
              <input
                type="text"
                value={company.name || ""}
                name="to"
                readOnly
              />
            </label>

            <label>
              PO #
              <input
                type="text"
                value={formData.poNumber || ""}
                name="poNumber"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </label>

            <label>
              Feedback Issue:
              <select
                value={formData.feedbackIssue || ""}
                name="feedbackIssue"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              >
                <option value="">Pick Issue</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Product">Product</option>
                <option value="Returns">Returns</option>
                <option value="Shipping">Shipping</option>
                <option value="Other">Other</option>
                {/* Add other options here */}
              </select>
            </label>

            <label>
              Feedback Rating: *
              <select
                name="feedbackRating"
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              >
                <option value="">Pick One</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
                {/* Add other options here */}
              </select>
            </label>

            <label>
              Feedback Post:
              <p className="text-[#ff0000]">
                {61 - formData.feedbackPost.length} characters left
              </p>
              <textarea
                placeholder="Write your feedback..."
                name="feedbackPost"
                value={formData.feedbackPost}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                maxLength="61"
                className="h-[8vh]"
              ></textarea>
            </label>

            <label
              className={`${styles.checkboxLabel} !flex-row !flex !items-center`}
            >
              <input
                type="checkbox"
                name="emailACopy"
                checked={formData.emailACopy}
                className={styles.checkbox}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.checked ? 1 : 0,
                  })
                }
              />
              <p className="pt-2">Email me a copy of this post.</p>
            </label>

            <label
              className={`${styles.checkboxLabel} !flex !flex-row !items-center `}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <p className="pt-2">
                I understand that inappropriate comments may violate the Terms
                of Service.
              </p>
            </label>
            <div className={styles.termsNotes}>
              <p>* Feedback must be related to the transaction only.</p>
              <p>* Brokercell is not responsible for posted content.</p>
              <p>
                * Please note: your name and company name will be displayed on
                ALL feedback comments.
              </p>
              <p>
                * Please note: from the original posting, you have 5 days to
                resolve negative/neutral feedback before the feedback is
                published to members. You have 30 days to edit feedback.
              </p>
              <p>
                * If Feedback System is not applicable, forward complaint to
                ethics@brokercell.com.
              </p>
            </div>

            <div className={styles.modalButtons}>
              <button
                type="submit"
                disabled={loading || !formData.feedbackRating || !isChecked}
                className={`p-2 rounded text-white 
                                ${
                                  loading ||
                                  !formData.feedbackRating ||
                                  !isChecked
                                    ? "bg-gray-400 cursor-not-allowed opacity-50"
                                    : "bg-blue-500"
                                }`}
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </form>
      </div>

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div
            className={`${styles.modalContent} !w-[80%] !h-[80%] relative flex flex-col justify-center items-center`}
          >
            <button
              className="absolute top-2 right-2 bg-gray-400 hover:bg-gray-300 px-2 rounded"
              onClick={() => {
                setShowSuccessModal(false);
                setTimeout(() => {
                  window.location.reload(100);
                });
              }}
            >
              ✖
            </button>
            <h3 className="text-center text-red-600 font-semibold mt-2">
              Feedback submitted successfully.
            </h3>
            <p className="text-center text-red-600 mt-2">
              You have <strong>5 days</strong> to resolve negative/neutral
              feedback before the feedback is published to members.
              <br />
              You have <strong>30 days</strong> to edit feedback.
            </p>
            <div className="flex justify-center gap-4 mt-16 text-blue-600 underline text-sm">
              <a href="#">Advertising Programs</a>
              <a href="#">Business Solutions</a>
              <a href="#">About Brokercell.com</a>
            </div>
            <p className="text-center mt-4 text-xs text-gray-500">
              © 2025 Privacy
            </p>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default FeedbackModal;

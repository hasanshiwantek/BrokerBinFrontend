import React, { useState } from "react";
import styles from "../../styles/Menu/Search/FeedBackProfile.module.css";
import { brokerAPI } from "../api/BrokerEndpoint";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { updateFeedback, getCompanyFeedback } from "@/ReduxStore/ProfleSlice";
import { useDispatch } from "react-redux";
const UpdateFeedbackModal = ({
  isOpen,
  onClose,
  company,
  feedbackData,
  companyId,
}) => {
  if (!isOpen || !feedbackData) return null;
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: feedbackData.id || "",
    to: feedbackData.to || "",
    poNumber: feedbackData.poNumber || "",
    feedbackIssue: feedbackData.feedbackIssue || "",
    feedbackRating: feedbackData.feedbackRating || "",
    feedbackPost: feedbackData.feedbackPost || "",
    emailACopy: feedbackData.emailACopy || 0,
  });
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const token = Cookies.get("token");
  console.log("TOKEN", token);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dispatch(
        updateFeedback({
          feedbackId: formData.id,
          token,
          data: {
            poNumber: formData.poNumber,
            feedbackIssue: formData.feedbackIssue,
            feedbackRating: formData.feedbackRating,
            feedbackPost: formData.feedbackPost,
            emailACopy: formData.emailACopy,
          },
        })
      );
      console.log("Result : ", result);

      if (result.meta.requestStatus === "fulfilled") {
        setShowSuccessModal(true);
        dispatch(getCompanyFeedback({ id: companyId, token }));
      } else {
        toast.error(result.error?.message || "❌ Feedback update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error.response?.data?.message ||
          "❌ An error occurred. Please try again."
      );
    }

    setLoading(false);
  };

  const isDisabled = !formData.feedbackRating;

  return (
    <div className={`${styles.modalOverlay} `}>
      <div className={`${styles.modalContent} !w-[30vw]`}>
        <h2>Post Feedback to a Member</h2>
        <form onSubmit={handleUpdate}>
          <div className={styles.formSection}>
            <label>
              Member Name:
              <input type="text" value={company?.name || ""} readOnly />
            </label>

            <label>
              PO #
              <input
                type="text"
                name="poNumber"
                value={formData.poNumber}
                onChange={(e) =>
                  setFormData({ ...formData, poNumber: e.target.value })
                }
              />
            </label>

            <label>
              Feedback Issue:
              <select
                name="feedbackIssue"
                value={formData.feedbackIssue}
                onChange={(e) =>
                  setFormData({ ...formData, feedbackIssue: e.target.value })
                }
              >
                <option value="">Pick Issue</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Product">Product</option>
                <option value="Returns">Returns</option>
                <option value="Shipping">Shipping</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Feedback Rating: *
              <select
                name="feedbackRating"
                value={formData.feedbackRating}
                onChange={(e) =>
                  setFormData({ ...formData, feedbackRating: e.target.value })
                }
              >
                <option value="">Pick One</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </label>

            <label>
              Feedback Post:
              <p className="text-[#ff0000]">
                {61 - formData.feedbackPost.length} characters left
              </p>
              <textarea
                name="feedbackPost"
                maxLength="61"
                value={formData.feedbackPost}
                onChange={(e) =>
                  setFormData({ ...formData, feedbackPost: e.target.value })
                }
              ></textarea>
            </label>

            <label
              className={`${styles.checkboxLabel} !flex-row !flex !items-center`}
            >
              <input
                type="checkbox"
                checked={formData.emailACopy}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emailACopy: e.target.checked ? 1 : 0,
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
                checked={isChecked}
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
                className={`p-2 rounded text-white ${
                  loading || !formData.feedbackRating || !isChecked
                    ? "bg-gray-400 cursor-not-allowed opacity-50"
                    : "bg-green-500"
                }`}
              >
                {loading ? "Updating..." : "Update Feedback"}
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

export default UpdateFeedbackModal;

import { React, useEffect } from "react";
import styles from "../../../styles/Menu/Search/FeedBackProfile.module.css"; // Ensure the path is correct
import positiveEmoji from "../../../assets/positive-emoji.png";
import neutralEmoji from "../../../assets/neutral-emoji.png";
import negativeEmoji from "../../../assets/negative-emoji.png";
import "../../Menu/Main/MenuBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  getCompanyFeedback,
  fetchGivenFeedback,
  removeReceiveFeedback,
} from "../../../ReduxStore/ProfleSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { setTogglePopUp } from "../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "../../../ReduxStore/SearchProductSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UpdateFeedbackModal from "../../../components/Popups/UpdateFeedBackModal";
const LeaveFeedBack = () => {
  const [activeTab, setActiveTab] = useState("received"); // default to received
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const { companyFeedbackData, feedbackGivenData } = useSelector(
    (state) => state.profileStore
  );
  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  const feedbacks = companyFeedbackData?.feedbacks;
  console.log("Company Feedback Data ", feedbacks);
  const givenFeedbackData = feedbackGivenData?.feedbacks;
  console.log("Given Feedback Data: ", givenFeedbackData);

  const location = useLocation();
  const companyId = location.state?.companyId;
  console.log("Company ID:", companyId);

  const token = Cookies.get("token");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanyFeedback({ id: companyId, token }));
  }, [companyId]);

  const positiveCount =
    feedbacks?.filter((fb) => fb?.feedbackRating === "Positive").length || 0;
  const neutralCount =
    feedbacks?.filter((fb) => fb?.feedbackRating === "Neutral").length || 0;
  const negativeCount =
    feedbacks?.filter((fb) => fb?.feedbackRating === "Negative").length || 0;

  console.log(
    "Positive:",
    positiveCount,
    "Neutral:",
    neutralCount,
    "Negative:",
    negativeCount
  );

  useEffect(() => {
    dispatch(fetchGivenFeedback({ company_id: companyId, token }));
  }, [token]);

  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  // REPORT ABUSE FUNCTION
  const navigate = useNavigate();

  const accountManagerHandler = (feedback) => {
    console.log("Feedback Data: ", feedback);
    navigate("/feedbackContact", {
      state: { feedbackData: feedback },
    });
  };

  // DELETE FEEDBACK FUNCTION

  const primaryId = Number(Cookies.get("user_id"));
  console.log(primaryId);

  const feedbackDeleteHandler = (id, primaryId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );
    if (!isConfirmed) return;

    dispatch(
      removeReceiveFeedback({
        feedbackId: id,
        primaryContact: primaryId,
        token,
      })
    )
      .then((result) => {
        console.log("Result:", result);

        if (result?.meta?.requestStatus === "fulfilled") {
          toast.info(
            result.payload?.message || "✅ Feedback deleted successfully"
          );
          dispatch(getCompanyFeedback({ id: companyId, token }));
        } else {
          toast.warning(
            result.error?.message || "⚠️ Failed to delete feedback."
          );
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error(
          `❌ Error deleting feedback. Please try again. ${err.message}`
        );
      });
  };

  // EDIT FEEDBACK FUNCTION
  const feedbackEditHandler = (feedback) => {
    console.log("Id for updation: ", feedback);
    setSelectedFeedback(feedback);
    setIsOpen(true); // Open the modal
  };

  const compId = Number(Cookies.get("companyId"));
  console.log("Company id: ", compId);

  return (
    <>
      <main className={styles.mainLeaveFeedback}>
        <nav className="menu-bar">
          <ul>
            <li>
              <button
                onClick={() => setActiveTab("received")}
                className={`px-4 py-2 ${
                  activeTab === "received"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                Feedback Received
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("given")}
                className={`px-4 py-2  ${
                  activeTab === "given"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                Feedback Given
              </button>
            </li>
          </ul>
        </nav>

        {activeTab === "received" && (
          <table className={styles.feedbackTable}>
            <thead>
              <tr>
                <th>Comment</th>
                <th>Action</th>
                <th>Commenter</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks && feedbacks.length ? (
                feedbacks.map((feedback, index) => (
                  <tr key={index}>
                    <td>
                      <span>
                        {feedback?.feedbackRating === "Positive" ? (
                          <img src={positiveEmoji} alt="Positive Feedback" />
                        ) : feedback?.feedbackRating === "Neutral" ? (
                          <img src={neutralEmoji} alt="Neutral Feedback" />
                        ) : feedback?.feedbackRating === "Negative" ? (
                          <img src={negativeEmoji} alt="Negative Feedback" />
                        ) : (
                          "No Rating"
                        )}
                      </span>
                      {feedback?.feedbackIssue} <br />
                      PO #: {feedback?.poNumber} <br />
                      {feedback?.feedbackPost}
                    </td>
                    <td>
                      <div className="!flex !flex-col !items-center">
                        <button
                          className={styles.reportButton}
                          onClick={() => accountManagerHandler(feedback)}
                        >
                          Report Abuse
                        </button>
                        <span
                          className={styles.reportButton}
                          onClick={() =>
                            feedbackDeleteHandler(feedback.id, primaryId)
                          }
                        >
                          Delete
                        </span>
                      </div>
                    </td>
                    <td
                      className="cursor-pointer"
                      onClick={() => openCompanyModal(feedback?.toCompanyName)}
                    >
                      <div className="flex flex-col text-[8pt]">
                        <div className="flex gap-2 items-center">
                          <span>{feedback.fromUsername}</span>
                          {/* <a
                              href={`mailto:${user.email}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <img
                                src="https://static.brokerbin.com/version/v8.2.9/images/New.png"
                                alt="Email"
                                title="Email"
                                className="w-7 h-6"
                              />
                            </a> */}
                        </div>
                        <span>{feedback?.toCompanyName?.name}</span>
                      </div>
                    </td>

                    <td>
                      {new Date(feedback?.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    No Feedback Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === "given" && (
          <table className={styles.feedbackTable}>
            <thead>
              <tr>
                <th>Comment</th>
                <th>Action</th>
                <th>Commenter</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {givenFeedbackData && givenFeedbackData.length > 0 ? (
                givenFeedbackData.map((feedback, index) => (
                  <tr key={index}>
                    <td>
                      <span>
                        {feedback?.feedbackRating === "Positive" ? (
                          <img src={positiveEmoji} alt="Positive Feedback" />
                        ) : feedback?.feedbackRating === "Neutral" ? (
                          <img src={neutralEmoji} alt="Neutral Feedback" />
                        ) : feedback?.feedbackRating === "Negative" ? (
                          <img src={negativeEmoji} alt="Negative Feedback" />
                        ) : (
                          "No Rating"
                        )}
                      </span>
                      {feedback?.feedbackIssue} <br />
                      PO #: {feedback?.poNumber} <br />
                      {feedback?.feedbackPost}
                    </td>

                    <td>
                      <div className="!flex !flex-col !items-center">
                        <button
                          className={styles.reportButton}
                          onClick={() => accountManagerHandler(feedback)}
                        >
                          Report Abuse
                        </button>

                        {feedback.to === compId ? (
                          <span
                            className={styles.reportButton}
                            onClick={() => {
                              feedbackEditHandler(feedback);
                            }}
                          >
                            Edit Feedback
                          </span>
                        ) : null}
                      </div>
                    </td>

                    <td
                      className="cursor-pointer"
                      onClick={() => openCompanyModal(feedback?.to_company)}
                    >
                      {feedback?.from_user?.firstName}{" "}
                      {feedback?.from_user?.lastName}
                      <br />
                      {feedback?.to_company?.name}
                    </td>
                    <td>
                      {new Date(feedback?.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    No Feedback Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className={styles.actionButtons}>
          {/* <button className={styles.ethicsComplaintButton} onClick={handleOpenModal}>Leave Feedback</button> */}
          <Link to={"/ethics"}>
            <button className={styles.ethicsComplaintButton}>
              Ethics Complaint
            </button>
          </Link>
        </div>
      </main>

      <ToastContainer position="top-center" autoClose={2000} />

      {isOpen && selectedFeedback && (
        <UpdateFeedbackModal
          company={{
            id: selectedFeedback?.to_company?.id || compId,
            name: selectedFeedback?.to_company?.name || "Unknown Company",
          }}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          feedbackData={selectedFeedback} // <-- pass the data here
          companyId={compId}
        />
      )}
      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
    </>
  );
};

export default LeaveFeedBack;

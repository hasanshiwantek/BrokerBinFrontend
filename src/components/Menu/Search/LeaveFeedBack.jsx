import { React, useEffect } from "react";
import styles from "../../../styles/Menu/Search/FeedBackProfile.module.css"; // Ensure the path is correct
import positiveEmoji from "../../../assets/positive-emoji.png";
import neutralEmoji from "../../../assets/neutral-emoji.png";
import negativeEmoji from "../../../assets/negative-emoji.png";
import "../../Menu/Main/MenuBar.css";
import { Link } from "react-router-dom";
import FeedbackModal from "../../Popups/FeedBackModal";
import { useState } from "react";
import {
  getCompanyFeedback,
  fetchGivenFeedback,
} from "../../../ReduxStore/ProfleSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../ReduxStore/ProfleSlice";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const LeaveFeedBack = () => {
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [feedbackReceivedTab, setFeedbackReceivedTab] = useState(false);
  const [feedbackGivenTab, setFeedbackGivenTab] = useState(false);

  const { companyFeedbackData, feedbackGivenData } = useSelector(
    (state) => state.profileStore
  );
  const feedbacks = companyFeedbackData?.feedbacks;
  console.log("Company Feedback Data ", feedbacks);
  const givenFeedbackData = feedbackGivenData?.feedbacks;
  console.log("Given Feedback Data: ", givenFeedbackData);

  const location = useLocation();
  const companyId = location.state?.companyId;
  console.log("Company ID:", companyId);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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

  return (
    <>
      <main className={styles.mainLeaveFeedback}>
        <nav className="menu-bar">
          <ul>
            <li onClick={() => setFeedbackReceivedTab((prev) => !prev)}>
              <Link to={"/feedbackprofile"}>Feedback Recieved</Link>
            </li>
            <li onClick={() => setFeedbackGivenTab((prev) => !prev)}>
              <Link to={"#"}>Feedback Given</Link>
            </li>
          </ul>
        </nav>

        {feedbackReceivedTab && (
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
              {feedbacks && feedbacks.length > 0 ? (
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
                      {" "}
                      <Link to={"/feedback"}>
                        <button className={styles.reportButton}>
                          Report Abuse
                        </button>
                      </Link>
                    </td>
                    <td>
                      {feedback.fromUsername}
                      <br />
                      {feedback.toCompanyName}
                    </td>
                    <td>{feedback.created_at}</td>
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

        {feedbackGivenTab && (
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
              {feedbackGivenData && feedbackGivenData.length > 0 ? (
                feedbackGivenData.map((feedback, index) => (
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
                      {" "}
                      <Link to={"/feedback"}>
                        <button className={styles.reportButton}>
                          Report Abuse
                        </button>
                      </Link>
                    </td>
                    <td>
                      {feedback.from_user.firstName}{" "}
                      {feedback.from_user.lastName}
                      <br />
                      {feedback.to_company.name}
                    </td>
                    <td>{feedback.created_at}</td>
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
            {" "}
            <button className={styles.ethicsComplaintButton}>
              Ethics Complaint
            </button>
          </Link>
        </div>
      </main>
      <FeedbackModal isOpen={isModalOpen} onClose={handleCloseModal} />{" "}
    </>
  );
};

export default LeaveFeedBack;

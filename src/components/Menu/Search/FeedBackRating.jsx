import { React, useEffect,useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/Menu/Search/FeedBackProfile.module.css";
// import "../../Menu/Main/MenuBar.css";
import positiveEmoji from "../../../assets/positive-emoji.png";
import neutralEmoji from "../../../assets/neutral-emoji.png";
import negativeEmoji from "../../../assets/negative-emoji.png";
import ntlogo from "../../../assets/nt-logo.png";
import thumbsUp from "../../../assets/thumbsup.png";
import { getCompanyFeedback } from "../../../ReduxStore/ProfleSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../ReduxStore/ProfleSlice";
import Cookies from "js-cookie";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { setTogglePopUp } from "../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "../../../ReduxStore/SearchProductSlice";
import { useLocation } from "react-router-dom";
import FeedbackModal from "@/components/Popups/FeedBackModal";
const FeedBackRating = () => {
  const location = useLocation();
  const companyId = location.state?.companyId;
  const primaryId = location.state?.primaryId;
  const [isOpen, setIsOpen] = useState(false);
  console.log("Company ID:", companyId);

  const token = Cookies.get("token");
  const user_id = Cookies.get("user_id");
  const { blurWhileLoading, initialData, user, error } = useSelector(
    (state) => state.profileStore
  );
  const { companyFeedbackData } = useSelector((state) => state.profileStore);
  const feedbacks = companyFeedbackData?.feedbacks;
  console.log("Company Feedback Data ", feedbacks);
  const id = user?.user?.id || user_id;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(primaryId);
    dispatch(fetchUserData({ id: primaryId, token }));
  }, []);
  console.log("Initial Data ", initialData);

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
  const totalFeedback = positiveCount + neutralCount + negativeCount;

  const companyRatings = initialData?.company?.rating || [];
  const ratingCounts = initialData?.company?.ratingCount || [];

  console.log("Company Ratings ", companyRatings);

  console.log("Rating Counts:", ratingCounts);

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      let icon;
      const commonStyle = {
        stroke: "black", // Border color
        strokeWidth: "5", // Thickness of border
      };

      if (i <= rating) {
        icon = <FaStar key={i} size={20} color="gold" style={commonStyle} />;
      } else if (i - 0.5 === rating) {
        icon = (
          <FaStarHalfAlt key={i} size={20} color="gold" style={commonStyle} />
        );
      } else {
        icon = <FaRegStar key={i} size={20} color="gray" style={commonStyle} />;
      }

      stars.push(icon);
    }

    return stars;
  };

  const companyRatingsPer = ((companyRatings / 5) * 100).toFixed(1);
  console.log("Company Ratings in %:", companyRatingsPer);

  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  const company = initialData?.company;
  console.log("COMPANY ", company);

  // Company Modal Logic
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };
  console.log("popupCompanyDetail", popupCompanyDetail);
  console.log("togglePopUp", togglePopUp);

  const compId=companyId
  const companyName = initialData?.company?.name;

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackHead}>
        <h2>
          Feedback Profile for Member: <span>{initialData?.company?.name}</span>
        </h2>
      </div>

      <div className={styles.feedbackRatingSection}>
        <h3>
          Feedback Rating: <br /> <span>{companyRatingsPer}% </span>
        </h3>
        <img
          src={thumbsUp}
          alt="feedback icon"
          className={styles.feedbackIcon}
        />
      </div>

      <div className={styles.feedbackDetailsSection}>
        <div className={`${styles.feedbackGiven} w-64 `}>
          <h4>Feedback Given</h4>
          <p>
            Positive Feedback: <strong>{positiveCount}</strong>
          </p>
          <p>
            Neutral Feedback: <strong>{neutralCount}</strong>
          </p>
          <p>
            Negative Feedback: <strong>{negativeCount}</strong>
          </p>
          <p>
            Total Feedback: <strong>{totalFeedback}</strong>
          </p>
        </div>

        <div className={styles.feedbackMainSec}>
          <div className={styles.feedBackSec}>
            <div className={styles.feedbackReceived}>
              <h4>Feedback Received</h4>
              <div className={styles.feedbackEmojiContainer}>
                <p>
                  <span>
                    <img src={positiveEmoji} alt="Positive" />
                  </span>{" "}
                  Positive
                </p>
                <p>
                  <span>
                    <img src={neutralEmoji} alt="Neutral" />
                  </span>{" "}
                  Neutral
                </p>
                <p>
                  <span>
                    <img src={negativeEmoji} alt="Negative" />
                  </span>{" "}
                  Negative
                </p>
              </div>
            </div>

            <div>
              <h4 className="whitespace-nowrap">Past Month</h4>
              <div className={styles.feedbackpSec}>
                <p style={{ color: "green" }}>{positiveCount}</p>
                <p style={{ color: "blue" }}>{neutralCount}</p>
                <p style={{ color: "red" }}>{negativeCount}</p>
                <p style={{ color: "black" }}>{totalFeedback}</p>
              </div>
            </div>
          </div>
          <div className={styles.feedbackPastSec}>
            <div className={styles.feedbackPast}>
              <h4>Past Year</h4>
              <p style={{ color: "green" }}>{positiveCount}</p>
              <p style={{ color: "blue" }}>{neutralCount}</p>
              <p style={{ color: "red" }}>{negativeCount}</p>
              <p style={{ color: "black" }}>{totalFeedback}</p>
            </div>
            <div className={styles.feedbackPast}>
              <h4>Past Total</h4>
              <p style={{ color: "green" }}>{positiveCount}</p>
              <p style={{ color: "blue" }}>{neutralCount}</p>
              <p style={{ color: "red" }}>{negativeCount}</p>
              <p style={{ color: "black" }}>{totalFeedback}</p>
            </div>
          </div>
        </div>

        <div className={`!p-3 leading-loose ${styles.memberInfo}`}>
          <img
            src={initialData?.company?.image}
            className="w-52 cursor-pointer"
            alt=""
            onClick={() => openCompanyModal(initialData?.company)}
          />
          <p className="!text-2xl">{initialData?.company?.name}</p>
          <p>Date Established: { new Date(initialData?.company?.created_at).toLocaleString()}</p>

          <div className={styles.feedbackStars}>
            <p className="!text-xl whitespace-nowrap ">Feedback Stars:</p>
            <div className="flex items-center ">
              <span className="flex items-center ">
                {renderStars(initialData?.company?.rating || 0)}
              </span>
            </div>
          </div>

          <p className="!text-xl">A {companyRatings} Star Member</p>
        </div>
      </div>

      <div className={styles.buttonSec}>
        <button
          className={styles.ethicsComplaintButton}
          onClick={() => setIsOpen(true)}
        >
          Ethics Complaint
        </button>
      </div>

      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
      {isOpen && (
        <FeedbackModal
          company={{ id: compId, name: companyName }}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          // onSucces={handleFetchData}
        />
      )}
    </div>
  );
};

export default FeedBackRating;

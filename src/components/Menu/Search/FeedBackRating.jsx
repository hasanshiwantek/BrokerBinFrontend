import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "../../../styles/Menu/Search/FeedBackProfile.module.css";
// import "../../Menu/Main/MenuBar.css";
import positiveEmoji from "../../../assets/positive-emoji.png"
import neutralEmoji from "../../../assets/neutral-emoji.png"
import negativeEmoji from "../../../assets/negative-emoji.png"
import ntlogo from "../../../assets/nt-logo.png"
import thumbsUp from "../../../assets/thumbsup.png"
import { getCompanyFeedback } from '../../../ReduxStore/ProfleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../ReduxStore/ProfleSlice';
import Cookies from 'js-cookie';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { setTogglePopUp } from "../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "../../../ReduxStore/SearchProductSlice";


const FeedBackRating = () => {


    const token = Cookies.get("token");
    const user_id = Cookies.get("user_id");
    const { blurWhileLoading, initialData, user, error } = useSelector(
        (state) => state.profileStore
    );
    const { companyFeedbackData } = useSelector((state) => state.profileStore)
    const feedbacks = companyFeedbackData?.feedbacks;
    console.log("Company Feedback Data ", feedbacks);
    const id = user?.user?.id || user_id;

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(id);
        dispatch(fetchUserData({ id, token }));
    }, []);
    console.log("Initial Data ", initialData);

    const companyId = initialData?.company?.id;
    console.log("Company ID ", companyId);

    useEffect(() => {
        dispatch(getCompanyFeedback({ id: companyId, token }));
    }, [companyId])

    const positiveCount = feedbacks?.filter(fb => fb?.feedbackRating === "Positive").length || 0;
    const neutralCount = feedbacks?.filter(fb => fb?.feedbackRating === "Neutral").length || 0;
    const negativeCount = feedbacks?.filter(fb => fb?.feedbackRating === "Negative").length || 0;

    console.log("Positive:", positiveCount, "Neutral:", neutralCount, "Negative:", negativeCount);
    const totalFeedback = positiveCount + neutralCount + negativeCount;


    const companyRatings = initialData?.company?.rating || [];
    const ratingCounts = initialData?.company?.ratingCount || [];

    console.log("Company Ratings ", companyRatings);

    console.log("Rating Counts:", ratingCounts);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} color="gold" size={20} />); // Full Star
            } else if (i - 0.5 === rating) {
                stars.push(<FaStarHalfAlt key={i} color="gold" size={20} />); // Half Star
            } else {
                stars.push(<FaRegStar key={i} color="gray" size={20} />); // Empty Star
            }
        }
        return stars;
    };


    const companyRatingsPer = (companyRatings / 5) * 100
    console.log("Company Ratings in %:", companyRatingsPer);



    
    
    
      const { togglePopUp, popupCompanyDetail } = useSelector((state) => state.searchProductStore)
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
    

    return (
        <div className={styles.feedbackContainer}>
            <div className={styles.feedbackHead}>
                <h2>Feedback Profile for Member: <span>{initialData?.company?.name}</span></h2>
            </div>

            <div className={styles.feedbackRatingSection}>
                <h3>Feedback Rating:  <br /> <span>{companyRatingsPer}% </span></h3>
                <img src={thumbsUp} alt="feedback icon" className={styles.feedbackIcon} />
            </div>

            <div className={styles.feedbackDetailsSection}>
                <div className={styles.feedbackGiven}>
                    <h4>Feedback Given</h4>
                    <p>Positive Feedback: <strong>{positiveCount}</strong></p>
                    <p>Neutral Feedback: <strong>{neutralCount}</strong></p>
                    <p>Negative Feedback: <strong>{negativeCount}</strong></p>
                    <p>Total Feedback: <strong>{totalFeedback}</strong></p>
                </div>

                <div className={styles.feedbackMainSec}>

                    <div className={styles.feedBackSec}>
                        <div className={styles.feedbackReceived}>
                            <h4>Feedback Received</h4>
                            <div className={styles.feedbackEmojiContainer}>
                                <p>
                                    <span><img src={positiveEmoji} alt="Positive" /></span> Positive
                                </p>
                                <p>
                                    <span><img src={neutralEmoji} alt="Neutral" /></span> Neutral
                                </p>
                                <p>
                                    <span><img src={negativeEmoji} alt="Negative" /></span> Negative
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: "-28px" }}>
                            <h4>Past Month</h4>
                            <div className={styles.feedbackpSec} >
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


                <div className={styles.memberInfo}>
                    <img src={initialData?.company?.image} className='w-52 cursor-pointer' alt="" onClick={() => openCompanyModal(initialData?.company)} />
                    <h4>{initialData?.company?.name}</h4>
                    <p>Date Established: {initialData?.company?.created_at}</p>

                    <div className={styles.feedbackStars}>
                        <span>Feedback Stars:</span>
                        <div className='flex items-center'>
                            <span className='flex items-center'>{renderStars(initialData?.company?.rating || 0)}</span>
                        </div>
                    </div>


                    <p>a {companyRatings}Star Member</p>
                </div>

            </div>

            <div className={styles.buttonSec}>
                <Link to="/ethics" className={styles.ethicsComplaintButton}>
                    Ethics Complaint
                </Link>
            </div>

                  {togglePopUp && <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />}
            
        </div>
    );
}

export default FeedBackRating;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../../../styles/Menu/Search/FeedBackProfile.module.css"; 
// import "../../Menu/Main/MenuBar.css";
import positiveEmoji from "../../../assets/positive-emoji.png"
import neutralEmoji from "../../../assets/neutral-emoji.png"
import negativeEmoji from "../../../assets/negative-emoji.png"
import ntlogo from "../../../assets/nt-logo.png"
import thumbsUp from "../../../assets/thumbsup.png"



const FeedBackRating = () => {
    return (
        <div className={styles.feedbackContainer}>
            <div className={styles.feedbackHead}>
                <h2>Feedback Profile for Member: <span>N-T Spares Sourcing</span></h2>
            </div>

            <div className={styles.feedbackRatingSection}>
                <h3>Feedback Rating:  <br /> <span>100% </span></h3>
                <img src={thumbsUp} alt="feedback icon" className={styles.feedbackIcon} />
            </div>

            <div className={styles.feedbackDetailsSection}>
                <div className={styles.feedbackGiven}>
                    <h4>Feedback Given</h4>
                    <p>Positive Feedback: <strong>0</strong></p>
                    <p>Neutral Feedback: <strong>0</strong></p>
                    <p>Negative Feedback: <strong>0</strong></p>
                    <p>Total Feedback: <strong>0</strong></p>
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
                            <p style={{color:"green"}}>0</p>
                            <p style={{color:"blue"}}>0</p>
                            <p style={{color:"red"}}>0</p>
                            <p style={{color:"black"}}>0</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.feedbackPastSec}>

                        <div className={styles.feedbackPast}>
                            <h4>Past Year</h4>
                            <p style={{color:"green"}}>0</p>
                            <p style={{color:"blue"}}>0</p>
                            <p style={{color:"red"}}>0</p>
                            <p style={{color:"black"}}>0</p>
                        </div>
                        <div className={styles.feedbackPast}>
                            <h4>Past Total</h4>
                            <p style={{color:"green"}}>1</p>
                            <p style={{color:"blue"}}>0</p>
                            <p style={{color:"red"}}>0</p>
                            <p style={{color:"black"}}>1</p>
                        </div>
                    </div>


                </div>


                <div className={styles.memberInfo}>
                    <img src={ntlogo} alt="" />
                <h4>N-T Spares Sourcing</h4>
                <p>Date Established: N/A</p>
                <div className={styles.feedbackStars}>
                    <span>Feedback Stars:</span>
                    <span>⭐️⭐️⭐️⭐️⭐️</span>
                </div>
                <p>a 5 Star Member</p>
            </div>

            </div>

<div className={styles.buttonSec}>
            <Link to="/ethics" className={styles.ethicsComplaintButton}>
                Ethics Complaint
            </Link>
</div>
        </div>
    );
}

export default FeedBackRating;

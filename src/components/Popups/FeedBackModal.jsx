import React from 'react';
import styles from "../../styles/Menu/Search/FeedBackProfile.module.css";

const FeedbackModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Post Feedback to a Member</h2>
                <form action="">
                    <div className={styles.formSection}>

                        <label>
                            Member Name:
                            <input type="text" />
                        </label>

                        <label>
                            PO #:
                            <input type="text" />
                        </label>

                        <label>
                            Feedback Issue:
                            <select>
                                <option>Pick Issue</option>
                                {/* Add other options here */}
                            </select>
                        </label>

                        <label>
                            Feedback Rating:
                            <select>
                                <option>Pick One</option>
                                {/* Add other options here */}
                            </select>
                        </label>

                        <label>
                            Feedback Post:
                            <textarea rows="4" placeholder="Write your feedback..."></textarea>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            Email me a copy of this post.
                        </label>


                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            I understand that inappropriate comments may violate the Terms of Service.
                        </label>
                        <div className={styles.termsNotes}>
                            <p>* Feedback must be related to the transaction only.</p>
                            <p>* BrokerBin is not responsible for posted content.</p>
                            <p>* Please note: your name and company name will be displayed on ALL feedback comments.</p>
                            <p>* Please note: from the original posting, you have 5 days to resolve negative/neutral feedback before the feedback is published to members. You have 30 days to edit feedback.</p>
                            <p>* If Feedback System is not applicable, forward complaint to ethics@brokerbin.com.</p>
                        </div>



                        <div className={styles.modalButtons}>
                            <button onClick={onClose}>Submit Feedback</button>
                            <button onClick={onClose}>Cancel</button>

                        </div>
                    </div>

                </form>

                {/* Close Button */}
                {/* <button className={styles.closeButton} onClick={onClose}>✖</button> */}
            </div>
        </div>
    );
};

export default FeedbackModal;

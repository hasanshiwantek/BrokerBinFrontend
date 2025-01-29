import React, {useState} from 'react';
import styles from "../../styles/Menu/Search/FeedBackProfile.module.css";
import { brokerAPI } from '../api/BrokerEndpoint';
import Cookies from "js-cookie";
import axios from 'axios';



const FeedbackModal = ({ isOpen, onClose, company,  }) => {
    if (!isOpen) return null; // Don't render the modal if it's not open

    const [formData, setFormData] = useState({
        to: company.id || "",
        poNumber: "",
        feedbackIssue: "",
        feedbackRating: "",
        feedbackPost: "",
        emailACopy: 0,
    })
    
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const token = Cookies.get('token')
    console.log("TOKEN", token)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${brokerAPI}feedback/store`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 
                },
            });
            const data = await response.data
            console.log("DATA", data);
            alert("Feedback has been submitted successfully")
            onClose();
        } catch (error) {
            console.log("ERROR:", error);
            alert("Error submitting feedback please try again later")
        }
        setLoading(false);
    };

    const isDisabled = !formData.feedbackRating;

    return (
        <div className={`${styles.modalOverlay} `}>
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
                            readOnly />
                        </label>

                        <label>
                            PO #
                            <input 
                            type="text" 
                            value={formData.poNumber || ''} 
                            name='poNumber' 
                            onChange={(e) => setFormData({...formData, [e.target.name] : e.target.value})}/>
                        </label>

                        <label>
                            Feedback Issue:
                            <select
                            value={formData.feedbackIssue || ''}
                            name='feedbackIssue'
                            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}>
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
                            name='feedbackRating'
                            onChange={(e) => setFormData({...formData, [e.target.name] : e.target.value})}>
                                <option value="">Pick One</option>
                                <option value="Positive">Positive</option>
                                <option value="Neutral">Neutral</option>
                                <option value="Negative">Negative</option>
                                {/* Add other options here */}
                            </select>
                        </label>

                        <label>
                            Feedback Post:
                            <p className='text-[#ff0000]'>{61 - formData.feedbackPost.length} characters left</p>
                            <textarea 
                            placeholder="Write your feedback..."
                            name="feedbackPost"
                            value={formData.feedbackPost}
                            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                            maxLength="61"
                            className="h-[3vh]"></textarea>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input 
                            type="checkbox"
                            name="emailACopy"
                            checked={formData.emailACopy}
                            className={styles.checkbox}
                            onChange={(e) => setFormData({...formData, [e.target.name]: e.target.checked ? 1 : 0 })} 
                            />
                            Email me a copy of this post.
                        </label>


                        <label className={styles.checkboxLabel}>
                            <input 
                            type="checkbox" 
                            className={styles.checkbox}
                            onChange={(e) => setIsChecked(e.target.checked)} 
                            />
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
                            <button 
                            type="submit" 
                            disabled={loading || !formData.feedbackRating || !isChecked}
                            className={`p-2 rounded text-white 
                                ${loading || !formData.feedbackRating || !isChecked ? "bg-gray-400 cursor-not-allowed opacity-50" : "bg-blue-500"}`}
                            >
                                {loading ? "Submitting..." : "Submit Feedback"}
                            </button>
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

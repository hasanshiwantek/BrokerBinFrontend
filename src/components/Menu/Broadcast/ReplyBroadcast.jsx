import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myProfile from '../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css';
import { useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import styles from "./BroadCast.module.css";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReplyBroad = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [broadcast, setBroadcast] = useState(location.state?.broadcast || JSON.parse(localStorage.getItem("broadcastData")));
    const recipientEmail = broadcast?.user_id?.email || '';
    const currentUserID = Cookies.get("user_id");

    // Function to format comments data with <br> tags
    const formatComments = () => {
        if (!broadcast) return "Broadcast data is not available.";

        const firstName = broadcast.user_id?.firstName || '';
        const lastName = broadcast.user_id?.lastName || '';
        const companyName = broadcast.user_id?.company?.name || '';
        const phoneNumber = broadcast.user_id?.phoneNumber || '';
        const email = broadcast.user_id?.email || '';
        const mfg = broadcast.mfg || '';
        const partModel = broadcast.partModel || '';
        const condition = broadcast.cond || '';
        const quantity = broadcast.quantity || '';
        const price = broadcast.price || '';
        const additionalComments = broadcast.additional_comments || '';
        const description = broadcast.description || '';

        return `- ------------------ -<br />
${firstName} ${lastName}<br />
${companyName}<br />
P: ${phoneNumber}<br />
${email}<br />
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
        to: broadcast ? `${broadcast.user_id.email} ` : '',
        subject: broadcast ? `Re: ${broadcast.type} : ${broadcast.mfg} : ${broadcast.partModel} : ${broadcast?.additional_comments} : ${broadcast?.description}` : '',
        comments: broadcast ? formatComments() : '',
        sendCopy: false
    });


    // Strip HTML tags and preserve line breaks
    const stripHtmlTagsWithLineBreaks = (html) => {
        return html
            .replace(/<p>/g, '\n')            // Replace opening <p> with a newline
            .replace(/<\/p>/g, '')             // Remove closing </p>
            .replace(/<br\s*\/?>/gi, '\n')     // Replace <br> with a newline
            .replace(/^\s+|\s+$/g, '');        // Trim leading/trailing whitespace
    };

    useEffect(() => {
        if (broadcast) {
            setEmail((prev) => ({
                ...prev,
                comments: formatComments()
            }));
        }
    }, [broadcast]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setEmail((prevEmail) => ({
            ...prevEmail,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert HTML comments to plain text with line breaks
        const plainTextComments = stripHtmlTagsWithLineBreaks(email.comments);

        // Prepare data for backend submission
        const emailData = {
            to: email.to,
            subject: email.subject,
            comments: plainTextComments,
            sendCopy: email.sendCopy
        };

        // Log the emailData object with formatted comments
        console.log("Email Data:", JSON.stringify(emailData, null, 2).replace(/\\n/g, '\n'));


        // Dispatch the sendEmail action with emailData
        //   dispatch(sendEmail(emailData));
    };

    useEffect(() => {
        return () => {
            localStorage.removeItem("broadcastData");
        };
    }, []);

    return (
        <>
            <main className={myProfile.profileInfo}>
                <nav className='menu-bar'>
                    <ul>
                        <li><Link to={'/'}>Reply</Link></li>
                        <li><Link to={'/sendbroad'}>Send</Link></li>
                        <li><Link to={'/broadcasts'}>View</Link></li>
                        <li><Link to={"/myprofile/broadcastfilter"}>Set Filters</Link></li>
                        <li><Link to={'/broadcasthistory'}>History</Link></li>
                    </ul>
                </nav>
                <div className={styles.replyform}>
                    <h2>Reply To Broadcast</h2>
                    <div className={styles.replySec}>
                        <div className={styles.formGroup}>
                            <form onSubmit={handleSubmit} className="mt-10">
                                <div>
                                    <label><strong>To:</strong>
                                        <input
                                            type="text"
                                            name="to"
                                            value={email.to}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label><strong>Subject:</strong>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={email.subject}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label><strong>Comments:</strong></label>
                                    <ReactQuill
                                        value={email.comments}
                                        onChange={(value) => setEmail((prev) => ({ ...prev, comments: value }))}
                                        className={styles.textarea}
                                        theme="snow"
                                        modules={{
                                            toolbar: [
                                                ['bold', 'italic', 'underline'],
                                                ['link', 'image'],
                                            ],
                                        }}
                                    />
                                </div>
                                <div className={styles.checkboxContainer} style={{ marginTop: "80px" }}>
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
                    <button type="button" className={styles.sendButton} onClick={handleSubmit}>Send</button>
                    <button
                        type="button"
                        onClick={() => setEmail({ comments: '', sendCopy: false })}
                        className={styles.resetButton}
                    >
                        Reset
                    </button>
                </div>
            </main>
        </>
    );
};

export default ReplyBroad;

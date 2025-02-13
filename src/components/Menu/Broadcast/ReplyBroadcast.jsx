import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myProfile from '../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css';
import { useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import styles from "./BroadCast.module.css";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { sendBroadcastReply } from '../../../ReduxStore/BroadCast';
import { fetchUserData } from '../../../ReduxStore/ProfleSlice';
const ReplyBroad = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    const [broadcast, setBroadcast] = useState(location.state?.broadcast || JSON.parse(localStorage.getItem("broadcastData")));
    const [loading, setLoading] = useState(false); // To track API call status

    const recipientEmail = broadcast?.user_id?.email || '';
    const currentUserID = Cookies.get("user_id");
    const token = Cookies.get("token")
    const user_id = Cookies.get("user_id");

    const { initialData, user, } = useSelector(
        (state) => state.profileStore
    );
    // Fallback to localStorage data if Redux data is not available
    console.log("User Data", initialData)
    const id = user?.user?.id || user_id;
    console.log(id)
    useEffect(() => {
        if (id || token) {
            dispatch(fetchUserData({ id, token })).then(response => {
            }).catch(error => {
                console.error("Error fetching user data:", error);
            });
        }
    }, [id, token]);



    // Now you can use `userData` for the logged-in user's data

    // Function to format comments data with <br> tags
    const formatComments = () => {
        if (!broadcast) return "Broadcast data is not available.";

        const firstName = initialData.firstName || "";
        const lastName = initialData.lastName || "";
        const companyName = initialData?.company?.name || "";
        const phoneNumber = initialData.phoneNumber || "";
        const email = initialData?.email || '';
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
            .replace(/<\/p>/g, '\n')           // Replace closing </p> with a newline
            .replace(/<p>/g, '')               // Remove opening <p>
            .replace(/<br\s*\/?>/gi, '\n')     // Replace <br> with a newline
            .replace(/<\/?[^>]+(>|$)/g, "");   // Remove any remaining HTML tags
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
        setLoading(true); // Start loading

        // Convert HTML comments to plain text with line breaks
        const plainTextComments = stripHtmlTagsWithLineBreaks(email.comments);

        // Prepare data for backend submission
        const emailData = {
            emailData: {  // Wrap in an 'emailData' object
                to: email.to,
                subject: email.subject,
                comments: plainTextComments,  // Now it has `\n` line breaks for backend
                sendCopy: email.sendCopy
            }
        };

        // Log the emailData with line breaks visible in console
        console.log("Email Data:", emailData);

        dispatch(sendBroadcastReply({ token, data: emailData }))
            .then((response) => {
                alert("Email sent successfully!");
                navigate("/broadcasts");
            })
            .catch((error) => {
                console.error("Failed to send email:", error);
                alert("Failed to send email.");
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    useEffect(() => {

        console.log(broadcast)
    }, [])

    // useEffect(() => {
    //     return () => {
    //         localStorage.removeItem("broadcastData");
    //     };
    // }, []);




    return (
        <>
            <main className={myProfile.profileInfo}>
                <nav className='menu-bar'>
                    <ul>
                        <li style={{ color: "#428bca" }}><Link to={'/'}>Reply</Link></li>
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
                    <button type="button" className={styles.sendButton} onClick={handleSubmit} disabled={loading}>
                        {loading ? "Processing..." : "Send"}
                    </button>
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



















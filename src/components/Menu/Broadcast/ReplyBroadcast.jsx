import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import myProfile from '../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import styles from "./BroadCast.module.css"
import { useNavigate } from 'react-router-dom';



const ReplyBroad = () => {

    const location = useLocation();
    const navigate= useNavigate();
    // const { broadcast } = location.state || {};
    const [broadcast, setBroadcast] = useState(location.state?.broadcast || JSON.parse(localStorage.getItem("broadcastData")));
    // Create recipientEmail to store the actual email address
    const recipientEmail = broadcast?.user_id?.email || ''; // Pulls email from selected broadcast
    // This function is when you have the API key and processing it through asyncthunk. same goes for above recipientEmail because in email format to: we are showing only name their and email will be in api call hidden.

    //  const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Use recipientEmail in emailData for sending
    //     const emailData = {
    //         ...email,
    //         to: recipientEmail // Replace "to" with the actual email address
    //     };

    //     dispatch(sendEmailThunk(emailData))
    //         .then(response => {
    //             if (response.meta.requestStatus === 'fulfilled') {
    //                 alert("Email sent successfully!");
    //             } else {
    //                 alert("Failed to send email.");
    //             }
    //         });
    // };

    // Fetch logged-in user's details from Redux
    const currentUserID = Cookies.get("user_id");

    //const currentUser = useSelector(state => state.auth.currentUser);

    const [email, setEmail] = useState({
        to: broadcast ? `${broadcast.user_id.email} ` : '',
        subject: broadcast ? `Re: ${broadcast.type} : ${broadcast.mfg} : ${broadcast.partModel} : ${broadcast?.additional_comments} : ${broadcast?.description}` : '',
        comments: broadcast ? `${broadcast?.additional_comments}` : '',
    });

    const handleChange = (e) => {
        const {value,name} =e.target
        setEmail({ ...email, [name]: value  });
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email Data:", email);
        // Here, add logic to send the email or handle the reply
    };


    // Function to initialize comments with dynamic data from broadcast
    // const initializeComments = () => {
    //     return `--------------------\n${broadcast.user_id?.firstName} ${broadcast.user_id?.lastName}\n${broadcast.user_id.company?.name}\nP: ${broadcast.user_id?.phoneNumber}\n${broadcast.user_id?.email}\n\n--------------------\nOriginal Broadcast Details
    //     MFG: ${broadcast?.mfg || ''}
    //     Part No: ${broadcast?.partModel || ''}
    //     Condition: ${broadcast?.cond || ''}
    //     Quantity: ${broadcast?.quantity || ''}
    //     Price: ${broadcast?.price || ''}
    //     Comments: ${broadcast?.additional_comments || ''}
    //     Description: ${broadcast?.description || ''}
    //     `;
    // };




    const initializeComments = () => {
        // Check if broadcast exists, if not, return an empty string or default message
        if (!broadcast) return "Broadcast data is not available.";
    
        return `--------------------
        ${broadcast?.user_id?.firstName || ''} ${broadcast?.user_id?.lastName || ''}
        ${broadcast?.user_id?.company?.name || ''}
        P: ${broadcast?.user_id?.phoneNumber || ''}
        ${broadcast?.user_id?.email || ''}
        
        --------------------
        Original Broadcast Details
        MFG: ${broadcast?.mfg || ''}
        Part No: ${broadcast?.partModel || ''}
        Condition: ${broadcast?.cond || ''}
        Quantity: ${broadcast?.quantity || ''}
        Price: ${broadcast?.price || ''}
        Comments: ${broadcast?.additional_comments || ''}
        Description: ${broadcast?.description || ''}
        `;
    };

    // useEffect(() => {
    //     if (!broadcast) {
    //         console.error("Broadcast data is missing.");
    //         navigate('/ReplyBroad'); // Redirect to a different page if broadcast is undefined
    //     }
    // }, [broadcast, navigate]);

    useEffect(() => {
        console.log("Broadcast data in ReplyBroad:", broadcast);
        if (!broadcast) {
          console.error("Broadcast data is missing.");
        //   navigate('/'); // Redirect to home or fallback if data is missing
        }
      }, [broadcast, navigate]);

    // useEffect(() => {
    //     // Set initial comments with dynamic data when the component mounts
    //     setEmail((prev) => ({
    //         ...prev,
    //         comments: initializeComments()
    //     }));
    // }, [broadcast]); // Re-run if broadcast data changes

    useEffect(() => {
        console.log("Broadcast data in ReplyBroad:", broadcast);
        if (broadcast) {
            setEmail((prev) => ({
                ...prev,
                comments: initializeComments()
            }));
        }
    }, [broadcast]);
    

    useEffect(() => {
        console.log("Location state in ReplyBroad:", location.state);
        const { broadcast } = location.state || {};
        if (!broadcast) {
            console.error("Broadcast data is missing.");
        }
    }, [location.state]);


        // Clear the broadcast data from localStorage when the component unmounts
        useEffect(() => {
            return () => {
                localStorage.removeItem("broadcastData"); // Clear data on unmount
            };
        }, []);
    
    
    return (
        <>
            {/* <main className={styles.mainSec}> */}
            <main className={myProfile.profileInfo}>
                <nav className='menu-bar'>
                    <ul>
                        <li>
                            <Link to={'/'}>Reply</Link>
                        </li>
                        <li>
                            <Link to={'/sendbroad'}>Send</Link>
                        </li>
                        <li>
                            <Link to={'/broadcasts'}>View</Link>
                        </li>
                        <li>
                            <Link to={"/myprofile/broadcastfilter"}>
                                Set Filters
                            </Link>
                        </li>
                        <li>
                            <Link to={'/broadcasthistory'}>History</Link>
                        </li>
                    </ul>
                </nav>
                <div className={` ${styles.replyform}`}>
                    <h2>Reply To Broadcast</h2>
                    <div className={styles.replySec}>

                {/* <div className={styles.formGroup}>
                <form 
                onSubmit={handleSubmit}
                className="mt-10">
                    <label>
                        To:
                        <input type="text" name="to" value={email.to } onChange={handleChange} />
                    </label>
                    <label>
                        Subject:
                        <input type="text" name="subject" value={email.subject} onChange={handleChange} />
                    </label>
                    <label>
                        Comments:
                        <textarea name="comments" value={email.comments} onChange={handleChange} />
                    </label>
                    <button type="submit">Send</button>
                    <button type="button" onClick={() => setEmail({to: '', subject: '', comments: ''})}>Reset</button>
                </form>
                </div> */}
                        <div className={styles.formGroup}>
                            <form onSubmit={handleSubmit} className="mt-10">
                                <div>
                                    <label>
                                        <strong>To:</strong>
                                        <input
                                            // style={{ border: "none" }}
                                            type="text"
                                            name="to"
                                            value={email.to}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <strong>Subject:</strong>
                                        <input
                                            // style={{ border: "none" }}

                                            type="text"
                                            name="subject"
                                            value={email.subject}
                                            onChange={handleChange}
                                            className={styles.input}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <strong>Comments:</strong>
                                        <textarea
                                            name="comments"
                                            value={email.comments}
                                            onChange={handleChange}
                                            className={styles.textarea}
                                        />
                                    </label>
                                </div>
                                <div className={styles.checkboxContainer}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="sendCopy"
                                            checked={email.sendCopy}
                                            onChange={handleChange}
                                        />
                                        Send a copy to myself
                                    </label>
                                </div>

                            </form>
                        </div>

                        {/* 

                <div>
                    <h3>Original Broadcast Details</h3>
                    <p>MFG: {broadcast?.mfg}</p>
                    <p>Partsno: {broadcast?.partModel}</p>
                    <p>Cond: {broadcast?.cond}</p>
                    <p>Qty: {broadcast?.quantity}</p>
                    <p>Price: {broadcast?.price}</p>
                    <p>Comments: {broadcast?.additional_comments}</p>
                    <p>Description: {broadcast?.description}</p>
                  
                </div> */}
                    </div>

                </div>
                {/* <button type="submit" className='bg-black'>Send</button>
            <button type="button" className='bg-black' onClick={() => setEmail({to: '', subject: '', comments: ''})}>Reset</button> */}

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.sendButton}>Send</button>
                    <button
                        type="button"
                        onClick={() => setEmail({  comments: '', sendCopy: false })}
                        className={styles.resetButton}
                    >
                        Reset
                    </button>
                </div>
            </main> 
          
        </>

    );
}

export default ReplyBroad
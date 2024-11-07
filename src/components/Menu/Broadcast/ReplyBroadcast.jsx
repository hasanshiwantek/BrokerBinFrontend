import React, {useState} from 'react'
import styles from "./BroadCast.module.css"
import { Link } from 'react-router-dom'
import myProfile from '../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css';
import css from "../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";




const ReplyBroad = () => {

    const location = useLocation();
    const { broadcast } = location.state || {};

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
        to: broadcast ? `${broadcast.user_id.email} `: '',
        subject: broadcast ? `Re: ${broadcast.type} : ${broadcast.mfg} : ${broadcast.partModel} : ${broadcast?.additional_comments} : ${broadcast?.description}` : '',
        comments: broadcast ? `${broadcast?.additional_comments}` : '',
    });

    const handleChange = (e) => { 
        setEmail({...email, [e.target.name]: e.target.value});
    };
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email Data:", email);
        // Here, add logic to send the email or handle the reply
    };


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
                <h1>Reply To Broadcast</h1>
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
                <div className={styles.senderdetails}>
                    <p>{currentUserID?.user_id}</p> //this is not working
                    {/* Example placeholder data */}
                    <p>Name: Your Company Name</p>
                    <p>Email: contact@yourcompany.com</p>
                    <p>Phone: 123-456-7890</p>
                </div>
                <div>
                    <h3>Original Broadcast Details</h3>
                    <p>MFG: {broadcast?.mfg}</p>
                    <p>Partsno: {broadcast?.partModel}</p>
                    <p>Cond: {broadcast?.cond}</p>
                    <p>Qty: {broadcast?.quantity}</p>
                    <p>Price: {broadcast?.price}</p>
                    <p>Comments: {broadcast?.additional_comments}</p>
                    <p>Description: {broadcast?.description}</p>
                    {/* <p>Country: {broadcast?.user_id.company.country}</p> */}
                    {/* <p>Company: {broadcast?.user_id.company.name}</p> */}
                    {/* <p>Email: {broadcast?.user_id.company.email}</p> */}
                </div>
            </div>
            <button type="submit" className='bg-black'>Send</button>
            <button type="button" className='bg-black' onClick={() => setEmail({to: '', subject: '', comments: ''})}>Reset</button>
        </main>
        </>

    );
}

export default ReplyBroad
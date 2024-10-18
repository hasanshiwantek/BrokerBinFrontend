import React from 'react';
import styles from "../../../styles/Menu/Search/FeedBackProfile.module.css"; // Ensure the path is correct
import positiveEmoji from "../../../assets/positive-emoji.png"
import neutralEmoji from "../../../assets/neutral-emoji.png"
import negativeEmoji from "../../../assets/negative-emoji.png"
import "../../Menu/Main/MenuBar.css";
import { Link } from 'react-router-dom';
import FeedbackModal from '../../Popups/FeedBackModal';
import { useState } from 'react';
const LeaveFeedBack = () => {

    const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>

            <main className={styles.mainLeaveFeedback}>
                <nav className='menu-bar'>
                    <ul>
                        <li><Link to={'/'}>Feedback Recieved</Link></li>
                        <li><Link to={'/'}>Feedback Given</Link></li>

                    </ul>
                </nav>


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
                        <tr>
                            <td>
                                <span><img src={positiveEmoji} alt="Positive" /></span>
                                Customer Service <br />
                                PO #: 0 <br />
                                Probably the most unhelpful person in the business!
                            </td>
                            <td> <Link to={"/feedback"}><button className={styles.reportButton}>Report Abuse</button></Link></td>
                            <td>Justin Samuels<br />Servers Storage Networking, LLC</td>
                            <td>04/28/2016 08:18:52 AM</td>
                        </tr>
                        <tr>
                            <td>
                                <span><img src={neutralEmoji} alt="Neutral" /></span>
                                Customer Service <br />
                                PO #: 0 <br />
                                1st class service, thanks.
                            </td>
                            <td> <Link to={"/feedback"}><button className={styles.reportButton}>Report Abuse</button></Link></td>

                            <td>Julian Kirby<br />BlueGoose Systems</td>
                            <td>12/09/2010 07:40:36 AM</td>
                        </tr>
                        <tr>
                            <td>
                                <span><img src={negativeEmoji} alt="Negative" /></span>
                                Other <br />
                                PO #: 0 <br />
                                Thank you for your membership. We appreciate your business.
                            </td>
                            <td> <Link to={"/feedback"}><button className={styles.reportButton}>Report Abuse</button></Link></td>

                            <td>Robert Van Demmeltraadt<br />BrokerBin.com</td>
                            <td>10/30/2006 12:00:00 PM</td>

                        </tr>
                    </tbody>
                </table>

                <div className={styles.actionButtons}>
                    <button className={styles.ethicsComplaintButton} onClick={handleOpenModal}>Leave Feedback</button>
                    <Link to={"/ethics"}>  <button className={styles.ethicsComplaintButton}>Ethics Complaint</button></Link>
                </div>
            </main>

            <footer>
                <div className={styles.footerlinks} style={{ marginTop: "12px" }}>
                    <li><a href="/">Advertising Programs</a></li>
                    <li><a href="/">Business Solutions</a></li>
                    <li><a href="/">About BrokerBin.com</a></li>
                    <li>©2024 Privacy</li>
                </div>
            </footer>

            <FeedbackModal isOpen={isModalOpen} onClose={handleCloseModal} /> {/* Modal component */}



        </>

    );
};

export default LeaveFeedBack;

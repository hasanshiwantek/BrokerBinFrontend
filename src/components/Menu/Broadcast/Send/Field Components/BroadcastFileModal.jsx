// BroadcastModal.js
import React, { createContext, useContext, useState } from 'react';
import styles from './BroadcastModal.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaFileAlt } from "react-icons/fa";

const BroadcastModal = ({ isOpen, onRequestClose, broadcast }) => {
    const navigate = useNavigate();
    if (!isOpen || !broadcast) return null;

    const handleReplyClickFromModal = () => {
        if (!broadcast) {
            console.error("No broadcast data available.");
            return;
        }
        // Store the broadcast data in localStorage
        localStorage.setItem("broadcastData", JSON.stringify(broadcast));
        // Navigate to ReplyBroad without passing state
        navigate('/ReplyBroad');
    };

    // Function to handle direct file download
    const handleFileDownload = (event, file) => {
        event.preventDefault(); // Prevent the default link behavior
        if (!file) {
            alert('No file available for download.');
            return;
        }
        const anchor = document.createElement('a');
        anchor.href = file;
        anchor.download = file.split('/').pop(); // Extract filename and suggest it for download
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Broadcast Summary</h2>
                <hr className={styles.hrSec} />
                <p><strong>From:</strong> {broadcast.user_id.company.name} [{broadcast.user_id.email}]</p>
                <p><strong>Sent:</strong> {new Date(broadcast.created_at).toLocaleString()}</p>
                {
                    broadcast.type && (
                        <p><strong>Subject:</strong> BrokerBin Multiple-Part Broadcast {broadcast.type.toUpperCase()}: {broadcast.mfg}</p>
                    )
                }
                {broadcast.file && (
                    <p><strong>Attachment:</strong>
                        <a href="#" onClick={(e) => handleFileDownload(e, broadcast.file)}
                            className={styles.downloadLink}>
                            <FaFileAlt className={styles.iconMargin} />
                            {broadcast.file}
                        </a>
                    </p>
                )}
                <p><strong>Mfg:</strong> {broadcast.mfg}</p>
                <p><strong>Part / Model:</strong> {broadcast.partModel}</p>
                <p><strong>Condition:</strong> {broadcast.cond}</p>
                <p><strong>Quantity:</strong> {broadcast.quantity}</p>
                <p><strong>Price:</strong> {broadcast.price}</p>
                {/* <p><strong>Description:</strong> {broadcast.description}</p> */}
                {broadcast.additional_comments && (
                    <p><strong>Additional Comments:</strong> {broadcast.additional_comments}</p>
                )}
                <p><strong></strong> {broadcast.user_id.firstName} {broadcast.user_id.lastName}</p>
                <p><strong></strong> {broadcast.user_id.company.name}</p>
                <p><strong></strong> P: {broadcast.user_id.phoneNumber}</p>
                <p><strong></strong> {broadcast.user_id.email}</p>
                <hr className={styles.hrSec} />

                <button onClick={onRequestClose} className={styles.closeButton}>Close</button>
                <Link   >
                    <button className={styles.replyButton} onClick={handleReplyClickFromModal} >
                        Reply
                    </button>

                </Link>
            </div>
        </div>
    );
};

export default BroadcastModal;

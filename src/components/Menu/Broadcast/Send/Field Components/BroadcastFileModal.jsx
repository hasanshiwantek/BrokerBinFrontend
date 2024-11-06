// BroadcastModal.js
import React from 'react';
import styles from './BroadcastModal.module.css';

const BroadcastModal = ({ isOpen, onRequestClose, broadcast }) => {
    if (!isOpen || !broadcast) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Broadcast Summary</h2>
                <hr className={styles.hrSec} />
                <p><strong>From:</strong> {broadcast.user_id.company.name} [{broadcast.user_id.email}]</p>
                <p><strong>Sent:</strong> {new Date(broadcast.created_at).toLocaleString()}</p>
                <p><strong>Subject:</strong> BrokerBin Multiple-Part Broadcast {broadcast.type.toUpperCase()}: {broadcast.mfg}</p>
                <p><strong>Mfg:</strong> {broadcast.mfg}</p>
                {/* <p><strong>Part / Model:</strong> {broadcast.partModel}</p> */}
                {/* <p><strong>Condition:</strong> {broadcast.cond}</p> */}
                {/* <p><strong>Price:</strong> {broadcast.price}</p> */}
                {/* <p><strong>Quantity:</strong> {broadcast.quantity}</p> */}
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
                <button onClick={() => alert("Reply functionality here")} className={styles.replyButton}>Reply</button>
            </div>
        </div>
    );
};

export default BroadcastModal;

import React from 'react';
import "./styles/RecycleBin.css";

const LeadReviewModal = ({ onClose, message }) => {
  return (
    <div className="recycle-popup-wrapper">
      <div className="recycle-popup-container">
        <div className="recycle-popup-box">
          <p className="common-fonts restore-records">Message</p>
          <p className="common-fonts selected-records-note">{message}</p>
        </div>
        <div className="recycle-popup-btn">
          <button className="restore-no common-fonts" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default LeadReviewModal;

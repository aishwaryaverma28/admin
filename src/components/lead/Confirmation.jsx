import React from 'react'

const Confirmation = ({ onClose, onDeleteConfirmed }) => {
  return (
    <div className="recycle-popup-wrapper">
      <div className="recycle-popup-container">
        <div className="recycle-popup-box">
          <p className="common-fonts restore-records">Save Edited Data</p>
          <p className="common-fonts selected-records-note">Form data is edited.</p>
          <p className="common-fonts restore-questions">Do you want to save it before Proceeding?</p>
        </div>
        <div className="recycle-popup-btn">
          <button className="restore-no common-fonts" onClick={onClose} >Cancel</button>
          <button className="convertToDeal button-left" onClick={onDeleteConfirmed}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
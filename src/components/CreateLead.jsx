import React from 'react';
import './styles/CreateLead.css';

const CreateLead = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <h2>Modal Box</h2>
        <p>This is the content of the modal box.</p>
      </div>
    </div>
  );
};

export default CreateLead;

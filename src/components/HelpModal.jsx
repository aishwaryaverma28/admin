import React from 'react';
import "./styles/HelpModal.css";

const HelpModal = ({onClose}) => {
  return (
    <>

    <div className='help-modal-container'>
        <div className='help-modal-box'>
        <div className='help-cross' onClick={onClose}>X</div>
        </div>
        


    </div>
    </>
  )
}

export default HelpModal
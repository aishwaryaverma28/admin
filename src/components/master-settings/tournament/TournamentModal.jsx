import React, { useState } from "react";
import "../../styles/HelpModal.css";


const TournamentModal = ({ onClose, id }) => {
 
  console.log(id)


  return (
    <>
      <div className="help-modal-container">
        <div className="help-modal-box">

        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
    </>
  );
};

export default TournamentModal;

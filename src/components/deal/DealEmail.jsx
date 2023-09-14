import React, { useState, useEffect } from "react";
import "../styles/LPleads.css";
import CRMEmail from "../CRMEmail";



const DealEmail = () => {
  const [openEditor, setOpenEditor] = useState(false);
  const [stateAdd, setStateAdd] = useState(0);

  const handleDataTransfer = (data) => {
    setStateAdd(1);
  };

  const expandEditor = () => {
    setOpenEditor(true);
  }

  return (
    <>
      {!openEditor ? (
        <div className="colapedEditor" onClick={expandEditor}>
          <p>Click here to send email</p>
        </div>
      ) : (
        <>
          <div className="notesEditor">
            <CRMEmail onDataTransfer={handleDataTransfer} />
          </div>
          <div className="addNoteBtn">
            {stateAdd === 0 ? (
              <button disabled className="disabledBtn">
                Send
              </button>
            ) : (
              <button className="convertToDeal">
                Send
              </button>
            )}
          </div>
        </>
      )}




    </>
  );
};

export default DealEmail;
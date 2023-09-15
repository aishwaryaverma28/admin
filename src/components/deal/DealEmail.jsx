import React, { useState, useEffect } from "react";
import "../styles/LPleads.css";
import CRMEmail from "../CRMEmail";
import CalendarIcon from "../../assets/image/calendar-edit.svg";
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import Arrow from "../../assets/image/arrow-right.svg";

const DealEmail = () => {
  const [openEditor, setOpenEditor] = useState(false);
  const [stateAdd, setStateAdd] = useState(0);

  const handleDataTransfer = (data) => {
    setStateAdd(1);
  };

  const expandEditor = () => {
    setOpenEditor(true);
  };

  const closeEditor = () => {
    setOpenEditor(false);
    setStateAdd(0);
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

            <button className="common-fonts common-white-button" onClick={closeEditor}>Cancel</button>
            {stateAdd === 0 ? (
              <button disabled className="disabledBtn">
                Send
              </button>
            ) : (
              <button className="convertToDeal">Send</button>
            )}
          </div>
        </>
      )}

      <div className="activity-task-map ">
        <div className="activity-bottom">
          <div className="savedNotes activity-save-note">
            <>
              <section className="note-display email-task-map">
                <div className="note-content activity-content">
                  <div className="arrow-greater activity-new-arrow">
                    <img src={GreaterDown} alt="" />
                  </div>

                  <div className="notes-main">
                    <div className="activity-flex">
                      <div className="notes-by activity-by ">
                        <p className="common-fonts email-call">
                          Noah, book a call with me
                        </p>

                        <div className="activity-date-time">
                          <img src={CalendarIcon} alt="" />
                          <p className="common-fonts activity-due">
                            July 10, 2023 at 01:30 PM
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`activity-phone email-tab-view`}>
                     <p className="common-fonts email-sender-name"> <span>From:</span> Anant Singh</p>
                     <p className="common-fonts email-reciever-name"> <span>To:</span>noah@gmail.com</p>
                     <p className="common-fonts">Hi, Noah</p>
                     <p className="common-fonts">Thanks for reaching out, please book a call with me here.</p>
                     <p className="common-fonts">Regards,</p>
                     <p className="common-fonts">Anant Singh</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          </div>
        </div>
      </div>
      <div className="activity-task-map">
        <div className="activity-bottom">
          <div className="savedNotes activity-save-note">
            <>
              <section className="note-display">
                <div className="note-content activity-content">
                  <div className="arrow-greater activity-new-arrow">
                    <img src={GreaterArrow} alt="" />
                  </div>

                  <div className="notes-main">
                    <div className="activity-flex">
                      <div className="notes-by activity-by ">
                        <p className="common-fonts email-call">
                          Noah, book a call with me
                        </p>

                        <div className="activity-date-time">
                          <img src={CalendarIcon} alt="" />
                          <p className="common-fonts activity-due">
                            July 10, 2023 at 01:30 PM
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`activity-phone email-tab-view`}>
                      <p className="common-fonts email-assign-arrow">
                        <span>Anant Singh</span>
                        <img src={Arrow} alt="" /> <span>noah@gmail.com</span>
                      </p>
                      <p className="common-fonts">
                        Hi, Noah Thanks for reaching out, please book a call
                        with me here. Regards, Anant Singh
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          </div>
        </div>
      </div>
      <div className="activity-task-map">
        <div className="activity-bottom">
          <div className="savedNotes activity-save-note">
            <>
              <section className="note-display email-pink">
                <div className="note-content activity-content">
                  <div className="arrow-greater activity-new-arrow">
                    <img src={GreaterArrow} alt="" />
                  </div>

                  <div className="notes-main">
                    <div className="activity-flex">
                      <div className="notes-by activity-by ">
                        <p className="common-fonts email-call">
                          Noah, book a call with me
                        </p>

                        <div className="activity-date-time">
                          <img src={CalendarIcon} alt="" />
                          <p className="common-fonts activity-due">
                            July 10, 2023 at 01:30 PM
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`activity-phone email-tab-view`}>
                      <p className="common-fonts email-assign-arrow">
                        <span>Anant Singh</span>
                        <img src={Arrow} alt="" /> <span>noah@gmail.com</span>
                      </p>
                      <p className="common-fonts">
                        Hi, Noah Thanks for reaching out, please book a call
                        with me here. Regards, Anant Singh
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealEmail;

import React, { useState, useEffect } from "react";
import "../styles/LPleads.css";
import CRMEmail from "../CRMEmail";
import CalendarIcon from "../../assets/image/calendar-edit.svg";
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import Arrow from "../../assets/image/arrow-right.svg";
import axios from "axios";
import {
  ADD_EMAIL,
  POST_EMAIL,
  handleLogout,
  getDecryptedToken,
} from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DealEmail = ({ type, id, item, dealName }) => {
  const [openEditor, setOpenEditor] = useState(false);
  const [stateAdd, setStateAdd] = useState(0);
  const [dataFromChild, setDataFromChild] = useState("");
  const decryptedToken = getDecryptedToken();
  const [emailInput, setEmailInput] = useState("");
  const [toEmails, setToEmails] = useState([]);
  const [emailInput2, setEmailInput2] = useState("");
  const [toEmails2, setToEmails2] = useState([]);
  const [allEmails, setAllEmails] = useState([]);

  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
  };
  const handleEmailInputKeyPress = (event) => {
    if (event.key === "Enter" && emailInput.trim() !== "") {
      setToEmails([...toEmails, { email: emailInput.trim(), name: dealName }]);
      setEmailInput("");
    }
  };

  const handleEmailInputChange2 = (event) => {
    setEmailInput2(event.target.value);
  };
  const handleEmailInputKeyPress2 = (event) => {
    if (event.key === "Enter" && emailInput2.trim() !== "") {
      setToEmails2([
        ...toEmails2,
        { email: emailInput2.trim(), name: dealName },
      ]);
      setEmailInput2("");
    }
  };

  const handleDataTransfer = (data) => {
    setDataFromChild(data);
    setStateAdd(1);
  };

  const expandEditor = () => {
    setOpenEditor(true);
  };

  const closeEditor = () => {
    setOpenEditor(false);
    setStateAdd(0);
  };

  const handleAddEmail = () => {
    const updatedFormData = {
      source_id: type === "lead" ? item.id : id,
      source: type,
      subject: "Test email - 1",
      html: dataFromChild,
      to: toEmails,
      cc: toEmails2,
    };
    console.log(updatedFormData);
    axios
      .post(ADD_EMAIL, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if (response?.data?.status === 1) {
          console.log(response?.data);
          toast.success("Email send successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("Something went wrong", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setToEmails([]);
    setToEmails2([]);
    setDataFromChild("");
    setOpenEditor(false);
    setStateAdd(0);
  };

  const handleGetEmail = () => {
    const updatedFormData = {
      source: type,
      source_id: type === "lead" ? item.id : id,
    };
    axios
      .post(POST_EMAIL, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        if (response?.data?.status === 1) {
          console.log(response?.data?.data);
          setAllEmails(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetEmail();
  }, []);

  return (
    <>
      {!openEditor ? (
        <div className="colapedEditor" onClick={expandEditor}>
          <p>Click here to send email</p>
        </div>
      ) : (
        <>
          <div>
            <div>
              <label htmlFor="emailInput">To:</label>
              <input
                type="email"
                id="emailInput"
                value={emailInput}
                onChange={handleEmailInputChange}
                onKeyPress={handleEmailInputKeyPress}
              />
            </div>
            <div>
              <p>Selected email addresses:</p>
              <ul>
                {toEmails.map((email, index) => (
                  <li key={index}>{email?.email}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="emailInput">Cc:</label>
              <input
                type="email"
                id="emailInput"
                value={emailInput2}
                onChange={handleEmailInputChange2}
                onKeyPress={handleEmailInputKeyPress2}
              />
            </div>
            <div>
              <p>Selected Cc email addresses:</p>
              <ul>
                {toEmails2.map((email, index) => (
                  <li key={index}>{email?.email}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="notesEditor">
            <CRMEmail onDataTransfer={handleDataTransfer} />
          </div>
          <div className="addNoteBtn">
            <button
              className="common-fonts common-white-button"
              onClick={closeEditor}
            >
              Cancel
            </button>
            {stateAdd === 0 ? (
              <button
                disabled
                className="common-fonts common-inactive-button note-btn"
              >
                Send
              </button>
            ) : (
              <button
                className="common-fonts common-save-button note-btn"
                onClick={handleAddEmail}
              >
                Send
              </button>
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
                      <p className="common-fonts email-sender-name">
                        {" "}
                        <span>From:</span> Anant Singh
                      </p>
                      <p className="common-fonts email-reciever-name">
                        {" "}
                        <span>To:</span>noah@gmail.com
                      </p>
                      <p className="common-fonts">Hi, Noah</p>
                      <p className="common-fonts">
                        Thanks for reaching out, please book a call with me
                        here.
                      </p>
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

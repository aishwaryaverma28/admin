import React, { useState, useEffect } from "react";
import Call from "../../assets/image/call-activity.svg";
import Meeting from "../../assets/image/meeting.svg";
import Task from "../../assets/image/task.svg";
import Deadline from "../../assets/image/deadline.svg";
import LeadCall from "./LeadCall.jsx";
import axios from "axios";
import {
  GET_ACTIVITY,
  handleLogout,
  getDecryptedToken,
  ADD_ACTIVITY,
} from "../utils/Constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../assets/image/calendar-edit.svg";
import TextIcon from "../../assets/image/text-icon.svg";
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import Calling from "../../assets/image/call-calling.svg";

const LeadActivity = ({ item, type, id }) => {
  const [startDate, setStartDate] = useState(null);
  const decryptedToken = getDecryptedToken();
  const [activeTab, setActiveTab] = useState("call");

  useEffect(() => {
    fetchCall();
  }, []);

  const fetchCall = () => {
    if (type === "lead") {
      axios
        .get(GET_ACTIVITY + "lead/" + item.id, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          console.log(response?.data?.data[0]);
        })

        .catch((error) => {
          console.log(error);
          if (error?.response?.data?.message === "Invalid or expired token.") {
            alert(error?.response?.data?.message);
            handleLogout();
          }
        });
    } else if (type === "deal") {
      axios
        .get(GET_ACTIVITY + "deal/" + id, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.data?.message === "Invalid or expired token.") {
            alert(error?.response?.data?.message);
            handleLogout();
          }
        });
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="activity-container">
      <div className="add-call">
        <input type="text" placeholder="Add Title" />
      </div>
      <div className="genral-setting-btn activity-tab genral-setting-fonts">
        <button
          className={`genral-btn ${
            activeTab === "call" ? "genral-active" : ""
          }`}
          onClick={() => handleTabClick("call")}
        >
          Call
        </button>
        <button
          className={`genral-btn ${
            activeTab === "meeting" ? "genral-active" : ""
          }`}
          onClick={() => handleTabClick("meeting")}
        >
          Meeting
        </button>
        <button
          className={`genral-btn ${
            activeTab === "task" ? "genral-active" : ""
          }`}
          onClick={() => handleTabClick("task")}
        >
          Task
        </button>
        <button
          className={`genral-btn ${
            activeTab === "deadline" ? "genral-active" : ""
          }`}
          onClick={() => handleTabClick("deadline")}
        >
          Deadline
        </button>
      </div>

      <div className="tab-content">
        <div>
          <div className="activity-call-btn">
            <button className="common-fonts log-meeting">Log Call</button>
            <button className="common-fonts log-meeting call-btn-active">
              Make a Phone Call
            </button>
          </div>

          <div className="activity-time-travel">
            <div className="permission-input-box">
              <label className="common-fonts activity-label">Date</label>

              <div className="custom-date-input">
                <img
                  src={CalendarIcon}
                  alt="Delete"
                  className="activity-calender-icon"
                />
                <div className="activity-date-wrapper">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="activity-date-input"
                    dateFormat="dd/MM/yyyy"
                    value={startDate}
                    placeholderText="dd/mm/yyyy"
                  />
                </div>
              </div>
            </div>
            <div className="permission-input-box">
              <label className="common-fonts activity-label activity-label-2">
                Time From
              </label>

              <select name="" id="" className="common-fonts activity-select">
                <option value="">hh:mm Pm</option>
              </select>
            </div>
            <div className="permission-input-box">
              <label className="common-fonts activity-label activity-label-2">
                Time To
              </label>

              <select name="" id="" className="common-fonts activity-select">
                <option value="">hh:mm Pm</option>
              </select>
            </div>
          </div>

          <div className="activity-text">
            <img src={TextIcon} alt="" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="common-fonts activity-text-area"
              placeholder="Write Here"
            ></textarea>
          </div>
          <div className="activity-text">
            <img src={TextIcon} alt="" />
           <select name="" id="" className="common-fonts activity-select-area">
            <option value="">Rahul (you)</option>
           </select>
          </div>

          <div className="activity-button">
            <button className="common-white-button">Cancel</button>
            <button className="common-save-button">Save</button>
          </div>

          <div className="activity-bottom">
            <p className="common-fonts activity-month">July 2023</p>

            <div className="savedNotes activity-save-note">
              <>
                <section className="note-display">
                  <div className="note-content">
                    <div className="arrow-greater">
                      <img src={GreaterArrow} alt="" />
                    </div>

                    <div className="notes-main">
                      <div className="notes-by">
                        <p>
                          <span>Task </span>
                          assigned to anant
                        </p>
                        <div className="notes-date activity-date">
                          <img src={CalendarIcon} alt="" />
                          <p className="common-fonts activity-date">
                            Due July 6, 2023 at 10:00 AM GMT+5:30
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="activity-ring">
                          <div className="activity-calling">
                            <img src={Calling} alt="" />
                          </div>
                          <p className="common-fonts activity-call-name">
                            Call
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className={"answer display_answer"}></div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadActivity;

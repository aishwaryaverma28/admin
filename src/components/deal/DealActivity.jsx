import React, { useState, useEffect } from "react";
import Call from "../../assets/image/call-activity.svg";
import Meeting from "../../assets/image/meeting.svg";
import Task from "../../assets/image/task.svg";
import Deadline from "../../assets/image/deadline.svg";
import bin from "../../assets/image/TrashFill.svg";
import axios from "axios";
import {
  GET_ACTIVITY,
  handleLogout,
  getDecryptedToken,
  ADD_ACTIVITY,
  DELETE_LEAD_ACTIVITY,
  UPDATE_LEAD_ACTIVITY,
} from "../utils/Constants";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "../../assets/image/calendar-edit.svg";
import TextIcon from "../../assets/image/text-icon.svg";
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DealActivity = ({ item, type, id }) => {
  const decryptedToken = getDecryptedToken();
  const [activeTab, setActiveTab] = useState("call");
  const [openEditor, setOpenEditor] = useState(false);
  const [stateBtn, setStateBtn] = useState(0);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState("");
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const hh = String(hour).padStart(2, "0");
        const mm = String(minute).padStart(2, "0");
        options.push(`${hh}:${mm}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();
  const [timeOptionsTo, setTimeOptionsTo] = useState(timeOptions);
  const selectedTimeFromIndex = timeOptionsTo.indexOf(selectedTimeFrom);
  const nextIndex = selectedTimeFromIndex + 1;
  const newTime =
  nextIndex < timeOptionsTo.length ? timeOptionsTo[nextIndex] : null;
  const [form, setForm] = useState({
    activity_description: "",
    activity_for: type,
    activity_name: "",
    scheduled_date: "",
    scheduled_time: "",
    activity_title: "",
    end_time: "",
    source_id: type === "lead" ? item.id : id,
  });

  const fetchCall = () => {
    if (type === "lead") {
      axios
        .get(GET_ACTIVITY + "lead/" + item.id, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          console.log(response?.data?.data);
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
          console.log(response?.data?.data);
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

  useEffect(() => {
    fetchCall();
  }, []);

  const expandEditor = () => {
    setOpenEditor(true);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setStateBtn(1);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
    setStateBtn(1);
  }

  const handleAddNote = () => {
    let updatedEndTime;
    if (form.end_time === "") {
      updatedEndTime = newTime;
    } else {
      updatedEndTime = form.end_time;
    }

    const updatedFormData = {
      ...form,
      activity_for: type,
      activity_name: activeTab,
      scheduled_time: selectedTimeFrom,
      end_time: updatedEndTime,
      source_id: type === "lead" ? item.id : id,
    };
    axios
      .post(ADD_ACTIVITY, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response);
        toast.success("Employee data added successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setForm({
          activity_description: "",
          activity_name: "",
          scheduled_date: "",
          scheduled_time: "",
          end_time: "",
        });
        setActiveTab("call");
        fetchCall();
      })
      .catch((error) => {
        console.log(error);
      });
    fetchCall();
    setOpenEditor(false);
    setStateBtn(0);
  };

  return (
    <>
      <div className="activity-container">
        {!openEditor ? (
          <div className="colapedEditor" onClick={expandEditor}>
            <p>Click here to add an activity</p>
          </div>
        ) : (
          <div className="activityBox">
            <div className="add-call">
              <input
                type="text"
                placeholder="Add Title"
                name="activity_title"
                onChange={handleChange}
              />
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
                      <div className="activity-date-wrapper">
                        <input
                          type="date"
                          onChange={handleChange}
                          name="scheduled_date"
                          className="activity-date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="permission-input-box">
                    <label className="common-fonts activity-label activity-label-2">
                      Time From
                    </label>
                    <select
                      name="timeFrom"
                      id="timeFrom"
                      className="common-fonts activity-select"
                      onChange={(e) => setSelectedTimeFrom(e.target.value)}
                    >
                      {timeOptions.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="permission-input-box">
                    <label className="common-fonts activity-label activity-label-2">
                      Time To
                    </label>

                    <select
                      name="end_time"
                      id="timeTo"
                      onChange={handleChange}
                      className="common-fonts activity-select"
                    >
                      {timeOptionsTo.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="activity-text">
                  <img src={TextIcon} alt="" />
                  <textarea
                    name="activity_description"
                    id="activity_description"
                    cols="30"
                    rows="10"
                    className="common-fonts activity-text-area"
                    placeholder="Write Here"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="activity-text">
                  <img src={TextIcon} alt="" />
                  <select
                    name=""
                    id=""
                    className="common-fonts activity-select-area"
                  >
                    <option value="">Rahul (you)</option>
                  </select>
                </div>

                <div className="activity-button">
                  <button className="common-white-button">Cancel</button>
                  {stateBtn === 0 ? (
                    <button disabled className="disabledBtn">
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleAddNote}
                      className="common-save-button"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DealActivity;

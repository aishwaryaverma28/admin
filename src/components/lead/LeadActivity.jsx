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

const LeadActivity = ({ item, type, id }) => {
  const decryptedToken = getDecryptedToken();
  const [selectedTimeFrom, setSelectedTimeFrom] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expansion, setExpansion] = useState(false);
  const [tick, setTick] = useState(false);

  const [editedTitle, setEditedTitle] = useState(item.activity_title)
  const [editedDescription, setEditedDescription] = useState(item.activity_description)
  const [timeTo, setTimeTo] = useState(item.end_time)

  // Function to generate time options with 15-minute intervals
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
  const [selectedTimeTo, setSelectedTimeTo] = useState(timeOptionsTo[0] || "");
  const selectedTimeFromIndex = timeOptionsTo.indexOf(selectedTimeFrom);
  const nextIndex = selectedTimeFromIndex + 1;
  const newTime =
    nextIndex < timeOptionsTo.length ? timeOptionsTo[nextIndex] : null;
  const [activeTab, setActiveTab] = useState("call");
  const [openEditor, setOpenEditor] = useState(false);
  const [stateBtn, setStateBtn] = useState(0);
  const [activity, setActivity] = useState([]);
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
  const [newform, setNewForm] = useState({
    activity_description: item.activity_description,
    activity_for: type,
    activity_name: item.activity_name,
    scheduled_date: item.scheduled_date,
    scheduled_time: item.scheduled_time,
    activity_title: item.activity_title,
    end_time: item.end_time,
    source_id: type === "lead" ? item.id : id,
  });

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setExpansion(false);
    } else {
      setExpandedIndex(index);
      setExpansion(true);
    }
  };

  const toggleTick = () => {
    setTick(!tick);
  };

  useEffect(() => {
    if (selectedTimeFrom) {
      // Filter timeOptions to get options for the second dropdown
      const filteredOptions = timeOptions.filter(
        (time) => time > selectedTimeFrom
      );
      setTimeOptionsTo(filteredOptions);
      setStateBtn(1);
    }
  }, [selectedTimeFrom]);



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
          setActivity(response?.data?.data);
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

  useEffect(() => {
    fetchCall();
  }, []);

  console.log(activity)
  console.log("bro")

  const handleActivityDelete = (id) => {
    axios
      .delete(DELETE_LEAD_ACTIVITY + id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then(() => {
        toast.success("Activity Deleted successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        fetchCall();
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.message === "Invalid or expired token.") {
          alert(error?.response?.data?.message);
        }
      });
  };
  const handleActivityUpdate = (id, index) => {
    const updatedData = {
      activity_title: newform.activity_title,
      activity_description:newform.activity_description
    };

    axios
      .put(UPDATE_LEAD_ACTIVITY + id, updatedData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then(() => {
        toast.success("Activity Updated successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        fetchCall();
        setExpandedIndex(index);
        setExpansion(false);
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.message === "Invalid or expired token.") {
          alert(error?.response?.data?.message);
        }
        setExpandedIndex(index);
        setExpansion(false);
      });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setStateBtn(1);
  };

  const expandEditor = () => {
    setOpenEditor(true);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
    setStateBtn(1);
  }




  function handleDescriptionChange(e) {
    const { value } = e.target;
    setEditedDescription(value); 
  

    setNewForm((prev) => ({
      ...prev,
      activity_description: value,
    }));
  
    setEditedDescription(item.activity_description);
  
    setStateBtn(1);
  }

  function handleTitleChange(e) {
    const { value } = e.target;
    setEditedTitle(value);

    setNewForm((prev) => {
      return { ...prev, activity_title: value };
    });
    setEditedTitle(item.activity_title);
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
        {activity &&
          activity.map((item, index) => (
            <div className="activity-task-map">
              <div className="activity-bottom">
                <div className="savedNotes activity-save-note">
                  <>
                    <section className="note-display">
                      <div className="note-content activity-content">
                        <div
                          className="arrow-greater activity-new-arrow"
                          onClick={() => toggleExpand(index)}
                        >
                          <img src={GreaterArrow} alt="" />
                        </div>

                        <div className="notes-main">
                          <div className="activity-flex">
                            <div
                              className="notes-by activity-by "
                              onClick={() => toggleExpand(index)}
                            >
                              <p className="common-fonts activity-assigned-to">
                                {item.activity_name} Assigned to :
                                <span>Anant Singh</span>
                              </p>

                              <div className="activity-date-time">
                                <img src={CalendarIcon} alt="" />
                                <p className="common-fonts activity-due">
                                  {item.scheduled_date &&
                                  item.scheduled_date.includes("T") &&
                                  item.scheduled_date.includes(".")
                                    ? item.scheduled_date.split("T")[0] +
                                      " at " +
                                      item.scheduled_date
                                        .split("T")[1]
                                        .split(".")[0]
                                    : "-"}
                                </p>
                              </div>
                            </div>
                            <div className="three-side-dots activity-del">
                              <img
                                src={bin}
                                alt="trash"
                                title="Delete"
                                onClick={() => handleActivityDelete(item.id)}
                                className="activity-trash"
                              />
                            </div>
                          </div>

                          <div
                            className={`activity-phone ${
                              expandedIndex !== index
                                ? "activity-disable-white"
                                : "activity-new-call"
                            }`}
                          >
                            <div className="activity-ring">
                              <i
                                className={`fa fa-check-circle  ${
                                  expandedIndex !== index
                                    ? "hide-activity-tick"
                                    : "show-activity-tick"
                                } ${
                                  tick === true
                                    ? "green-activity-tick"
                                    : "white-activity-tick"
                                }`}
                                onClick={toggleTick}
                                aria-hidden="true"
                              ></i>
                              <input
                                disabled={
                                  expandedIndex !== index ? true : false
                                }
                                className={`common-fonts activity-call-name ${
                                  expandedIndex !== index
                                    ? "activity-new-disable-white"
                                    : "activity-new-input"
                                }`}
                                type="text"
                                value={
                                  expandedIndex === index
                                    ? editedTitle
                                    : item.activity_title
                                }
                                name="activity_title"
                                onChange={handleTitleChange}
                              />
                            </div>
                          </div>

                          {expandedIndex === index && (
                            <>
                              <div className="activity-open-time">
                                <div className="activity-timefrom">
                                  <label>Due Date</label>

                                  <div className="custom-date-input activity-new-date">
                                    <div className="">
                                      <input
                                        type="date"
                                        value={
                                          item.scheduled_date.split("T")[0]
                                        }
                                        name="scheduled_date"
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="activity-timefrom">
                                  <label htmlFor="">Time From</label>
                                  <select
                                    name="scheduled_time"
                                    id=""
                                    className="common-fonts activity-timefrom-select"
                                    value={item?.scheduled_time?.slice(0, 5)}
                                    onChange={handleChange}
                                  >
                                    {timeOptions.map((time, index) => (
                                      <option key={index} value={time}>
                                        {time}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="activity-timefrom">
                                  <label htmlFor="">Time To</label>
                                  <select
                                    name="end_time"
                                    id=""
                                    className="common-fonts activity-timefrom-select"
                                    value={item?.end_time?.slice(0, 5)}
                                    onChange={handleChange}
                                  >
                                    {timeOptions.map((time, index) => (
                                      <option key={index} value={time}>
                                        {time}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="activity-timefrom">
                                  <label htmlFor="">Type</label>
                                  <select
                                    name=""
                                    id=""
                                    className="common-fonts activity-timefrom-select"
                                  >
                                    <option value="Call">Call</option>
                                    <option value="Meeting">Meeting</option>
                                    <option value="Task">Task</option>
                                    <option value="Deadline">Deadline</option>
                                  </select>
                                </div>
                                <div className="activity-timefrom">
                                  <label htmlFor="">Assign To</label>
                                  <select
                                    name=""
                                    id=""
                                    className="common-fonts activity-timefrom-select"
                                  >
                                    <option value="">Anant Singh</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <p className="common-fonts activity-describe">
                                  Description
                                </p>
                                <textarea
                                  name="activity_description"
                                  cols="30"
                                  rows="5"
                                  className="activity-big-textarea"
                                  value={
                                    expandedIndex === index
                                    ? editedDescription
                                    : item.activity_description
                                }
                                  onChange={handleDescriptionChange}
                                ></textarea>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </section>

                    {expandedIndex === index && (
                      <div className={"answer display_answer"}></div>
                    )}
                  </>
                </div>
              </div>
              {expandedIndex === index && (
                <div className="activity-bottom-buttons">
                  <button className="common-white-button">Cancel</button>

                  <button
                    className="common-save-button activity-save-buttons"
                    onClick={() => handleActivityUpdate(item.id, index)}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default LeadActivity;

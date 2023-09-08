import React, { useState, useEffect } from 'react';
import Call from "../../assets/image/call-activity.svg";
import Meeting from "../../assets/image/meeting.svg";
import Task from "../../assets/image/task.svg";
import Deadline from "../../assets/image/deadline.svg";
import LeadCall from './LeadCall.jsx';
import axios from "axios";
import {
  GET_ACTIVITY,
  handleLogout,
  getDecryptedToken,
} from "../utils/Constants";


const LeadActivity = ({item, type, id}) => {
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
          console.log(response?.data?.data[0])
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
          console.log(response)
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
    <div>
     <div className="colapedEditor">
          <p>Add Call</p>
        </div>
        <div className="genral-setting-btn activity-tab genral-setting-fonts">
            <button
              className={`genral-btn ${activeTab === "call" ? "genral-active" : ""
                }`}
              onClick={() => handleTabClick("call")}
            >
              Call
            </button>
            <button
              className={`genral-btn ${activeTab === "meeting" ? "genral-active" : ""
                }`}
              onClick={() => handleTabClick("meeting")}
            >
              Meeting
            </button>
            <button
              className={`genral-btn ${activeTab === "task" ? "genral-active" : ""
                }`}
              onClick={() => handleTabClick("task")}
            >
              Task
            </button>
            <button
              className={`genral-btn ${activeTab === "deadline" ? "genral-active" : ""
                }`}
              onClick={() => handleTabClick("deadline")}
            >
              Deadline
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "call" && (
              <div>
               <LeadCall type={type} item={item} />
              </div>
            )}
            {activeTab === "meeting" && (
              <div className="email-tab-content">
                <p>meeting</p>
              </div>
            )}
            {activeTab === "task" && (
              <div className="activity-tab-content">
                task
              </div>
            )}
            {activeTab === "deadline" && (
              <div className="attachment-tab-content">
               deadline
              </div>
            )}
          </div>
    </div>
  )
}

export default LeadActivity

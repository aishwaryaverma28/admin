import React, { useState } from 'react';
import Call from "../../assets/image/call-activity.svg";
import Meeting from "../../assets/image/meeting.svg";
import Task from "../../assets/image/task.svg";
import Deadline from "../../assets/image/deadline.svg";
import LeadCall from './LeadCall.jsx';


const LeadActivity = () => {
  const [activeTab, setActiveTab] = useState("call"); 

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
               <LeadCall/>
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

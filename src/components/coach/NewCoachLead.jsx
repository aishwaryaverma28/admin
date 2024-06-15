import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getDecryptedToken, USER_LOG } from "./../utils/Constants";
import UserLogs from "../lead/UserLogs";
import Confirmation from "../lead/Confirmation.jsx";
import CoachAssign from "./CoachAssign.jsx";
import NewCoachImages from "./NewCoachImages.jsx";
import NewCoachDetails from "./NewCoachDetails.jsx";

const NewCoachLead = ({ selectedItem, closeModal, onLeadAdded }) => {
  const decryptedToken = getDecryptedToken();
  const [activeTab, setActiveTab] = useState("details");
  const [userLog, setUserLog] = useState(0);
  const [check, setCheck] = useState(false);
  const childRef = useRef(null);
  const [isDelete, setIsDelete] = useState(false);

  const handleDeletePopUpOpen = () => {
    setIsDelete(true);
  };
  const handleMassDeletePopUpClose = () => {
    setIsDelete(false);
    setCheck(false);
  };

  const updateCheckState = (value) => {
    setCheck(value);
  };
  const callChildFunction = () => {
    if (childRef.current) {
      childRef.current.handleUpdateClick();
      setCheck(false);
      handleMassDeletePopUpClose();
    } else {
      console.error("Child component reference is not initialized yet");
    }
  };

  const handleTabClick = (tab) => {
    if (!check) {
      setActiveTab(tab);
    } else {
      handleDeletePopUpOpen();
    }
  };
  const fetchUserLog = () => {
    axios
      .post(
        USER_LOG,
        {
          object_type: selectedItem?.type_id,
          object_id: selectedItem?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      )
      .then((response) => {
        setUserLog(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserLog();
  }, []);
  return (
    <div className="modal">
      <div className="leftClose" onClick={closeModal}></div>
      <div className="customization_popup_container">
        <span className="close" onClick={closeModal}>
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </span>
        {/* left side of modal ends here */}
        <div className="user-details--right">
          <div className="archive_flex">
            <div className="tab-navigation">
              {/* ===================================================================tabination buttons */}
              <button
                className={activeTab === "details" ? "active" : ""}
                onClick={() => handleTabClick("details")}
              >
                <i class="fa-sharp fa-regular fa fa-newspaper-o"></i>
                {selectedItem?.type} Details
              </button>
              <button
                className={activeTab === "images" ? "active" : ""}
                onClick={() => handleTabClick("images")}
              >
                <i class="fa-sharp fa-regular fa-images"></i>
                Images
              </button>
              <button
                className={activeTab === "assign" ? "active" : ""}
                onClick={() => handleTabClick("assign")}
              >
                <i className="fa-sharp fa-regular fa-envelope-open"></i>
                Assign
              </button>
              <button
                className={activeTab === "user" ? "active" : ""}
                onClick={() => handleTabClick("user")}
              >
                <i class="fa-sharp fa-regular fa fa-file-text-o"></i>
                User Logs ({userLog?.length})
              </button>
            </div>
            <div>
              <button className="recycle-delete">Archive</button>
            </div>
          </div>

          {/* ===================================================================tabination content */}
          <div className="tab-content">
            {activeTab === "details" && (
              <div className="notes-tab-content">
                <NewCoachDetails
                user_id = {selectedItem?.id}
                  id={selectedItem?.parent_id}
                  updateCheckState={updateCheckState}
                  ref={childRef}
                />
              </div>
            )}
            {activeTab === "images" && (
              <div className="activity-tab-content">
                <NewCoachImages id={selectedItem?.parent_id} />
              </div>
            )}
            {activeTab === "assign" && (
              <div className="activity-tab-content">
                <CoachAssign
                  id={selectedItem?.id}
                  tempAcademyId={selectedItem?.parent_id}
                  onLeadAdded={onLeadAdded}
                />
              </div>
            )}
            {activeTab === "user" && (
              <div className="activity-tab-content">
                <UserLogs id={selectedItem?.id} type={selectedItem?.type_id} />
              </div>
            )}
          </div>
        </div>
      </div>
      {isDelete && (
        <Confirmation
          onClose={handleMassDeletePopUpClose}
          onDeleteConfirmed={callChildFunction}
        />
      )}
    </div>
  );
};

export default NewCoachLead;

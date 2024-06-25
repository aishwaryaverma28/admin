import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { USER_LOG, UPDATE_PLAYER, GET_PLAYER_ID, getDecryptedToken } from "./../utils/Constants";
import UserLogs from "../lead/UserLogs";
import Confirmation from "../lead/Confirmation";
import NewPlayerDetails from "./NewPlayerDetails";
import NewPlayerImage from "./NewPlayerImage";
import { toast } from "react-toastify";
const NewPlayerLeads = ({ selectedItem, closeModal, onLeadAdded }) => {
  const decryptedToken = getDecryptedToken();
  const [activeTab, setActiveTab] = useState("details");
  const [userLog, setUserLog] = useState(0);
  const [check, setCheck] = useState(false);
  const childRef = useRef(null);
  const [isDelete, setIsDelete] = useState(false);
  const [editedItem, setEditedItem] = useState({})
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
  const getAllPlayers = () => {
    const requestBody = {
      playerId: selectedItem?.parent_id,
      type: "temp"
    };
    axios
      .post(GET_PLAYER_ID, requestBody, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const apiData = response?.data?.data[0];
        setEditedItem(apiData);
      })
      .catch((error) => {
        console.log(error);
      });
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
    getAllPlayers();
  }, []);
  function UserArchive() {
    const updatedFormData = {
      type: "temp",
      is_deleted: 1,
      name: editedItem?.name?.trim(),
      sport_id: editedItem?.sport_id ?? 14,
      loc_id: editedItem?.loc_id ?? 1,
    }
    axios
      .put(UPDATE_PLAYER + selectedItem?.parent_id, updatedFormData
        , {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === 1) {
          toast.success("User deleted successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          onLeadAdded();
        } else {
          toast.error(response?.data?.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 2000,
        });
      })
  }
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
                className={activeTab === "user" ? "active" : ""}
                onClick={() => handleTabClick("user")}
              >
                <i class="fa-sharp fa-regular fa fa-file-text-o"></i>
                User Logs ({userLog?.length})
              </button>
            </div>
            {editedItem && editedItem?.is_deleted !== 1 ? <div>
              <button className="recycle-delete" onClick={UserArchive}>Archive</button>
            </div> : <></>
            }

          </div>

          {/* ===================================================================tabination content */}
          <div className="tab-content">
            {activeTab === "details" && (
              <div className="notes-tab-content">
                <NewPlayerDetails
                  id={selectedItem?.parent_id}
                  updateCheckState={updateCheckState}
                  ref={childRef}
                />
              </div>
            )}
            {activeTab === "images" && (
              <div className="activity-tab-content">
                <NewPlayerImage id={selectedItem?.parent_id} />
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

export default NewPlayerLeads;

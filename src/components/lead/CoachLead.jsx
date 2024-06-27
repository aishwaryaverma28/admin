import React,{ useState,useEffect, useRef } from 'react'
import CoachDetails from './CoachDetails';
import CoachImage from './CoachImage';
import axios from "axios";
import {
    getDecryptedToken,
    ACADMEY_LEADS_DETAILS,
    handleLogout, USER_LOG, GET_BMPUSER_ID,UPDATE_COACH,GET_COACH_ID
} from "./../utils/Constants";
import AcadmeyLeadDetails from './AcadmeyLeadDetails';
import UserLogs from './UserLogs';
import Confirmation from './Confirmation';
import { toast } from 'react-toastify';
const CoachLead = ({ selectedItem, closeModal,onLeadAdded,page,limit }) => {
    const decryptedToken = getDecryptedToken();
    const [check, setCheck] = useState(false);
    const childRef = useRef(null);
    const [isDelete, setIsDelete] = useState(false);
    const [userLog, setUserLog] = useState(0);
    const [userId, setUserId] = useState(0);
    const [leads, setLeads] = useState(0);
    const [activeTab, setActiveTab] = useState("details");
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

    const handleTabClick = (tab) => {
        if (!check) {
            setActiveTab(tab);
        } else {
            handleDeletePopUpOpen();
        }
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

    const getUserId = () => {
        const body = {
            object_id: selectedItem, object_type: 1,
        }
        axios
            .post(GET_BMPUSER_ID, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response?.data?.status === 1) {
                    setUserId(response?.data?.data[0]);
                    fetchUserLog(response?.data?.data[0])
                }
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.data?.message === "Invalid or expired token.") {
                    alert(error?.response?.data?.message);
                    handleLogout();
                }
            });
    }
    const fetchLeads = () => {
        const body = {
            object_id: selectedItem, object_type: "coach",
        }
        axios
            .post(ACADMEY_LEADS_DETAILS, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response?.data?.status === 1) {
                    setLeads(response?.data?.data);
                }
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.data?.message === "Invalid or expired token.") {
                    alert(error?.response?.data?.message);
                    handleLogout();
                }
            });
    };
    const fetchUserLog = (id) => {
        axios
            .post(USER_LOG, { object_type: 1,
            object_id: id?.id }, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                setUserLog(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchLeads();
        getUserId();
        fetchCoach();
    }, [])
    const fetchCoach = () => {
        let body = {
          coachId: selectedItem,
          type: "org"
        };
        axios
          .post(GET_COACH_ID, body, {
            headers: {
              Authorization: `Bearer ${decryptedToken}`,
            },
          })
          .then((response) => {
            setEditedItem(response?.data?.data[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      function UserArchive() {
        const updatedFormData = {
          type: "org",
          is_deleted: 1,
          name: editedItem?.name?.trim(),
          sport_id: editedItem?.sport_id ?? 14,
          loc_id: editedItem?.loc_id ?? 1,
        }
        axios
        .put(UPDATE_COACH + selectedItem, updatedFormData
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
            if (typeof page !== 'undefined' && typeof limit !== 'undefined') {
                onLeadAdded(page, limit);
              }
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
                            Coach Details
                        </button>
                        <button
                            className={activeTab === "gallery" ? "active" : ""}
                            onClick={() => handleTabClick("gallery")}
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
                        <button
                            className={activeTab === "leads" ? "active" : ""}
                            onClick={() => handleTabClick("leads")}
                        >
                            <i className="fa-sharp fa-regular fa-handshake-o"></i>
                            Leads ({leads?.length})
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
                                <CoachDetails user_id={userId} id={selectedItem} updateCheckState={updateCheckState} ref={childRef} />
                            </div>
                        )}
                        {activeTab === "gallery" && (
                            <div className="activity-tab-content">
                                <CoachImage id={selectedItem} />
                            </div>
                        )}
                         {activeTab === "user" && (
                            <div className="activity-tab-content">
                                <UserLogs id={userId?.id} type={1}/>
                            </div>
                        )}
                        {activeTab === "leads" && (
                            <div className="attachment-tab-content">
                                <AcadmeyLeadDetails
                                    leadsDetails={leads}
                                />
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
    )
}

export default CoachLead
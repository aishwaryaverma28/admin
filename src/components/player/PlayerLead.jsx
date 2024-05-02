import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import {
    USER_LOG,
    GET_BMPUSER_ID,
    ACADEMY_LOGS,
    getDecryptedToken,
    ACADMEY_LEADS_DETAILS,
    handleLogout
} from "./../utils/Constants"
import PlayerDetails from "./PlayerDetails"
import AcademyLogs from '../lead/AcademyLogs';
import AcadmeyLeadDetails from '../lead/AcadmeyLeadDetails';
import UserLogs from '../lead/UserLogs';
import Confirmation from '../lead/Confirmation';
import PlayerImage from './PlayerImage';
const PlayerLead = ({ selectedItem, closeModal }) => {
    const decryptedToken = getDecryptedToken();
    const [logs, setLogs] = useState(0);
    const [leads, setLeads] = useState(0);
    const [userLog, setUserLog] = useState(0);
    const [userId, setUserId] = useState(0);
    const [activeTab, setActiveTab] = useState("details");
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
const getLogs = () => {
        const body = {
            entity: "Player",
            object_id: selectedItem
        }
        axios.post(ACADEMY_LOGS, body, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
            .then((response) => {
                if (response?.data?.status === 1) {
                    setLogs(response?.data?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const fetchLeads = () => {
        const body = {
            object_id: selectedItem, object_type: "player",
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
    const getUserId = () => {
        const body = {
            object_id: selectedItem, object_type: 3,
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
    const fetchUserLog = (id) => {
        axios
            .post(USER_LOG, {
                object_type: 3,
                object_id: id?.id
            }, {
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
        getLogs();
        fetchLeads();
        getUserId();
    }, [])
    return (
        <div className="modal">
            <div className="leftClose" onClick={closeModal}></div>
            <div className="customization_popup_container">
                <span className="close" onClick={closeModal}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </span>
                {/* left side of modal ends here */}
                <div className="user-details--right">
                    <div className="tab-navigation">
                        {/* ===================================================================tabination buttons */}
                        <button
                            className={activeTab === "details" ? "active" : ""}
                            onClick={() => handleTabClick("details")}
                        >
                            <i class="fa-sharp fa-regular fa fa-newspaper-o"></i>
                            Player Details
                        </button>
                        <button
                            className={activeTab === "gallery" ? "active" : ""}
                            onClick={() => handleTabClick("gallery")}
                        >
                            <i class="fa-sharp fa-regular fa-images"></i>
                            Images
                        </button>
                        <button
                            className={activeTab === "logs" ? "active" : ""}
                            onClick={() => handleTabClick("logs")}
                        >
                            <i class="fa-sharp fa-regular fa fa-file-text-o"></i>
                            Logs ({logs?.length})
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
                    {/* ===================================================================tabination content */}
                    <div className="tab-content">
                        {activeTab === "details" && (
                            <div className="notes-tab-content">
                                <PlayerDetails id={selectedItem} updateCheckState={updateCheckState} ref={childRef} />
                            </div>
                        )}
                        {activeTab === "gallery" && (
                            <div className="activity-tab-content">
                                <PlayerImage id={selectedItem?.id} />
                            </div>
                        )}
                        {activeTab === "logs" && (
                            <div className="activity-tab-content">
                                <AcademyLogs id={selectedItem} type={"Player"} />
                            </div>
                        )}
                        {activeTab === "user" && (
                            <div className="activity-tab-content">
                                <UserLogs id={userId?.id} type={3} />
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

export default PlayerLead
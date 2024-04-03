import React,{ useState,useEffect } from 'react'
import CoachDetails from './CoachDetails';
import CoachImage from './CoachImage';
import AcademyLogs from './AcademyLogs';
import axios from "axios";
import {
    ACADEMY_LOGS,
    getDecryptedToken,
    ACADMEY_LEADS_DETAILS,
    handleLogout, USER_LOG, GET_BMPUSER_ID
} from "./../utils/Constants";
import AcadmeyLeadDetails from './AcadmeyLeadDetails';
import UserLogs from './UserLogs';
const CoachLead = ({ selectedItem, closeModal }) => {
    const decryptedToken = getDecryptedToken();
    const [logs, setLogs] = useState(0);
    const [userLog, setUserLog] = useState(0);
    const [userId, setUserId] = useState(0);
    const [leads, setLeads] = useState(0);
    const [activeTab, setActiveTab] = useState("details");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const getLogs = () => {
        const body = {
            entity: "Coach",
            object_id: selectedItem.id
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
    const getUserId = () => {
        const body = {
            object_id: selectedItem.id, object_type: 1,
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
            object_id: selectedItem.id, object_type: "coach",
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
        console.log(id?.id)
        axios
            .post(USER_LOG, { object_type: 1,
            object_id: id?.id }, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                console.log(response?.data?.data)
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
                        <button
                            className={activeTab === "activity" ? "active" : ""}
                            onClick={() => handleTabClick("activity")}
                        >
                            <i class="fa-solid fa-sharp fa-regular fa-calendar-days"></i>
                            Activity ()
                        </button>
                        <button
                            className={activeTab === "notes" ? "active" : ""}
                            onClick={() => handleTabClick("notes")}
                        >
                            <i className="fa-sharp fa-regular fa-note-sticky"></i>
                            Notes ()
                        </button>                        
                        <button
                            className={activeTab === "email" ? "active" : ""}
                            onClick={() => handleTabClick("email")}
                        >
                            <i className="fa-sharp fa-regular fa-envelope-open"></i>
                            Email ()
                        </button>
                    </div>
                     {/* ===================================================================tabination content */}
                     <div className="tab-content">
                        {activeTab === "details" && (
                            <div className="notes-tab-content">
                                <CoachDetails id={selectedItem?.id} />
                            </div>
                        )}
                        {activeTab === "gallery" && (
                            <div className="activity-tab-content">
                                <CoachImage id={selectedItem?.id} />
                            </div>
                        )}
                        {activeTab === "logs" && (
                            <div className="activity-tab-content">
                                <AcademyLogs id={selectedItem?.id} type={"Coach"}/>
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
        </div>
    )
}

export default CoachLead
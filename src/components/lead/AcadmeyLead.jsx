import React, { useState, useEffect } from "react";
import "./../styles/LPleads.css";
import axios from "axios";
import {
    ACADEMY_LOGS,
    ACADMEY_NOTE_SOURCE,
    GET_ACADEMY,
    handleLogout,
    getDecryptedToken,
    ACADMEY_LEADS_DETAILS,
    ACADMEY_ACTIVITY_SOURCE,
    POST_EMAIL,
    USER_LOG,GET_BMPUSER_ID
} from "./../utils/Constants";
import AddNotes from "../deal/AddNotes";
import "react-toastify/dist/ReactToastify.css";
import DealActivity from "../deal/DealActivity";
import DealEmail from "../deal/DealEmail.jsx";
import AcadmeyLeadDetails from "./AcadmeyLeadDetails.jsx";
import LeadImage from "./LeadImage.jsx";
import AcademyDetails from "./AcademyDetails.jsx";
import AcademyLogs from "./AcademyLogs.jsx";
import UserLogs from "./UserLogs.jsx";

const AcadmeyLead = ({ selectedItem, closeModal }) => {
    const [editedItem, setEditedItem] = useState("");
    const [activeTab, setActiveTab] = useState("details");
    const [notes, setNotes] = useState(0);
    const [logs, setLogs] = useState(0);
    const [userId, setUserId] = useState(0);
    const [userLog, setUserLog] = useState(0);
    const [activityCount, setActivityCount] = useState(0);
    const [leads, setLeads] = useState(0);
    const decryptedToken = getDecryptedToken();
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allEmails, setAllEmails] = useState([]);
    const [leadName, setLeadName] = useState("");
    const idOfOwner = parseInt(localStorage.getItem("id"));
    const [ownerId, setOwnerId] = useState(0);
    const [ownerName, setOwnerName] = useState("");
    const handleGetEmail = () => {
        const updatedFormData = {
            source: "lead",
            source_id: selectedItem.id,
        };
        axios
            .post(POST_EMAIL, updatedFormData, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response?.data?.status === 1) {
                    setAllEmails(response?.data?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const fetchLead = () => {
        axios
            .post(GET_ACADEMY, { academy_id: selectedItem?.id }, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                setLeadName(response?.data?.data[0]?.name);
                setOwnerId(response.data.data[0]?.owner);
                setEditedItem(response?.data?.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getUserId = () => {
        const body = {
            object_id: selectedItem.id, object_type: 2,
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
            .post(USER_LOG, { object_type: 2,
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
        getUserId();
        handleGetEmail();
    }, []);

    const fetchCall = () => {
        const body = {
            source_id: selectedItem.id,
            source_type: "academy"
        }
        axios
            .post(ACADMEY_ACTIVITY_SOURCE, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                const filteredNotes = response?.data?.data?.filter((note) => note.is_deleted !== 1);
                setActivityCount(filteredNotes?.length);
            })

            .catch((error) => {
                console.log(error);
                if (error?.response?.data?.message === "Invalid or expired token.") {
                    alert(error?.response?.data?.message);
                    handleLogout();
                }
            });
    };

    useEffect(() => {
        if (userData?.length > 0) {
            setSelectedUser({
                email: userData[0]?.email,
                phone: userData[0]?.phone,
                id: userData[0]?.id,
            });
        }
    }, [userData]);

    useEffect(() => {
        fetchLead();
        fetchNotes();
        fetchCall();
        fetchLeads();
        getLogs();
    }, []);

    //==================================================================notes count
    const fetchNotes = () => {
        const body = {
            source_id: selectedItem.id, source_type: "academy"
        }
        axios
            .post(ACADMEY_NOTE_SOURCE, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response?.data?.status === 1) {
                    const filteredNotes = response?.data?.data?.filter((note) => note.is_deleted !== 1);
                    setNotes(filteredNotes?.length);
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
    const getLogs = () => {
        const body = {
            entity: "Academy",
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
    const fetchLeads = () => {
        const body = {
            object_id: selectedItem.id, object_type: "academy",
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

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    useEffect(() => {
        setOwnerName(userData?.find((item) => item.id === ownerId));
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
                    <div className="tab-navigation">
                        {/* ===================================================================tabination buttons */}
                        <button
                            className={activeTab === "details" ? "active" : ""}
                            onClick={() => handleTabClick("details")}
                        >
                            <i class="fa-sharp fa-regular fa fa-newspaper-o"></i>
                            Academy Details
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
                            Activity ({activityCount})
                        </button>
                        <button
                            className={activeTab === "notes" ? "active" : ""}
                            onClick={() => handleTabClick("notes")}
                        >
                            <i className="fa-sharp fa-regular fa-note-sticky"></i>
                            Notes ({notes})
                        </button>                        
                        <button
                            className={activeTab === "email" ? "active" : ""}
                            onClick={() => handleTabClick("email")}
                        >
                            <i className="fa-sharp fa-regular fa-envelope-open"></i>
                            Email ({allEmails.length})
                        </button>
                    </div>
                    {/* ===================================================================tabination content */}
 
                    <div className="tab-content">
                        {activeTab === "details" && (
                            <div className="notes-tab-content">
                                <AcademyDetails id={selectedItem?.id} />
                            </div>
                        )}
                        {activeTab === "gallery" && (
                            <div className="activity-tab-content">
                                <LeadImage id={selectedItem?.id} />
                            </div>
                        )}
                        {activeTab === "logs" && (
                            <div className="activity-tab-content">
                                <AcademyLogs id={selectedItem?.id} type={"Academy"}/>
                            </div>
                        )}
                         {activeTab === "user" && (
                            <div className="activity-tab-content">
                                <UserLogs id={userId?.id} type={2}/>
                            </div>
                        )}
                        {activeTab === "leads" && (
                            <div className="attachment-tab-content">
                                <AcadmeyLeadDetails
                                    leadsDetails={leads}
                                />
                            </div>
                        )}
                        {activeTab === "activity" && (
                            <div className="activity-tab-content">
                                <DealActivity
                                    item={selectedItem}
                                    type={"lead"}
                                    count={fetchCall}
                                    userData={userData}
                                    ownerId={ownerId}
                                    idOfOwner={idOfOwner}
                                />
                            </div>
                        )}
                        {activeTab === "notes" && (
                            <div className="notes-tab-content">
                                <AddNotes
                                    item={selectedItem}
                                    onNotesNum={fetchNotes}
                                    type="lead"
                                    ownerId={ownerId}
                                    idOfOwner={idOfOwner}
                                />
                            </div>
                        )}
                        {activeTab === "email" && (
                            <div className="email-tab-content">
                                <DealEmail
                                    id={selectedItem.id}
                                    type="lead"
                                    dealName={leadName}
                                    ownerId={ownerId}
                                    idOfOwner={idOfOwner}
                                    email={editedItem?.email}
                                />
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AcadmeyLead
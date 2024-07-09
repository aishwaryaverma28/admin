import React, { useState, useEffect, useRef } from "react";
import "./../styles/LPleads.css";
import axios from "axios";
import {
    ACADMEY_NOTE_SOURCE,
    GET_ACADEMY,
    handleLogout,
    getDecryptedToken,
    ACADMEY_LEADS_DETAILS,
    USER_LOG, GET_BMPUSER_ID,ACADEMY_TICKETS
} from "./../utils/Constants";
import AddNotes from "../deal/AddNotes";
import "react-toastify/dist/ReactToastify.css";
import AcadmeyLeadDetails from "./AcadmeyLeadDetails.jsx";
import AcademyDetails from "./AcademyDetails.jsx";
import UserLogs from "./UserLogs.jsx";
import Confirmation from "./Confirmation.jsx";
import LeadImage2 from "./LeadImage2.jsx";
import TicketModal from "../academytickets/TicketModal.jsx";

const AcadmeyLead = ({ selectedItem, closeModal }) => {
    const [check, setCheck] = useState(false);
    const childRef = useRef(null);
    const [editedItem, setEditedItem] = useState("");
    const [activeTab, setActiveTab] = useState("details");
    const [isDelete, setIsDelete] = useState(false);
    const [notes, setNotes] = useState(0);
    const [userId, setUserId] = useState(0);
    const [userLog, setUserLog] = useState(0);
    const [leads, setLeads] = useState(0);
    const decryptedToken = getDecryptedToken();
    const idOfOwner = parseInt(localStorage.getItem("id"));
    const [ownerId, setOwnerId] = useState(0);
 const [allTickets, setAllTickets] = useState([]);
    const fetchLead = () => {
        axios
            .post(GET_ACADEMY, { academy_id: selectedItem }, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                setOwnerId(response.data.data[0]?.owner);
                setEditedItem(response?.data?.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getUserId = () => {
        const body = {
            object_id: selectedItem, object_type: 2,
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
                object_type: 2,
                object_id: id?.id,
                page: 1,
            limit: 10,
            order: "id desc"
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
        getUserId();
        fetchLead();
        fetchNotes();
        fetchLeads();
    }, []);
useEffect(() => {
    getTickets();
},[userId])
    //==================================================================notes count
    const fetchNotes = () => {
        const body = {
            source_id: selectedItem, source_type: "academy"
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
    
    const fetchLeads = () => {
        const body = {
            object_id: selectedItem, object_type: "academy",
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
    const getTickets = () => {
        axios
            .post(ACADEMY_TICKETS, {
                sort: "id desc",
                page: 1,
                limit: 10,
                cond: `t.user_id = ${userId}`
            }, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                setAllTickets(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //===========================================================new code
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

    return (
        <div className="modal modal-zindex">
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
                            className={activeTab === "user" ? "active" : ""}
                            onClick={() => handleTabClick("user")}
                        >
                            <i class="fa-sharp fa-regular fa fa-file-text-o"></i>
                            User Logs ({userLog?.length ?? 0})
                        </button>
                        <button
                            className={activeTab === "leads" ? "active" : ""}
                            onClick={() => handleTabClick("leads")}
                        >
                            <i className="fa-sharp fa-regular fa-handshake-o"></i>
                            Leads ({leads?.length ?? 0})
                        </button>
                        <button
                            className={activeTab === "tickets" ? "active" : ""}
                            onClick={() => handleTabClick("tickets")}
                        >
                            <i className="fa-sharp fa-regular fa-note-sticky"></i>
                            Tickets ({allTickets?.length ?? 0})
                        </button>
                        <button
                            className={activeTab === "notes" ? "active" : ""}
                            onClick={() => handleTabClick("notes")}
                        >
                            <i className="fa-sharp fa-regular fa-note-sticky"></i>
                            Notes ({notes})
                        </button>
                    </div>
                    {/* ===================================================================tabination content */}

                    <div className="tab-content">
                        {activeTab === "details" && (
                            <div className="notes-tab-content">
                                <AcademyDetails id={selectedItem} updateCheckState={updateCheckState} ref={childRef} />
                            </div>
                        )}
                        {activeTab === "gallery" && (
                            <div className="activity-tab-content">
                                <LeadImage2 id={selectedItem} />
                            </div>
                        )}
                        {activeTab === "user" && (
                            <div className="activity-tab-content">
                                <UserLogs id={userId?.id} type={2} />
                            </div>
                        )}
                        {activeTab === "leads" && (
                            <div className="attachment-tab-content">
                                <AcadmeyLeadDetails
                                    leadsDetails={leads}
                                />
                            </div>
                        )}
                        {activeTab === "tickets" && (
                            <div className="notes-tab-content">
                                <TicketModal
                                    data={userId?.id}
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
}

export default AcadmeyLead
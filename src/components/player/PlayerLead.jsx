import React,{ useState,useEffect } from 'react'
import axios from "axios";
import {
    ACADEMY_LOGS,
    getDecryptedToken,
    ACADMEY_LEADS_DETAILS,
    handleLogout
} from "./../utils/Constants"
import PlayerDetails from "./PlayerDetails"
import AcademyLogs from '../lead/AcademyLogs';
import AcadmeyLeadDetails from '../lead/AcadmeyLeadDetails';
const PlayerLead = ({ selectedItem, closeModal }) => {
    console?.log(selectedItem);
    const decryptedToken = getDecryptedToken();
    const [logs, setLogs] = useState(0);
    const [leads, setLeads] = useState(0);
    const [activeTab, setActiveTab] = useState("details");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
    useEffect(() => {
        getLogs();
        fetchLeads();
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
                                <PlayerDetails id={selectedItem} />
                            </div>
                        )}
                        {/* {activeTab === "gallery" && (*
                            <div className="activity-tab-content">
                                <CoachImage id={selectedItem?.id} />
                            </div>
                        )}*/}
                        {activeTab === "logs" && (
                            <div className="activity-tab-content">
                                <AcademyLogs id={selectedItem} type={"Player"}/>
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

export default PlayerLead
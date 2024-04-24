import React, { useState, useEffect } from 'react'
import axios from "axios";
import {
    getDecryptedToken, USER_LOG
} from "./../utils/Constants";
import UserDetails from './UserDetails';
import BmpTickets from './BmpTickets';
import LeadImage from './LeadImage';
import CoachImage from './CoachImage';
import CoachDetails from './CoachDetails';
import AcademyDetails from './AcademyDetails';
import UserLogs from './UserLogs';
import AssignAcademy from '../acadmey/AssignAcademy';

const UserLead = ({ selectedItem, closeModal }) => {
    const decryptedToken = getDecryptedToken();
    const [activeTab, setActiveTab] = useState("details");
    const [userLog, setUserLog] = useState(0);
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const fetchUserLog = () => {
        axios
            .post(USER_LOG, {
                object_type: selectedItem?.type_id,
                object_id: selectedItem?.id
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
        fetchUserLog();
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
                            {selectedItem?.type} Details
                        </button>
                        <button
                            className={activeTab === "gallery" ? "active" : ""}
                            onClick={() => handleTabClick("gallery")}
                        >
                            <i class="fa-sharp fa-regular fa-images"></i>
                            Images
                        </button>
                        {selectedItem?.type === "Academy" ?
                            <button
                                className={activeTab === "assign" ? "active" : ""}
                                onClick={() => handleTabClick("assign")}
                            >
                                <i className="fa-sharp fa-regular fa-envelope-open"></i>
                                Assign
                            </button>
                            : <></>
                        }
                        <button
                            className={activeTab === "user" ? "active" : ""}
                            onClick={() => handleTabClick("user")}
                        >
                            <i class="fa-sharp fa-regular fa fa-file-text-o"></i>
                            User Logs ({userLog?.length})
                        </button>
                        <button
                            className={activeTab === "tickets" ? "active" : ""}
                            onClick={() => handleTabClick("tickets")}
                        >
                            <i class="fa-sharp fa-regular fa fa-file-text-o"></i>
                            Tickets
                        </button>
                    </div>
                    {/* ===================================================================tabination content */}
                    <div className="tab-content">
                        {activeTab === "details" && (
                            <div className="notes-tab-content">
                                {selectedItem?.type === "Coach" ? <CoachDetails id={selectedItem?.parent_id} /> : selectedItem?.type === "Academy" ? <AcademyDetails id={selectedItem?.parent_id} /> : null}
                            </div>
                        )}
                        {activeTab === "gallery" && (
                            <div className="activity-tab-content">
                                {selectedItem?.type === "Coach" ? <CoachImage id={selectedItem?.parent_id} /> : selectedItem?.type === "Academy" ? <LeadImage id={selectedItem?.parent_id} /> : null}

                            </div>
                        )}
                        {activeTab === "assign" && (
                            <div className="activity-tab-content">
                                {selectedItem?.type === "Academy" ? <AssignAcademy id={selectedItem?.id} tempAcademyId={selectedItem?.parent_id}/> : null}

                            </div>
                        )}
                        {activeTab === "user" && (
                            <div className="activity-tab-content">
                                <UserLogs id={selectedItem?.id} type={selectedItem?.type_id} />
                            </div>
                        )}

                        {activeTab === "tickets" && (
                            <div className="notes-tab-content">
                                <BmpTickets selectedItem={selectedItem} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLead
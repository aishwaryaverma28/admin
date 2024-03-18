import React, { useState, useEffect, useRef } from "react";
import "./../styles/LPleads.css";
import axios from "axios";
import {
    ACADMEY_NOTE_SOURCE,
    GET_ACADEMY,
    handleLogout,
    getDecryptedToken,
    UPLOADED_DOCS,
    ACADMEY_LEADS_DETAILS,
    ACADMEY_ACTIVITY_SOURCE,
    UPDATE_ACADEMY,
    POST_EMAIL,
} from "./../utils/Constants";
import userIcon from "../../assets/image/user-img.png";
import AddNotes from "../deal/AddNotes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateDeal from "../deal/CreateDeal";
import DealActivity from "../deal/DealActivity";
import DealEmail from "../deal/DealEmail.jsx";
import AcadmeyLeadDetails from "./AcadmeyLeadDetails.jsx";
import { default_about } from "../utils/bmp_about";
import { removeHtmlTags } from "../bookmyplayer/removeHtml.js";
import LeadImage from "./LeadImage.jsx";
import AcademyDetails from "./AcademyDetails.jsx";

const AcadmeyLead = ({ selectedItem, closeModal, onLeadAdded }) => {
    const [introduction, setIntroduction] = useState("");
    const [stages, setStages] = useState([
        {
            "id": 1,
            "stage": "new"
        },
        {
            "id": 2,
            "stage": "contact"
        },
        {
            "id": 3,
            "stage": "no contact"
        },
        {
            "id": 4,
            "stage": "profile complete"
        },
        {
            "id": 5,
            "stage": "profile not complete"
        },
        {
            "id": 6,
            "stage": "lead Shared"
        }
    ]
    );

    const [isLoading, setIsLoading] = useState(true);
    const [isEditable, setIsEditable] = useState(false);
    const [editedItem, setEditedItem] = useState("");
    const [activeTab, setActiveTab] = useState("details");
    const [notes, setNotes] = useState(0);
    const [activityCount, setActivityCount] = useState(0);
    const [leads, setLeads] = useState(0);
    const [stateBtn, setStateBtn] = useState(0);
    const decryptedToken = getDecryptedToken();
    const [isDisabled, setIsDisabled] = useState(true);
    const [isHoverDisabled, setIsHoverDisabled] = useState(false);
    const [userData, setUserData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allEmails, setAllEmails] = useState([]);
    const [leadName, setLeadName] = useState("");
    const idOfOwner = parseInt(localStorage.getItem("id"));
    const [ownerId, setOwnerId] = useState(0);
    const [ownerName, setOwnerName] = useState("");
    const [adminInfo, setAdminInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        id: 0,
    });
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
                const sport = response?.data?.data[0]?.sport;
                const academyName = response?.data?.data[0]?.name;
                const cityName = response?.data?.data[0]?.city;
                const academyObject = default_about?.find(obj => obj.sport === sport);
                const updatedAbout = academyObject?.about?.replace(/ACADEMY_NAME/g, academyName);
                const finalAbout = updatedAbout?.replace(/CITY_NAME/g, cityName);
                const intro = removeHtmlTags(finalAbout);
                setIntroduction(intro);
                if (sport === null || sport === "")
                    setIntroduction("-")
                setLeadName(response?.data?.data[0]?.name);
                setOwnerId(response.data.data[0]?.owner);
                setEditedItem(response?.data?.data[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
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
    }, []);

    //==================================================================notes count
    const fetchNotes = () => {
        const body = {
            source_id: selectedItem.id, source_type: "academy"
        }
        axios
            .post(ACADMEY_NOTE_SOURCE, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
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
            object_id: selectedItem.id, object_type: "academy",
        }
        axios
            .post(ACADMEY_LEADS_DETAILS, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({
            ...editedItem,
            [name]: value,
        });
        setStateBtn(1);
    };

    const toggleEditable = (e) => {
        e.preventDefault();
        setIsEditable(!isEditable);
        setIsDisabled(!isDisabled);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleUpdateClick = () => {
        const updatedFormData = {
            stage: editedItem?.stage,
            name: editedItem?.name,
            phone: editedItem?.phone,
            about: editedItem?.about,
            sport: editedItem?.sport,
            experience: editedItem?.experience,
            facebook: editedItem?.facebook,
            instagram: editedItem?.instagram,
            website: editedItem?.website,
            email: editedItem?.email,
            timing: editedItem?.timing,
            spoken_languages: editedItem?.spoken_languages,
            address1: editedItem?.address1,
            address2: editedItem?.address2,
            city: editedItem?.city,
            state: editedItem?.state,
        }
        axios
            .put(UPDATE_ACADEMY + selectedItem.id, updatedFormData
                , {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.status === 1) {
                    toast.success("Details updated successfully", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                } else {
                    toast.error("Some Error Occurred", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }
                setIsEditable(false);
                setIsDisabled(!isDisabled);
                setStateBtn(0);
                fetchLead();
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while updating details", {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
            .finally(() => {
                setStateBtn(0);
            });
    }

    const handleViewSite = (url) => {
        const siteUrl = url;
        if (siteUrl) {
            window.open(siteUrl, "_blank");
        } else {
            alert("Site URL is not available");
        }
    };


    //======================================================================css variable
    const normalStyling = {
        textAlign: "left",
        fontFamily: "Lexend Deca",
        fontSize: "1.125rem",
        fontWeight: 500,
        color: "#1e2224",
        lineHeight: "17px",
        border: "1px solid transparent",
        width: "12rem",
    };

    const editStyling = {
        border: "1px solid #dcdcdc",
        textAlign: "left",
        fontFamily: "Lexend Deca",
        fontSize: "1.125rem",
        fontWeight: 500,
        color: "#1e2224",
        lineHeight: "17px",
        width: "12rem",

        ":hover": {
            backgroundColor: isHoverDisabled ? "rgb(227, 225, 225)" : "",
            transition: isHoverDisabled ? "all .5s ease-in-out" : "",
            cursor: isHoverDisabled ? "pointer" : "",
        },
    };

    const normalStylingInput = {
        color: "#1e2224",
        fontWeight: 400,
        border: "1px solid #dcdcdc",
        outline: "rgb(59, 59, 59)",
        backgroundColor: "#ffffff",
        fontSize: "0.8rem",
        fontFamily: "Lexend Deca",
        borderRadius: "0.3125rem",
        padding: "0.3rem",
        border: "1px solid transparent",
        height: "2rem",
    };

    const editStylingInput = {
        color: "#1e2224",
        fontWeight: 400,
        border: "1px solid #dcdcdc",
        outline: "rgb(59, 59, 59)",
        backgroundColor: "#ffffff",
        fontSize: "0.8rem",
        fontFamily: "Lexend Deca",
        borderRadius: "0.3125rem",
        padding: "0.3rem",
        border: "1px solid #dcdcdc",
        height: "2rem",

        ":hover": {
            backgroundColor: isHoverDisabled ? "rgb(227, 225, 225)" : "",
            transition: isHoverDisabled ? "all .5s ease-in-out" : "",
            cursor: isHoverDisabled ? "pointer" : "",
        },
        ":focus": {
            border: "1px solid #E2E9F2",
            boxShadow: "none",
        },
    };
    const editStylingTextarea = {
        color: "#1e2224",
        fontWeight: 400,
        border: "1px solid #dcdcdc",
        outline: "rgb(59, 59, 59)",
        backgroundColor: "#ffffff",
        fontSize: "0.8rem",
        fontFamily: "Lexend Deca",
        borderRadius: "0.3125rem",
        padding: "0.3rem",
        border: "1px solid #dcdcdc",
        height: "5rem",

        ":hover": {
            backgroundColor: isHoverDisabled ? "rgb(227, 225, 225)" : "",
            transition: isHoverDisabled ? "all .5s ease-in-out" : "",
            cursor: isHoverDisabled ? "pointer" : "",
        },
        ":focus": {
            border: "1px solid #E2E9F2",
            boxShadow: "none",
        },
    };

    const normalStylingTextarea = {
        color: "#1e2224",
        fontWeight: 400,
        border: "1px solid #dcdcdc",
        outline: "rgb(59, 59, 59)",
        backgroundColor: "#ffffff",
        fontSize: "0.8rem",
        fontFamily: "Lexend Deca",
        borderRadius: "0.3125rem",
        padding: "0.3rem",
        border: "1px solid transparent",
        height: "5rem",
    };
    useEffect(() => {
        setOwnerName(userData?.find((item) => item.id === ownerId));
    }, []);
    return (
        <div className="modal">
            <div className="customization_popup_container">
                <span className="close" onClick={closeModal}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </span>
               {/* left side of modal ends here */}
                <div className="user-details--right">
                    <div className="tab-navigation">
                    <button
                            className={activeTab === "details" ? "active" : ""}
                            onClick={() => handleTabClick("details")}
                        >
                            <i class="fa-sharp fa-regular fa-images"></i>
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
                            className={activeTab === "leads" ? "active" : ""}
                            onClick={() => handleTabClick("leads")}
                        >
                            <i className="fa-sharp fa-regular fa-note-sticky"></i>
                            Leads ({leads?.length})
                        </button>
                        <button
                            className={activeTab === "email" ? "active" : ""}
                            onClick={() => handleTabClick("email")}
                        >
                            <i className="fa-sharp fa-regular fa-envelope-open"></i>
                            Email ({allEmails.length})
                        </button>
                        <button
                            className={activeTab === "whatsapp" ? "active" : ""}
                            onClick={() => handleTabClick("whatsapp")}
                        >
                            <i class="fa-sharp fa-regular fab fa-whatsapp"></i>
                            Whatsapp
                        </button>
                    </div>
                    <div className="tab-content">
                    {activeTab === "details" && (
                            <div className="notes-tab-content">
                                <AcademyDetails selectedItem={selectedItem}/>
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
                        {activeTab === "gallery" && (
                            <div className="activity-tab-content">
                                <LeadImage item={selectedItem} />
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
                        {activeTab === "leads" && (
                            <div className="attachment-tab-content">
                                <AcadmeyLeadDetails
                                    dealId={selectedItem}
                                    leadsDetails={leads}
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
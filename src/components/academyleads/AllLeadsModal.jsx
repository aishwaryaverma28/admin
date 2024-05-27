// do we have to remove checkboxes if academies are unverified?
import React, { useState, useEffect } from 'react'
import {
    cdnurl,
    DISTANCE_API,
    ACADMEY_LEADS_DETAILS,
    ASSIGN_LEADS_USER,
    GET_ACADEMY,
    getDecryptedToken,
    handleLogout
} from "./../utils/Constants";
import axios from 'axios';
import tick from "../../assets/image/star_tick.svg"
import cross from "../../assets/image/unverified.svg"
import { toast } from 'react-toastify';
import AcadmeyLeadDetails from '../lead/AcadmeyLeadDetails';
const AllLeadsModal = ({ closeModal, object, sport, getAllLeads }) => {
    const decryptedToken = getDecryptedToken();
    const [activeTab, setActiveTab] = useState("details");
    const [editedItem, setEditedItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [distAcad, setDistAcad] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    // const [selectedData, setSelectedData] = useState(0);
    const [selectedDistance, setSelectedDistance] = useState(100);
    const [leads, setLeads] = useState([]);
    const [allData, setAllData] = useState([]);
    const fetchLead = (distance) => {
        let body = {
            lat: parseInt(object?.academy_lat),
            lng: parseInt(object?.academy_lng),
            count: parseInt(object?.cnt),
            sport: sport,
            distance: distance,
        };

        axios
            .post(DISTANCE_API, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                // const filteredObjects = response?.data?.data.filter(obj => 
                //     (obj.email !== null || obj.verification_status === "Verified") && 
                //     obj.id !== object?.academy_id
                // );
                // setDistAcad(filteredObjects);
                setDistAcad(response?.data?.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const academyDist = () => {
        let body = {
            academy_id: object?.academy_id
        };
        axios
            .post(GET_ACADEMY, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                setEditedItem(response?.data?.data[0]);
                fetchLeads();
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const fetchLeads = () => {
        const body = {
            object_id: object?.academy_id,
            object_type: "academy",
        };

        axios
            .post(ACADMEY_LEADS_DETAILS, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response?.data?.status === 1) {
                    setAllData(response?.data?.data);
                    const ids = response?.data?.data.map(item => item.id);
                    setLeads(ids);
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
        fetchLead(selectedDistance);
        academyDist();
    }, [selectedDistance]);

    const handleDistanceChange = (event) => {
        setSelectedDistance(parseInt(event.target.value));
    };

    const handleCheckboxChange = (event, id, email) => {
        const isChecked = event.target.checked;

        setSelectedIds(prevIds => {
            if (isChecked) {
                return [...prevIds, id];
            } else {
                return prevIds.filter(selectedId => selectedId !== id);
            }
        });
    };

    const handleSubmit = () => {
        const today = new Date();
        const lastThirtyDaysStartDate = new Date(today);
        lastThirtyDaysStartDate.setDate(lastThirtyDaysStartDate.getDate() - 6);
        const startDate = lastThirtyDaysStartDate.toISOString().split("T")[0];
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 1);
        const formattedEndDate = endDate.toISOString().split("T")[0];
        const body = {
            leadIds: leads,
            object_ids: selectedIds,
            type: "academy",
        };
        axios.post(ASSIGN_LEADS_USER, body, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            }
        })
            .then((response) => {
                if (response?.data?.status === true) {
                    toast.success("Leads assigned successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    getAllLeads(startDate, formattedEndDate);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                });
            })
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className="modal">
            <div className="leftClose" onClick={closeModal}></div>
            <div className="customization_popup_container">
                <span className="close" onClick={closeModal}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </span>
                <div className="user-details--right">
                    <div className="tab-navigation">
                        <button
                            className={activeTab === "details" ? "active" : ""}
                            onClick={() => handleTabClick("details")}
                        >
                            <i class="fa-sharp fa-regular fa fa-newspaper-o"></i>
                            Lead Assign
                        </button>

                        <button
                            className={activeTab === "leads" ? "active" : ""}
                            onClick={() => handleTabClick("leads")}
                        >
                            <i class="fa-sharp fa-regular fa-images"></i>
                            Leads
                        </button>
                    </div>
                    <div className="tab-content">
                        {activeTab === "details" && (
                            <div className="notes-tab-content">

                                <div className="tab_content_new margin-left">
                                    <>
                                        <div className="academy-card">
                                            <div className="card-container">
                                                <div className="card-leftBox">
                                                    <div className="user-details">
                                                        <p className="heading">
                                                            {editedItem?.id} - {editedItem?.name}
                                                        </p>
                                                    </div>
                                                    <div className="contact-details">
                                                        <div className="mail sportCap">
                                                            <p>{editedItem?.sport}</p>
                                                        </div>
                                                        <div className="mail">
                                                            <p>{editedItem?.phone}</p>
                                                        </div>
                                                        <div className="mail sportCap">
                                                            <p>{editedItem?.city}, {editedItem?.state}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="contact-details">
                                                    <div className="sportCap">
                                                        <p>Leads:{leads?.length}</p>
                                                    </div>
                                                </div>
                                                <div className="DealCard-rightBox">
                                                    <div className="mail">
                                                        <div className="new_preview_flex">
                                                            <a href={editedItem?.logo === null
                                                                ? `${cdnurl}default/academy_default_logo.webp`
                                                                : `${cdnurl}academy/${editedItem?.id}/${editedItem?.logo}`} target="_blank" rel="noopener noreferrer">
                                                                <img
                                                                    src={editedItem?.logo === null
                                                                        ? `${cdnurl}default/academy_default_logo.webp`
                                                                        : `${cdnurl}academy/${editedItem?.id}/${editedItem?.logo}`}
                                                                    alt="pofile"
                                                                    className="bmp-preview-image"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="mail">
                                                        <label className="radio-inline2">
                                                            <input
                                                                type="checkbox"
                                                                className="radio_disable check_input_2"
                                                                onChange={(event) => handleCheckboxChange(event, editedItem.id, editedItem.email)}
                                                                checked={selectedIds.includes(editedItem.id)}
                                                            />
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </>
                                    {isLoading ? (
                                        <div className='support-no-ticket-found'>
                                            <p className='common-fonts'>Loading...</p>
                                        </div>
                                    ) : (<>
                                        {distAcad && distAcad?.map((item) => (

                                            <div className="academy-card">
                                                <div className="card-container">
                                                    <div className="card-leftBox">
                                                        <div className="user-details">
                                                            <p className="heading">
                                                                {item?.id} - {item?.name}
                                                            </p>
                                                        </div>
                                                        <div className="contact-details">
                                                            <div className="mail sportCap">
                                                                <p>{item?.sport}</p>
                                                            </div>
                                                            <div className="mail">
                                                                <p>{item?.phone}</p>
                                                            </div>
                                                            <div className="mail">
                                                                <p>{item?.email}</p>
                                                            </div>
                                                            <div className="mail sportCap">
                                                            <p>{item?.city}, {item?.state}</p>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="DealCard-rightBox">
                                                        <div className="mail">
                                                            {item.verification_status === "Unverified" ?
                                                                <img src={cross} alt="unverified" className='img_size' /> : <img src={tick} alt="verified" className='img_size_1' />
                                                            }
                                                        </div>
                                                        <div className="mail">
                                                            {item.verification_status === "Unverified" ?
                                                                <></> : <label className="radio-inline2">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="radio_disable check_input_2"
                                                                        onChange={(event) => handleCheckboxChange(event, item.id, item.email)}
                                                                        checked={selectedIds.includes(item.id)}
                                                                    />
                                                                </label>
                                                            }
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </>)}
                                </div>
                                <div className="modalLeftBtnBox2">
                                    <div className='new_btnflex'>
                                        <select id="distance_lead" value={selectedDistance} onChange={handleDistanceChange}>
                                            <option value="">Distance</option>
                                            <option value="100">100 Km</option>
                                            <option value="300">300 km</option>
                                            <option value="500">500 Km</option>
                                            <option value="1000">1000 Km</option>
                                            <option value="2000">2000 Km</option></select>
                                    </div>
                                    <button
                                        className="convertToDeal"
                                        onClick={handleSubmit}
                                    >Assign
                                    </button>
                                </div>
                            </div>
                        )}
                        {activeTab === "leads" && (
                            <div className="activity-tab-content">
                                <AcadmeyLeadDetails
                                    leadsDetails={allData}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllLeadsModal
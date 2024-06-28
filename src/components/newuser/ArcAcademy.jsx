import React, { useState, useEffect, useRef } from 'react'
import { getDecryptedToken, GET_ACADEMY, UPDATE_ACADEMY } from "./../utils/Constants";
import axios from 'axios';
import NewAcademyDetails from "./NewAcademyDetails";
import LeadImage from "./LeadImage";
import Confirmation from "../lead/Confirmation.jsx";
import { toast } from "react-toastify";
export const ArcAcademy = ({ selectedItem, closeModal, onLeadAdded, page, limit }) => {
    const [editedItem, setEditedItem] = useState({});
    const [check, setCheck] = useState(false);
    const childRef = useRef(null);
    const [isDelete, setIsDelete] = useState(false);
    const decryptedToken = getDecryptedToken();
    const [activeTab, setActiveTab] = useState("details");
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
    useEffect(() => {
        fetchLead();
      }, []);
      const fetchLead = () => {
        let body = {
            academy_id: selectedItem,
            type: "temp"
        };
    
        axios
            .post(GET_ACADEMY, body, {
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
          type: "temp",
          is_deleted: 1,
          name: editedItem?.name?.trim(),
          sport_id: editedItem?.sport_id ?? 14,
          loc_id: editedItem?.loc_id ?? 1,
        }
        axios
        .put(UPDATE_ACADEMY + selectedItem, updatedFormData
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
            onLeadAdded(page,limit);
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
                                Academy Details
                            </button>
                            <button
                                className={activeTab === "images" ? "active" : ""}
                                onClick={() => handleTabClick("images")}
                            >
                                <i class="fa-sharp fa-regular fa-images"></i>
                                Images
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
                                <NewAcademyDetails
                                    id={selectedItem}
                                    updateCheckState={updateCheckState}
                                    ref={childRef}
                                />
                            </div>
                        )}
                        {activeTab === "images" && (
                            <div className="activity-tab-content">
                                <LeadImage id={selectedItem} />
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

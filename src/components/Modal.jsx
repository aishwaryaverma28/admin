import React, { useState } from "react";
import "./styles/LPleads.css";
import axios from "axios";
import {
  UPDATE_LEAD,
  handleApiError,
  getDecryptedToken,
} from "./utils/Constants";
import userIcon from "../assets/image/user-img.png";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

const Modal = ({ selectedItem, closeModal }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editedItem, setEditedItem] = useState(selectedItem);
  const [updateMessage, setUpdateMessage] = useState("");
  const [activeTab, setActiveTab] = useState("notes"); // Initial active tab
  const navigate = useNavigate();
  const decryptedToken = getDecryptedToken();
  const getStatusBackgroundColor = () => {
    switch (editedItem.status) {
      case "New":
        return "#5181FF";
      case "Open":
        return "#B543EB";
      case "In progress":
        return "#63C257";
      case "Open deal":
        return "#FD9802";
      case "Unread":
        return "#797979";
      default:
        return ""; // Default background color
    }
  };

  const handleInputChange = (e) => {
    setEditedItem({
      ...editedItem,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEditable = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
  };
  // const handleUpdateClick = (event) => {
  //   event.preventDefault();
  //   axios
  //     .put(UPDATE_LEAD + editedItem.id, editedItem, {
  //       headers: {
  //         Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       setUpdateMessage("Lead data updated successfully");
  //       setTimeout(() => {
  //         setUpdateMessage("");
  //       }, 30000); // Clear message after 1 minute (60000 milliseconds)
  //     })
  //     .catch((error) => {
  //       handleApiError(error, navigate);
  //     });

  //   console.log("Update clicked");
  //   console.log(editedItem);
  //   setIsEditable(false);
  // };
  const handleUpdateClick = (event) => {
    event.preventDefault();
  
    const updatedLead = {
      // Update only the desired properties
      lead_name: editedItem.lead_name,
      first_name: editedItem.first_name,
      position: editedItem.position,
      phone: editedItem.phone,
      source: editedItem.source,
      company_name: editedItem.company_name,
      value: editedItem.value,
      email: editedItem.email,
      priority: editedItem.priority,
      status: editedItem.status,
      address1: editedItem.address1,
      city: editedItem.city,
      state: editedItem.state,
      country: editedItem.country,
      pin: editedItem.pin,
    };
  
    axios
      .put(UPDATE_LEAD + editedItem.id, updatedLead, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response);
        setUpdateMessage("Lead data updated successfully");
        setTimeout(() => {
          setUpdateMessage("");
        }, 30000); // Clear message after 1 minute (60000 milliseconds)
      })
      .catch((error) => {
        handleApiError(error, navigate);
      });
  
    setIsEditable(false);
  };
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="modal">
      <div className="customization_popup_container">
        <span className="close" onClick={closeModal}>
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </span>
        <div className="user-details--left">
          <div className="user-details--heading">
            <div className="user-details-imgBox">
              <img src={userIcon} alt="user" />
              <p>
                {isEditable ? (
                  <>
                    <input
                      type="text"
                      name="lead_name"
                      value={editedItem.lead_name}
                      onChange={handleInputChange}
                    />
                    <br />
                  </>
                ) : (
                  <>
                    {editedItem.lead_name}
                    <br />
                  </>
                )}
                <span>
                  Last Updated:{" "}
                  {editedItem && editedItem.update_date
                    ? editedItem.update_date.split("T")[0]
                    : ""}
                </span>
              </p>
            </div>
            <a href="#" className="edit-details" onClick={toggleEditable}>
              <i className="fa-solid fa-pen"></i>
            </a>
          </div>
          <div className="leadDetailsLeft">
            {updateMessage && <p className="updateMsg">{updateMessage}</p>}
            <div className="detailsBox">
              <p className="detailHead">LEAD INFORMATION</p>
              <div className="detailsContent">
                <div
                  className={
                    isEditable
                      ? "detailsLeftContainer2"
                      : "detailsLeftContainer"
                  }
                >
                  <p>First Name</p>
                  <p>Title</p>
                  <p>Phone</p>
                  <p>Lead Source</p>
                  <p>Company</p>
                  <p>Annual Revenue</p>
                  <p>Email</p>
                  <p>Industry</p>
                  <p>Lables</p>
                  <p>Status</p>
                </div>
                <div className="detailsRightContainer">
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="first_name"
                        value={editedItem.first_name}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.first_name ? (
                      <span>{editedItem.first_name}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="position"
                        value={editedItem.position}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.position ? (
                      <span>{editedItem.position}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="phone"
                        value={editedItem.phone}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.phone ? (
                      <span>{editedItem.phone}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="source"
                        value={editedItem.source}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.source ? (
                      <span>{editedItem.source}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="company_name"
                        value={editedItem.company_name}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.company_name ? (
                      <span>{editedItem.company_name}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="value"
                        value={editedItem.value}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.value ? (
                      <span>{editedItem.value}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="email"
                        name="email"
                        value={editedItem.email}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.email ? (
                      <span>{editedItem.email}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="email"
                        value={editedItem.email}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.email ? (
                      <span>{editedItem.email}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  {/* <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="priority"
                        value={editedItem.priority}
                        onChange={handleInputChange}
                        className={
                          editedItem.priority === "Imp"
                            ? "imptnt"
                            : editedItem.priority === "Avg"
                            ? "avg"
                            : ""
                        }
                      />
                    ) : editedItem.priority ? (
                      <span
                        className={
                          editedItem.priority === "Imp"
                            ? "imptnt"
                            : editedItem.priority === "Avg"
                            ? "avg"
                            : ""
                        }
                      >
                        {editedItem.priority}
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </p> */}
                  <p>
                    {editedItem.priority ? (
                      <span>{editedItem.priority}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>

                  {/* <p
                    className="detailsStatus"
                    style={{ backgroundColor: getStatusBackgroundColor() }}
                  >
                    {isEditable ? (
                      <input
                        type="text"
                        name="status"
                        value={editedItem.status}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.status ? (
                      <span>{editedItem.status}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p> */}
                  <p
                    className="detailsStatus"
                    style={{ backgroundColor: getStatusBackgroundColor() }}
                  >
                    {editedItem.status ? (
                      <span>{editedItem.status}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="detailsBox">
              <p className="detailHead">LEAD OWNER</p>
              <div className="detailsContent">
                <div
                  className={
                    isEditable
                      ? "detailsLeftContainer2"
                      : "detailsLeftContainer"
                  }
                >
                  <p>Lead Owner</p>
                  <p>Email</p>
                  <p>Contact</p>
                </div>
                <div className="detailsRightContainer">
                  <p>-</p>
                  <p>-</p>
                  <p>-</p>
                </div>
              </div>
            </div>
            <div className="detailsBox">
              <p className="detailHead">ADDRESS INFORMATION</p>
              <div className="detailsContent">
                <div
                  className={
                    isEditable
                      ? "detailsLeftContainer2"
                      : "detailsLeftContainer"
                  }
                >
                  <p>Street</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Country</p>
                  <p>Zip Code</p>
                </div>
                <div className="detailsRightContainer">
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="address1"
                        value={editedItem.address1}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.address1 ? (
                      <span>{editedItem.address1}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="city"
                        value={editedItem.city}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.city ? (
                      <span>{editedItem.city}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="state"
                        value={editedItem.state}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.state ? (
                      <span>{editedItem.state}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="country"
                        value={editedItem.country}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.country ? (
                      <span>{editedItem.country}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="pin"
                        value={editedItem.pin}
                        onChange={handleInputChange}
                      />
                    ) : editedItem.pin ? (
                      <span>{editedItem.pin}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modalLeftBtnBox">
            {isEditable ? (
              <button onClick={handleUpdateClick} className="convertToDeal">
                Update Lead
              </button>
            ) : (
              <span></span>
            )}
            <button className="convertToDeal">Convert to deal</button>
          </div>
        </div>
        {/* left side of modal ends here */}
        <div className="user-details--right">
          <div className="tab-navigation">
            <button
              className={activeTab === "notes" ? "active" : ""}
              onClick={() => handleTabClick("notes")}
            >
              <i className="fa-sharp fa-regular fa-note-sticky"></i>
              Notes
            </button>
            <button
              className={activeTab === "email" ? "active" : ""}
              onClick={() => handleTabClick("email")}
            >
              <i className="fa-sharp fa-regular fa-envelope-open"></i>
              Email
            </button>
            <button
              className={activeTab === "activity" ? "active" : ""}
              onClick={() => handleTabClick("activity")}
            >
              <i className="fa-sharp fa-regular fa-calendar"></i>
              Activity
            </button>
            <button
              className={activeTab === "attachment" ? "active" : ""}
              onClick={() => handleTabClick("attachment")}
            >
              <i className="fa-sharp fa-solid fa-paperclip"></i>
              Attachment
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "notes" && (
              <div className="notes-tab-content">
                <AddNotes item={selectedItem} />
              </div>
            )}
            {activeTab === "email" && (
              <div className="email-tab-content">
                <p>Email</p>
              </div>
            )}
            {activeTab === "activity" && (
              <div className="activity-tab-content">
                <p>Activity</p>
              </div>
            )}
            {activeTab === "attachment" && (
              <div className="attachment-tab-content">
                <p>Attachment</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* modal container ends here */}
    </div>
  );
};

export default Modal;

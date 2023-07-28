import React, { useState, useEffect } from "react";
import "./styles/LPleads.css";
import axios from "axios";
import {
  UPDATE_LEAD,
  GETNOTEBYSOURCE,
  GET_LEAD_ID,
  handleLogout,
  getDecryptedToken,
} from "./utils/Constants";
import userIcon from "../assets/image/user-img.png";
import AddNotes from "./AddNotes";
import LeadDocUp from "./LeadDocUp";

const Modal = ({ selectedItem, closeModal, onLeadAdded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [editedItem, setEditedItem] = useState();
  const [updateMessage, setUpdateMessage] = useState("");
  const [activeTab, setActiveTab] = useState("notes"); // Initial active tab
  const [notes, setNotes] = useState();
  const [stateBtn, setStateBtn] = useState(0);
    const decryptedToken = getDecryptedToken();
    const [name,setName] = useState("");
    const [ owner,setOwner] = useState("");
  const fetchLead = () => {
    axios
      .get(GET_LEAD_ID + selectedItem.id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
        }
      })
      .then((response) => {
        console.log(response.data.data[0]);
        setEditedItem(response.data.data[0]);
        setName(response.data.data[0].first_name+" "+response.data.data[0].last_name);
        setOwner(response.data.data[0].ownerf_name+" "+response.data.data[0].ownerl_name)
        setIsLoading(false);
      })
      .catch((error) => {
       console.log(error);
       setIsLoading(false);
      });
  };
  
  useEffect(() => {
    fetchLead();
  }, []);
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
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get(GETNOTEBYSOURCE + selectedItem.id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if (response.data.status === 1) {
          setNotes(response.data.data.length);
        } else {
          if (response.data.message === "Token has expired") {
            alert(response.data.message);
            handleLogout();
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    setEditedItem({
      ...editedItem,
      [e.target.name]: e.target.value,
    });
    setStateBtn(1);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    setStateBtn(1);
  };
  const handleOwnerChange = (e) => {
    setOwner(e.target.value);
    setStateBtn(1);
  };
  const toggleEditable = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
  };

  const handleUpdateClick = (event) => {
    event.preventDefault();

    const updatedLead = {
      // Update only the desired properties
      lead_name: editedItem.lead_name,
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1],
      position: editedItem.position,
      phone: editedItem.phone,
      source: editedItem.source,
      company_name: editedItem.company_name,
      value: editedItem.value,
      email: editedItem.email,
      type: editedItem.type,
      priority: editedItem.priority,
      status: editedItem.status,
      address1: editedItem.address1,
      city: editedItem.city,
      state: editedItem.state,
      country: editedItem.country,
      pin: editedItem.pin,
      // ownerf_name: owner.split(" ")[0],
      // ownerl_name: owner.split(" ")[1],
      // owner_email:editedItem.email,
      // owner_phone:editedItem.phone,
    };

    axios
      .put(UPDATE_LEAD + selectedItem.id, updatedLead, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        setUpdateMessage("Lead data updated successfully");
        setTimeout(() => {
          setUpdateMessage("");
        }, 30000); // Clear message after 1 minute (60000 milliseconds)
      })
      .catch((error) => {
        console.log(error);
      });

    setIsEditable(false);
    onLeadAdded();
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
                  {isLoading?(<span>-</span>):(<>{editedItem.lead_name}
                    <br /></>)
                    }                   
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
                  <p>Name</p>
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

                         value={name}
                        onChange={handleNameChange}
                      />
                    ) : isLoading ? (
                      <span>-</span>
                     ) : (
                      <span>{name}</span>
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
                    ) : isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>{editedItem.position}</span>
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
                    ) : isLoading ? (
                      <span>-</span>        
                    ) : (
                      <span>{editedItem.phone}</span>
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
                    ) : isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>{editedItem.source}</span>
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
                    ) : isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>{editedItem.company_name}</span>
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
                    ) : isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>{editedItem.value}</span>
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
                    ) : isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>{editedItem.email}</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="type"
                        value={editedItem.type}
                        onChange={handleInputChange}
                      />
                    ) : isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>{editedItem.type}</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <select
                        name="priority"
                        id="priority"
                        value={editedItem.priority}
                        onChange={handleInputChange}
                      >
                        <option value="Imp">Imp</option>
                        <option value="Avg">Avg</option>
                        <option value="Cool">Cool</option>
                      </select>
                    ) : isLoading ? (
                      <span>-</span>
                    ) : (
                      <span
                      className={
                        editedItem.priority}
                    >
                      {editedItem.priority}
                    </span>
                      
                    )}
                  </p>
                  {isEditable ? (
                    <select
                      name="status"
                      id="status"
                      value={editedItem.status}
                      onChange={handleInputChange}
                    >
                      <option value="New">New</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Unread">Unread</option>
                    </select>
                  ) : isLoading ? (
                    <span>-</span>
                  ) : (
                    <p
                      className="detailsStatus"
                      style={{ backgroundColor: getStatusBackgroundColor() }}
                    >
                      <span>{editedItem.status}</span>
                    </p>
                  )}
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
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        value={owner}
                        onChange={handleOwnerChange}
                      />
                    ) : isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>{owner}</span>                      
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="email"
                        name="owner_email"
                        value={editedItem.owner_email
                        }
                        onChange={handleInputChange}
                      />
                      ) : isLoading ? (
                        <span>-</span>
                      ) : (
                      <span>{editedItem.owner_email
                      }</span>
                    )}
                  </p>
                  <p>
                    {isEditable ? (
                      <input
                        type="text"
                        name="owner_phone"
                        value={editedItem.owner_phone}
                        onChange={handleInputChange}
                      />
                      ) : isLoading ? (
                        <span>-</span>
                      ) : (
                      <span>{editedItem.owner_phone}</span>
                    )}
                  </p>
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
                      ) : isLoading ? (
                        <span>-</span>
                      ) : (
                      <span>{editedItem.address1}</span>
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
                      ) : isLoading ? (
                        <span>-</span>
                      ) : (
                      <span>{editedItem.city}</span>
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
                      ) : isLoading ? (
                        <span>-</span>
                      ) : (
                      <span>{editedItem.state}</span>
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
                      ) : isLoading ? (
                        <span>-</span>
                      ) : (
                      <span>{editedItem.country}</span>
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
                      ) : isLoading ? (
                        <span>-</span>
                      ) : (
                      <span>{editedItem.pin}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isEditable ? (
            <div className="modalLeftBtnBox">
              <button className="convertToDeal">Convert to deal</button>
              {stateBtn === 0 ? (
                <button disabled className="disabledBtn">
                  Update Lead
                </button>
              ) : (
                <button onClick={handleUpdateClick} className="convertToDeal">
                  Update Lead
                </button>
              )}
            </div>
          ) : (
            <div className="modalLeftBtnBox">
              <span></span>
              <button className="convertToDeal">Convert to deal</button>
            </div>
          )}
        </div>
        
        {/* left side of modal ends here */}
        <div className="user-details--right">
          <div className="tab-navigation">
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
                <AddNotes item={selectedItem} onNotesNum={fetchNotes} />
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
                <LeadDocUp item={selectedItem} />
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

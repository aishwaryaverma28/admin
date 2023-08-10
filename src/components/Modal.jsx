import React, { useState, useEffect } from "react";
import "./styles/LPleads.css";
import axios from "axios";
import {
  UPDATE_LEAD,
  GETNOTEBYSOURCE,
  GET_LEAD_ID,
  GET_TEAM_MEM,
  handleLogout,
  getDecryptedToken,
} from "./utils/Constants";
import userIcon from "../assets/image/user-img.png";
import AddNotes from "./AddNotes";
import LeadDocUp from "./LeadDocUp";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ selectedItem, closeModal, onLeadAdded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [editedItem, setEditedItem] = useState("");
  const [activeTab, setActiveTab] = useState("notes"); // Initial active tab
  const [notes, setNotes] = useState();
  const [stateBtn, setStateBtn] = useState(0);
  const decryptedToken = getDecryptedToken();
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchLead = () => {
    axios
      .get(GET_LEAD_ID + selectedItem?.id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        setEditedItem(response.data.data[0]);
        setName(
          response.data.data[0].first_name +
          " " +
          response.data.data[0].last_name
        );
        setOwner(
          response.data.data[0].ownerf_name +
          " " +
          response.data.data[0].ownerl_name
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Set the initial state to the first user in the userData array
    if (userData.length > 0) {
      setSelectedUser({
        email: userData[0].email,
        phone: userData[0].phone,
      });
    }
  }, [userData]);

  useEffect(() => {
    fetchLead();
    userAdded();
  }, []);

  const userAdded = () => {
    axios
      .get(GET_TEAM_MEM, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getStatusBackgroundColor2 = () => {
    switch (editedItem?.priority) {
      case "Imp":
        return "#ff4040";
      case "Avg":
        return "#ffb42e";
      case "Cool":
        return "#2e75ff";

      default:
        return "";
    }
  };

  const getStatusBackgroundColor = () => {
    switch (editedItem?.status) {
      case "New":
        return "#5181FF";
      case "Open":
        return "#B543EB";
      case "In Progress":
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
      .get(GETNOTEBYSOURCE + selectedItem?.id, {
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

    const selectedName = e.target.value;

    // Find the selected user data from the userData array
    const selectedUserData = userData.find(
      (user) => user.first_name + " " + user.last_name === selectedName
    );
    setSelectedUser(selectedUserData);
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
    setIsDisabled(!isDisabled);
  };

  const handleUpdateClick = (event) => {
    event.preventDefault();
    const updatedLead = {
      leadIds: [selectedItem?.id],
      lead_name: editedItem?.lead_name,
      first_name: name?.split(" ")[0],
      last_name: name?.split(" ")[1],
      position: editedItem?.position,
      phone: editedItem?.phone,
      source: editedItem?.source,
      company_name: editedItem?.company_name,
      value: editedItem?.value,
      email: editedItem?.email,
      type: editedItem?.type,
      priority: editedItem?.priority,
      status: editedItem?.status,
      address1: editedItem?.address1,
      city: editedItem?.city,
      state: editedItem?.state,
      country: editedItem?.country,
      pin: editedItem?.pin,
      owner: selectedUser?.id,
    };
    axios
      .put(UPDATE_LEAD, updatedLead, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        toast.success("Lead data updated successfully", {
          position:"top-center",
          autoClose:2000
        })
      })
      .catch((error) => {
        console.log(error);
      });

    setIsEditable(false);
    onLeadAdded();
    setStateBtn(0);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  const normalStylingSelect1 = {
    backgroundColor: editedItem?.status && getStatusBackgroundColor2(),
    /* height: 32px; */
    color: " #ffffff !important",
    fontSize: " 0.8rem",
    fontFamily: '"Lexend Deca", sans-serif',
    fontWeight: 400,
    padding: "0.3rem",
    borderRadius: "5px",
    textTransform: "capitalize",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    border: "1px solid transparent",
    height: "2rem",
  };
  const editStylingSelect1 = {
    width: "100%",
    color: " #1e2224",
    fontWeight: 400,
    border: "1px solid #dcdcdc",
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    borderRadius: "0.3125rem",
    padding: "0.1rem",
    height: "2rem",
  };
  const normalStylingSelect2 = {
    backgroundColor: editedItem?.status && getStatusBackgroundColor(),
    /* height: 32px; */
    color: " #ffffff !important",
    fontSize: " 0.8rem",
    fontFamily: '"Lexend Deca", sans-serif',
    fontWeight: 400,
    padding: "0.3rem",
    borderRadius: "5px",
    textTransform: "capitalize",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    border: "1px solid transparent",
    height: "2rem",
  };
  const editStylingSelect2 = {
    width: "100%",
    color: " #1e2224",
    fontWeight: 400,
    border: "1px solid #dcdcdc",
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    borderRadius: "0.3125rem",
    padding: "0.1rem",
    height: "2rem",
  };

  const normalStylingSelect3 = {

    /* height: 32px; */
    fontSize: " 0.8rem",
    fontFamily: '"Lexend Deca", sans-serif',
    padding: "0.3rem",
    borderRadius: "5px",
    textTransform: "capitalize",
    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
    border: "1px solid transparent",
    height: "2rem",
  };

  const editStylingSelect3 = {
    width: "100%",
    color: " #1e2224",
    border: "1px solid #dcdcdc",
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    borderRadius: "0.3125rem",
    padding: "0.1rem",
    height: "2rem",
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
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <>
                    {" "}
                    <input
                      type="text"
                      name="lead_name"
                      value={editedItem?.lead_name}
                      onChange={handleInputChange}
                      style={isEditable ? editStyling : normalStyling}
                      disabled={isDisabled}
                    />
                    <br />
                  </>
                )}
              </p>
            </div>
            <a href="#" className="edit-details" onClick={toggleEditable}>
              <i className="fa-solid fa-pen"></i>
            </a>
          </div>
          <div className="leadDetailsLeft">
            <div className="detailsBox">
              <p className="detailHead">LEAD INFORMATION</p>
              <div className="detailsContent">
                <div className="detailsLeftContainer">
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
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          value={name}
                          onChange={handleNameChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="position"
                          value={editedItem?.position}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="phone"
                          value={editedItem?.phone}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="source"
                          value={editedItem?.source}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="company_name"
                          value={editedItem?.company_name}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="value"
                          value={editedItem?.value}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="email"
                          name="email"
                          value={editedItem?.email}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="type"
                          value={editedItem?.type}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <select
                          name="priority"
                          id="priority"
                          value={editedItem?.priority}
                          onChange={handleInputChange}
                          disabled={isDisabled}
                          style={
                            isEditable
                              ? editStylingSelect1
                              : normalStylingSelect1
                          }
                          className={isDisabled ? "disabled" : ""}
                        >
                          <option value="Imp">Imp</option>
                          <option value="Avg">Avg</option>
                          <option value="Cool">Cool</option>
                        </select>
                      </span>
                    )}
                  </p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span>
                      <select
                        name="status"
                        id="status"
                        value={editedItem?.status}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                        style={
                          isEditable ? editStylingSelect2 : normalStylingSelect2
                        }
                        className={isDisabled ? "disabled" : ""}
                      >
                        <option value="New">New</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Unread">Unread</option>
                      </select>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="detailsBox">
              <p className="detailHead">LEAD OWNER</p>
              <div className="detailsContent">
                <div className="detailsLeftContainer">
                  <p>Lead Owner</p>
                  <p>Email</p>
                  <p>Contact</p>
                </div>
                <div className="detailsRightContainer">
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <select
                          id="lp-main-owner"
                          onChange={handleInputChange}
                          disabled={isDisabled}
                          style={
                            isEditable
                              ? editStylingSelect3
                              : normalStylingSelect3
                          }
                          className={isDisabled ? "disabled" : ""}
                        >
                          {userData.map((item) => (
                            <option key={item?.id} value={item?.first_name + " " + item?.last_name} className="owner-val">
                             {`${item?.first_name.charAt(0).toUpperCase() + item?.first_name.slice(1)} ${item?.last_name.charAt(0).toUpperCase() + item?.last_name.slice(1)}`}
                            </option>
                          ))}
                          {/* <option value="Imp">{owner}</option> */}

                        </select>
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="email"
                          name="owner_email"
                          value={selectedUser?.email}
                          style={
                            normalStylingInput
                          }
                          disabled={true}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="owner_phone"
                          value={selectedUser?.phone}
                          style={
                            normalStylingInput
                          }
                          disabled={true}
                        />
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="detailsBox">
              <p className="detailHead">ADDRESS INFORMATION</p>
              <div className="detailsContent">
                <div className="detailsLeftContainer">
                  <p>Street</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Country</p>
                  <p>Zip Code</p>
                </div>
                <div className="detailsRightContainer">
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="address1"
                          value={editedItem?.address1}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="city"
                          value={editedItem?.city}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="state"
                          value={editedItem?.state}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="country"
                          value={editedItem?.country}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
                    )}
                  </p>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="pin"
                          value={editedItem?.pin}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled}
                        />
                      </span>
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
                  Save
                </button>
              ) : (
                <button onClick={handleUpdateClick} className="convertToDeal">
                  Save
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

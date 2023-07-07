import React, { useState } from "react";
import "./styles/LPleads.css";
import userIcon from "../assets/image/user-img.png";

const Modal = ({ selectedItem, closeModal }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editedItem, setEditedItem] = useState(selectedItem);

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

  const toggleEditable = () => {
    setIsEditable(!isEditable);
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
                      name="company_name"
                      value={editedItem.company_name}
                      onChange={handleInputChange}
                    />
                    <br />
                  </>
                ) : (
                  <>
                    {editedItem.company_name}
                    <br />
                  </>
                )}
                <span>
                  ( Last Updated: {editedItem.update_date.split("T")[0]} )
                </span>
              </p>
            </div>
            <a href="#" className="edit-details" onClick={toggleEditable}>
              <i className="fa-solid fa-pen"></i>
            </a>
          </div>
          {/* <div className="detailsBox">
            <p className="detailHead">DETAILS</p>
            <div className="detailsContent">
              <div className="detailsLeftContainer">
                <p>Lead Owner</p>
                <p>Email</p>
                <p>Contact</p>
                <p>Lead Status</p>
              </div>
              <div className="detailsRightContainer">
                <p>-</p>
                <p>
                  {isEditable ? (
                    <input
                      type="email"
                      name="email"
                      value={editedItem.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedItem.email}</span>
                  )}
                </p>
                <p>
                  {isEditable ? (
                    <input
                      type="email"
                      name="phone"
                      value={editedItem.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedItem.phone}</span>
                  )}
                </p>
                <p
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
                  ) : (
                    <span>{editedItem.status}</span>
                  )}
                </p>
              </div>
            </div>
          </div> */}
          <div className="detailsBox">
            <p className="detailHead">LEAD INFORMATION</p>
            <div className="detailsContent">
              <div className="detailsLeftContainer">
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
                      type="first_name"
                      name="first_name"
                      value={editedItem.first_name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedItem.first_name}</span>
                  )}
                </p>
                <p>
                  {isEditable ? (
                    <input
                      type="position"
                      name="position"
                      value={editedItem.position}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>-</span>
                    // <span>{editedItem.position}</span>
                  )}
                </p>
                <p>
                  {isEditable ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedItem.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedItem.phone}</span>
                  )}
                </p>
                <p>
                  {isEditable ? (
                    <input
                      type="text"
                      name="source"
                      value={editedItem.s}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{editedItem.phone}</span>
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
                  ) : (
                    <span>{editedItem.email}</span>
                  )}
                </p>
                
                <p
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
                  ) : (
                    <span>{editedItem.status}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* left side of modal ends here */}
      </div>
      {/* modal container ends here */}
    </div>
  );
};

export default Modal;

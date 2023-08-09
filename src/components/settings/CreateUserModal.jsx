import React, { useState } from "react";
import axios from "axios";
import { ADD_USER, getDecryptedToken } from "../utils/Constants";
import "../styles/LPUserAndTeam.css";

const CreateUserModal = ({ onClose, onUserAdded }) => {
  const decryptedToken = getDecryptedToken();
  const [showPassword, setShowPassword] = useState(false);
  const [details, setDetails] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handlePasswordEye(e){
    e.preventDefault();
    setShowPassword(!showPassword);

  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(ADD_USER, details, {
        headers: {
          Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
        }
      })
      .then((response) => {
        console.log(response);
        setDetails({
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          password: "",
        });
        onUserAdded(); // Call the onLeadAdded function from props
        onClose();
      })
      .catch((error) => {
        console.log(error)
      });
  }
  return (
    <div className="modalUserOverlay">
      <div className="userModal">
        <div className="modalHeading">
          <p>Add User</p>
          <span className="modal-close" onClick={onClose}>
            X
          </span>
        </div>
        <form onSubmit={handleSubmit} className="createUserForm">
          <div className="inputDiv">
            <label htmlFor="first_name">First Name</label>
            <br />
            <input
              type="text"
              name="first_name"
              onChange={handleChange}
              id="first_name"
              placeholder="First Name"
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="last_name">Last Name</label>
            <br />
            <input
              type="text"
              name="last_name"
              onChange={handleChange}
              id="last_name"
              placeholder="Last Name"
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="phone">Contact</label>
            <br />
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              id="phone"
              placeholder="Phone"
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              id="email"
              placeholder="email"
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="profile">Profile</label>
            <br />
            <input
              type="text"
              name=""
              // onChange={handleChange}
              id="profile"
              placeholder="profile"
            />
          </div>
          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <br />
            <div className="password-input-wrapper">
          <input
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              id="password"
              className="create-user-pwd-input"
            />
            <button
              className="password-toggle-button"
              onClick={handlePasswordEye}
            >
              {showPassword ? <i className="fa-sharp fa-solid fa-eye-slash "></i> : <i className="fa-sharp fa-solid fa-eye "></i>}
            </button>
            </div>
          </div>
          <div className="submitBtnBox">
            <button className="userCancelBtn">Cancel</button>
            <input type="submit" className="userSubBtn" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;

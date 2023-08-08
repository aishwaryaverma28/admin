import React, { useState } from "react";
import axios from "axios"; // Import Axios library
import { UPDATE_TEAM_MEM,getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRolePopUp = ({ onClose, roles, user_id }) => {
  const decryptedToken = getDecryptedToken();
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roleName, setRoleName] = useState([]);

  const handleAssignRole = () => {
    if (selectedRoleId) {
      // Find the selected role using the role_id
      const selectedRole = roles.find((role) => role.id == selectedRoleId);
      if (selectedRole) {
        // Convert selectedRoleId to integer
        const roleId = parseInt(selectedRoleId);

        // Convert user_id to integer
        const userId = parseInt(user_id);

        // Create a new object with role_id and user_id and add it to selectedRoles
        setSelectedRoles((prevSelectedRoles) => [
          ...prevSelectedRoles,
          { role_id: roleId, user_id: userId },
        ]);

        // Add the selected role name to the roleName state
        setRoleName((prevRoleNames) => [...prevRoleNames, selectedRole.name]);

        // Clear the selected role after adding it
        setSelectedRoleId("");
      }
    }
  };


  const handleSave = () => {
        axios
          .put(UPDATE_TEAM_MEM +user_id , { roles: selectedRoles }, {
            headers: {
              Authorization: `Bearer ${decryptedToken}`,
            },
          })
          .then((response) => {
            console.log(response)
            toast.success('Roles saved successfully', {
              position:"top-center"
            });
            // onClose();
          })
          .catch((error) => {
            console.log(error)
            toast.error('Error saving roles', {
              position:"top-center"
            })
          });
  };
  console.log(selectedRoles);
  console.log(roleName);
  return (
    <div className="recycle-popup-wrapper">
      <div className="assign-role-popup-container">
        <div className="recycle-popup-box">
          <p className="common-fonts assign-role-heading">assign role</p>
          <div className="assign-role-dropdown">
            <label htmlFor="" className="common-fonts">
              Search role
            </label>
            <select
              name=""
              id=""
              className="common-input assign-role-select"
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <p className="common-fonts assign-role-result">
            Search result : {roleName.length}
          </p>
            <div className="assign-search-details">
            {roleName.map((item) => (  
              <div className="assign-deal-code">
                <p className="common-fonts assign-name assign-bottom">Name:</p>
                <p className="common-fonts assign-deal-edit">{item}</p>
              </div>
              ))}
               {/* <div className='assign-deal-code'>
                <p className='common-fonts assign-name'>Code</p>
                <p className='common-fonts'>dealedit_admin_job</p>
             </div> */}
             
          </div>          
        </div>

        <div className="recycle-popup-btn">
          {/* <button className="restore-no common-fonts" onClick={onClose}>
            Cancel
          </button> */}
          <button
            className="common-white-button assign-role-btn common-fonts"
            onClick={handleAssignRole} // Call the new function on button click
          >
            Assign Role
          </button>
          <button className="restore-yes common-fonts"  onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddRolePopUp;

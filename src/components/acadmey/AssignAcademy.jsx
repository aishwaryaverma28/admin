import React, { useState } from 'react'
import axios from 'axios';
import {
  SEARCH_ACADMEY_ID,
  ACADMEY_SEARCH_API,
  ASSIGN_ACADEMY,
  getDecryptedToken,
} from "../utils/Constants.js"
import { toast } from 'react-toastify';
const AssignAcademy = ({ id, tempAcademyId }) => {
  const decryptedToken = getDecryptedToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleChecked, setToggleChecked] = useState(false);
  const [academy, setAcademy] = useState([])

  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
    setSearchQuery("");
  };
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (value?.length === 0) {
      // getAllVerify();
    } else {
      if (!toggleChecked && value?.length < 3) {
        return;
      }
      let apiUrl = '';
      apiUrl = toggleChecked
        ? `${SEARCH_ACADMEY_ID}${value}`
        : `${ACADMEY_SEARCH_API}${value}`;
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
        .then(response => {
          setAcademy(response?.data?.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };
  //==========================================api call to assign the academy to user
  function academyAssign(object) {
    const body = {
      userId: id,
      academyId: object.id,
      tempAcademyId: tempAcademyId
    }
    axios.post(ASSIGN_ACADEMY, body, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    })
      .then((response) => {
        if (response?.data?.status === 1){
          console.log(response?.data)
        toast.success("Acadmey assigned successfully", {
          position: "top-center",
          autoClose: 1000,
        });
      }else{
        toast.error(response?.data?.message, {
          position: "top-center",
          autoClose: 1000,
        });
      }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 1000,
        });
      })
  }
  return (
    <>
      <div className="recycle-search-box">
        <input
          type="text"
          className="recycle-fonts assign-search"
          placeholder="Search for academy"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="recycle-search-icon">
          <div>
            <label className="password-switch lead-switch">
              <input
                type="checkbox"
                checked={toggleChecked}
                onChange={handleToggleChange}
              />
              <span className="password-slider lead-slider password-round"></span>
            </label>
          </div>
        </span>
      </div>
      <>
        {academy.map((object) => (
          <div key={object.id} className="academy-card">
            <div className="card-container">
              <div className="card-leftBox">
                <div className="user-details">
                  <p className="heading">
                    {object.id} - {object.name}
                  </p>
                </div>
                <div className="lead-value">
                </div>
                <div className="contact-details">
                  <div className="mail sportCap">
                    <p>{object.sport}</p>
                  </div>
                  <div className="mail">
                    <p>{object.phone}</p>
                  </div>
                  <div className="mail sportCap">
                    <p>{object.city}, {object.state}</p>
                  </div>
                </div>
              </div>
              <div className="DealCard-rightBox">
                <div className="mail">
                  <div className="bmp-image-preview2">
                    <img
                      src={object?.logo === null
                        ? "https://bmpcdn.s3.ap-south-1.amazonaws.com/default/academy_default_logo.webp"
                        : `https://bmpcdn.s3.ap-south-1.amazonaws.com/academy/${object?.id}/${object?.logo}`}
                      alt="pofile"
                      className="bmp-preview-image"
                    />
                  </div>
                </div>
                {/* <button type="button" className="common-save-button ">
                    
                  </button> */}
                <button type="button" className="common-save-button" onClick={() => academyAssign(object)}>
                  Assign
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    </>
  )
}

export default AssignAcademy
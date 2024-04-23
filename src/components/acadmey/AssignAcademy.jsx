import React, { useState } from 'react'
import axios from 'axios';
import {
  SEARCH_ACADMEY_ID,
  ACADMEY_SEARCH_API,
  getDecryptedToken,
} from "../utils/Constants.js"
const AssignAcademy = () => {
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
                 <button type="button" className="common-save-button">
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
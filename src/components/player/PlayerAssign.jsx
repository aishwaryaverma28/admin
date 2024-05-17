import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  cdnurl,
  GET_PLAYER_ID,
  ASSIGN_ACADEMY,
  ASSIGN_NEW_ACADEMY,
  getDecryptedToken,
} from "../utils/Constants.js"
import { toast } from 'react-toastify';

const PlayerAssign = ({ id, tempAcademyId, onLeadAdded }) => {
    const decryptedToken = getDecryptedToken();
    const [searchQuery, setSearchQuery] = useState("");
    const [toggleChecked, setToggleChecked] = useState(false);
    const [academy, setAcademy] = useState([])
    const [data, setData] = useState({})
  
    const fetchLead = () => {
      let body = {
        playerId: tempAcademyId,
        type: "temp"
      };
  
      axios
        .post(GET_PLAYER_ID, body, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          setData(response?.data?.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    useEffect(() => {
      fetchLead();
    }, []);
  
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
          ? `https://bmp.leadplaner.com/api/api/bmp/searchEntity/bmp_player_details/id/${value}`
          : `https://bmp.leadplaner.com/api/api/bmp/searchEntity/bmp_player_details/global/${value}`;
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
          if (response?.data?.status === 1) {
            toast.success("Acadmey assigned successfully", {
              position: "top-center",
              autoClose: 1000,
            });
            onLeadAdded();
          } else {
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
  
    function academyNewAssign() {
      const body = {
        userId: id,
        tempAcademyId: tempAcademyId
      }
      axios.post(ASSIGN_NEW_ACADEMY, body, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
        .then((response) => {
          if (response?.data?.status === 1) {
            toast.success("Acadmey added successfully", {
              position: "top-center",
              autoClose: 1000,
            });
            onLeadAdded();
          } else {
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
            placeholder="Search for Player"
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
          <div className="academy-card">
            <div className="card-container">
              <div className="card-leftBox">
                <div className="user-details">
                  <p className="heading">
                    {data.id} - {data.name}
                  </p>
                </div>
                <div className="lead-value">
                </div>
                <div className="contact-details">
                  <div className="mail sportCap">
                    <p>{data.sport}</p>
                  </div>
                  <div className="mail">
                    <p>{data.mobile}</p>
                  </div>
                  <div className="mail sportCap">
                    <p>{data.city}, {data.state}</p>
                  </div>
                </div>
              </div>
              <div className="DealCard-rightBox">
                <div className="mail">
                  <div className="new_preview_flex">
                    <a href={data?.logo === null
                      ? `${cdnurl}coach/14/logo1.jpg`
                      : `${cdnurl}player_temp/${data?.id}/${data?.logo}`} target="_blank" rel="noopener noreferrer">
                      <img
                        src={data?.logo === null
                          ? `${cdnurl}coach/14/logo1.jpg`
                          : `${cdnurl}player_temp/${data?.id}/${data?.logo}`}
                        alt="pofile"
                        className="bmp-preview-image"
                      />
                    </a>
                    <div className='new_btnflex'>
                      {/* <button type="button" className="common-save-button " onClick={academyNewAssign}>
                        New Coach
                      </button> */}
                      <button type="button" className="common-save-button ">
                        New Player
                      </button>
                    </div>
  
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </>
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
                      <p>{object.mobile}</p>
                    </div>
                    <div className="mail sportCap">
                      <p>{object.city}, {object.state}</p>
                    </div>
                  </div>
                </div>
                <div className="DealCard-rightBox">
                  <div className="mail">
                    <div className="new_preview_flex">
                      <a href={object?.logo === null
                        ? "${cdnurl}coach/14/logo1.jpg"
                        : `${cdnurl}player/${object?.id}/${object?.logo}`} target="_blank" rel="noopener noreferrer">
                        <img
                          src={object?.logo === null
                            ? "${cdnurl}coach/14/logo1.jpg"
                            : `${cdnurl}player/${object?.id}/${object?.logo}`}
                          alt="pofile"
                          className="bmp-preview-image"
                        />
                      </a>
                      <div className='new_btnflex'>
                        {/* <button type="button" className="common-save-button" onClick={() => academyAssign(object)}>
                          Assign
                        </button> */}
                        <button type="button" className="common-save-button">
                          Assign
                        </button>
                      </div>
  
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
          ))}
        </>
      </>
    )
  }

export default PlayerAssign
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_COACH,UPDATE_PLAYER, getDecryptedToken } from './../utils/Constants';
import { toast } from "react-toastify";
import USER from "../../assets/image/user-img.png"
const PlayerDetails = ({ id }) => {
  console.log(id);
    const decryptedToken = getDecryptedToken();
  const [isLoading, setIsLoading] = useState(true);
  const [editedItem, setEditedItem] = useState("");
  const [stateBtn, setStateBtn] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);

const getAllPlayers = () => {
    const requestBody = {
        entity: 'bmp_player_details',
        limit_from: '0',
        limit_to: '1000',
    };
    axios
        .post(GET_COACH, requestBody, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
        .then((response) => {
            const players = response?.data?.data;
            const foundPlayer = players.find((player) => player.id === id);
            if (foundPlayer) {
                foundPlayer.dob = foundPlayer.dob?.split("T")[0];
                foundPlayer.expiry_date = foundPlayer.expiry_date?.split("T")[0];
                foundPlayer.join_date = foundPlayer.join_date?.split("T")[0];
                setEditedItem(foundPlayer);
                setIsLoading(false);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

    useEffect(() => {
        getAllPlayers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({
          ...editedItem,
          [name]: value,
        });
        setStateBtn(1);
      };
      const toggleEditable = (e) => {
        e.preventDefault();
        setIsEditable(!isEditable);
        setIsDisabled(!isDisabled);
      };
      const handleUpdateClick = () => {
        const updatedFormData = {
          name: editedItem?.name,
          email: editedItem?.email,
          mobile: editedItem?.mobile,
          sport: editedItem?.sport,
          city: editedItem?.city,
          state: editedItem?.state,
          about: editedItem?.about,
          description: editedItem?.description,
          agent:editedItem?.agent,
          awards:editedItem?.awards,
          career: editedItem?.career,
          dob: editedItem?.dob,
          expiry_date: editedItem?.expiry_date,
          foot:editedItem?.foot,
          goals:editedItem?.goals,
          height: editedItem?.height,
          join_date:editedItem?.join_date,
          place_of_birth:editedItem?.place_of_birth,
          position: editedItem?.position,
          social_profile: editedItem?.social_profile,
          team_number: editedItem?.team_number,
        }
        axios
          .put(UPDATE_PLAYER + id, updatedFormData
            , {
              headers: {
                Authorization: `Bearer ${decryptedToken}`,
              },
            }
          )
          .then((response) => {
            if (response.data.status === 1) {
              toast.success("Details updated successfully", {
                position: "top-center",
                autoClose: 2000,
              });
            } else {
              toast.error("Some Error Occurred", {
                position: "top-center",
                autoClose: 2000,
              });
            }
            setIsEditable(false);
            setIsDisabled(!isDisabled);
            setStateBtn(0);
            getAllPlayers();
          })
          .catch((error) => {
            console.log(error);
            toast.error("An error occurred while updating details", {
              position: "top-center",
              autoClose: 2000,
            });
          })
          .finally(() => {
            setStateBtn(0);
          });
      }
    
      const handleViewSite = (url) => {
        const siteUrl = url;
        if (siteUrl) {
          window.open(siteUrl, "_blank");
        } else {
          alert("Site URL is not available");
        }
      };
    
      //======================================================================css variable
    
      const normalStylingSelect1 = {
        color: "white !important",
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
        width: "fit-content",
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
        width: "100%"
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
        width: "100%",
    
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
      const editStylingTextarea = {
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
        height: "5rem",
        width: "100%",
    
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
    
      const normalStylingTextarea = {
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
        height: "5rem",
        width: "100%"
      };
    

    return (<>
        <div className="user-details--left">
          <div className="user-details--heading">
            <div className="user-details-imgBox">
              <img
                src={USER} 
                alt="logo"
                className="bmp-preview-image logoRound"
              />
              <div>
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <>
                      {editedItem?.id}: {editedItem?.name}, {editedItem?.city}, {editedItem?.state}
                    </>
                  )}
                </p>
                <p style={normalStylingInput}>{editedItem?.url}</p>
              </div>
            </div>
            <a href="#" className="edit-details" onClick={toggleEditable}>
              <i className="fa-solid fa-pen"></i>
            </a>
          </div>
          <div className="leadDetailsLeft">
            <div className="detailsBox">
              <div className="detailsContent">
                <div className="detailsLeftContainer">
                  <p>Name</p>
                  <p>Email</p>
                  <p>Mobile</p>
                  <p>Sport</p>
                  <p>Agent</p>
                  <p>Awards</p>
                  <p>Career</p>
                  <p>Current Club</p>
                  <p>Expire Date</p>
                  <p>Joining Date</p>
                  <p>Team Number</p>
                  <p>Goals</p>
                  <p>Date of Birth</p>                  
                  <p>Place of Birth</p>
                  <p>Foot</p>
                  <p>Height</p>
                  <p>Position</p>
                  <p>Social Link</p>
                  <p className="about-textarea">Description</p>
                  <p className="about-textarea">About</p>
                </div>
                <div className="detailsRightContainer">
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="name"
                          value={editedItem?.name}
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
                          name="mobile"
                          value={editedItem?.mobile}
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
                        <input list="sports" name="sport"
                          value={editedItem?.sport}
                          onChange={handleInputChange}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled={isDisabled} />
                        <datalist id="sports">
                          <option value="archery"></option>
                          <option value="arts"></option>
                          <option value="athletics"></option>
                          <option value="aerobics"></option>
                          <option value="badminton"></option>
                          <option value="basketball"></option>
                          <option value="bodybuilding"></option>
                          <option value="billiards"></option>
                          <option value="boxing"></option>
                          <option value="chess"></option>
                          <option value="cricket"></option>
                          <option value="fencing"></option>
                          <option value="football"></option>
                          <option value="golf"></option>
                          <option value="gym"></option>
                          <option value="hockey"></option>
                          <option value="kabaddi"></option>
                          <option value="karate"></option>
                          <option value="kho-kho"></option>
                          <option value="mma"></option>
                          <option value="motorsports"></option>
                          <option value="rugby"></option>
                          <option value="shooting"></option>
                          <option value="skating"></option>
                          <option value="sports"></option>
                          <option value="squash"></option>
                          <option value="swimming"></option>
                          <option value="table-Tennis"></option>
                          <option value="taekwondo"></option>
                          <option value="tennis"></option>
                          <option value="volleyball"></option>
                          <option value="wrestling"></option>
                          <option value="yoga"></option>
                          <option value="Personal Gym Trainer"></option>
                          <option value="Fitness Training"></option>
                          <option value="Pilates"></option>
                        </datalist>
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
                          name="agent"
                          value={editedItem?.agent}
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
                          name="awards"
                          value={editedItem?.awards}
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
                          name="career"
                          value={editedItem?.career}
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
                          name="current_club"
                          value={editedItem?.current_club}
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
                          type="date"
                          name="expiry_date"
                          value={editedItem?.expiry_date || ''}
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
                          type="date"
                          name="join_date"
                          value={editedItem?.join_date || ''}
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
                          type="number"
                          name="team_number"
                          value={editedItem?.team_number}
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
                          name="goals"
                          value={editedItem?.goals}
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
                          type="date"
                          name="dob"
                          value={editedItem?.dob || ''}
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
                          name="place_of_birth"
                          value={editedItem?.place_of_birth}
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
                          name="foot"
                          value={editedItem?.foot}
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
                          name="height"
                          value={editedItem?.height}
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
                          name="social_profile"
                          value={editedItem?.social_profile}
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
                        <textarea
                          name="description"
                          onChange={handleInputChange}
                          value={isLoading ? "-" : editedItem?.description}
                          rows="5"
                          id=""
                          style={
                            isEditable ? editStylingTextarea : normalStylingTextarea
                          }
                          disabled={isDisabled}
                        ></textarea>
                      </span>
                    )}
                  </p>
                 <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <textarea
                          name="about"
                          onChange={handleInputChange}
                          value={isLoading ? "-" : editedItem?.about}
                          rows="5"
                          id=""
                          style={
                            isEditable ? editStylingTextarea : normalStylingTextarea
                          }
                          disabled={isDisabled}
                        ></textarea>
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
                  <p>City</p>
                  <p>State</p>
                 </div>
                <div className="detailsRightContainer">
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
                </div>
              </div>
            </div>
            
          </div>
          {isEditable ? (
            <div className="modalLeftBtnBox">
              <button
                className="convertToDeal"
                onClick={() => handleViewSite(editedItem?.url)}
              >
                View Site
              </button>
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
              <button
                className="convertToDeal"
                onClick={() => handleViewSite(editedItem?.url)}
              >View Site
              </button>
            </div>
          )}
        </div>
      </>)
};

export default PlayerDetails;

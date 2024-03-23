import React, { useEffect, useState } from 'react'
import axios from "axios";
import {
  GET_COACH_ID,
  handleLogout,
  getDecryptedToken,
  UPDATE_COACH
} from "./../utils/Constants";
import { toast } from "react-toastify";
import { skills } from '../utils/coachSkils';
// import { default_about } from "../utils/bmp_about";
// import { removeHtmlTags } from "../bookmyplayer/removeHtml.js";

const CoachDetails = (selectedItem) => {
  const decryptedToken = getDecryptedToken();
  const [isLoading, setIsLoading] = useState(true);
  const [editedItem, setEditedItem] = useState("");
  const [stateBtn, setStateBtn] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [trainingLocation, setTrainingLocation] = useState([]);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const [addedSkils, setAddedSkills] = useState([]);

  const fetchLead = () => {
    axios
      .post(GET_COACH_ID, { coachId: selectedItem?.selectedItem?.id }, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data?.data[0]);
        const sport = response?.data?.data[0]?.sport?.toLowerCase();
        setEditedItem(response?.data?.data[0]);
        setIsLoading(false);
        if (response?.data?.data[0]?.training_location) {
          const trainingLocationArray = response?.data?.data[0]?.training_location?.split(',');
          setTrainingLocation(trainingLocationArray);
        }
        if (response?.data?.data[0]?.skill) {
          const oldSkill = response?.data?.data[0]?.skill?.split(',');
          setAddedSkills(oldSkill);
        }
        if (sport && skills[sport]) {
          setUserSkills(skills[sport]);
        } else {
          setUserSkills([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  console.log(addedSkils);
  useEffect(() => {
    fetchLead();
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
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setTrainingLocation(prevLocations => [...prevLocations, value]);
    } else {
      setTrainingLocation(prevLocations =>
        prevLocations.filter(location => location !== value)
      );
    }
    setStateBtn(1);
  };
  const handleSkillChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setAddedSkills(prevLocations => [...prevLocations, value]);
    } else {
      setAddedSkills(prevLocations =>
        prevLocations.filter(location => location !== value)
      );
    }
    setStateBtn(1);
  };
  const handleUpdateClick = () => {
    const updatedFormData = {
      name: editedItem?.name,
      mobile: editedItem?.mobile,
      gender: editedItem?.gender,
      about_coach: editedItem?.about_coach,
      sport: editedItem?.sport,
      fee: editedItem?.fee,
      package: editedItem?.package,
      experience: editedItem?.experience,
      heighlight: editedItem?.heighlight,
      facebook: editedItem?.facebook,
      instagram: editedItem?.instagram,
      website: editedItem?.website,
      email: editedItem?.email,
      common_location: editedItem?.common_location,
      training_location: trainingLocation.toString(),
      city: editedItem?.city,
      state: editedItem?.state,
      skill: addedSkils.toString(),
    }
    axios
      .put(UPDATE_COACH + selectedItem?.selectedItem?.id, updatedFormData
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
        fetchLead();
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

  return (
    <>
      <div className="user-details--left">
        <div className="user-details--heading">
          <div className="user-details-imgBox">
            <img
              src={editedItem?.logo === null
                ? "https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/asset/images/logo.svg"
                : `https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/coach/${editedItem?.id}/${editedItem?.profile_img}`}
              alt="logo"
              className="bmp-preview-image logoRound"
            />
            <div>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <>
                    {editedItem?.name}, {editedItem?.city}, {editedItem?.state}
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
                <p>Sport</p>
                <p>Mobile</p>
                <p>Gender</p>
                <p>Fees</p>
                <p>Package</p>
                <p>Experience</p>
                <p>Education</p>
                <p>Achievement</p>
                <p>Profile Heading</p>
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
                      <select
                        name="gender"
                        id="gender"
                        value={editedItem?.gender || ""}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                        style={
                          isEditable
                            ? editStylingSelect1
                            : normalStylingSelect1
                        }
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
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
                        type="text"
                        name="fee"
                        value={editedItem?.fee}
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
                        name="package"
                        value={editedItem?.package}
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
                      <input list="experience" name="experience"
                        value={editedItem?.experience}
                        onChange={handleInputChange}
                        style={
                          isEditable ? editStylingInput : normalStylingInput
                        }
                        disabled={isDisabled} />
                      <datalist id="experience">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="5"></option>
                        <option value="6"></option>
                        <option value="7"></option>
                        <option value="8"></option>
                        <option value="9"></option>
                        <option value="10"></option>
                        <option value="11"></option>
                        <option value="12"></option>
                        <option value="13"></option>
                        <option value="14"></option>
                        <option value="15"></option>
                        <option value="16"></option>
                        <option value="17"></option>
                        <option value="18"></option>
                        <option value="19"></option>
                        <option value="20"></option>
                        <option value="20+"></option>
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
                        name="education"
                        value={editedItem?.education}
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
                        name="achievement"
                        value={editedItem?.achievement}
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
                        name="heighlight"
                        value={editedItem?.heighlight}
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
                        name="about_coach"
                        onChange={handleInputChange}
                        value={isLoading ? "-" : editedItem?.about_coach}
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
                <p>Training Location</p>
                <p>Common Location</p>
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
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span>
                      {/* <select
                        name="training_location"
                        id="training_location"
                        value={editedItem?.training_location || ""}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                        style={
                          isEditable
                            ? editStylingSelect1
                            : normalStylingSelect1
                        }
                      >
                        <option value="1">Online</option>
                        <option value="2">Home</option>
                      </select> */}
                      <div className="form-group-radio">
                        <label className="radio-inline">
                          <input
                            type="checkbox"
                            name="training_location"
                            value="1"
                            className="radio_disable check_input"
                            disabled={isDisabled}
                            onChange={handleCheckboxChange}
                            checked={trainingLocation.includes("1")}
                          /> Online
                        </label>
                        <label className="radio-inline">
                          <input
                            type="checkbox"
                            name="training_location"
                            value="2"
                            className="radio_disable check_input"
                            disabled={isDisabled}
                            onChange={handleCheckboxChange}
                            checked={trainingLocation.includes("2")}
                          /> Home
                        </label>
                      </div>
                    </span>
                  )}
                </p>
                <br />
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span>
                      <input
                        type="text"
                        name="common_location"
                        value={editedItem?.common_location}
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
          <div className="leadDetailsLeft">
                    <div className="detailsBox">
                        <div className="detailsContent">
                            <div className="detailsLeftContainer">
                                <p>Skills</p>
                            </div>
                            <div className="detailsRightContainer">
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <div className="form-group-radio">
                          {userSkills.map((skill, index) => (
                            <label className="radio-inline" key={index}>
                              <input
                                type="checkbox"
                                name="userSkills"
                                value={skill}
                                className="radio_disable check_input"
                                disabled={isDisabled}
                              onChange={handleSkillChange}
                              checked={addedSkils.includes(skill)}
                              />
                              {skill}
                            </label>
                          ))}
                        </div>
                      </span>
                    )}
                  </p>
                </div>
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
    </>
  )
}

export default CoachDetails
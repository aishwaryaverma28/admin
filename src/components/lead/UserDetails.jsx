import React, { useEffect, useState } from 'react'
import axios from "axios";
import {
  BMP_USER_ID,
  BMP_USER_DATA,
  getDecryptedToken,
  BMP_USER_UPDATE
} from "./../utils/Constants";
import { toast } from "react-toastify";
import { skills } from '../utils/coachSkils';
import USER from "../../assets/image/user-img.png"
const UserDetails = (selectedItem) => {
  const decryptedToken = getDecryptedToken();
  const [isLoading, setIsLoading] = useState(true);
  const [editedItem, setEditedItem] = useState("");
  const [stateBtn, setStateBtn] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);
  const [entity, setEntity] = useState(null);
  const fetchLeadData = () => {
    axios
      .post(BMP_USER_DATA, { userId: selectedItem?.selectedItem?.id }, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data?.data);
        setEditedItem(response?.data?.data?.user[0]);
        setEntity(response?.data?.data?.entity[0])
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // fetchLead();
    fetchLeadData();
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
      phone: editedItem?.phone,
      email: editedItem?.email,
      sport: editedItem?.sport,
      gender: editedItem?.gender,
      age: editedItem?.age,
      introduction: editedItem?.introduction,
      type_id: editedItem?.type_id,
      address1: editedItem?.address1,
      address2: editedItem?.address2,
      city: editedItem?.city,
      state: editedItem?.state,
      pincode: editedItem?.pincode,
      landmark: editedItem?.landmark,
    }
    axios
      .put(BMP_USER_UPDATE + selectedItem?.selectedItem?.id, updatedFormData
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
        fetchLeadData();
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
                    {editedItem?.name}, {editedItem?.city}, {editedItem?.state}
                  </>
                )}
              </p>
              <p style={normalStylingInput}>{entity?.url}</p>
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
                <p>Phone</p>
                <p>Email</p>
                <p>Sport</p>
                <p>Gender</p>
                <p>Age</p>
                <p>User Type</p>
                <p className="about-textarea">Introduction</p>
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
                        <option value=""></option>
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
                        name="age"
                        value={editedItem?.age}
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
                        name="type_id"
                        id="type_id"
                        value={editedItem?.type_id || ""}
                        onChange={handleInputChange}
                        disabled={isDisabled}
                        style={
                          isEditable
                            ? editStylingSelect1
                            : normalStylingSelect1
                        }
                      >
                        <option value=""></option>
                        <option value="1">Coach</option>
                        <option value="2">Academy</option>
                        <option value="3">Player</option>
                      </select>
                    </span>
                  )}
                </p>
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span>
                      <textarea
                        name="introduction"
                        onChange={handleInputChange}
                        value={isLoading ? "-" : editedItem?.introduction}
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
          

        </div>
        {isEditable ? (
                    <div className="modalLeftBtnBox">
                        <button
                            className="convertToDeal"
                            onClick={() => handleViewSite(entity?.url)}
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
                            onClick={() => handleViewSite(entity?.url)}
                        >View Site
                        </button>
                    </div>
                )}
      </div>
    </>
  )
}

export default UserDetails
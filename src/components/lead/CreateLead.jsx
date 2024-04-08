import React, { useEffect, useState } from "react";
import "../styles/CreateLead.css";
import axios from "axios";
import { UPDATE_ACADEMY, GET_ACADEMY, getDecryptedToken } from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateLead = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [isLoading, setIsLoading] = useState(true);
  const [editedItem, setEditedItem] = useState({});
  const [stateBtn, setStateBtn] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [trainingLocation, setTrainingLocation] = useState([]);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);
  const fetchLead = () => {
    axios
      .post(GET_ACADEMY, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setEditedItem(response?.data?.data[0]);
        if (response?.data?.data[0]?.friendly) {
          const trainingLocationArray = response?.data?.data[0]?.friendly?.split(',');
          setTrainingLocation(trainingLocationArray);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchLead();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setEditedItem({
      ...editedItem,
      [name]: newValue,
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
  const handleUpdateClick = () => {
    const updatedFormData = {
      stage: editedItem?.stage,
      name: editedItem?.name,
      owner: editedItem?.owner,
      website: editedItem?.website,
      phone: editedItem?.phone,
      mobile_verified: editedItem?.mobile_verified,
      about: editedItem?.about,
      sport: editedItem?.sport,
      fee: editedItem?.fee,
      experience: editedItem?.experience,
      facebook: editedItem?.facebook,
      instagram: editedItem?.instagram,
      website: editedItem?.website,
      email: editedItem?.email,
      email_verified: editedItem?.email_verified,
      timing: editedItem?.timing,
      closed_on: editedItem?.closed_on,
      address1: editedItem?.address1,
      address2: editedItem?.address2,
      city: editedItem?.city,
      state: editedItem?.state,
      postcode: editedItem?.postcode,
      facebook: editedItem?.facebook,
      instagram: editedItem?.instagram,
      categories: editedItem?.categories,
      friendly: trainingLocation.toString(),
    }
    axios
      .post(UPDATE_ACADEMY, updatedFormData
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
            autoClose: 1000,
          });
        } else {
          toast.error("Some Error Occurred", {
            position: "top-center",
            autoClose: 1000,
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
          autoClose: 1000,
        });
      })
      .finally(() => {
        setStateBtn(0);
      });
  }


  //======================================================================css variable
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
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div class="create-lead-top">
          <p>Add Academy</p>
          <p className="close-icon" onClick={onClose}>
            X
          </p>
        </div>
        <>
          <div className="user-details--left">
            <div className="leadDetailsLeft">
              <div className="detailsBox">
                <div className="detailsContent">
                  <div className="detailsLeftContainer">
                    <p>Name</p>
                    <p>Owner Name</p>
                    <p>Phone</p>
                    <p>Email</p>
                    <p>Sport</p>
                    <p>Categories</p>
                    <p>Fees</p>
                    <p>Timing</p>
                    <p>Closed On</p>
                    <p>Experience</p>
                    <p>Enviornment</p>
                    <p className="about-textarea">About</p>
                  </div>
                  <div className="detailsRightContainer">
                    <p>
                      <span className='newEditableArea'>
                        <input
                          type="text"
                          name="name"
                          value={editedItem?.name}
                          onChange={handleInputChange}
                          style={editStylingInput}
                        />
                      </span>
                    </p>
                    <p>
                      <span className='newEditableArea'>
                        <input
                          type="text"
                          name="owner"
                          value={editedItem?.owner}
                          onChange={handleInputChange}
                          style={editStylingInput}
                        />
                      </span>
                    </p>
                    <p>
                        <span className='newEditableArea'>
                          <input
                            type="text"
                            name="phone"
                            value={editedItem?.phone}
                            onChange={handleInputChange}
                            style={editStylingInput }
                          />
                          <label className="radio-inline radio-space">
                            <input
                              type="checkbox"
                              name="mobile_verified"
                              value={editedItem?.mobile_verified}
                              className="radio_disable check_input"
                              onChange={handleInputChange}
                              checked={editedItem.mobile_verified === 1}
                            /> Mobile Verified

                          </label>
                        </span>
                      </p>
                    <p>
                        <span className='newEditableArea'>
                          <input
                            type="text"
                            name="email"
                            value={editedItem?.email}
                            onChange={handleInputChange}
                            style={editStylingInput}
                          />
                          <label className="radio-inline radio-space">
                            <input
                              type="checkbox"
                              name="email_verified"
                              value={editedItem.email_verified}
                              className="radio_disable check_input"
                              onChange={handleInputChange}
                              checked={editedItem.email_verified === 1}
                            /> Email Verified
                          </label>
                        </span>
                    </p>
                    <p>
                        <span>
                          <input list="sports" name="sport"
                            value={editedItem?.sport}
                            onChange={handleInputChange}
                            style={ editStylingInput} />
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
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="categories"
                            value={editedItem?.categories}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="fee"
                            value={editedItem?.fee}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="timing"
                            value={editedItem?.timing}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="closed_on"
                            value={editedItem?.closed_on}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input list="experience" name="experience"
                            value={editedItem?.experience}
                            onChange={handleInputChange}
                            style={ editStylingInput} />
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
                    </p>
                    <p>
                        <span>
                          <div className="form-group-radio">
                            <label className="radio-inline">
                              <input
                                type="checkbox"
                                name="friendly"
                                value="Women Friendly"
                                className="radio_disable check_input"
  
                                onChange={handleCheckboxChange}
                                checked={trainingLocation?.includes("Women Friendly")}
                              /> Women Friendly
                            </label>
                            <label className="radio-inline">
                              <input
                                type="checkbox"
                                name="friendly"
                                value="Kids Friendly"
                                className="radio_disable check_input"
  
                                onChange={handleCheckboxChange}
                                checked={trainingLocation?.includes("Kids Friendly")}
                              /> Kids Friendly
                            </label>
                          </div>
                        </span>
                    </p>
                    <p>
                        <span>
                          <textarea
                            name="about"
                            onChange={handleInputChange}
                            value={editedItem?.about}
                            rows="5"
                            id=""
                            style={ editStylingTextarea }
                          ></textarea>
                        </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="detailsBox">
                <p className="detailHead">SOCIAL MEDIA</p>
                <div className="detailsContent">
                  <div className="detailsLeftContainer">
                    <p>Website</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                  </div>
                  <div className="detailsRightContainer">
                    <p>
                        <span>
                          <input
                            type="text"
                            name="website"
                            value={editedItem?.website}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="facebook"
                            value={editedItem?.facebook}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="instagram"
                            value={editedItem?.instagram}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="detailsBox">
                <p className="detailHead">ADDRESS INFORMATION</p>
                <div className="detailsContent">
                  <div className="detailsLeftContainer">
                    <p>Address 1</p>
                    <p>Address 2</p>
                    <p>City</p>
                    <p>State</p>
                    <p>Zipcode</p>
                  </div>
                  <div className="detailsRightContainer">
                    <p>
                        <span>
                          <input
                            type="text"
                            name="address1"
                            value={editedItem?.address1}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="address2"
                            value={editedItem?.address2}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="city"
                            value={editedItem?.city}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="state"
                            value={editedItem?.state}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                    <p>
                        <span>
                          <input
                            type="text"
                            name="postcode"
                            value={editedItem?.postcode}
                            onChange={handleInputChange}
                            style={ editStylingInput}
                          />
                        </span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <div className="modalLeftBtnBox">
              <span></span>
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

          </div>
        </>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateLead;

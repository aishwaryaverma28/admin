import React, { useEffect, useState } from 'react'
import axios from "axios";
import {
    GET_ACADEMY,
    handleLogout,
    getDecryptedToken,
    UPDATE_ACADEMY,
} from "./../utils/Constants";
import { toast } from "react-toastify";
import '../styles/Comment.css'

const NewAcademyDetails = React.forwardRef(({id, updateCheckState}, ref ) => {
    const decryptedToken = getDecryptedToken();
    const [isLoading, setIsLoading] = useState(true);
    const [editedItem, setEditedItem] = useState({});
    const [stateBtn, setStateBtn] = useState(0);
    const [isEditable, setIsEditable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [trainingLocation, setTrainingLocation] = useState([]);
    const [isHoverDisabled, setIsHoverDisabled] = useState(false);
    const fetchLead = () => {
        let body = {
            academy_id: id,
            type: "temp"
          };
          
        axios
            .post(GET_ACADEMY, body, {
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
        handleClick();
        setStateBtn(1);
    };
    const handleClick = () => {
        updateCheckState(true);
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
        handleClick();
        setStateBtn(1);
    };
    const handleUpdateClick = () => {
        setStateBtn(0);
        const updatedFormData = {
            type : "temp",
            name: editedItem?.name,
            owner: editedItem?.owner,
            website:editedItem?.website,
            phone: editedItem?.phone,
            mobile_verified: editedItem?.mobile_verified,
            about: editedItem?.about,
            sport: editedItem?.sport || "sports",
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
            city: editedItem?.city || "select",
            state: editedItem?.state,
            postcode: editedItem?.postcode,
            facebook: editedItem?.facebook,
            instagram: editedItem?.instagram,
            categories: editedItem?.categories,
            rating:editedItem?.rating,
            reviews:editedItem?.reviews,
            friendly: trainingLocation.toString(),
        }
        
        axios
            .put(UPDATE_ACADEMY + id, updatedFormData
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
                updateCheckState(false);
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
    React.useImperativeHandle(ref, () => ({
        handleUpdateClick
      }));
    const handleViewSite = (url) => {
        const siteUrl = url;
        if (siteUrl) {
            window.open(siteUrl, "_blank");
        } else {
            alert("Site URL is not available");
        }
    };

    //======================================================================css variable
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
                                ? "https://bmpcdn.s3.amazonaws.com/default/academy_default_logo.webp"
                                : `https://bmpcdn.s3.amazonaws.com/academy_temp/${editedItem?.id}/${editedItem?.logo}`}
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
                                <p>Owner Name</p>
                                <p>Phone</p>
                                <p>Email</p>
                                <p>Sport</p>
                                <p>Categories</p>
                                <p>Fees</p>
                                <p>Timing</p>
                                <p>Closed On</p>
                                <p>Experience</p>
                                <p>Reviews</p>
                                <p>Rating</p>
                                <p>Option</p>
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
                                                name="owner"
                                                value={editedItem?.owner}
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
                                        <span className='newEditableArea'>
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
                                            <label className="radio-inline radio-space">
                                                <input
                                                    type="checkbox"
                                                    name="mobile_verified"
                                                    value={editedItem?.mobile_verified}
                                                    className="radio_disable check_input"
                                                    disabled={isDisabled}
                                                    onChange={handleInputChange}
                                                    checked={editedItem?.mobile_verified === 1}
                                                /> Mobile Verified

                                            </label>
                                        </span>
                                    )}
                                </p>
                                <p>
                                    {isLoading ? (
                                        <span>-</span>
                                    ) : (
                                        <span className='newEditableArea'>
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
                                            <label className="radio-inline radio-space">
                                                <input
                                                    type="checkbox"
                                                    name="email_verified"
                                                    value={editedItem?.email_verified}
                                                    className="radio_disable check_input"
                                                    disabled={isDisabled}
                                                    onChange={handleInputChange}
                                                    checked={editedItem?.email_verified === 1}
                                                /> Email Verified

                                            </label>
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
                                                name="categories"
                                                value={editedItem?.categories}
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
                                                name="timing"
                                                value={editedItem?.timing}
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
                                                name="closed_on"
                                                value={editedItem?.closed_on}
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
                                                type="number"
                                                name="reviews"
                                                value={editedItem?.reviews}
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
                                                name="rating"
                                                value={editedItem?.rating}
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
                                            <div className="form-group-radio">
                                            <label className="radio-inline">
                                                    <input
                                                        type="checkbox"
                                                        name="friendly"
                                                        value="Free Trail"
                                                        className="radio_disable check_input"
                                                        disabled={isDisabled}
                                                        onChange={handleCheckboxChange}
                                                        checked={trainingLocation?.includes("Free Trail")}
                                                    /> Free Trial
                                                </label>
                                                <label className="radio-inline">
                                                    <input
                                                        type="checkbox"
                                                        name="friendly"
                                                        value="Coaching"
                                                        className="radio_disable check_input"
                                                        disabled={isDisabled}
                                                        onChange={handleCheckboxChange}
                                                        checked={trainingLocation?.includes("Coaching")}
                                                    /> Coaching
                                                </label>
                                                <label className="radio-inline">
                                                    <input
                                                        type="checkbox"
                                                        name="friendly"
                                                        value="Admission Open"
                                                        className="radio_disable check_input"
                                                        disabled={isDisabled}
                                                        onChange={handleCheckboxChange}
                                                        checked={trainingLocation?.includes("Admission Open")}
                                                    /> Admission Open
                                                </label>
                                                <label className="radio-inline">
                                                    <input
                                                        type="checkbox"
                                                        name="friendly"
                                                        value="Women Friendly"
                                                        className="radio_disable check_input"
                                                        disabled={isDisabled}
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
                                                        disabled={isDisabled}
                                                        onChange={handleCheckboxChange}
                                                        checked={trainingLocation?.includes("Kids Friendly")}
                                                    /> Kids Friendly
                                                </label>                                               
                                            </div>
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
                        <p className="detailHead">SOCIAL MEDIA</p>
                        <div className="detailsContent">
                            <div className="detailsLeftContainer">
                                <p>Website</p>
                                <p>Facebook</p>
                                <p>Instagram</p>
                            </div>
                            <div className="detailsRightContainer">
                            <p>
                                    {isLoading ? (
                                        <span>-</span>
                                    ) : (
                                        <span>
                                            <input
                                                type="text"
                                                name="website"
                                                value={editedItem?.website}
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
                                                name="facebook"
                                                value={editedItem?.facebook}
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
                                                name="instagram"
                                                value={editedItem?.instagram}
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
                                    {isLoading ? (
                                        <span>-</span>
                                    ) : (
                                        <span>
                                            <input
                                                type="text"
                                                name="address1"
                                                value={editedItem?.address1}
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
                                                name="address2"
                                                value={editedItem?.address2}
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
                                            <input
                                                type="text"
                                                name="postcode"
                                                value={editedItem?.postcode}
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
                <>
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
                </>
            </div>
        </>
    )
});

export default NewAcademyDetails
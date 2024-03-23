import React, { useEffect, useState } from 'react'
import axios from "axios";
import {
    GET_ACADEMY,
    handleLogout,
    getDecryptedToken,
    UPDATE_ACADEMY,
} from "./../utils/Constants";
import { toast } from "react-toastify";
import { default_about } from "../utils/bmp_about";
import { removeHtmlTags } from "../bookmyplayer/removeHtml.js";


const AcademyDetails = (selectedItem) => {
    const decryptedToken = getDecryptedToken();
    const [isLoading, setIsLoading] = useState(true);
    const [editedItem, setEditedItem] = useState("");
    const [stateBtn, setStateBtn] = useState(0);
    const [isEditable, setIsEditable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [introduction, setIntroduction] = useState("");
    const [isHoverDisabled, setIsHoverDisabled] = useState(false);
    const fetchLead = () => {
        axios
            .post(GET_ACADEMY, { academy_id: selectedItem?.selectedItem?.id }, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                const sport = response?.data?.data[0]?.sport;
                const academyName = response?.data?.data[0]?.name;
                const cityName = response?.data?.data[0]?.city;
                const academyObject = default_about?.find(obj => obj.sport === sport);
                const updatedAbout = academyObject?.about?.replace(/ACADEMY_NAME/g, academyName);
                const finalAbout = updatedAbout?.replace(/CITY_NAME/g, cityName);
                const intro = removeHtmlTags(finalAbout);
                setIntroduction(intro);
                if (sport === null || sport === "")
                    setIntroduction("-")
                setEditedItem(response?.data?.data[0]);
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
            stage: editedItem?.stage,
            name: editedItem?.name,
            phone: editedItem?.phone,
            about: editedItem?.about,
            sport: editedItem?.sport,
            fee: editedItem?.fee,
            experience: editedItem?.experience,
            facebook: editedItem?.facebook,
            instagram: editedItem?.instagram,
            website: editedItem?.website,
            email: editedItem?.email,
            timing: editedItem?.timing,
            spoken_languages: editedItem?.spoken_languages,
            address1: editedItem?.address1,
            address2: editedItem?.address2,
            city: editedItem?.city,
            state: editedItem?.state,
        }
        axios
            .put(UPDATE_ACADEMY + selectedItem?.selectedItem?.id, updatedFormData
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
    const normalStyling = {
        textAlign: "left",
        fontFamily: "Lexend Deca",
        fontSize: "1.125rem",
        fontWeight: 500,
        color: "#1e2224",
        lineHeight: "17px",
        border: "1px solid transparent",
    };

    const editStyling = {
        border: "1px solid #dcdcdc",
        textAlign: "left",
        fontFamily: "Lexend Deca",
        fontSize: "1.125rem",
        fontWeight: 500,
        color: "#1e2224",
        lineHeight: "17px",

        ":hover": {
            backgroundColor: isHoverDisabled ? "rgb(227, 225, 225)" : "",
            transition: isHoverDisabled ? "all .5s ease-in-out" : "",
            cursor: isHoverDisabled ? "pointer" : "",
        },
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
                                ? "https://res.cloudinary.com/cloud2cdn/image/upload/q_20/bookmyplayer/default/academy_default_logo.webp"
                                : `https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${editedItem?.id}/${editedItem?.logo}`}
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
                                <p>Phone</p>
                                <p>Fees</p>
                                <p>Timing</p>
                                <p>Experience</p>
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
                                            <textarea
                                                name="about"
                                                onChange={handleInputChange}
                                                value={isLoading ? "-" : editedItem?.about === null ? introduction : editedItem?.about}
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

export default AcademyDetails
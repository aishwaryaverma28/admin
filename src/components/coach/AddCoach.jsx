import React, { useEffect, useState } from "react";
import "../styles/CreateLead.css";
import axios from "axios";
import { ADD_COACH, getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoachDetails from "../lead/CoachDetails";
import { skills } from '../utils/coachSkils';
import CoachLead from "../lead/CoachLead";

const AddCoach = ({ onClose }) => {
    const decryptedToken = getDecryptedToken();
    const [selectedObj, setSelectedObj] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [stateBtn, setStateBtn] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [trainingLocation, setTrainingLocation] = useState([]);
    const [isHoverDisabled, setIsHoverDisabled] = useState(false);
    const [userSkills, setUserSkills] = useState([]);
    const [addedSkils, setAddedSkills] = useState([]);
    const [editedItem, setEditedItem] = useState({
        name: "",
        phone: "",
        email: "",
        sport: "",
        city: "",
        state: "",
        about: "",
        skill: "",
        heighlight: "",
        fee: "",
        package: "",
        gender: "",
        training_location: "",
        common_location: "",
        experience: "",
        education: "",
        achievement: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = (name === 'sport' || name === 'city' ? value?.toLowerCase() : value);
        setEditedItem({
            ...editedItem,
            [name]: newValue,
          });
        if (name === "sport") {
            const sport = value.toLowerCase();
            if (skills[sport]) {
                setUserSkills(skills[sport]);
            } else {
                setUserSkills([]);
            }
            setAddedSkills([]);
        }
        setStateBtn(1);
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
    const openModal = (object) => {
        setModalVisible(true);
        setSelectedObj(object);
    }

    const closeModal = () => {
        setModalVisible(false);
    };
    const handleUpdateClick = () => {
        setStateBtn(0); const updatedFields = {};
        for (const key in editedItem) {
            if (editedItem.hasOwnProperty(key)) {
                if (editedItem[key] !== "") {
                    updatedFields[key] = editedItem[key];
                }
            }
        }
        const updatedFormData = {
            ...updatedFields,
            training_location: trainingLocation.toString(),
            skill: addedSkils.toString(),
        };
        axios
            .post(ADD_COACH, updatedFormData
                , {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                if (response?.data?.status === 1) {
                    openModal(response?.data?.data?.insertId)
                    toast.success("Coach added successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    setTrainingLocation([]);
                    setEditedItem({
                        name: "",
                        phone: "",
                        email: "",
                        sport: "",
                        city: "",
                        state: "",
                        about: "",
                        skill: "",
                        heighlight: "",
                        fee: "",
                        package: "",
                        gender: "",
                        training_location: "",
                        common_location: "",
                        experience: "",
                        education: "",
                        achievement: "",
                    });
                } else {
                    toast.error(response.data.message, {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }
                setStateBtn(0);
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
        <div className="modal-overlay">
            <div className="leftCreateClose" onClick={onClose}></div>
            <div className="modal-content">
                <div class="create-lead-top">
                    <p>Add Coach</p>
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
                                        <p>Name <span className="common-fonts redAlert"> *</span></p>
                                        <p>Email <span className="common-fonts redAlert"> *</span></p>
                                        <p>Sport <span className="common-fonts redAlert"> *</span></p>
                                        <p>phone <span className="common-fonts redAlert"> *</span></p>
                                        <p>Gender</p>
                                        <p>Fees</p>
                                        <p>Package</p>
                                        <p>Experience</p>
                                        <p>Education</p>
                                        <p>Achievement</p>
                                        <p>Profile Heading</p>
                                        <p>Certification</p>
                                        <p className="about-textarea">About</p>
                                    </div>
                                    <div className="detailsRightContainer">
                                        <p>
                                            <span>
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
                                            <span>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={editedItem?.email}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input list="sports" name="sport"
                                                    value={editedItem?.sport}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}
                                                />
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
                                                    <option value="table-tennis"></option>
                                                    <option value="taekwondo"></option>
                                                    <option value="tennis"></option>
                                                    <option value="volleyball"></option>
                                                    <option value="wrestling"></option>
                                                    <option value="yoga"></option>
                                                    <option value="personal gym trainer"></option>
                                                    <option value="fitness training"></option>
                                                    <option value="pilates"></option>
                                                </datalist>
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={editedItem?.phone}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <select
                                                    name="gender"
                                                    id="gender"
                                                    value={editedItem?.gender || ""}
                                                    onChange={handleInputChange}

                                                    style={editStylingSelect1}
                                                >
                                                    <option value=""></option>
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                </select>
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="fee"
                                                    value={editedItem?.fee}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="package"
                                                    value={editedItem?.package}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input list="experience" name="experience"
                                                    value={editedItem?.experience}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}
                                                />
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
                                                <input
                                                    type="text"
                                                    name="education"
                                                    value={editedItem?.education}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="achievement"
                                                    value={editedItem?.achievement}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="heighlight"
                                                    value={editedItem?.heighlight}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="certificate"
                                                    value={editedItem?.certificate}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
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
                                                    style={editStylingTextarea}

                                                ></textarea>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="detailsBox">
                                <p className="detailHead">ADDRESS INFORMATION</p>
                                <div className="detailsContent">
                                    <div className="detailsLeftContainer">
                                        <p>City <span className="common-fonts redAlert"> *</span></p>
                                        <p>State</p>
                                        <p>Training Location</p>
                                        <p>Common Location</p>
                                    </div>
                                    <div className="detailsRightContainer">
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={editedItem?.city}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

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
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <div className="form-group-radio">
                                                    <label className="radio-inline">
                                                        <input
                                                            type="checkbox"
                                                            name="training_location"
                                                            value="1"
                                                            className="radio_disable check_input"

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

                                                            onChange={handleCheckboxChange}
                                                            checked={trainingLocation.includes("2")}
                                                        /> Home
                                                    </label>
                                                </div>
                                            </span>
                                        </p>
                                        <br />
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="common_location"
                                                    value={editedItem?.common_location}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="detailsBox">
                                <p className="detailHead">ADDITIONAL INFORMATION</p>
                                <div className="detailsContent">
                                    <div className="detailsLeftContainer">
                                        <p>Skills</p>
                                    </div>
                                    <div className="detailsRightContainer">
                                        <p>
                                            <span>
                                                <div className="form-group-radio">
                                                    {userSkills.map((skill, index) => (
                                                        <label className="radio-inline" key={index}>
                                                            <input
                                                                type="checkbox"
                                                                name="userSkills"
                                                                value={skill}
                                                                className="radio_disable check_input"

                                                                onChange={handleSkillChange}
                                                                checked={addedSkils.includes(skill)}
                                                            />
                                                            {skill}
                                                        </label>
                                                    ))}
                                                </div>
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
            {modalVisible && (
                <CoachLead
                    selectedItem={selectedObj}
                    closeModal={closeModal}
                />
            )}
        </div>
    )
}

export default AddCoach
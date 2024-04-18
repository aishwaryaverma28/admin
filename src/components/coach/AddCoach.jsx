import React, { useEffect, useState } from "react";
import "../styles/CreateLead.css";
import axios from "axios";
import { ADD_COACH, getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoachDetails from "../lead/CoachDetails";
import { skills } from '../utils/coachSkils';

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
        mobile: "",
        email: "",
        sport: "",
        city: "",
        state: "",
        about_coach: "",
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
        setEditedItem({
            ...editedItem,
            [name]: value,
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
            friendly: trainingLocation.toString(),
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
                        mobile: "",
                        email: "",
                        sport: "",
                        city: "",
                        state: "",
                        about_coach: "",
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
                    toast.error("Name, sport, address1, City, State and Zipcode are necessary fields", {
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
                                    <div className="detailsLeftContainer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default AddCoach
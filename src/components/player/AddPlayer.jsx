import React, { useEffect, useState } from "react";
import "../styles/CreateLead.css";
import axios from "axios";
import { ADD_PLAYER, getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerLead from "./PlayerLead"
const AddPlayer = ({ onClose }) => {
    const decryptedToken = getDecryptedToken();
    const [selectedObj, setSelectedObj] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [editedItem, setEditedItem] = useState({
        about: "",
        awards: "",
        city: "",
        address: "",
        dob: "",
        email: "",
        height: "",
        weight: "",
        mobile: "",
        name: "",
        position: "",
        facebook: "",
        instagram: "",
        sport: "",
        state: "",
        type: ""
    });
    const [stateBtn, setStateBtn] = useState(0);
    const [isHoverDisabled, setIsHoverDisabled] = useState(false);
    const openModal = (object) => {
        setModalVisible(true);
        setSelectedObj(object);
    }
    const closeModal = () => {
        setModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({
            ...editedItem,
            [name]: value,
        });
        setStateBtn(1);
    };

    const handleUpdateClick = () => {
        setStateBtn(0);
        const updatedFields = {};
        for (const key in editedItem) {
            if (editedItem.hasOwnProperty(key)) {
                if (editedItem[key] !== "") {
                    updatedFields[key] = editedItem[key];
                }
            }
        }

        axios
            .post(ADD_PLAYER, updatedFields
                , {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                if (response?.data?.status === 1) {
                    openModal(response?.data?.data?.insertId)
                    toast.success("Player added successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    setEditedItem({
                        about: "",
                        awards: "",
                        city: "",
                        address: "",
                        dob: "",
                        email: "",
                        height: "",
                        weight: "",
                        mobile: "",
                        name: "",
                        position: "",
                        facebook: "",
                        instagram: "",
                        sport: "",
                        state: "",
                        address: "",
                        type: ""
                    });
                } else {
                    toast.error(response?.data?.message, {
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
            <div className="leftCreateClose" onClick={onClose}></div>
            <div className="modal-content">
                <div class="create-lead-top">
                    <p>Add Player</p>
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
                                        <p>Email</p>
                                        <p>Mobile</p>
                                        <p>Sport</p>
                                        <p>Awards</p>
                                        <p>Date of Birth</p>
                                        <p>Height</p>
                                        <p>Weight</p>
                                        <p>Position</p>
                                        <p>Facebook</p>
                                        <p>Instagram</p>
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
                                                    style={
                                                        editStylingInput
                                                    }

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
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={editedItem?.mobile}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input list="sports" name="sport"
                                                    value={editedItem?.sport}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }
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
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="awards"
                                                    value={editedItem?.awards}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    value={editedItem?.dob || ''}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="height"
                                                    value={editedItem?.height}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="weight"
                                                    value={editedItem?.weight}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="position"
                                                    value={editedItem?.position}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

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
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p> <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="instagram"
                                                    value={editedItem?.instagram}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

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
                                                    style={
                                                        editStylingTextarea
                                                    }

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
                                        <p>Address</p>
                                        <p>City</p>
                                        <p>State</p>
                                    </div>
                                    <div className="detailsRightContainer">
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={editedItem?.address}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

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
                                                    style={
                                                        editStylingInput
                                                    }

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
                                                    style={
                                                        editStylingInput
                                                    }

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
            {modalVisible && (
                <PlayerLead
                    selectedItem={selectedObj}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default AddPlayer
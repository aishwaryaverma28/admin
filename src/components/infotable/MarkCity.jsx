import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { APPROVE_CITY, getDecryptedToken } from "../utils/Constants";

const MarkCity = ({ onClose, rowData }) => {
    const decryptedToken = getDecryptedToken();

    const handleSubmit = () => {
        axios
            .post(APPROVE_CITY, {
                temp_id: rowData?.id
            }, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                console.log(response)
                if (response?.data?.status === 1) {
                    toast.success("Review Updated successfully", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                } else {
                    toast.error(response?.data?.message, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <>
            <div className="help-modal-container lead_modal_input">
                <div className="leftCreateClose2" onClick={onClose}></div>
                <div className="help-modal-box">
                    <div>
                        <header className="headerEditor">
                            <p className="common-fonts add-new-blog"> Approve City</p>
                        </header>
                        <div className="helpContainer">
                            <div className="lead_input_box">
                                <div>
                                    <p className="helpTitle">Locality Name </p>
                                    <input
                                        type="text"
                                        placeholder="Enter Locality Name"
                                        name="locality_name"
                                        value={rowData?.locality_name}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                                <div>
                                    <p className="helpTitle">Locality</p>
                                    <input
                                        type="text"
                                        placeholder="Enter Locality"
                                        name="locality"
                                        value={rowData?.locality}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                                <div>
                                    <p className="helpTitle">City </p>
                                    <input
                                        type="text"
                                        placeholder="Enter City"
                                        name="city"
                                        value={rowData?.city}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                                <div>
                                    <p className="helpTitle">State </p>
                                    <input
                                        type="text"
                                        placeholder="Enter State"
                                        name="state"
                                        value={rowData?.state}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                                <div>
                                    <p className="helpTitle">City Id  </p>
                                    <input
                                        type="text"
                                        placeholder="Enter City Id"
                                        name="city_id"
                                        value={rowData?.city_id}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                                <div>
                                    <p className="helpTitle">Latitude </p>
                                    <input
                                        type="text"
                                        placeholder="Enter Latitude"
                                        name="lat"
                                        value={rowData?.lat}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                                <div>
                                    <p className="helpTitle">Longitude  </p>
                                    <input
                                        type="text"
                                        placeholder="Enter Longitude"
                                        name="lng"
                                        value={rowData?.lng}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                                <div>
                                    <p className="helpTitle">Type </p>
                                    <input
                                        type="text"
                                        placeholder="Enter Type"
                                        name="type"
                                        value={rowData?.type}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                                <div>
                                    <p className="helpTitle">Country </p>
                                    <input
                                        type="text"
                                        placeholder="Enter country"
                                        name="country"
                                        value={rowData?.country}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                                <div>
                                    <p className="helpTitle">PostCode <span className="common-fonts redAlert"> *</span></p>
                                    <input
                                        type="number"
                                        placeholder="Enter postcode"
                                        name="postcode"
                                        value={rowData?.postcode}
                                        disabled
                                        className="common-input"
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="city-bottom-btn">
                            <button className="common-fonts common-save-button help-save" onClick={handleSubmit}>
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
                <div className="help-cross" onClick={onClose}>
                    X
                </div>
            </div>
        </>
    );
};

export default MarkCity
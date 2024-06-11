import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import star from "../../assets/image/star.svg"
import { UPDATE_REVIEW, getDecryptedToken } from "../utils/Constants";
const UpdateReview = ({ onClose, rowData, api }) => {
    const decryptedToken = getDecryptedToken();
    const [comment, setComment] = useState(rowData?.comment || '');

    const handleChange = (event) => {
        setComment(event.target.value);
    }

    const handleCancel = () => {
        setComment(rowData?.comment || '');
    }

    const handleSubmit = () => {
        const updatedFormData = {
            review_id: rowData?.id,
            comment: comment,
        }
        axios
            .post(UPDATE_REVIEW, updatedFormData, {
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
                    api();
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
    const handleApprove = () => {
        const updatedFormData = {
            review_id: rowData?.id,
            status: 1
        }
        axios
            .post(UPDATE_REVIEW, updatedFormData, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response?.data?.status !== false) {
                    toast.success("Review approved successfully", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    api();
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
        <div className="help-modal-container lead_modal_input">
            <div className="leftCreateClose2" onClick={onClose}></div>
            <div className="help-modal-box">
                <div>
                    <header className="headerEditor">
                        <p className="common-fonts add-new-blog">Update Review</p>
                    </header>

                    <div className="helpContainer">
                        <div className="lead_input_box">
                            <div>
                                <p className="helpTitle">Name: {rowData?.name} <span className='review-rating'> {rowData?.rating}<img className="pound" src={star} alt='star' /></span></p>
                            </div>
                            <div>
                                <p className="helpTitle">Email: {rowData?.email}</p>
                            </div>
                            <div>
                                <p className="helpTitle">Phone: {rowData?.phone}</p>
                            </div>
                            <div>
                                <p className="helpTitle">{rowData?.object_type} Id: {rowData?.object_id}</p>
                            </div>
                            <div>
                                <p className="helpTitle">Likes: {rowData?.likes_count}</p>
                            </div>
                            <div className="lead_text_area">
                                <p className="helpTitle">Comment</p>
                                <textarea
                                    name="comment"
                                    rows="3"
                                    cols="3"
                                    className="common-input"
                                    value={comment}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="help-bottom-btn">
                        <button className="common-fonts common-delete-button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="common-fonts common-save-button help-save" onClick={handleApprove}>
                            Approve
                        </button>
                        <button className="common-fonts common-save-button help-save" onClick={handleSubmit}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <div className="help-cross" onClick={onClose}>
                X
            </div>
        </div>
    );
};

export default UpdateReview;

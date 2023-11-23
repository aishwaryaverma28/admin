import React, { useState, useEffect } from 'react'
import star from "../../../assets/image/star.svg"
import axios from 'axios';
import { ADD_REPLY, UPDATE_ACADEMY_REVIEW, GET_REVIEW_REPLY, getDecryptedToken } from "../../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ReviewPopup = ({ onClose, review, reviewData, academyId }) => {
    console.log(review, academyId);
    const decryptedToken = getDecryptedToken();
    const [reply, setReply] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [stateReviewBtn, setStateReviewBtn] = useState(0);
    const [stateBtn, setStateBtn] = useState(0);
    const [acaReply, setAcaReply] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(review.comment);
    const reviewReply = () => {
        const body = {
            review_id: review.id
        }
        axios.post(GET_REVIEW_REPLY, body, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
            .then((response) => {
                if (response?.data?.status === 1) {
                    console.log(response?.data?.data)
                    setAcaReply(response?.data?.data?.reverse());
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false);
            })
    }
    useEffect(() => {
        reviewReply();
    }, [])

    const handleEditClick = () => {
        setIsEditing((prevState) => !prevState);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }
    const handleSaveEdit = () => {
        axios.put(UPDATE_ACADEMY_REVIEW + review.id, { comment: editedComment }, {
            headers: {
                Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
            }
        }).then((response) => {
            console.log(response);
            toast.success("review updated successfully", {
                position: "top-center",
                autoClose: 2000,
            })
        }).catch((error) => {
            console.log(error);
        })
        setIsEditing(false);
    }
    const handleEditCommentChange = (e) => {
        setEditedComment(e.target.value);
        setStateReviewBtn(1);
    }
    const handleReplyChange = (e) => {
        setStateBtn(1);
        const newStrategyName = e.target.value;
        setReply(newStrategyName);
    }

    const handleSave = () => {
        const body = {
            parent_id: review.id,
            type: "bmp-response",
            object_type: "academy",
            object_id: parseInt(academyId),
            name: review?.name,
            comment: reply,
            status: 1,
            user_id: 2
        };
        axios.post(ADD_REPLY, body, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
            .then((response) => {
                if (response?.data?.status === 1) {
                    console.log(response?.data?.data)
                    toast.success("Reply send successfully!", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }
                reviewReply();
                reviewData();
                setReply("");
                // onClose();
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleDisapprove = () => {
        axios.put(UPDATE_ACADEMY_REVIEW + review.id, { status: 0 }, {
            headers: {
                Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
            }
        }).then((response) => {
            console.log(response);
            if (response?.data?.status === 1) {
            toast.success("review disapproved successfully", {
                position: "top-center",
                autoClose: 2000,
            })}
            onClose();
        }).catch((error) => {
            console.log(error);
        })
        reviewData();
    }
    const handleApprove = () => {
        axios.put(UPDATE_ACADEMY_REVIEW + review.id, { status: 1 }, {
            headers: {
                Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
            }
        }).then((response) => {
            console.log(response);
            if (response?.data?.status === 1) {
            toast.success("review approved successfully", {
                position: "top-center",
                autoClose: 2000,
            })}
            onClose();
        }).catch((error) => {
            console.log(error);
        })
        reviewData();
    }

    return (
        <div class="recycle-popup-wrapper">
            <div class="recycle-popup-container">
                <div className='review-top-flex'>
                    <div class="recycle-popup-box">
                        <p class="common-fonts restore-comment">Respond To Review</p>
                        <p class="common-fonts selected-comment">Write a response message on review</p>
                    </div>
                    <div className='common-fonts review-modal-cross' onClick={onClose}>X</div>
                </div>
                <div className='box-border'>
                    <div>
                        <div className='review-top-flex'>
                            <p class="common-fonts comment-head">{review?.name}<span className='review-rating'>{review?.rating}<img className="pound" src={star} alt='star' /></span></p>
                            <div className='review-top-flex' onClick={handleEditClick}>
                                <i className="fa-solid fa-pen"></i>
                                <p className="common-fonts selected-comment">Edit</p>
                            </div>
                        </div>
                        {isEditing ? (
                            <div className="bmp-add-fields">
                                <textarea
                                    name=""
                                    id=""
                                    rows="3"
                                    className="common-fonts bmp-strategy-input bmp-modal-input"
                                    value={editedComment}
                                    onChange={handleEditCommentChange}
                                ></textarea>
                                <div class="recycle-popup-btn">
                                    <button class="restore-no common-fonts" onClick={handleCancelEdit}>Cancel</button>
                                    {stateReviewBtn === 0 ? (
                                        <button className="disabledBtn">Save</button>
                                    ) : (
                                        <button
                                            className="common-fonts common-save-button comment-save"
                                            onClick={handleSaveEdit}
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="common-fonts selected-comment">{review?.comment}</p>
                            </>
                        )}
                    </div>

                    <br />
                    <div className='replysContainer'>
                        {isLoading ? (
                            <><p class="common-fonts selected-comment">Loading ...</p></>
                        ) : acaReply?.length === 0 ? (
                            <><p class="common-fonts selected-comment">No data found</p></>
                        ) :
                            (
                                acaReply?.map((item, index) => (
                                    <>
                                        <div className='replyName'>
                                            <p class="common-fonts reply-head">{item?.name}</p>
                                            <p class="common-fonts selected-comment">{item?.comment}</p>
                                        </div>
                                    </>))
                            )}
                    </div>
                    <br />
                    <br />
                    <div className="bmp-add-fields">
                        <textarea
                            name=""
                            id=""
                            rows="5"
                            className="common-fonts bmp-strategy-input bmp-modal-input"
                            placeholder='Type your response here *'
                            value={reply}
                            onChange={handleReplyChange}
                        ></textarea>
                        <div class="recycle-popup-btn">

                            {stateBtn === 0 ? (
                                <button className="disabledBtn">Save</button>
                            ) : (
                                <button
                                    className="common-fonts common-save-button comment-save"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div class="recycle-popup-btn">
                    <button class="restore-no common-fonts" onClick={handleDisapprove}>Disapprove</button>
                    <button
                        className="common-fonts common-save-button comment-save"
                        onClick={handleApprove}
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReviewPopup
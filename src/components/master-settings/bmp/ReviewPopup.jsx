import React, { useState, useEffect } from 'react'
import star from "../../../assets/image/star.svg"
import axios from 'axios';
import { ADD_REPLY, GET_REVIEW_REPLY, getDecryptedToken } from "../../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ReviewPopup = ({ onClose, review, reviewData, academyId }) => {
    console.log(review, academyId);
    const decryptedToken = getDecryptedToken();
    const [reply, setReply] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [stateBtn, setStateBtn] = useState(0);
    const [acaReply, setAcaReply] = useState([])
    const [isEditing, setIsEditing] = useState(false);
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
        setIsEditing(true);
    }

    const handleCancelEdit = () => {
        setIsEditing(false);
    }
    const handleSaveEdit = () => {
        // Save edited comment logic here
        setIsEditing(false);
    }
    const handleReplyChange = (e) => {
        setStateBtn(1);
        const newStrategyName = e.target.value;
        setReply(newStrategyName);
    }

    const handleSave = () => {
        const body = {
            parent_id: review.id,
            type: "academy-response",
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
                                    rows="5"
                                    className="common-fonts bmp-strategy-input bmp-modal-input"
                                    placeholder='Type your response here *'
                                    value={review.comment}
                                    onChange={handleReplyChange}
                                ></textarea>
                                <button className="common-fonts common-save-button comment-save" onClick={handleSaveEdit}>
                                    Save
                                </button>
                                <button className="common-fonts restore-no" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
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
                    </div>
                </div>
                <div class="recycle-popup-btn">
                    <button class="restore-no common-fonts" onClick={onClose}>Close</button>
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
    )
}

export default ReviewPopup
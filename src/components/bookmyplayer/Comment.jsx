import React from 'react'
import "../styles/Comment.css";
import star from "../../assets/image/star.svg"
import { useState } from 'react';
const Comment = ({ onClose, review }) => {
  const [reply, setReply] = useState("");
  const [stateBtn, setStateBtn] = useState(0);

  const handleReplyChange = (e) => {
    setStateBtn(1);
    const newStrategyName = e.target.value;
    setReply(newStrategyName);
  }
  return (
    <div class="recycle-popup-wrapper">

      <div class="recycle-popup-container">
        <div class="recycle-popup-box">
          <p class="common-fonts restore-comment">Respond To Review</p>
          <p class="common-fonts selected-comment">Write a response message on review</p>
        </div>
        <div className='box-border'>
          <div>
            <p class="common-fonts comment-head">{review?.name}<span className='review-rating'>{review?.rating}<img className="pound" src={star} alt='star' /></span></p>
            <p class="common-fonts selected-comment">{review?.comment}</p>
          </div>
          <br />
          <br />
          <div className="bmp-add-fields">
            <textarea
              name=""
              id=""
              rows="5"
              className="common-fonts bmp-strategy-input bmp-modal-input"
              placeholder='Type your response here'
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
            // onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {getDecryptedToken} from "../../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';


const ReviewPopup = ({ onClose}) => {
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


    </div>
  </div>
  )
}

export default ReviewPopup
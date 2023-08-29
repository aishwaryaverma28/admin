import React, { useState, useEffect } from "react";
import "../assets/image/email-sync-tick.svg";
import TickMark from "../assets/image/white-tick-mark.svg";
import UserIcon from "../assets/image/user-icon.svg";
import Download from "../assets/image/download.svg";
import axios from 'axios';
import {
  getDecryptedToken,
  GET_SERVICE
} from './utils/Constants';

const TickIcon = () => {
  const decryptedToken = getDecryptedToken();
  const [ticket, setTicket] = useState([]);
  const [isLoading,setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const getTicket = () => {
    axios
      .get(GET_SERVICE, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setTicket(response?.data?.data);
        console.log("hyiy")
        console.log(response.data.data)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

useEffect(()=>{
getTicket();
},[])


  const handleSuccess = () => {
    setIsSuccess(true);
    // You can trigger the successful completion of the process here or from the parent component.
  };

  return (
    <div className="time-container">
      <p className="common-fonts time-request-heading">Service request</p>
      <p className="common-fonts time-request-note">
        Unable to create deals (INC0027899)
      </p>

      <div>
        <div className="service-user-details">
          <p className="common-fonts service-user-name">Name</p>
          <p className="common-fonts">anant singh chauhan</p>
        </div>
        <div className="service-user-details">
          <p className="common-fonts service-user-name">phone</p>
          <p className="common-fonts">7456982315</p>
        </div>
        <div className="service-user-details">
          <p className="common-fonts service-user-name">email</p>
          <p className="common-fonts">anantsingh@gmail.com</p>
        </div>
        <div className="service-user-details">
          <p className="common-fonts service-user-name">priority</p>
          <p className="common-fonts">High</p>
        </div>
      </div>

      <div className="time-progress-section1">
        <div className="green-color-tick">
          <img src={TickMark} alt="" />
        </div>

        <div className="service-request-open">
          <p className="common-fonts">Service request open</p>
          <p className="common-fonts service-date">August 3, 2023</p>
        </div>
        <div className="green-line"></div>
      </div>

      <div className="time-progress-section2">
        <div className="green-color-tick">
          <img src={TickMark} alt="" />
        </div>

        <div className="service-request-open">
          <p className="common-fonts">Agent assigned</p>
          <p className="common-fonts service-date">August 3, 2023</p>
          <div className="time-user-name">
            <div className="time-user-icon">
              <img src={UserIcon} alt="" />
            </div>
            <p className="common-fonts">Uday Misra</p>
          </div>
        </div>
        <div className="white-line"></div>
      </div>

      <div className="time-progress-section1">
        <div className="white-color-tick">
          <img src={TickMark} alt="" />
        </div>

        <div className="service-request-open">
          <p className="common-fonts issue-resolved">Issue Resolved</p>
        </div>
        <div className="white-line"></div>
      </div>

      <div className="attachments-section">
        <p className="common-fonts time-attachments">Attachments</p>
        <p className="common-fonts time-screenshot">
          screenshot_deals_2023 <img src={Download} alt="" />
        </p>
      </div>
    </div>
  );
};

export default TickIcon;

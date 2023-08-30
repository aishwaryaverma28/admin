import React, { useState, useEffect } from "react";
import "../assets/image/email-sync-tick.svg";
import TickMark from "../assets/image/white-tick-mark.svg";
import UserIcon from "../assets/image/user-icon.svg";
import Download from "../assets/image/download.svg";
import GreaterDown from "../assets/image/greater-arrow-down.svg";
import GreaterUp from "../assets/image/greater-up.svg";
import axios from "axios";
import { getDecryptedToken, GET_SERVICE } from "./utils/Constants";

const TickIcon = () => {
  const decryptedToken = getDecryptedToken();
  const [ticket, setTicket] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleTicket = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  

  const getTicket = () => {
    axios
      .get(GET_SERVICE, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setTicket(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTicket();
  }, []);

  const handleSuccess = () => {
    setIsSuccess(true);
    // You can trigger the successful completion of the process here or from the parent component.
  };

  return (
    <div className="time-container">
    {
      isLoading ? (
        <p className="common-fonts ticket-loading">Loading...</p>
      )
      :
      ticket.map((ticket,index)=>{
        return (
          <div className="time-box" key={index}>
      <div>
      <div className="time-ticket-top">
      <div className="service-user-details">
          <p className="common-fonts service-user-name">Title</p>
          {isLoading ? (
            <p>-</p>
          ) : (
            <p className="common-fonts">{ticket.title}</p>
          )}
        </div>
      <div className="service-user-details">
          {isLoading ? (
            <p>-</p>
          ) : (
            <p className="common-fonts ticket-date">{formatDate(ticket.created_at.split("T")[0])}</p>
          )}
        </div>

      </div>
      <div className="time-ticket-top">
      <div className="service-user-details">
          <p className="common-fonts service-user-name">Support Request No</p>
          {isLoading ? (
            <p>-</p>
          ) : (
            <p className="common-fonts">{ticket.id}</p>
          )}
        </div>
        {
          openIndex !== index && (

            <div className="service-user-details ticket-img" onClick={() => toggleTicket(index)}>
          <img src={GreaterDown} alt="" />
        </div>

          )
        }


      </div>


        {
          openIndex === index && (
            <>

                                
        <div className="service-user-details">
          <p className="common-fonts service-user-name">phone</p>
          {isLoading ? (
            <p>-</p>
          ) : (
            <p className="common-fonts">{ticket.mobile}</p>
          )}
        </div>
        <div className="service-user-details">
          <p className="common-fonts service-user-name">email</p>
          {isLoading ? (
            <p>-</p>
          ) : (

            <p className="common-fonts" style={{ textTransform: "lowercase" }}>
              {ticket.email}
            </p>
          )}
        </div>
        
        <div className="service-user-details">
          <p className="common-fonts service-user-name">priority</p>
          {isLoading ? (
            <p>-</p>
          ) : (
            <p className="common-fonts">{ticket.priority}</p>
          )}
        </div>

            </>

          )
        }
        </div>

        {
          openIndex === index && (
            <>
            
      {ticket.status === "Open" ? (
        <div className="time-progress-section1">
          <div className="green-color-tick">
            <img src={TickMark} alt="" />
          </div>
          <div className="service-request-open">
            <p className="common-fonts">Service request open</p>
            {isLoading ? (
              <p>-</p>
            ) : (
              <p className="common-fonts service-date">
                {ticket.updated_at.split("T")[0]}
              </p>
            )}
          </div>
          <div className="green-line"></div>
        </div>
      ) : (
        <div className="time-progress-section1">
          <div className="white-color-tick">
            <img src={TickMark} alt="" />
          </div>
          <div className="service-request-open">
            <p className="common-fonts issue-resolved">Service request open</p>
          </div>
          <div className="white-line"></div>
        </div>
      )}
      {ticket.assigned_to !== null ? (
        <div className="time-progress-section2">
          <div className="green-color-tick">
            <img src={TickMark} alt="" />
          </div>

          <div className="service-request-open">
            <p className="common-fonts">Agent assigned</p>
            {isLoading ? (
              <p>-</p>
            ) : (
              <p className="common-fonts service-date">
                {ticket.updated_at.split("T")[0]}
              </p>
            )}
            <div className="time-user-name">
              <div className="time-user-icon">
                <img src={UserIcon} alt="" />
              </div>
              <p className="common-fonts">{ticket.assigned_to}</p>
            </div>
          </div>
          <div className="white-line"></div>
        </div>
      ) : (
        <div className="time-progress-section1">
          <div className="white-color-tick">
            <img src={TickMark} alt="" />
          </div>
          <div className="service-request-open">
            <p className="common-fonts issue-resolved">Agent assigned</p>
          </div>
          <div className="white-line"></div>
        </div>
      )}

      <div className="time-progress-section1">
        <div className="white-color-tick">
          <img src={TickMark} alt="" />
        </div>

        <div className="service-request-open">
          <p className="common-fonts issue-resolved">Issue Resolved</p>
        </div>
        <div className="white-line"></div>
      </div>



      <div className="time-ticket-top attachments-section">
      <div>
        <p className="common-fonts time-attachments">Attachments</p>
        <p className="common-fonts time-screenshot">
          screenshot_deals_2023 <img src={Download} alt="" />
        </p>
      </div>
      <div className="service-user-details ticket-img" onClick={() => toggleTicket(index)}>
          <img src={GreaterUp} alt="" />
        </div>

      </div>

            </>
          )

        }




    </div>
        )
      })
    }

    {/* <div className="time-bottom-btn">
      <button className="common-delete-button">Cancel</button>
      <button className="common-save-button time-save">Save</button>
    </div> */}
    </div>
  );
};

export default TickIcon;

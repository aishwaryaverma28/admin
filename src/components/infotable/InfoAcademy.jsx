import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  cdnurl,
  getDecryptedToken,
} from "../utils/Constants.js"
import { toast } from 'react-toastify';
import AcadmeyLead from '../lead/AcadmeyLead.jsx';
const InfoAcademy = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [data, setData] = useState({})

  // const fetchLead = () => {
  //   let body = {
  //     academy_id: tempAcademyId,
  //     type: "temp"
  //   };

  //   axios
  //     .post(GET_ACADEMY, body, {
  //       headers: {
  //         Authorization: `Bearer ${decryptedToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       setData(response?.data?.data[0]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   fetchLead();
  // }, []);


  return (
    <>
      <div className="modal modal-zindex">
        <div className="leftClose" onClick={onClose}></div>
        <div className="customization_popup_container">
          <span className="close" onClick={onClose}>
            <i className="fa-sharp fa-solid fa-xmark"></i>
          </span>
          <div className="user-details--right">
            <div className="academy-card">
              <div className="card-container">
                <div className="card-leftBox">
                  <div className="user-details">
                    <p className="heading">
                      Id- Academy Name
                    </p>
                  </div>
                  <div className="lead-value">
                  </div>
                  <div className="contact-details">
                    <div className="mail sportCap">
                      <p>Academy Sport</p>
                    </div>
                    <div className="mail">
                      <p>Phone Number</p>
                    </div>
                    <div className="mail">
                      <p>Email</p>
                    </div>
                    <div className="mail sportCap">
                      <p>City, State</p>
                    </div>
                  </div>
                </div>
                <div className="DealCard-rightBox">
                  <div className="mail">
                    <div className="new_preview_flex">
                      <img
                        src={`${cdnurl}asset/images/logo.svg`}
                        alt="pofile"
                        className="bmp-preview-image"
                      />
                      {/* <a href={data?.logo === null
                    ? `${cdnurl}asset/images/logo.svg`
                    : `${cdnurl}academy_temp/${data?.id}/${data?.logo}`} target="_blank" rel="noopener noreferrer">
                    <img
                      src={data?.logo === null
                        ? `${cdnurl}asset/images/logo.svg`
                        : `${cdnurl}academy_temp/${data?.id}/${data?.logo}`}
                      alt="pofile"
                      className="bmp-preview-image"
                    />
                  </a> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="academy-card">
              <div className="card-container">
                <div className="card-leftBox">
                  <div className="user-details">
                    <p className="heading">
                      Id- Academy Name
                    </p>
                  </div>
                  <div className="lead-value">
                  </div>
                  <div className="contact-details">
                    <div className="mail sportCap">
                      <p>Academy Sport</p>
                    </div>
                    <div className="mail">
                      <p>Phone Number</p>
                    </div>
                    <div className="mail">
                      <p>Email</p>
                    </div>
                    <div className="mail sportCap">
                      <p>City, State</p>
                    </div>
                  </div>
                </div>
                <div className="DealCard-rightBox">
                  <div className="mail">
                    <div className="new_preview_flex">
                      <img
                        src={`${cdnurl}asset/images/logo.svg`}
                        alt="pofile"
                        className="bmp-preview-image"
                      />
                      {/* <a href={data?.logo === null
                    ? `${cdnurl}asset/images/logo.svg`
                    : `${cdnurl}academy_temp/${data?.id}/${data?.logo}`} target="_blank" rel="noopener noreferrer">
                    <img
                      src={data?.logo === null
                        ? `${cdnurl}asset/images/logo.svg`
                        : `${cdnurl}academy_temp/${data?.id}/${data?.logo}`}
                      alt="pofile"
                      className="bmp-preview-image"
                    />
                  </a> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoAcademy
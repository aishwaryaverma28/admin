import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  cdnurl,
  getDecryptedToken,
  LEADS_BY_ENTITY
} from "../utils/Constants.js"
const InfoAcademy = ({ onClose, page, limit, data, entity }) => {
  const decryptedToken = getDecryptedToken();
  const [newdata, setNewData] = useState([])

  const fetchLead = () => {
    let body = {
      "entity": entity,
      "city": data?.city,
      "sport": data?.sport,
      "page": page,
      "limit": limit
    };

    axios
      .post(LEADS_BY_ENTITY, body, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setNewData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchLead();
  }, []);

  return (
    <>
      <div className="modal modal-zindex">
        <div className="leftClose" onClick={onClose}></div>
        <div className="customization_popup_container">
          <span className="close" onClick={onClose}>
            <i className="fa-sharp fa-solid fa-xmark"></i>
          </span>
          <div className="user-details--right">
            <div className="new-info-card">
              <>
                {newdata?.map((object) => (
                  <div key={object?.id} className="academy-card">
                    <div className="card-container">
                      <div className="card-leftBox">
                        <div className="user-details">
                          <p className="heading">
                            {object?.id} - {object?.name}
                          </p>
                        </div>
                        <div className="lead-value">
                        </div>
                        <div className="contact-details">
                          <div className="mail sportCap">
                            <p>{object?.sport}</p>
                          </div>
                          <div className="mail">
                            <p>{object?.phone}</p>
                          </div>
                          <div className="mail sportCap">
                            <p>{object?.city}, {object?.state}</p>
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
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoAcademy
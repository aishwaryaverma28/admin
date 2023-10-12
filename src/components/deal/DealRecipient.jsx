import React, { useEffect, useState, useRef } from "react";
import StageIcon from "../../assets/image/stage-icon.svg";
import trash from "../../assets/image/TrashFill.svg";
import axios from "axios";
import {
  SEND_ENVELOPE, //post api
} from "../utils/Constants";

  //   {POST API BODY
  //     dealId: dealId,
  //     recipatant: [
  //         {
  //             "email": "maheshmhaske241198@gmail.com",
  //             "name": "Mahesh",
  //             "recipientId": "3"
  //         }
  //     ],
  //     bearerToken: token,
  //     DocBase64: doc
  // }

const DealRecipient = ({ onClose, onClosePrevious, dealId, token, doc }) => {
  const [recipients, setRecipients] = useState([
    {
      recipientId: 1,
      name: "",
      email: "",
    },
  ]);

  const addRecipient = () => {
    if (recipients.length < 10) {
      const newRecipient = {
        recipientId: recipients.length + 1,
        name: "",
        email: "",
      };
      setRecipients([...recipients, newRecipient]);
    }
  };

  const removeRecipient = (index) => {
    const updatedRecipients = [...recipients];
    updatedRecipients.splice(index, 1);
    setRecipients(updatedRecipients);
  };

  return (
    <>
      <div className="help-modal-container">
        <div className="help-modal-box recipient-modal-box">
          <div className="doc-preview-top">
            <div className="doc-preview-number">
              <p className="common-fonts doc-preview-one">2</p>
            </div>

            <div className="doc-preview-para">
              <p className="common-fonts doc-preview-heading">Add Recipients</p>
            </div>
          </div>

          <div>
            <div className="recipient-top">
              <label className="custom-checkbox">
                <input type="checkbox" className="cb1" name="headerCheckBox" />
                <span className="checkmark"></span>
              </label>
              <p className="common-fonts signing-order">Set Signing Order</p>
            </div>

            {recipients.map((recipient, index) => (
              <div className="recipient-start" key={recipient.recipientId}>
                <img src={StageIcon} alt="" />
                <div className="recipient-input-flex">
                  <label htmlFor="" className="common-fonts recipient-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="common-fonts common-input recipient-input"
                  />
                </div>
                <div className="recipient-input-flex">
                  <label htmlFor="" className="common-fonts recipient-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="common-fonts common-input recipient-input"
                  />
                </div>

                <div className="recipient-input-flex">
                  <div className="recipient-trash">
                    <img
                      src={trash}
                      alt=""
                      onClick={() => removeRecipient(index)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="count-add-recipients">
              <p className="common-fonts add-recipients" onClick={addRecipient}>
                + Add recipients
              </p>
              <p className="common-fonts count-recipients">
                {recipients.length}/10 recipients
              </p>
            </div>
          </div>
        </div>
        <div
          className="help-cross recipient-cross"
          onClick={() => {
            onClose();
            onClosePrevious();
          }}
        >
          X
        </div>
      </div>
    </>
  );
};

export default DealRecipient;

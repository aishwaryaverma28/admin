import React, { useRef, useState } from "react";
import "../styles/CPGenral.css";
import axios from "axios";
import { REPLY_TO_TICKET, getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRequest = ({ onClose, rowData }) => {
  const decryptedToken = getDecryptedToken();
const handleCancel = () => {
}

const handleApprove = () => {
 axios
    .post(REPLY_TO_TICKET, {
      "status": 3
  }, {
        headers: {
            Authorization: `Bearer ${decryptedToken}`,
        },
    })
    .then((response) => {
        if (response?.data?.status !== false) {
            toast.success("Ticket approved successfully", {
                position: "top-center",
                autoClose: 2000,
            });
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
    <div className="popup-wrapper">
      <div className="leftCreateClose2" onClick={onClose}></div>
      <div className="product-popup-container">
        <div className="product-popup-box edit-service-box">
          <div>
            <header className="headerEditor">
              <p className="common-fonts add-new-blog">Update Ticket</p>
            </header>
            <div className="helpContainer">
              <div className="lead_input_box">
                <div>
                  <p className="helpTitle">Name : {rowData?.title}</p>
                </div>
                <div>
                  <p className="helpTitle">Email : {rowData?.email}</p>
                </div>
                <div>
                  <p className="helpTitle">Phone : {rowData?.phone}</p>
                </div>
                <div>
                  <p className="helpTitle">{rowData?.category} Id : {rowData?.user_id}</p>
                </div>
                <div>
                  <p className="helpTitle">Priority : {rowData?.priority}</p>
                </div>
                <div>
                  <p className="helpTitle">Description : {rowData?.description}</p>
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
                    </div>
          </div>
        </div>
      </div>
      <div className="help-cross" onClick={onClose}>
        X
      </div>
    </div>
  );
};

export default EditRequest;

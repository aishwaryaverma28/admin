import React, { useState, useEffect } from "react";
import "../styles/HelpModal.css";
import axios from "axios";
import { UPDATE_ACADEMY, getDecryptedToken } from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStrategyModal = ({ onClose}) => {

  const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("id");
  const [stateBtn, setStateBtn] = useState(0);



  return (
    <>
      <div className="help-modal-container">
        <div className="help-modal-box">
          <section>
            <div className="bmp-add-new-batch">
              <p className="common-fonts bmp-add-heading">Update Strategy</p>
            </div>

            <div className="bmp-modal-form">
              <div className="bmp-add-fields">
                <label htmlFor="" className="common-fonts light-color">
                  Strategy Name
                </label>
                <input
                  type="text"
                  className="common-fonts common-input bmp-modal-input"
                />
              </div>
              <div className="bmp-add-fields">
                <label htmlFor="" className="common-fonts light-color">
                  Strategy Description
                </label>
                <textarea
                  name=""
                  id=""
                  rows="5"
                  className="common-fonts bmp-strategy-input bmp-modal-input"
                ></textarea>
              </div>
            </div>

            <div className="bmp-add-bottom-btn">
              <button className="common-fonts common-white-button" onClick={onClose}>
                Cancel
              </button>
              {stateBtn === 0 ? (
                <button className="disabledBtn">Update</button>
              ) : (
                <button
                  className="common-fonts common-save-button"
                >
                  Update
                </button>
              )}
            </div>
          </section>
        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateStrategyModal;

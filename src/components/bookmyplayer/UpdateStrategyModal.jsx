import React, { useState, useEffect } from "react";
import "../styles/HelpModal.css";
import axios from "axios";
import { UPDATE_ACADEMY, getDecryptedToken } from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStrategyModal = ({ onClose,fetchData, updateIndex, name, description}) => {
console.log(name);
console.log(description)
  const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("academy_id");
  const [stateBtn, setStateBtn] = useState(0);
  const [sName, setSName] = useState(name[updateIndex]);
  const [descrip, setDescrip] = useState(description[updateIndex]);
  const [initialName, setInitialName] = useState(name[updateIndex]);
  const [initialDescrip, setInitialDescrip] = useState(description[updateIndex]);

  const handleNameChange = (e) => {
    setStateBtn(1);
    const newStrategyName = e.target.value;
    setSName(newStrategyName);
  };

  const handleDescChange = (e) => {
    setStateBtn(1);
    const newStrategyName = e.target.value;
    setDescrip(newStrategyName);
  };

  const handleCancel = () => {
    setSName(initialName);
    setDescrip(initialDescrip);
    setStateBtn(0);
  };

  const handleUpdate = () => {
    const updatedNameArray = [...name];
    const updatedDescriptionArray = [...description];
    updatedNameArray[updateIndex] = sName;
    updatedDescriptionArray[updateIndex] = descrip;
    const updatedNameString = updatedNameArray.reverse().join('$@$@$');
    const updatedDescriptionString = updatedDescriptionArray.reverse().join('$@$@$');
    axios
      .put(
        UPDATE_ACADEMY + academyId,
        {
          strategy_name: updatedNameString,
          training_strategy: updatedDescriptionString,
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          }
        }
      )
      .then((response) => {
        fetchData();
        onClose();
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  };


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
                  value={sName}
                  onChange={handleNameChange}
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
                  value={descrip}
                  onChange={handleDescChange}
                ></textarea>
              </div>
            </div>

            <div className="bmp-add-bottom-btn">
              <button className="common-fonts common-white-button" onClick={handleCancel}>
                Cancel
              </button>
              {stateBtn === 0 ? (
                <button className="disabledBtn">Update</button>
              ) : (
                <button
                  className="common-fonts common-save-button"
                  onClick={handleUpdate}
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

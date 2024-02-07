import React, { useState } from "react";

const LeadModal = ({ onClose }) => {
    const [stateBtn, setStateBtn] = useState(0);
  return (
    <>
      <div className="help-modal-container lead_modal_input">
        <div className="help-modal-box">
          <div>
            <header className="headerEditor">
              <p className="common-fonts add-new-blog"> Add a new Lead</p>
            </header>

            <div className="helpContainer">
              <div className="lead_input_box">
                <div>
                  <p className="helpTitle">Name</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Name"
                    name="name"
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">Object Type</p>
                  <select name="" id="" className="common-select">
                    <option value="academy">Academy</option>
                    <option value="player">Player</option>
                    <option value="coach">Coach</option>
                  </select>
                </div>

                <div>
                  <p className="helpTitle">Phone</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Phone"
                    name="name"
                    className="common-input"
                  ></input>
                </div>

                <div className="lead_text_area">
                  <p className="helpTitle">
                    Description
                    {/* <span className="common-fonts redAlert"> *</span> */}
                  </p>
                  <textarea
                    name="intro"
                    type="textarea"
                    rows="3"
                    cols="3"
                    placeholder="Enter Lead Description"
                    className="common-input"
                  ></textarea>
                </div>

                <div>
                  <p className="helpTitle">Type</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Type"
                    name="name"
                    className="common-input"
                  ></input>
                </div>

                <div>
                  <p className="helpTitle">Refer</p>
                  <input
                    type="text"
                    placeholder="Enter Lead Refer"
                    name="name"
                    className="common-input"
                  ></input>
                </div>
              </div>
            </div>

            <div className="help-bottom-btn">
              <button className="common-fonts common-delete-button">
                Cancel
              </button>
              {stateBtn === 0 ? (
                <button className="disabledBtn" disabled>
                  Save
                </button>
              ) : (
                <button className="common-fonts common-save-button help-save">
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
    </>
  );
};

export default LeadModal;

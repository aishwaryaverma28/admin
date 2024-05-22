import React, { useState, useEffect } from "react";


const UrlModal = ({ onClose }) => {
    const [stateBtn, setStateBtn] = useState(0);


  return (
    <>
      <div className="help-modal-container lead_modal_input">
      <div className="leftCreateClose2" onClick={onClose}></div>
        <div className="help-modal-box">
          <div>
            <header className="headerEditor">
              <p className="common-fonts add-new-blog">Add Url</p>
            </header>

            <div className="helpContainer url_box">
              <div className="lead_input_box">
                <div>
                  <p className="helpTitle">Old Url </p>
                  <input
                    type="text"
                    placeholder="Enter Old Url"
                    name="old_url"
                    className="common-input"
                  ></input>
                </div>
                <div>
                  <p className="helpTitle">New Url </p>
                  <input
                    type="text"
                    placeholder="Enter New Url"
                    name="new_url"
                    className="common-input"
                  ></input>
                </div>
              </div>
            </div>
            <br />
            <div className="url_bottom_btn">
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

export default UrlModal;

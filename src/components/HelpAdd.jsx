import React from "react";
import "./styles/HelpAdd.css";
const HelpAdd = () => {
  return (
    <>
      <header className="helpHead">
        <h2>Add Help</h2>
      </header>
      <div className="helpContainer">
      <div className="helpBody">
        <p className="helpTitle">Question Title</p>
        <input type="text" placeholder="Enter Question"></input>
        <p className="helpTitle">Answer Description</p>
        <textarea
          type="textarea"
          rows="5"
          cols="5"
          placeholder="Enter Answer"
        ></textarea>
      </div>
      <div className="helpRight">
      <div className="siteBox">
                <div className="siteHead"><h3>Site</h3></div>
                <div className="contentBox">
                  <select
                    className="SiteSelectBox"
                  >
                    <option value="">Select a Site</option>
                    <option value="leadplaner">leadplaner</option>
                    <option value="bookmyplayer">bookmyplayer</option>
                    <option value="routplaner">routplaner</option>
                  </select>
                </div>
              </div>
      </div>
      </div>
      <div className="help-bottom-btn">
        <button className="common-fonts common-delete-button">Cancel</button>
        <button className="common-fonts common-save-button help-save">Save</button>
      </div>
    </>
  );
};

export default HelpAdd;

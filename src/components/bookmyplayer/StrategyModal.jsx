import React, { useState } from "react";
import "../styles/HelpModal.css";


const StrategyModal = ({ onClose }) => {

  return (
    <>
      <div className="help-modal-container">
        <div className="help-modal-box">
          <section>
          <div className="bmp-add-new-batch">
          <p className="common-fonts bmp-add-heading">Add Strategy</p>
          </div>

          <div className="bmp-modal-form">
            <div className="bmp-add-fields">
            <label htmlFor="" className="common-fonts light-color">Strategy Name</label>
                <input type="text" className="common-fonts common-input bmp-modal-input" />
            </div>
            <div className="bmp-add-fields">
            <label htmlFor="" className="common-fonts light-color">Strategy Description</label>
                <textarea name="" id="" rows="5" className="common-fonts bmp-strategy-input bmp-modal-input"></textarea>
            </div>
          </div>

          <div className="bmp-add-bottom-btn">
            <button className="common-fonts common-white-button">Cancel</button>
            <button className="common-fonts common-save-button">Save</button>
          </div>
          

          </section>
          
        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
    </>
  );
};

export default StrategyModal;

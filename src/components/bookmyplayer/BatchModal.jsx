import React, { useState } from "react";
import "../styles/HelpModal.css";


const BatchModal = ({ onClose }) => {

  return (
    <>
      <div className="help-modal-container">
        <div className="help-modal-box">
          <section>
          <div className="bmp-add-new-batch">
          <p className="common-fonts bmp-add-heading">Add Batch</p>
          </div>

          <div className="bmp-modal-form">
            <div className="bmp-add-fields">
            <label htmlFor="" className="common-fonts light-color">Batch Name</label>
                <input type="text" className="common-fonts common-input bmp-modal-input" />
            </div>

            <div>
            <label htmlFor="" className="common-fonts light-color">Age Group</label>
            <div className="bmp-input-flex bmp-add-fields">
            <input type="number" className="common-fonts common-input bmp-modal-input" />
                <p className="common-fonts light-color bmp-to">To</p>
                <input type="number" className="common-fonts common-input bmp-modal-input" />
            </div>
               
            </div>

            <div className="bmp-add-fields">
            <label htmlFor="" className="common-fonts light-color">Weekly days</label>
                <div className="bmp-days">
                    <div className="common-fonts bmp-add-days bmp-add-days-1">Sun</div>
                    <div className="common-fonts bmp-add-days">Mon</div>
                    <div className="common-fonts bmp-add-days">Tue</div>
                    <div className="common-fonts bmp-add-days">Wed</div>
                    <div className="common-fonts bmp-add-days">Thu</div>
                    <div className="common-fonts bmp-add-days">Fri</div>
                    <div className="common-fonts bmp-add-days">Sat</div>
                    <div className="common-fonts bmp-add-days bmp-add-days-2">Sun</div>
                </div>
            </div>

            <div>
            <label htmlFor="" className="common-fonts light-color">Timings</label>
            <div className="bmp-input-flex bmp-add-fields">
            <select name="" id="" className="common-fonts common-input bmp-modal-select">
                <option value="">HH:MM</option>
            </select >
               <div className="bmp-am">
                <input className="common-fonts" placeholder="AM"></input>
               </div>
                <p className="common-fonts light-color bmp-to">To</p>

               <select name="" id="" className="common-fonts common-input bmp-modal-select">
                <option value="">HH:MM</option>
            </select >
            <div className="bmp-am">
                <input className="common-fonts" placeholder="PM"></input>
               </div>
            </div>
               
            </div>
            <div>
            <label htmlFor="" className="common-fonts light-color">Fee</label>
            <div className="bmp-input-flex bmp-add-fields">
            <select name="" id="" className="common-fonts common-input bmp-modal-select bmp-select-fee">
                <option value="">Months</option>
            </select >
               <select name="" id="" className="common-fonts common-input bmp-modal-select bmp-select-fee">
                <option value="">Days/Week</option>
            </select >

            <input type="text" className="common-fonts common-input bmp-modal-input" placeholder="Amount in rupees"/>
            
            </div>
               
            </div>

            <div>
                <button className="common-fonts common-white-blue-button">+ Add fields</button>
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

export default BatchModal;

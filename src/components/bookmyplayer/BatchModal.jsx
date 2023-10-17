import React, { useState } from "react";
import "../styles/HelpModal.css";
import axios from "axios";
import { getDecryptedToken, ADD_BATCH } from "../utils/Constants";

const BatchModal = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [selectedDays, setSelectedDays] = useState([]);
  const [days, setDays] = useState("");

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      // If the day is already selected, remove it
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      // If the day is not selected, add it
      setSelectedDays([...selectedDays, day]);
    }
  };
  const selectedDaysString = selectedDays.join(", ");
  console.log(selectedDaysString);

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
                <label htmlFor="" className="common-fonts light-color">
                  Batch Name
                </label>
                <input
                  type="text"
                  className="common-fonts common-input bmp-modal-input"
                />
              </div>

              <div>
                <label htmlFor="" className="common-fonts light-color">
                  Age Group
                </label>
                <div className="bmp-input-flex-2 bmp-add-fields">
                  <input
                    type="number"
                    className="common-fonts common-input bmp-modal-input"
                  />
                  <p className="common-fonts light-color bmp-to">To</p>
                  <input
                    type="number"
                    className="common-fonts common-input bmp-modal-input"
                  />
                </div>
              </div>

              <div className="bmp-add-fields">
                <label htmlFor="" className="common-fonts light-color">
                  Weekly days
                </label>
                <div className="bmp-days">
                   <div
                className={`common-fonts bmp-add-days bmp-add-days-1 ${
                  selectedDays.includes("Sun") ? "blueDiv" : ""
                }`}
                onClick={() => handleDayClick("Sun")}
              >
                Sun
              </div>
              <div
                className={`common-fonts bmp-add-days ${
                  selectedDays.includes("Mon") ? "blueDiv" : ""
                }`}
                onClick={() => handleDayClick("Mon")}
              >
                Mon
              </div>
              <div
                className={`common-fonts bmp-add-days ${
                  selectedDays.includes("Tue") ? "blueDiv" : ""
                }`}
                onClick={() => handleDayClick("Tue")}
              >
                Tue
              </div>
              <div
                className={`common-fonts bmp-add-days ${
                  selectedDays.includes("Wed") ? "blueDiv" : ""
                }`}
                onClick={() => handleDayClick("Wed")}
              >
                Wed
              </div>
              <div
                className={`common-fonts bmp-add-days ${
                  selectedDays.includes("Thu") ? "blueDiv" : ""
                }`}
                onClick={() => handleDayClick("Thu")}
              >
                Thu
              </div>
              <div
                className={`common-fonts bmp-add-days ${
                  selectedDays.includes("Fri") ? "blueDiv" : ""
                }`}
                onClick={() => handleDayClick("Fri")}
              >
                Fri
              </div>
              <div
                className={`common-fonts bmp-add-days bmp-add-days-2 ${
                  selectedDays.includes("Sat") ? "blueDiv" : ""
                }`}
                onClick={() => handleDayClick("Sat")}
              >
                Sat
              </div>
                </div>
              </div>

              <div>
                <label htmlFor="" className="common-fonts light-color">
                  Timings
                </label>
                <div className="bmp-input-flex-2 bmp-add-fields">
                  <select
                    name=""
                    id=""
                    className="common-fonts common-input bmp-modal-select"
                  >
                    <option value="">HH:MM</option>
                  </select>
                  <div className="bmp-am">
                    <input className="common-fonts" placeholder="AM"></input>
                  </div>
                  <p className="common-fonts light-color bmp-to">To</p>

                  <select
                    name=""
                    id=""
                    className="common-fonts common-input bmp-modal-select"
                  >
                    <option value="">HH:MM</option>
                  </select>
                  <div className="bmp-am">
                    <input className="common-fonts" placeholder="PM"></input>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="" className="common-fonts light-color">
                  Fee
                </label>
                <div className="bmp-input-flex-2 bmp-add-fields">
                  <select
                    name=""
                    id=""
                    className="common-fonts common-input bmp-modal-select bmp-select-fee"
                  >
                    <option value="">Months</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  {/* <select
                    name=""
                    id=""
                    className="common-fonts common-input bmp-modal-select bmp-select-fee"
                  >
                    <option value="">Days/Week</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select> */}

                  <input
                    type="text"
                    className="common-fonts common-input bmp-modal-input"
                    placeholder="Amount in rupees"
                  />
                </div>
              </div>

              <div>
                <button className="common-fonts common-white-blue-button">
                  + Add fields
                </button>
              </div>
            </div>

            <div className="bmp-add-bottom-btn">
              <button className="common-fonts common-white-button">
                Cancel
              </button>
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

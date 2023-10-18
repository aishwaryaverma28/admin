import React, { useState, useRef, useEffect } from "react";
import "../styles/bmp.css";
import Map from "../../assets/image/map.png";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { GET_ACADEMY,UPDATE_ACADEMY, getDecryptedToken } from "../utils/Constants";

const BmpOverview = () => {
  const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("id");
  const [academyData, setAcademyData] = useState({});
  const [phoneNumberCount, setPhoneNumberCount] = useState(1);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState([true]);
  const [alwaysOpenChecked, setAlwaysOpenChecked] = useState(true);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [stateBtn, setStateBtn] = useState(0);  

  const academyDetails = () => {
    axios
      .get(GET_ACADEMY + academyId, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data?.data[0]);
        setAcademyData(response?.data?.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    academyDetails();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    if (academyData[name] !== value) setStateBtn(1);
    setAcademyData({ ...academyData, [name]: value });
  }
  const handleDayClick = (day) => {
    setStateBtn(1);
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  const selectedDaysString = selectedDays.join(", ");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAlwaysOpenCheckboxChange = () => {
    setAlwaysOpenChecked(!alwaysOpenChecked);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setSelectedFile(file);
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates]; // Create a copy of the array
    newCheckboxStates[index] = !newCheckboxStates[index]; // Toggle the state of the clicked checkbox
    setCheckboxStates(newCheckboxStates); // Update the state
  };

  const addPhoneNumberInput = () => {
    setPhoneNumberCount(phoneNumberCount + 1);
    setIsButtonVisible(false);
    setCheckboxStates([...checkboxStates, true]);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      name: academyData?.name,
      about: academyData?.about,
      phone: academyData.phone,
      address1: academyData?.address1,
      facebook: academyData?.facebook,
      instagram: academyData?.instagram,
      sport: academyData?.selectedDaysString,
    };
    axios.put(UPDATE_ACADEMY, updatedFormData, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    }).then((response) => {
      console.log(response);
      // toast.success("User data updated successfully", {
      //   position:"top-center",
      //   autoClose:2000
      // })
      
    });
    setStateBtn(0);
  }

  const data = {
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#007bff", "#d3d3d3"],
        hoverBackgroundColor: ["#0056b3", "#d3d3d3"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "85%", // Adjusts the thickness of the progress bar
    maintainAspectRatio: false,
    legend: {
      display: false, // Hide legend
    },
    tooltip: {
      enabled: false, // Hide tooltips
    },
  };

  return (
    <>
      <div className="bmp-container">
        <div>
          <p className="common-fonts bmp-top">Address & Contact details</p>

          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Academy name
            </label>
            <input
              type="text"
              className="common-fonts common-input bmp-input"
              name="name"
              onChange={handleChange}
              value={isLoading ? '-' : academyData?.name || ""}
            />
          </div>
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Introduction
            </label>
            <textarea
              name="about"
              onChange={handleChange}
              value={isLoading ? '-' : academyData?.about || ""}
              id=""
              className="common-fonts bmp-textarea"
              rows="2"
            ></textarea>
          </div>
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Address
            </label>
            <textarea
              name="address1"
              onChange={handleChange}
              value={isLoading ? '-' : academyData?.address1 || ""}
              id=""
              className="common-fonts bmp-textarea"
              rows="2"
            ></textarea>
          </div>
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Select your sport
            </label>
            <div className="bmp-games">
              <div
                className={`common-fonts bmp-game-list ${
                  selectedDays.includes("Football") ? "bmp-game-active" : ""
                }`}
                onClick={() => handleDayClick("Football")}
              >
                Football
              </div>
              <div
                className={`common-fonts bmp-game-list ${
                  selectedDays.includes("Basketball") ? "bmp-game-active" : ""
                }`}
                onClick={() => handleDayClick("Basketball")}
              >
                Basketball
              </div>
              <div
                className={`common-fonts bmp-game-list ${
                  selectedDays.includes("Chess") ? "bmp-game-active" : ""
                }`}
                onClick={() => handleDayClick("Chess")}
              >
                Chess
              </div>
              <div
                className={`common-fonts bmp-game-list ${
                  selectedDays.includes("Tennis") ? "bmp-game-active" : ""
                }`}
                onClick={() => handleDayClick("Tennis")}
              >
                Tennis
              </div>
              <div
                className={`common-fonts bmp-game-list ${
                  selectedDays.includes("MMA") ? "bmp-game-active" : ""
                }`}
                onClick={() => handleDayClick("MMA")}
              >
                MMA
              </div>
              <div
                className={`common-fonts bmp-game-list ${
                  selectedDays.includes("Golf") ? "bmp-game-active" : ""
                }`}
                onClick={() => handleDayClick("Golf")}
              >
                Golf
              </div>
              <div
                className={`common-fonts bmp-game-list ${
                  selectedDays.includes("Hockey") ? "bmp-game-active" : ""
                }`}
                onClick={() => handleDayClick("Hockey")}
              >
                Hockey
              </div>
              <div
                className={`common-fonts bmp-game-list ${
                  selectedDays.includes("Badminton") ? "bmp-game-active" : ""
                }`}
                onClick={() => handleDayClick("Badminton")}
              >
                Badminton
              </div>
              <div
                className={`common-fonts bmp-game-list ${
                  selectedDays.includes("Volleyball") ? "bmp-game-active" : ""
                }`}
                onClick={() => handleDayClick("Volleyball")}
              >
                Volleyball
              </div>
            </div>
          </div>

          {[...Array(phoneNumberCount)].map((_, index) => (
            <div className="bmp-input-flex">
              <div className="bmp-phone-field">
                <label htmlFor="" className="common-fonts bmp-academy-name">
                  {index === 0 ? "Phone Number" : `Phone Number ${index + 1}`}
                </label>

                <div className="bmp-whatsapp-check">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="cb1"
                      name="headerCheckBox"
                      checked={checkboxStates[index]} // Use the checkbox state from the array
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p className="common-fonts light-color">Whatsapp Activated</p>
                </div>
              </div>

              <input
                type="text"
                className="common-fonts common-input bmp-input"
                name="phone"
                onChange={handleChange}
              value={isLoading ? '-' : academyData?.phone || ""}
              />
            </div>
          ))}

          {isButtonVisible && (
            <div>
              <button
                className="common-fonts common-white-blue-button bmp-add-phone"
                onClick={addPhoneNumberInput}
              >
                + Add Phone Number
              </button>
            </div>
          )}

          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Email
            </label>
            <input
              type="email"
              className="common-fonts common-input bmp-input"
            />
          </div>
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Website
            </label>
            <input
              type="text"
              name="website"
              onChange={handleChange}
              value={isLoading ? '-' : academyData?.website || ""}
              className="common-fonts common-input bmp-input"
            />
          </div>

          <div className="bmp-input-flex bmp-last-time">
            <div className="bmp-phone-field">
              <label htmlFor="" className="common-fonts bmp-academy-name">
                Open Timings
              </label>
              <div className="bmp-whatsapp-check">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    className="cb1"
                    name="headerCheckBox"
                    checked={alwaysOpenChecked}
                    onChange={handleAlwaysOpenCheckboxChange}
                  />
                  <span className="checkmark"></span>
                </label>
                <p className="common-fonts light-color">Always Open</p>
              </div>
            </div>

            <div className="bmp-input-flex-2 bmp-add-fields bmp-new-timing">
                      <div className="">
                        <input
                          className="common-fonts common-input common-fonts bmp-time-input bmp-new-width"
                          placeholder="Enter Time"
                        ></input>
                      </div>
                      <select
                        name="time"
                        id=""
                        className="common-fonts common-input bmp-modal-select bmp-new-width"

                      >
                        <option value="">AM/PM</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>

                      <p className="common-fonts light-color bmp-to">To</p>

                      <div className="">
                        <input
                          className="common-fonts common-input common-fonts bmp-time-input bmp-new-width"
                          placeholder="Enter Time"
                        ></input>
                      </div>

                      <select
                        name=""
                        id=""
                        className="common-fonts common-input bmp-modal-select bmp-new-width"
                       
                      >
                        <option value="">AM/PM</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
          </div>
        </div>

        <div>
          <div className="bmp-top-right">
            <div className="status-of-profile">
              <p className="common-fonts">Update Profile</p>
              <div className="progress-bar">
                <div className="bmp-small-circle bmp-completed-stage">1</div>
                <div className="bmp-line"></div>
                <div className="bmp-small-circle bmp-completed-stage">2</div>
                <div className="bmp-line"></div>
                <div className="bmp-small-circle">3</div>
                <div className="bmp-line"></div>
                <div className="bmp-small-circle">4</div>
              </div>
            </div>

            <div className="bmp-msg">
              <p className="common-fonts bmp-now ">Profile Complete</p>
              <div className="bmp-circle">
                <Doughnut data={data} options={options} />
                <div className="circle-percentage">
                  <span className="common-fonts percentage-value">70%</span>
                </div>
              </div>
              <button className="common-fonts bmp-complete-btn">
                Complete Now
              </button>
            </div>
          </div>

          <div className="bmp-right-fields">
            <p className="common-fonts">Upload Academic Logo</p>
            <p className="common-fonts">Recommended image size 190x190</p>

            <div className="bmp-upload">
              <div className="contact-browse deal-doc-file">
                <span
                  className="common-fonts common-input contact-tab-input"
                  style={{
                    position: "relative",
                    marginRight: "10px",
                  }}
                >
                  <button
                    className="contact-browse-btn common-fonts"
                    onClick={() => handleButtonClick()}
                  >
                    Browse
                  </button>

                  <input
                    type="file"
                    style={{
                      display: "none",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      width: "100%",
                    }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <span className="common-fonts upload-file-name">
                    {/* {fileName} */}
                    {academyData?.logo}
                    {}
                  </span>
                </span>
              </div>

              {selectedFile && (
                <div className="bmp-image-preview">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected Preview"
                    className="bmp-preview-image"
                  />
                </div>
              )}
            </div>

            <p className="common-fonts bmp-social">
              Connect Social Media Account
            </p>

            <div className="bmp-input-flex">
              <label htmlFor="" className="common-fonts bmp-academy-name">
                Facebook
              </label>
              <input
                type="text"
                className="common-fonts common-input bmp-input"
                name="facebook"
                onChange={handleChange}
              value={isLoading ? '-' : academyData?.facebook || ""}
              />
            </div>
            {/* <div className="bmp-input-flex">
              <label htmlFor="" className="common-fonts bmp-academy-name">
                Twitter
              </label>
              <input
                type="text"
                className="common-fonts common-input bmp-input"
              />
            </div> */}
            <div className="bmp-input-flex">
              <label htmlFor="" className="common-fonts bmp-academy-name">
                Instagram
              </label>
              <input
                type="text"
                className="common-fonts common-input bmp-input"
                name="instagram"
                onChange={handleChange}
                value={isLoading ? '-' : academyData?.instagram || ""}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bmp-bottom-btn">
        <button className="common-fonts common-white-button">cancel</button>
        {/* <button className="common-save-button common-save">Save</button> */}
        {stateBtn === 0 ? (
                        <button className="disabledBtn">Save</button>
                      ) : (
                        <button className="common-save-button common-save" onClick={handleSubmit}>Save</button>
                      )}
      </div>
    </>
  );
};

export default BmpOverview;

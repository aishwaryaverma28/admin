import React, { useState, useRef, useEffect } from "react";
import "../styles/bmp.css";
import Map from "../../assets/image/map.png";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import {
  GET_ACADEMY,
  UPDATE_ACADEMY,
  getDecryptedToken,
} from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BmpOverview = () => {
  const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("id");
  const [academyData, setAcademyData] = useState({});
  const [phoneNumberCount, setPhoneNumberCount] = useState(1);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState([true]);
  const [alwaysOpenChecked, setAlwaysOpenChecked] = useState(true);
  const [timingValues, setTimingValues] = useState([]);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileName2, setFileName2] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [stateBtn, setStateBtn] = useState(0);
  const [selectedDaysString, setSelectedDaysString] = useState("");
  const [timeArr, setTimeArr] = useState([]);
  const [number, setNumber] = useState(0);

  const handleTimingChange = (index = 0, value, type) => {
    const newValues = [...timingValues];
    newValues[index] = { ...newValues[index], [type]: value };
    setTimingValues(newValues);
    setStateBtn(1);
  };

  const academyDetails = () => {
    axios
      .get(GET_ACADEMY + academyId, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setAcademyData(response?.data?.data[0]);
        console.log(response?.data?.data[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const createFolder = async () => {
    const cloudinaryFolder = "bookmyplayer/academy"; // Path to the parent folder
    const apiUrl =
      "http://core.leadplaner.com:3001/api/bmp/cloudinary/createFolder";
    const body = {
      folderPath: cloudinaryFolder + "/" + academyId,
    };
    axios
      .post(apiUrl, body, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        // console.log(response)
      })
      .catch((error) => {
        toast.error("Some Error Occoured!", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };
  useEffect(() => {
    createFolder();
    academyDetails();
  }, []);

  const handleFileChange = (event) => {
    setStateBtn(1)
    const selectedImage = event.target.files[0];
    submitImage(event.target.files[0]);
    console.log(selectedImage);
    if (selectedImage) {
      setFileName2(selectedImage.name); // Set the file name
      setSelectedFile(selectedImage); // Set the selected file
    }
  };
  const submitImage = (file) => {
    const selectedImage = file;
    console.log(file);
    if (selectedImage) {
      const folder = "bookmyplayer/academy/" + academyId;
      const uniqueFileName = `${folder}/${selectedImage.name.replace(
        /\.[^/.]+$/,
        ""
      )}`;
      const data = new FormData();
      data.append("file", selectedImage);
      data.append("upload_preset", "zbxquqvw");
      data.append("cloud_name", "cloud2cdn");
      data.append("public_id", uniqueFileName);

      fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.secure_url);
          setFileName(data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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

  useEffect(() => {
    setSelectedDaysString(selectedDays.join(","));
  }, [selectedDays]);

  useEffect(() => {
    setSelectedDays(academyData?.sport?.split(",") || []);
  }, [academyData]);

  useEffect(() => {
    const filteredValues = timingValues
      .filter(
        (value) =>
          value &&
          value.toTime !== undefined &&
          value.fromTime !== undefined &&
          value.period !== undefined &&
          value.period2 !== undefined
      )
      .map(
        (value) =>
          `${value.fromTime}${value.period} to ${value.toTime}${value.period2}`
      );

    setTimeArr(filteredValues);
  }, [timingValues]);

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleAlwaysOpenCheckboxChange = () => {
    setAlwaysOpenChecked(!alwaysOpenChecked);
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates]; // Create a copy of the array
    newCheckboxStates[index] = !newCheckboxStates[index]; // Toggle the state of the clicked checkbox
    setCheckboxStates(newCheckboxStates); // Update the state
  };

  const addPhoneNumberInput = () => {
    setCheckboxStates([false]); // Uncheck the checkbox
    setPhoneNumberCount(phoneNumberCount + 1);
    setIsButtonVisible(false);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      name: academyData?.name,
      about: academyData?.about,
      phone: academyData.phone,
      whatsapp: academyData.whatsapp,
      address1: academyData?.address1,
      facebook: academyData?.facebook,
      instagram: academyData?.instagram,
      website: academyData?.website,
      sport: selectedDaysString?.replace(/^,+/g, ""),
      email: academyData?.email,
      timing: [...timeArr] && [...timeArr].length === 0 ? "" : [...timeArr],
      logo: fileName,
    };

    axios
      .put(UPDATE_ACADEMY + academyId, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if (response.data.status === 1) {
          toast.success("Details updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("Some Error Occurred", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .finally(() => {
        setStateBtn(0);
      });
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

  // useEffect(() => {
  //   // Parse timing values from the API response when it's available
  //   if (academyData && academyData.timing) {
  //     const [fromTime, period, toTime, period2] = academyData.timing
  //       .replace(/[^\dA-Za-z]/g, '') // Remove non-alphanumeric characters
  //       .split(/([A-Za-z]+)/) // Split at alphabets (AM/PM)
  //       .filter(Boolean); // Filter out empty strings

  //     setTimingValues([{ fromTime, period, toTime, period2 }]);
  //   }
  // }, [academyData]);

  useEffect(() => {
    // Parse timing values from the API response when it's available
    if (academyData && academyData.timing) {
      const timingRegex = /(\d+)([APap][Mm])\s*to\s*(\d+)([APap][Mm])/;
      const [, fromTime, period, toTime, period2] =
        academyData.timing.match(timingRegex) || [];

      if (fromTime && period && toTime && period2) {
        setTimingValues([{ fromTime, period, toTime, period2 }]);
      } else {
        // Handle invalid timing format if needed
      }
    }
  }, [academyData]);

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
              value={isLoading ? "-" : academyData?.name || ""}
            />
          </div>
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Introduction
            </label>
            <textarea
              name="about"
              onChange={handleChange}
              value={isLoading ? "-" : academyData?.about || ""}
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
              value={isLoading ? "-" : academyData?.address1 || ""}
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
                  {index === 0 ? "Phone Number" : `Whatsapp Number`}
                </label>

                {index === 0 && (
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
                    <p className="common-fonts light-color">
                      Whatsapp Activated
                    </p>
                  </div>
                )}
              </div>

              <input
                type="text"
                className="common-fonts common-input bmp-input"
                name={index === 0 ? "phone" : "whatsapp"}
                onChange={handleChange}
                value={
                  isLoading
                    ? "-"
                    : index === 0
                    ? academyData?.phone
                    : academyData?.whatsapp
                }
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
              name="email"
              className="common-fonts common-input bmp-input"
              onChange={handleChange}
              value={isLoading ? "-" : academyData?.email || ""}
              style={{ textTransform: "none" }}
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
              value={isLoading ? "-" : academyData?.website || ""}
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
                  value={timingValues[0]?.fromTime}
                  onChange={(e) =>
                    handleTimingChange(0, e.target.value, "fromTime")
                  }
                ></input>
              </div>
              <select
                name=""
                id=""
                className="common-fonts common-input bmp-modal-select bmp-new-width"
                onChange={(e) =>
                  handleTimingChange(0, e.target.value, "period")
                }
                // value={obj?.timing
                //   ?.split(",")
                //   [index]?.split("to")[1]
                //   ?.replace(/\d+/g, "")
                //   .trim()}
                value={timingValues[0]?.period}
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
                  value={
                    timingValues[0]?.toTime
                    // batchDetails?.timing
                    //   ?.split(",")
                    //   [index]?.split("to")[1]
                    //   ?.replace(/[APap][Mm]/g, "")
                    //   .trim() ||
                  }
                  onChange={(e) =>
                    handleTimingChange(0, e.target.value, "toTime")
                  }
                ></input>
              </div>

              <select
                name=""
                id=""
                className="common-fonts common-input bmp-modal-select bmp-new-width"
                onChange={(e) =>
                  handleTimingChange(0, e.target.value, "period2")
                }
                // value={obj?.timing
                //   ?.split(",")
                //   [index]?.split("to")[1]
                //   ?.replace(/\d+/g, "")
                //   .trim()}
                value={timingValues[0]?.period2}
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
                    onClick={handleButtonClick}
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
                    {fileName2 ? fileName2 :academyData?.logo?.toString()?.split('/')?.pop()}
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
                value={isLoading ? "-" : academyData?.facebook || ""}
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
                value={isLoading ? "-" : academyData?.instagram || ""}
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
          <button
            className="common-save-button common-save"
            onClick={handleSubmit}
          >
            Save
          </button>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default BmpOverview;

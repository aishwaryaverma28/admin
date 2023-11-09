import React, { useState, useRef, useEffect } from "react";
import "../styles/bmp.css";
import Map from "../../assets/image/map.png";
import "chart.js/auto";
import axios from "axios";
import {
  CREATE_FOLDER,
  GET_ACADEMY,
  UPDATE_ACADEMY,
  getDecryptedToken,
} from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "./ProgressBar";

const BmpOverview = () => {
  const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("academy_id");
  const [academyData, setAcademyData] = useState({});
  const [phoneNumberCount, setPhoneNumberCount] = useState(1);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isWhatsappActivated, setIsWhatsappActivated] = useState(true);
  const [alwaysOpenChecked, setAlwaysOpenChecked] = useState(true);
  const [timingValues, setTimingValues] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  // const [fileName2, setFileName2] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [stateBtn, setStateBtn] = useState(0);
  const [selectedDaysString, setSelectedDaysString] = useState("");
  const [timeArr, setTimeArr] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  // const [number, setNumber] = useState(0);
  const [progress, setProgress] = useState(null);
  const [progressArray, setProgressArray] = useState([]);
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const languages = [
    { value: 'Hindi', label: 'Hindi' },
    { value: 'English', label: 'English' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Urdu', label: 'Urdu' },
    { value: 'Gujarati', label: 'Gujarati' },
    { value: 'Malayalam', label: 'Malayalam' },
    { value: 'Punjabi', label: 'Punjabi' },
    { value: 'Odia', label: 'Odia' },
    { value: 'Sindhi', label: 'Sindhi' },
    { value: 'Bhojpuri', label: 'Bhojpuri' },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setStateBtn(1);
  };


  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsWhatsappActivated(checked);

    if (checked) {
      setPhoneNumberCount(1);
      setIsButtonVisible(true);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const hour = hours < 10 ? `0${hours}` : `${hours}`;
        const minute = minutes === 0 ? '00' : `${minutes}`;
        const time = `${hour}:${minute}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleTimeChange = (event) => {
    setSelectedStartTime(event.target.value);
    setStateBtn(1);
  };
  const handleEndTimeChange = (event) => {
    setSelectedEndTime(event.target.value);
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
        setSelectedLanguage(response?.data?.data[0]?.spoken_languages);
        setAcademyData(response?.data?.data[0]);
        setProgress(response?.data?.data[0]?.completion_percentage);
        if (response?.data?.data[0]?.completion_percentage !== "" && response?.data?.data[0]?.completion_percentage !== null) {
          setProgressArray(response?.data?.data[0]?.completion_percentage.split(","));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const createFolder = async () => {
    const cloudinaryFolder = "bookmyplayer/academy";
    const apiUrl = CREATE_FOLDER;
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
  useEffect(() => {
    // Parse timing values from the API response when it's available
    if (academyData && academyData.timing) {
      if (academyData.timing === "Always_open") {
        setAlwaysOpenChecked(true);
      } else {
        const timingParts = academyData.timing.split(" to ");
        if (timingParts.length === 2) {
          const [startTime, endTime] = timingParts;
          setAlwaysOpenChecked(false);
          setSelectedStartTime(startTime);
          setSelectedEndTime(endTime);
        }
      }
    }
  }, [academyData]);
  const processImageName = (imageName) => {
    const nameParts = imageName.split('.');
    if (nameParts.length > 1) {
      const namePart = nameParts.slice(0, -1).join('.');
      const processedName = namePart.replace(/[^\w-]/g, '-');
      return `${processedName}.${nameParts[nameParts.length - 1]}`;
    } else {
      return imageName.replace(/[^\w-]/g, '-');
    }
  };

  const handleFileChange = (event) => {
    setStateBtn(1);
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      if (!allowedImageTypes.includes(selectedImage.type)) {
        alert("Please choose a valid image file (JPEG, PNG, GIF).");
        return;
      }
      submitImage(event.target.files[0]);
    }
  };
  const submitImage = (file) => {
    const selectedImage = file;
    if (selectedImage) {
      if (selectedImage.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB. Please choose a smaller image.");
        return;
      }
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
      setIsUploading(true);
      fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(selectedImage);
          setSelectedFile(selectedImage);
          setFileName(processImageName(selectedImage.name));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsUploading(false);
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
    if (selectedDays?.includes(day)) {
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
    setStateBtn(1);
  };

  const addPhoneNumberInput = () => {
    setIsWhatsappActivated(false); // Uncheck the checkbox
    setPhoneNumberCount(phoneNumberCount + 1);
    setIsButtonVisible(false);
  };
  const startAndEndTime = alwaysOpenChecked ? "Always_open" : `${selectedStartTime} to ${selectedEndTime}`;
  function handleSubmit(event) {
    event.preventDefault();
    if (!progressArray?.includes("1")) {
      progressArray.push("1");
      setProgressArray(progressArray);
    }
    const combinedProgress = progressArray?.join(",");
        const updatedFormData = {
      spoken_languages: selectedLanguage,
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
      timing: startAndEndTime,
      logo: fileName,
      completion_percentage: combinedProgress,
    };
    console.log(updatedFormData)

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
        academyDetails();
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
                className={`common-fonts bmp-game-list ${selectedDays?.includes("Football") ? "bmp-game-active" : ""
                  }`}
                onClick={() => handleDayClick("Football")}
              >
                Football
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("Basketball") ? "bmp-game-active" : ""
                  }`}
                onClick={() => handleDayClick("Basketball")}
              >
                Basketball
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("Chess") ? "bmp-game-active" : ""
                  }`}
                onClick={() => handleDayClick("Chess")}
              >
                Chess
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("Tennis") ? "bmp-game-active" : ""
                  }`}
                onClick={() => handleDayClick("Tennis")}
              >
                Tennis
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("MMA") ? "bmp-game-active" : ""
                  }`}
                onClick={() => handleDayClick("MMA")}
              >
                MMA
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("Golf") ? "bmp-game-active" : ""
                  }`}
                onClick={() => handleDayClick("Golf")}
              >
                Golf
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("Hockey") ? "bmp-game-active" : ""
                  }`}
                onClick={() => handleDayClick("Hockey")}
              >
                Hockey
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("Badminton") ? "bmp-game-active" : ""
                  }`}
                onClick={() => handleDayClick("Badminton")}
              >
                Badminton
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("Volleyball") ? "bmp-game-active" : ""
                  }`}
                onClick={() => handleDayClick("Volleyball")}
              >
                Volleyball
              </div>
            </div>
          </div>
          {[...Array(phoneNumberCount)].map((_, index) => (
            <div className="bmp-input-flex" key={index}>
              <div className="bmp-phone-field">
                <label htmlFor="" className="common-fonts bmp-academy-name">
                  {index === 0 ? "Phone Number" : `Whatsapp Number`}
                </label>

                {index === 0 && ( // Render checkbox and label only for the first phone number input
                  <div className="bmp-whatsapp-check">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        className="cb1"
                        name="headerCheckBox"
                        checked={isWhatsappActivated}
                        onChange={handleCheckboxChange}
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

            {!alwaysOpenChecked && (
              <div className="bmp-input-flex-2 bmp-add-fields bmp-new-timing">
                <select className="common-fonts common-input bmp-modal-select-2 overviewTime" value={selectedStartTime} onChange={handleTimeChange}>
                  <option value="">Select Opening time</option>
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <p className="common-fonts light-color bmp-to">To</p>
                <select className="common-fonts common-input bmp-modal-select-2 overviewTime" value={selectedEndTime} onChange={handleEndTimeChange}>
                  <option value="">Select closing time</option>
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div>
          <ProgressBar array={progressArray} />
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
                  {isUploading ? (
                    <span className="common-fonts upload-file-name">Uploading...</span>
                  ) : (
                    <span className="common-fonts upload-file-name">
                      {fileName
                        ? fileName
                        : academyData?.logo}
                      { }
                    </span>
                  )}
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

              {!selectedFile && (
                <div className="bmp-image-preview">
                  <img
                    src={`https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${academyId}/${academyData?.logo}`}
                    alt=""
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
            <div className="bmp-input-flex">
              <label className="common-fonts bmp-academy-name">Select a Language: </label>
              <select value={selectedLanguage} onChange={handleLanguageChange} className="common-fonts common-input langSelect">
                {languages.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
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

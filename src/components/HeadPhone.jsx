import React, { useRef, useState } from "react";
import axios from "axios";
import { ADD_TICKET, getDecryptedToken } from "./utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeadPhone = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const decryptedToken = getDecryptedToken();
  const [stateBtn, setStateBtn] = useState(0);
  const [details, setDetails] = useState({
    title: "",
    description: "",
    email: "",
    mobile: "",
    category: "Technical",
    priority: "Low",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // You can upload the file to the server here using APIs, if needed.
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
    setStateBtn(1);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(ADD_TICKET, details, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response);
        toast.success("Ticket is added successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setDetails({
          title: "",
          description: "",
          email: "",
          mobile: "",
          category: "",
          priority: "",
        });
        setStateBtn(0);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setStateBtn(0);
  };

  return (
    <div className="headphone-container">
      <p className="common-fonts contact-support-heading">Contact support</p>

      <div>
        <form action="">
          <div className="contact-tab-fields">
            <label htmlFor="" className="common-fonts contact-tab-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="common-fonts common-input contact-tab-input"
            />
          </div>

          <div className="contact-tab-fields">
            <label htmlFor="" className="common-fonts contact-tab-label">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              className="common-fonts common-input contact-tab-input contact-tab-textarea"
              placeholder="Describe your issue in detail"
            ></textarea>
          </div>

          <div className="contact-tab-fields">
            <label htmlFor="" className="common-fonts contact-tab-label">
            Moblie No.
            </label>
            <div>
              {/* <select name="" id="" className="common-input contact-tab-select">
                <option value="">+91</option>
              </select>{" "} */}
              <input
                type="text" name="mobile"
                onChange={handleChange}
                className="common-input contact-tab-mobile contact-tab-input headphone-input"
              />
            </div>
          </div>

          <div className="contact-tab-fields">
            <label htmlFor="" className="common-fonts contact-tab-label">
              Confirm email address
            </label>
            <input
              type="email" name="email"
              onChange={handleChange}
              className="common-fonts common-input email-case contact-tab-input"
            />
          </div>

          <div className="contact-tab-fields">
            <label htmlFor="" className="common-fonts contact-tab-label">
              Type of issue
            </label>
            <select
             name="category"
             onChange={handleChange}
              className="common-input contact-type-of-issue"
            >
              <option value="technical">Technical</option>
              <option value="Non Technical">Non Technical</option>
            </select>
          </div>

          <div className="contact-tab-fields">
            <label htmlFor="" className="common-fonts contact-tab-label">
              Priority
            </label>
            <select
               name="priority"
               onChange={handleChange}
              className="common-input contact-type-of-issue"
            >
              <option value="Low">Low</option>
              <option value="Average">Average</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="contact-tab-fields">
            <label
              htmlFor="fileInput"
              className="common-fonts contact-tab-label"
            >
              Attachment
            </label>
            <div className="contact-browse">
              <span
                className="common-fonts common-input contact-tab-input"
                style={{
                  position: "relative",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                <button
                  onClick={handleBrowseClick}
                  className="contact-browse-btn common-fonts "
                >
                  Browse
                </button>
                <input
                  type="file"
                  id="fileInput"
                  style={{
                    opacity: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    cursor: "pointer",
                  }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                {fileName && (
                  <span className="common-fonts upload-file-name">
                    Selected File: {fileName}
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="contact-support-button headphone-btn">
          <button className="common-white-button" onClick={handleCancelBtn}>Cancel</button>
              {stateBtn === 0 ? (
                <button className="disabledBtn" disabled>
                  Save
                </button>
              ) : (
                <button
                  className="common-save-button permission-save-btn"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeadPhone;

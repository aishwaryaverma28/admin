import React, { useRef, useState } from "react";
import "../styles/CPGenral.css";
import axios from "axios";
import { cdnurl, ADD_TICKET_REPLY, getDecryptedToken, config, GET_USER_TICKETS } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AWS from 'aws-sdk';
import { useEffect } from "react";
const SupportRequest = ({ onClose, ticket, getTicket, page }) => {
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const decryptedToken = getDecryptedToken();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [stateBtn, setStateBtn] = useState(0);
  const [replies, setReplies] = useState([]);
  const [details, setDetails] = useState({
    status: "",
    description: "",
    attachment: "",
    parent_id: ticket?.id,
  });
  const getReplies = () => {
    axios
      .post(GET_USER_TICKETS + ticket?.id, {}, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setReplies(response?.data?.data?.chat);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getReplies();
  }, [])
  const processImageName = (imageName) => {
    const nameParts = imageName.split(".");
    if (nameParts?.length > 1) {
      const namePart = nameParts.slice(0, -1).join(".");
      const processedName = namePart.replace(/[^\w-]/g, "-");
      return `${processedName}.${nameParts[nameParts.length - 1]}`;
    } else {
      return imageName.replace(/[^\w-]/g, "-");
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      submitImage(file);
    }
  };
  const submitImage = (file) => {
    const selectedImage = file;

    if (selectedImage) {
      const processedFileName = processImageName(selectedImage.name);
      const modifiedFile = new File([selectedImage], processedFileName, { type: selectedImage.type });

      AWS.config.update({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        region: config.region,
      });

      const s3 = new AWS.S3();
      const params = {
        Bucket: 'destcdn90',
        Body: modifiedFile,
        Key: `attachments/tickets/${modifiedFile.name}`,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error('Error uploading file:', err);
        } else {
          setFileName(modifiedFile.name);
          setDetails((prevDetails) => ({
            ...prevDetails,
            attachment: modifiedFile.name,
          }));
        }
      });
    }
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(details);
    axios
      .post(ADD_TICKET_REPLY, details, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        if (response?.data?.status === 1) {
          toast.success("Reply is added successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error(response?.data?.message, {
            position: "top-center",
            autoClose: 1000,
          });
        }
        getTicket(page);
      })
      .catch((error) => {
        console.log(error)
      })
  };
  return (
    <div className="popup-wrapper">
      <div className="product-popup-container">
        <div className="leftCreateClose" onClick={onClose}></div>
        <div className="product-popup-box edit-service-box">
          <div>
            <p className="common-fonts contact-support-heading">Edit Service</p>
            <div>
              <form>
                <div className="contact-tab-fields">
                  <label htmlFor="" className="common-fonts contact-tab-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="common-fonts common-input contact-tab-input"
                    value={ticket?.name}
                    disabled
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
                    value={ticket?.description}
                    disabled
                  ></textarea>
                </div>

                <div className="contact-tab-fields">
                  <label htmlFor="" className="common-fonts contact-tab-label">
                    Moblie No.
                  </label>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      className="common-input contact-tab-input"
                      value={ticket?.phone}
                      disabled
                    />
                  </div>
                </div>

                <div className="contact-tab-fields">
                  <label htmlFor="" className="common-fonts contact-tab-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="common-fonts common-input contact-tab-input email-case"
                    value={ticket?.email}
                    disabled
                  />
                </div>
                <div className=" bigReplies">
                <p className="common-fonts reply-head">Replies: </p>
                {replies?.map((item) => (
                  <div className='replyName'>
                    <div className='review-top-flex'>
                      <p className="common-fonts reply-head">{item?.description}</p>
                    </div>
                    <div className='flexBox'>
                      <p className="common-fonts selected-comment">Status: {item?.status}</p>
                      <div className="bmp-upload">
                        {item?.attachment && (
                          <div className="bmp-image-preview">
                            <a href={item?.attachment === null
                              ? `${cdnurl}attachments/tickets/${item?.attachment}`
                              : `${cdnurl}attachments/tickets/${item?.attachment}`} target="_blank" rel="noopener noreferrer">
                              <img
                                src={item?.attachment === null
                                  ? `${cdnurl}attachments/tickets/${item?.attachment}`
                                  : `${cdnurl}attachments/tickets/${item?.attachment}`}
                                alt=""
                                className="bmp-preview-image"
                              />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}</div>
                <div className="contact-tab-fields">
                  <label htmlFor="" className="common-fonts contact-tab-label">
                    Status
                  </label>
                  <select
                    className="common-input contact-type-of-issue"
                    value={ticket?.status}
                    onChange={handleChange}
                    name="status"
                  >
                    <option value=""></option>
                    <option value="waiting for support">waiting for support</option>
                    <option value="in progress">in progress</option>
                    <option value="canceled">canceled</option>
                    <option value="resolved">resolved</option>
                    <option value="closed">closed</option>
                  </select>
                </div>

                <div className="contact-tab-fields">
                  <label htmlFor="" className="common-fonts contact-tab-label">
                    Reply
                  </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    className="common-fonts common-input contact-tab-input contact-tab-textarea"
                    placeholder="Reply to the issue raised"
                    value={details?.description}
                  ></textarea>
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
                        className="contact-browse-btn common-fonts"
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
                <div className="contact-support-button">
                  {stateBtn === 0 ? (
                    <button className="disabledBtn" disabled>
                      Reply
                    </button>
                  ) : (
                    <button
                      className="common-save-button permission-save-btn"
                      onClick={handleUpdate}
                    >
                      Reply
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="help-cross" onClick={onClose}>
        X
      </div>
    </div>
  );
};

export default SupportRequest;

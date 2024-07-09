import React, { useState, useRef } from 'react';
import { config } from "../utils/Constants";
import { cdnurl, getDecryptedToken, ADD_TICKET_REPLY, GET_USER_TICKETS } from "../utils/Constants";
import { toast } from 'react-toastify';
import AWS from 'aws-sdk';
import axios from 'axios';
const StaticTickets = ({ data, tickets }) => {
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const decryptedToken = getDecryptedToken();
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [openAccordionId, setOpenAccordionId] = useState(null);
    const [replies, setReplies] = useState([]);
    const [stateBtn, setStateBtn] = useState(0);
    const [details, setDetails] = useState({
        status: "",
        description: "",
        attachment: "",
        parent_id: 0
    });
    const toggleAccordion = (id) => {
        setOpenAccordionId(openAccordionId === id ? null : id);
        setDetails({
            status: "",
            description: "",
            attachment: "",
            parent_id: id,
        });
        setFileName("");
        getReplies(id);
    };
    const getReplies = (id) => {
        axios
            .post(GET_USER_TICKETS + id, {}, {
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

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleStatusChange = (event) => {
        setDetails({
            ...details,
            status: event.target.value,
        });
        setStateBtn(1);
    };

    const handleDescriptionChange = (event) => {
        setDetails({
            ...details,
            description: event.target.value,
        });
        setStateBtn(1);
    };

    const handleSubmit = (id) => {
        if (details.status && details.description) {
            console.log("Form details:", details);
            axios
                .post(ADD_TICKET_REPLY, details, {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                })
                .then((response) => {
                    if (response.data.status === 1) {
                        toast.success("Reply Added Successfully", {
                            position: "top-center",
                            autoClose: 2000,
                        });
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                            autoClose: 2000,
                        });
                    }
                    setDetails({
                        status: "",
                        description: "",
                        attachment: "",
                        parent_id: id,
                    });
                    setFileName("");
                    getReplies(id);
                    setStateBtn(0);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            {tickets?.map((item) => {
                return (
                    <div className='box-border' key={item?.id}>
                        <div className='review-top-flex' onClick={() => toggleAccordion(item.id)} style={{ cursor: 'pointer' }}>
                            <p className="common-fonts reply-head">Ticket Id: #{item?.id}</p>
                            <p className="common-fonts reply-head">Created on: {item?.created_at?.split("T")[0]}</p>
                            <p className="common-fonts reply-head">Status: {item?.status}</p>
                        </div>
                        {openAccordionId === item.id && (
                            <>
                                <div className='flexBox'>
                                    <div>
                                        <p className="common-fonts reply-head">Description about the tickets: </p>
                                        <p className="common-fonts selected-comment">
                                            {item?.description}
                                        </p>
                                    </div>
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
                                ))}
                                <div>
                                    <div className='flexBox'>
                                        <div className="contact-tab-fields">
                                            <label className="common-fonts contact-tab-label">Status</label>
                                            <select
                                                className="lead-input2 common-select"
                                                value={details.status}
                                                onChange={handleStatusChange}
                                            >
                                                <option value=""></option>
                                                <option value="in progress">in progress</option>
                                                <option value="canceled">canceled</option>
                                                <option value="resolved">resolved</option>
                                                <option value="closed">closed</option>
                                            </select>
                                        </div>
                                        <div className='flexBox'>
                                            <div className="contact-tab-fields">
                                                <label htmlFor="fileInput" className="common-fonts contact-tab-label">Attachment</label>
                                                <div className="contact-browse">
                                                    <span
                                                        className="common-fonts common-input contact-tab-input"
                                                        style={{ position: "relative", marginRight: "10px", cursor: "pointer" }}
                                                    >
                                                        <button onClick={handleBrowseClick} className="contact-browse-btn common-fonts">Browse</button>
                                                        <input
                                                            type="file"
                                                            id="fileInput"
                                                            style={{ opacity: 0, position: "absolute", top: 0, left: 0, bottom: 0, right: 0, width: "100%", cursor: "pointer" }}
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
                                            <div className="bmp-upload">
                                                    {fileName && (
                                                        <div className="bmp-image-preview">
                                                            <a href={fileName === null
                                                                ? `${cdnurl}attachments/tickets/${fileName}`
                                                                : `${cdnurl}attachments/tickets/${fileName}`} target="_blank" rel="noopener noreferrer">
                                                                <img
                                                                    src={fileName === null
                                                                        ? `${cdnurl}attachments/tickets/${fileName}`
                                                                        : `${cdnurl}attachments/tickets/${fileName}`}
                                                                    alt=""
                                                                    className="bmp-preview-image"
                                                                />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                        </div>
                                    </div>
                                    <div className="bmp-add-fields">
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows="3"
                                            className="common-fonts bmp-strategy-input bmp-modal-input"
                                            placeholder='Type your response here *'
                                            value={details.description}
                                            onChange={handleDescriptionChange}
                                        ></textarea>
                                        <div className="review-popup-btn">
                                            {stateBtn === 0 ? (
                                                <button className="common-inactive-button review-inactive">Save</button>
                                            ) : (
                                                <button
                                                    className="common-fonts common-save-button comment-save"
                                                    onClick={() => handleSubmit(item.id)}
                                                >
                                                    Save
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default StaticTickets;

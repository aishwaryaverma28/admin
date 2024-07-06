import React, { useState, useRef } from 'react';
import { config, } from "../utils/Constants";
import AWS from 'aws-sdk';
const StaticTickets = () => {
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [stateBtn, setStateBtn] = useState(0);
    // accordian
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    // attachment upload
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
                // Key: `attachments/tickets/${data || ""}/${modifiedFile.name}`,
                Body: modifiedFile
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    console.error('Error uploading file:', err);
                } else {
                    setFileName(modifiedFile.name);
                }
            });
        }
    };
    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <div className='box-border'>
                <div className='review-top-flex' onClick={toggleAccordion} style={{ cursor: 'pointer' }}>
                    <p className="common-fonts reply-head">Ticket Id: #511</p>
                    <p className="common-fonts reply-head">Created on: 10/07/24</p>
                    <p className="common-fonts reply-head">Status: Pending</p>
                </div>
                {isOpen && (
                    <>
                        <div>
                            <p className="common-fonts reply-head">Description about the tickets: </p>
                            <p className="common-fonts selected-comment">
                                You have a JavaScript function that dynamically generates HTML for a ticketing system. This system includes various details about each ticket, such as the ticket ID, creation date, status, and description. Additionally, some tickets may include an attachment image. The primary goal is to ensure that the image is only included in the HTML if an attachment exists. Otherwise, the image section should be omitted.You have a JavaScript function that dynamically generates HTML for a ticketing system. This system includes various details about each ticket, such as the ticket ID, creation date, status, and description. Additionally, some tickets may include an attachment image. The primary goal is to ensure that the image is only included in the HTML if an attachment exists. Otherwise, the image section should be omitted.You have a JavaScript function that dynamically generates HTML for a ticketing system. This system includes various details about each ticket, such as the ticket ID, creation date, status, and description. Additionally, some tickets may include an attachment image. The primary goal is to ensure that the image is only included in the HTML if an attachment exists. Otherwise, the image section should be omitted.
                            </p>
                        </div>
                        <div className='replyName'>
                            <div className='review-top-flex'>
                                <p className="common-fonts reply-head">Rahul Sharma</p>
                            </div>
                            <p className="common-fonts selected-comment">this is the reply of comment number</p>
                        </div>
                        <>
                            <div className='flexBox'>
                                <div className="contact-tab-fields">
                                    <label
                                        className="common-fonts contact-tab-label"
                                    >
                                        Status
                                    </label>
                                    <select className="lead-input2 common-select">
                                        <option value=""></option>
                                        <option value="in progress">in progress</option>
                                        <option value="canceled">canceled</option>
                                        <option value="resolved">resolved</option>
                                        <option value="closed">closed</option>
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
                            </div>
                            <div className="bmp-add-fields">
                                <textarea
                                    name=""
                                    id=""
                                    rows="3"
                                    className="common-fonts bmp-strategy-input bmp-modal-input"
                                    placeholder='Type your response here *'
                                ></textarea>
                                <div class="review-popup-btn">

                                    {stateBtn === 0 ? (
                                        <button className="common-inactive-button review-inactive">Save</button>
                                    ) : (
                                        <button
                                            className="common-fonts common-save-button comment-save"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    </>
                )}
            </div>
        </>
    );
};

export default StaticTickets;

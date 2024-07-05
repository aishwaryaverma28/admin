import React, { useState, useRef, useEffect } from 'react'
import { config, getDecryptedToken, ADD_NEW_TICKET,SEARCH_API } from "../utils/Constants";
import AWS from 'aws-sdk';
import axios from "axios";
import { toast } from "react-toastify";
const TicketModal = ({ data }) => {
    console.log(data);
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const decryptedToken = getDecryptedToken();
    const [stateBtn, setStateBtn] = useState(0);
    const [openEditor, setOpenEditor] = useState(false);
    const [user, setUser] = useState({});
    const [details, setDetails] = useState({
        status: "waiting for support",
        title: "academy admin support",
        user_id: data,
        description: "",
        attachment: "",
    });
    const handleOptionChange = () => {
        axios
          .get(SEARCH_API + "/bmp_user/id/" + data, {
            headers: {
              Authorization: `Bearer ${decryptedToken}`,
            },
          })
          .then((response) => {
            setUser(response?.data?.data[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      useEffect(()=> {
        handleOptionChange()
      },[])
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
                Key: `attachments/tickets/${data || ""}/${modifiedFile.name}`,
                Body: modifiedFile
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

    function handleChange(e) {
        const { name, value } = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value };
        });
        setStateBtn(1);
    }
    function handleSubmit(event) {
        event.preventDefault();
        let updatedFormData;

        if (user?.type_id === 1) {
            updatedFormData = {
                title: "coach admin support",
                description: details?.description,
                phone: user?.phone,
                email: user?.email,
                category: "coach admin support",
                status: "waiting for support",
                attachment: fileName,
                user_id: data
            };
        } else if (user?.type_id === 2) {
            updatedFormData = {
                title: "academy admin support",
                description: details?.description,
                phone: user?.phone,
                email: user?.email,
                category: "academy admin support",
                status: "waiting for support",
                attachment: fileName,
                user_id: data
            };
        } else if (user?.type_id === 3) {
            updatedFormData = {
                title: "player admin support",
                description: details?.description,
                phone: user?.phone,
                email: user?.email,
                category: "player admin support",
                status: "waiting for support",
                attachment: fileName,
                user_id: data
            };
        }
        axios
            .post(ADD_NEW_TICKET, updatedFormData, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response.data.status === 1) {
                    toast.success("Ticket Added Successfully", {
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
                    description: "",
                    attachment: "",
                });
                setFileName("")
                setStateBtn(0);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleCancelBtn = (e) => {
        e.preventDefault();
        setOpenEditor(false);
        setStateBtn(0);
    };
    const expandEditor = () => {
        setOpenEditor(true);
    };

    return (
        <>
            {!openEditor ? (
                <div className="colapedEditor" onClick={expandEditor}>
                    <p>Click here to add a ticket</p>
                </div>
            ) : (
                <>
                    <div className="headphone-container">
                        <p className="common-fonts contact-support-heading">Add a Ticket</p>

                        <div>
                            <form action="">
                                <div className="contact-tab-fields">
                                    <label htmlFor="" className="common-fonts contact-tab-label">
                                        Name <span className="common-fonts redAlert"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={user?.name}
                                        className="common-fonts common-input contact-tab-input"
                                    />
                                </div>
                                <div className="contact-tab-fields">
                                    <label htmlFor="" className="common-fonts contact-tab-label">
                                        Phone No. <span className="common-fonts redAlert"> *</span>
                                    </label>
                                    <div>
                                        <input
                                            type="text" name="phone"
                                            className="common-input contact-tab-input"
                                            value={user?.phone}
                                        />
                                    </div>
                                </div>
                                <div className="contact-tab-fields">
                                    <label htmlFor="" className="common-fonts contact-tab-label">
                                        Email <span className="common-fonts redAlert"> *</span>
                                    </label>
                                    <input
                                        type="email" name="email"
                                        className="common-fonts common-input email-case contact-tab-input"
                                        value={user?.email}
                                    />
                                </div>
                                <div className="contact-tab-fields">
                                    <label htmlFor="" className="common-fonts contact-tab-label">
                                        Description <span className="common-fonts redAlert"> *</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        onChange={handleChange}
                                        className="common-fonts common-input contact-tab-input contact-tab-textarea"
                                        placeholder="Describe your issue in detail"
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
                </>

            )}
            <></>
        </>
    )
}

export default TicketModal
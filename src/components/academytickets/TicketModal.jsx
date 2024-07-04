import React, { useState, useRef } from 'react'
import { getDecryptedToken } from "../utils/Constants";
const TicketModal = ({ item, data }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const decryptedToken = getDecryptedToken();
    const [stateBtn, setStateBtn] = useState(0);
    const [openEditor, setOpenEditor] = useState(false);
    const [details, setDetails] = useState({
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        description: "",
        attachment: "",
    });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
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
        // axios
        //   .post(ADD_TICKET, details, {
        //     headers: {
        //       Authorization: `Bearer ${decryptedToken}`,
        //     },
        //   })
        //   .then((response) => {
        //     if(response.data.status===1){
        //       toast.success("Ticket Added Successfully", {
        //         position: "top-center",
        //         autoClose: 2000,
        //       });
        //     }else{
        //       toast.error(response.data.message, {
        //         position: "top-center",
        //         autoClose: 2000,
        //       });
        //     }

        //     setDetails({
        //       description: "",
        // attachment:"",
        //     });
        //     setStateBtn(0);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
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
                                        onChange={handleChange}
                                        value={details?.name}
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
                                            onChange={handleChange}
                                            className="common-input contact-tab-input"
                                            value={details?.phone}
                                        />
                                    </div>
                                </div>
                                <div className="contact-tab-fields">
                                    <label htmlFor="" className="common-fonts contact-tab-label">
                                        Email <span className="common-fonts redAlert"> *</span>
                                    </label>
                                    <input
                                        type="email" name="email"
                                        onChange={handleChange}
                                        className="common-fonts common-input email-case contact-tab-input"
                                        value={details?.email}
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
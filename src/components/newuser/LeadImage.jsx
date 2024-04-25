import React, { useState, useRef, useEffect } from 'react'
import S3FileUpload from 'react-s3';
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import { GET_ACADEMY, UPDATE_ACADEMY, config, getDecryptedToken, } from "../utils/Constants";
import Video from "../../assets/image/video.svg";
import Trash from "../../assets/image/red-bin.svg";

const LeadImage = ({id}) => {
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoChoose, setPhotoChoose] = useState(null);
    const decryptedToken = getDecryptedToken();
    const [stateBtn, setStateBtn] = useState(0);
    const [photoBtn, setPhotoBtn] = useState(0);
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const allowedFileTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/quicktime",
        "video/webm",
        "video/ogg",
    ];
    const fileInputRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const fileBannerRef = useRef(null);
    const [bannerUploading, setBannerUploading] = useState(false);
    const [selectedBannerFile, setSelectedBannerFile] = useState(null);
    const [bannerName, setBannerName] = useState(null);
    const fileInputRef2 = useRef(null);
    const [alertShown, setAlertShown] = useState(false);
    const [alertVideoShown, setAlertVideoShown] = useState(false);
    const [isUploadingMulti, setIsUploadingMulti] = useState(false);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [videoUrls, setVideoUrls] = useState([]);
    const [fileName2, setFileName2] = useState(null);
    const [academyData, setAcademyData] = useState({});

    const academyDetails = () => {
        const body={
            academy_id: id,
            type: "temp",
        }
        axios
            .post(GET_ACADEMY, body
                , {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                if (response?.data?.data && response?.data?.data?.length !== 0) {
                    setAcademyData(response?.data?.data[0]);
                    if (
                        response?.data?.data[0]?.logo !== "" &&
                        response?.data?.data[0]?.logo !== null
                    ) {
                        setFileName(response?.data?.data[0]?.logo);
                    }
                    setBannerName(response?.data?.data[0]?.banner);
                    if (
                        response?.data?.data[0]?.photos !== "" &&
                        response?.data?.data[0]?.photos !== null
                    ) {
                        setPhotoUrls(response?.data?.data[0]?.photos?.split(","));
                    }
                    if (
                        response?.data?.data[0].videos !== "" &&
                        response?.data?.data[0].videos !== null
                    ) {
                        setVideoUrls(response?.data?.data[0]?.videos?.split(","));
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        academyDetails();
    }, []);

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
    const handleCheckbox = (photo, index) => {
        console.log(photo)
        setPhotoChoose(photo);
        setSelectedPhoto(index);
        setPhotoBtn(1);
        setSelectedPhotoIndex(null);
    };
    const handleCheckboxChange = (video, index) => {
        setBannerName(video);
        setSelectedPhotoIndex(index);
        setStateBtn(1);
        setSelectedPhoto(null);
    };
    //================================================= for logo upload
    const handleButtonClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
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
            setIsUploading(true);
            const processedFileName = processImageName(selectedImage.name);
            const modifiedFile = new File([selectedImage], processedFileName, { type: selectedImage.type });
            const updatedConfig = {
                ...config,
                dirName: "academy_temp/" + id,
            };
            S3FileUpload.uploadFile(modifiedFile, updatedConfig)
                .then((data) => {
                    setSelectedFile(selectedImage);
                    setFileName(modifiedFile.name);
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setIsUploading(false);
                });
        }
    };
    //===================================================================for banner upload
    const handleBannerButtonClick = (event) => {
        event.preventDefault();
        fileBannerRef.current.click();
    };

    const handleBannerChange = (event) => {
        setStateBtn(1);
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            if (!allowedImageTypes.includes(selectedImage.type)) {
                alert("Please choose a valid image file (JPEG, PNG, GIF).");
                return;
            }
            submitBannerImage(event.target.files[0]);
        }
    };

    const submitBannerImage = (file) => {
        const selectedImage = file;
        if (selectedImage) {
            setBannerUploading(true);
            const processedFileName = processImageName(selectedImage.name);
            const modifiedFile = new File([selectedImage], processedFileName, { type: selectedImage.type });
            const updatedConfig = {
                ...config,
                dirName: "academy_temp/" + id,
            };
            S3FileUpload.uploadFile(modifiedFile, updatedConfig)
                .then((data) => {
                    setSelectedBannerFile(selectedImage);
                    setBannerName(modifiedFile.name);
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setBannerUploading(false);
                });
        }
    };
    //=================================================================================photo and video upload

    const handleButtonClick2 = () => {
        fileInputRef2.current.click();
        setAlertVideoShown(false);
        setAlertShown(false);
    };
    const handleFileChange2 = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!allowedFileTypes.includes(file.type)) {
                if (!alertShown) {
                    alert("Please choose a valid video file.");
                    setAlertShown(true);
                }
                return;
            } else if (!allowedFileTypes.includes(file.type)) {
                if (!alertShown) {
                    alert("Please choose a valid image file.");
                    setAlertShown(true);
                }
                return;
            }
            if (file.type.startsWith("image/")) {
                submitImage2(file);
            } else if (file.type.startsWith("video/")) {
                submitVideo2(file);
            }
        }
    };

    const submitImage2 = (file) => {
        setIsUploadingMulti(true);
        const selectedImage = file;
        if (selectedImage) {
            const processedFileName = processImageName(selectedImage.name);
            const modifiedFile = new File([selectedImage], processedFileName, { type: selectedImage.type });
            const updatedConfig = {
                ...config,
                dirName: "academy_temp/" + id,
            };
            S3FileUpload.uploadFile(modifiedFile, updatedConfig)
                .then((data) => {
                    setFileName2(modifiedFile.name);
                    const imageUrl = modifiedFile.name;
                    if (data.location) {
                        photoUrls?.push(imageUrl);
                        setPhotoUrls(photoUrls);
                        setStateBtn(1);
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setIsUploadingMulti(false);
                });
        }
    };

    const submitVideo2 = (file) => {
        setIsUploadingMulti(true);
        const selectedImage = file;
        if (selectedImage) {
            const processedFileName = processImageName(selectedImage.name);
            const modifiedFile = new File([selectedImage], processedFileName, { type: selectedImage.type });
            const updatedConfig = {
                ...config,
                dirName: "academy_temp/" + id,
            };
            S3FileUpload.uploadFile(modifiedFile, updatedConfig)
                .then((data) => {
                    setFileName2(modifiedFile.name);
                    const imageUrl = modifiedFile.name;
                    if (data.location) {
                        videoUrls.push(imageUrl);
                        setVideoUrls(videoUrls);
                        setStateBtn(1);
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setIsUploadingMulti(false);
                });
        }
    };

    //===============================================================================image submit
    const initialPhotoUrls = [...photoUrls];
    const initialVideoUrls = [...videoUrls];
    const initialFileName = fileName;
    const initialFileName2 = fileName2;
    const initialSelectedFile = selectedFile;

    const resetState = () => {
        setPhotoUrls(initialPhotoUrls);
        setVideoUrls(initialVideoUrls);
        setFileName(initialFileName);
        setFileName2(initialFileName2);
        setSelectedFile(initialSelectedFile);
    };
    const handleSubmit = (logoValue, bannerValue) => {
        setPhotoBtn(0);
        const updatedFormData = {
            type : "temp",
            logo: logoValue,
            banner: bannerValue,
            photos: photoUrls?.join(","),
            videos: videoUrls?.join(","),
            name: academyData?.name,
            sport: academyData?.sport|| "sports",
            city: academyData?.city|| "select",
        };
        axios
            .put(UPDATE_ACADEMY + id, updatedFormData, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                if (response.data.status === 1) {
                    toast.success("Details updated successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                } else {
                    toast.error("Some Error Occurred", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }
                academyDetails();
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while updating details", {
                    position: "top-center",
                    autoClose: 1000,
                });
            })
            .finally(() => {
                setPhotoBtn(0);
            });
    };
    
    const handleSubmitlogo = () => {
        handleSubmit(photoChoose, bannerName);
    };
    
    const handleSubmitbanner = () => {
        handleSubmit(fileName, photoChoose);
    };
    
    const handleSubmit2 = () => {
        setStateBtn(0);
        const updatedFormData = {
            type : "temp",
            logo: fileName,
            banner: bannerName,
            photos: photoUrls?.join(","),
            videos: videoUrls?.join(","),
            name: academyData?.name,
            sport: academyData?.sport|| "sports",
            city: academyData?.city|| "select",
        }
        axios
            .put(UPDATE_ACADEMY + id, updatedFormData
                , {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.status === 1) {
                    toast.success("Details updated successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                } else {
                    toast.error("Some Error Occurred", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }
                academyDetails();
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while updating details", {
                    position: "top-center",
                    autoClose: 1000,
                });
            })
            .finally(() => {
                setStateBtn(0);
            });
    }
    // ==================================================================================delete the phots and videos

    const deleteStrategy = (photoToDelete) => {
        const updatedNameOfStrategy = photoUrls.filter(photo => photo !== photoToDelete);
        setPhotoUrls(updatedNameOfStrategy);
        updateDataAndCallAPI(updatedNameOfStrategy);
    };
    const updateDataAndCallAPI = (updatedNameArray) => {
        const updatedNameString = updatedNameArray.join(",");
        axios
            .put(
                UPDATE_ACADEMY + academyData?.id,
                {
                    type : "temp",
                    photos: updatedNameString,
                    name: academyData?.name,
                    sport: academyData?.sport,
                    city: academyData?.city,
                },
                {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                academyDetails();
            })
            .catch((error) => {
                console.error("API call failed:", error);
            });
    };

    const deleteVideo = (videoToDelete) => {
        const updatedNameOfStrategy = videoUrls.filter(photo => photo !== videoToDelete);
        setVideoUrls(updatedNameOfStrategy);
        updateData(updatedNameOfStrategy);
    };
    const updateData = (updatedNameArray) => {
        const updatedNameString = updatedNameArray.join(",");
        axios
            .put(
                UPDATE_ACADEMY + academyData?.id,
                {
                    type : "temp",
                    videos: updatedNameString,
                    name: academyData?.name,
                    sport: academyData?.sport,
                    city: academyData?.city,
                },
                {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                academyDetails();
            })
            .catch((error) => {
                console.error("API call failed:", error);
            });
    };

    return (
        <>
            {/* ================================================================================upload the logo */}
            <section>
                <p className="common-fonts">Upload Academic Logo</p>
                <div className="bmp-upload">
                    <div className="contact-browse deal-doc-file">
                        <span
                            className={`common-fonts common-input contact-tab-input`}
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
                                <span className="common-fonts upload-file-name">
                                    Uploading...
                                </span>
                            ) : (
                                <span className="common-fonts upload-file-name">
                                    {fileName ? fileName : academyData?.logo}
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
                                src={academyData?.logo === null
                                    ? `https://bmpcdn.s3.ap-south-1.amazonaws.com/default/academy_default_logo.webp`
                                    : `https://bmpcdn.s3.ap-south-1.amazonaws.com/academy_temp/${academyData?.id}/${academyData?.logo}`}
                                alt=""
                                className="bmp-preview-image"
                            />
                        </div>
                    )}
                </div>
            </section>
            {/* =============================================================================upload banner */}

            <section>
                <p className="common-fonts">
                    Upload banner image
                </p>
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
                                onClick={handleBannerButtonClick}
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
                                ref={fileBannerRef}
                                onChange={handleBannerChange}
                            />
                            {bannerUploading ? (
                                <span className="common-fonts upload-file-name">
                                    Uploading...
                                </span>
                            ) : (
                                <span className="common-fonts upload-file-name">
                                    {bannerName ? bannerName : academyData?.banner}
                                </span>
                            )}
                        </span>
                    </div>

                    {selectedBannerFile && (
                        <div className="bmp-image-preview">
                            <img
                                src={URL.createObjectURL(selectedBannerFile)}
                                alt="Selected Preview"
                                className="bmp-preview-image"
                            />
                        </div>
                    )}

                    {!selectedBannerFile && (
                        <div className="bmp-image-preview">
                            <img
                                src={academyData?.banner === null
                                    ? `https://bmpcdn.s3.ap-south-1.amazonaws.com/default/${academyData?.sport}_banner.webp`
                                    : `https://bmpcdn.s3.ap-south-1.amazonaws.com/academy_temp/${academyData?.id}/${academyData?.banner}`}
                                alt=""
                                className="bmp-preview-image"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* =========================================================multiple photo and video upload */}
            <section>
                <p className="common-fonts">
                    Upload images/videos
                </p>
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
                                className={`common-fonts contact-browse-btn `}
                                onClick={handleButtonClick2}>
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
                                ref={fileInputRef2}
                                onChange={handleFileChange2}
                                multiple
                            />
                            {isUploadingMulti ? (
                                <span className="common-fonts upload-file-name">
                                    Uploading...
                                </span>
                            ) : (
                                <span className="common-fonts upload-file-name">
                                    <p className="common-fonts light-color">
                                        You can upload multiple videos and images{" "}
                                    </p>
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </section>
            {/* ====================================================map for admin photos */}
            <>
                {photoUrls?.length === 0 ? (
                    <div className={`support-no-ticket-found`}>
                        <p className="common-fonts">No photos added</p>
                    </div>
                ) : (
                    <div className={`outerBox divWidth`}>
                        {photoUrls?.map((photo, index) => (
                            <div className="bmp-new-img" key={index}>
                                <div className="bmp-img-top-icon">
                                    <div className="bmp-img-name">
                                        <input
                                            type="checkbox"
                                            className="radio_disable check_input"
                                            checked={selectedPhoto === index}
                                            onChange={() => handleCheckbox(photo, index)}
                                        />
                                        <div className="bmp-video">
                                            <img
                                                src={`https://bmpcdn.s3.ap-south-1.amazonaws.com/academy_temp/${academyData?.id}/${photo}`}
                                                alt="Selected Preview"
                                            />
                                        </div>

                                        <p className="common-fonts bmp-tour">
                                            {photo?.length > 20 ? (
                                                <>{photo?.slice(0,20)}...</>
                                            ) : (
                                                <>{photo}</>
                                            )}
                                        </p>
                                    </div>
                                    <div className="bmp-trash">
                                        <img
                                            src={Trash}
                                            alt=""
                                            onClick={() => deleteStrategy(photo)}
                                        />
                                    </div>
                                </div>
                                <img
                                    src={`https://bmpcdn.s3.ap-south-1.amazonaws.com/academy_temp/${academyData?.id}/${photo}`}
                                    alt="Selected Preview"
                                    key={index}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </>
            <>
                {videoUrls?.length === 0 ? (
                    <div className="support-no-ticket-found">
                        <p className="common-fonts">No videos added</p>
                    </div>
                ) : (
                    <div className="outerBox">
                        {videoUrls?.map((video, index) => (
                            <div className="bmp-new-img" key={index}>
                                <div className="bmp-img-top-icon">
                                    <div className="bmp-img-name">
                                    <input
                                            type="checkbox"
                                            className="radio_disable check_input"
                                            checked={selectedPhotoIndex === index}
                                            onChange={() => handleCheckboxChange(video, index)}
                                        />
                                        <div className="bmp-video">
                                            <img
                                                src={Video}
                                                alt=""
                                            />
                                        </div>
                                        <p className="common-fonts bmp-tour">
                                            {video?.length > 20 ? (
                                                <>{video?.slice(0, 20) + "..."}</>
                                            ) : (
                                                <>{video}</>
                                            )}
                                        </p>
                                    </div>
                                    <div className="bmp-trash">
                                        <img
                                            src={Trash}
                                            alt=""
                                            onClick={() => deleteVideo(video)}
                                        />
                                    </div>
                                </div>
                                <div className="bmp-player-img">
                                    <video width="270" height="140" controls>
                                        <source
                                            src={`https://bmpcdn.s3.ap-south-1.amazonaws.com/academy_temp/${academyData?.id}/${video}`}
                                            type="video/mp4"
                                        />
                                    </video>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>


            <div className="bmp-bottom-btn">
                <button
                    className="common-fonts common-white-button"
                    onClick={resetState}
                >
                    Cancel
                </button>
            {photoBtn === 0 ? (
                <>
                    <button className="disabledBtn" disabled>
                    Save as logo
                    </button>
                    <button className="disabledBtn" disabled>
                    Save as Banner
                    </button>
                    </>
                ) : (
                    <>
                    <button
                        className="common-fonts common-save-button"
                        onClick={handleSubmitlogo}
                    >
                        Save as logo
                    </button>
                     <button
                     className="common-fonts common-save-button"
                     onClick={handleSubmitbanner}
                 >
                     Save as Banner
                 </button>
                 </>
                )}
                {stateBtn === 0 ? (
                    <button className="disabledBtn" disabled>
                        Save
                    </button>
                ) : (
                    <button
                        className="common-fonts common-save-button"
                        onClick={handleSubmit2}
                    >
                        Save
                    </button>
                )}
            </div>
        </>
    )
}

export default LeadImage
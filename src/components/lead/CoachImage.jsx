import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import { GET_COACH_ID, UPDATE_COACH, getDecryptedToken, } from "../utils/Constants";
import Video from "../../assets/image/video.svg";
import Trash from "../../assets/image/red-bin.svg";

const CoachImage = (item) => {
    const decryptedToken = getDecryptedToken();
    const [stateBtn, setStateBtn] = useState(0);
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
    const [fileName, setFileName] = useState("");
    const fileBannerRef = useRef(null);
    const [bannerUploading, setBannerUploading] = useState(false);
    const [selectedBannerFile, setSelectedBannerFile] = useState(null);
    const [bannerName, setBannerName] = useState("");
    const fileInputRef2 = useRef(null);
    const [alertShown, setAlertShown] = useState(false);
    const [alertVideoShown, setAlertVideoShown] = useState(false);
    const [isUploadingMulti, setIsUploadingMulti] = useState(false);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [videoUrls, setVideoUrls] = useState([]);
    const [fileName2, setFileName2] = useState("");
    const [updatedFields, setUpdatedFields] = useState([]);
    const [academyData, setAcademyData] = useState({});
    const [deleteIndex, setDeleteIndex] = useState(null);

    const processImageName = (imageName) => {
        const nameParts = imageName?.split(".");
        if (nameParts.length > 1) {
            const namePart = nameParts?.slice(0, -1)?.join(".");
            const processedName = namePart?.replace(/[^\w-]/g, "-");
            return `${processedName}.${nameParts[nameParts.length - 1]}`;
        } else {
            return imageName.replace(/[^\w-]/g, "-");
        }
    };

    const academyDetails = () => {
        axios
            .post(GET_COACH_ID, { academy_id: item?.item?.id }
                , {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                if (response?.data?.data && response?.data?.data?.length !== 0) {
                    console.log(response?.data?.data);
                    setAcademyData(response?.data?.data[0]);
                    setBannerName(response?.data?.data[0]?.banner);
                    if (
                        response?.data?.data[0]?.photos !== "" &&
                        response?.data?.data[0]?.photos !== null
                    ) {
                        setPhotoUrls(response?.data?.data[0]?.photos?.split(",")?.reverse());
                    }
                    if (
                        response?.data?.data[0].videos !== "" &&
                        response?.data?.data[0].videos !== null
                    ) {
                        setVideoUrls(response.data.data[0].videos?.split(",").reverse());
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
            if (selectedImage.size > 2 * 1024 * 1024) {
                alert(
                    "Image size should be less than 2MB. Please choose a smaller image."
                );
                return;
            }
            const folder = "bookmyplayer/academy/" + item?.item?.id;
            const imageNameWithoutExtension = selectedImage.name.replace(
                /\.[^/.]+$/,
                ""
            );
            const sanitizedImageName = imageNameWithoutExtension.replace(
                /[^\w-]/g,
                "-"
            );
            const uniqueFileName = `${folder}/${sanitizedImageName}`;
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
            if (selectedImage.size > 2 * 1024 * 1024) {
                alert(
                    "Image size should be less than 2MB. Please choose a smaller image."
                );
                return;
            }
            const folder = "bookmyplayer/academy/" + item?.item?.id;
            const imageNameWithoutExtension = selectedImage.name.replace(
                /\.[^/.]+$/,
                ""
            );
            const sanitizedImageName = imageNameWithoutExtension.replace(
                /[^\w-]/g,
                "-"
            );
            const uniqueFileName = `${folder}/${sanitizedImageName}`;
            const data = new FormData();
            data.append("file", selectedImage);
            data.append("upload_preset", "zbxquqvw");
            data.append("cloud_name", "cloud2cdn");
            data.append("public_id", uniqueFileName);
            setBannerUploading(true);
            fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setSelectedBannerFile(selectedImage);
                    setBannerName(processImageName(selectedImage.name));
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setBannerUploading(false);
                });
        }
    };
    //=================================================================================photo and video upload
    const showAlertOnce = (message) => {
        if (!alertVideoShown) {
            alert(message);
            setAlertVideoShown(true);
        }
    };

    const handleButtonClick2 = () => {
        fileInputRef2.current.click();
        setAlertVideoShown(false);
        setAlertShown(false);
    };
    const updateField = (fieldName) => {
        if (!updatedFields.includes(fieldName)) {
            setUpdatedFields([...updatedFields, fieldName]);
        }
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
            if (selectedImage.size > 2 * 1024 * 1024) {
                showAlertOnce(
                    "Image size should be less than 2MB. Please choose a smaller image."
                );
                setIsUploadingMulti(false);
                return;
            }
            const folder = "bookmyplayer/academy/" + item?.item?.id;
            const imageNameWithoutExtension = selectedImage.name.replace(
                /\.[^/.]+$/,
                ""
            );
            const sanitizedImageName = imageNameWithoutExtension.replace(
                /[^\w-]/g,
                "-"
            );
            const uniqueFileName = `${folder}/${sanitizedImageName}`;
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
                    setFileName2(processImageName(selectedImage.name));
                    const imageUrl = processImageName(selectedImage.name);
                    if (data.secure_url) {
                        photoUrls?.push(imageUrl);
                        setPhotoUrls(photoUrls);
                        updateField("photos");
                        setStateBtn(1);
                    }
                })
                .catch((err) => {
                    console.log(err);
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
            if (selectedImage.size > 10 * 1024 * 1024) {
                showAlertOnce(
                    "Video size should be less than 10MB. Please choose a smaller video."
                );
                setIsUploadingMulti(false);
                return;
            }
            const folder = "bookmyplayer/academy/" + item?.item?.id;
            const imageNameWithoutExtension = selectedImage.name.replace(
                /\.[^/.]+$/,
                ""
            );
            const sanitizedImageName = imageNameWithoutExtension.replace(
                /[^\w-]/g,
                "-"
            );
            const uniqueFileName = `${folder}/${sanitizedImageName}`;
            const data = new FormData();
            data.append("file", selectedImage);
            data.append("upload_preset", "zbxquqvw");
            data.append("cloud_name", "cloud2cdn");
            data.append("public_id", uniqueFileName);

            fetch("https://api.cloudinary.com/v1_1/cloud2cdn/video/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setFileName2(processImageName(selectedImage.name));
                    const imageUrl = processImageName(selectedImage.name);
                    if (data.secure_url) {
                        videoUrls.push(imageUrl);
                        setVideoUrls(videoUrls);
                        updateField("videos");
                        setStateBtn(1);
                    }
                })
                .catch((err) => {
                    console.log(err);
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

    const handleSubmit2 = () => {
        const updatedFormData = {
            logo: fileName,
            banner: bannerName,
            photos: photoUrls?.join(","),
            videos: videoUrls?.join(","),
        }
        axios
            .put(UPDATE_COACH + item?.item?.id, updatedFormData
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
    // ==================================================================================delete the phots and videos
    const handleDeleteOpen = (index, prop) => {
        setDeleteIndex(index);
        if (prop === "image") {
            deleteStrategy();
        } else if (prop === "video") {
            deleteVideo();
        }
    };
    const deleteStrategy = () => {
        if (deleteIndex !== null) {
            const updatedNameOfStrategy = [...photoUrls];
            updatedNameOfStrategy.splice(deleteIndex, 1);
            setPhotoUrls(updatedNameOfStrategy);
            updateDataAndCallAPI(updatedNameOfStrategy);
        }
    };
    const updateDataAndCallAPI = (updatedNameArray) => {
        const updatedNameString = updatedNameArray.reverse().join(",");
        axios
            .put(
                UPDATE_COACH + academyData?.id,
                {
                    photos: updatedNameString,
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

    const deleteVideo = () => {
        if (deleteIndex !== null) {
            const updatedNameOfStrategy = [...videoUrls];
            updatedNameOfStrategy.splice(deleteIndex, 1);
            setPhotoUrls(updatedNameOfStrategy);
            updateData(updatedNameOfStrategy);
        }
    };
    const updateData = (updatedNameArray) => {
        const updatedNameString = updatedNameArray.reverse().join(",");
        axios
            .put(
                UPDATE_COACH + academyData?.id,
                {
                    videos: updatedNameString,
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
                <p className="common-fonts">Upload Profile Pic</p>
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
                                src={academyData?.profile_img === null
                                    ? "https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/asset/images/logo.svg"
                                    : `https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/coach/${academyData?.id}/${academyData?.profile_img}`}
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
                                src={item?.item?.banner === null
                                    ? `https://res.cloudinary.com/cloud2cdn/image/upload/q_20/bookmyplayer/default/${academyData?.sport}_banner.webp`
                                    : `https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${academyData?.id}/${academyData?.banner}`}
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
                            <div className="bmp-new-img">
                                <div className="bmp-img-top-icon">
                                    <div className="bmp-img-name">
                                        <div className="bmp-video">
                                            <img
                                                src={`https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${academyData?.id}/${photo}`}
                                                alt="Selected Preview"
                                            />
                                        </div>

                                        <p className="common-fonts bmp-tour">
                                            {photo?.length > 20 ? (
                                                <>{photo?.slice(20)}...</>
                                            ) : (
                                                <>{photo}</>
                                            )}
                                        </p>
                                    </div>
                                    <div className="bmp-trash">
                                        <img
                                            src={Trash}
                                            alt=""
                                            onClick={() => handleDeleteOpen(index, "image")}
                                        />
                                    </div>
                                </div>
                                <img
                                    src={`https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${academyData?.id}/${photo}`}
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
                            <div className="bmp-new-img">
                                <div className="bmp-img-top-icon">
                                    <div className="bmp-img-name">
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
                                            onClick={() => handleDeleteOpen(index, "video")}
                                        />
                                    </div>
                                </div>
                                <div className="bmp-player-img">
                                    <video width="270" height="140" controls>
                                        <source
                                            src={`https://res.cloudinary.com/cloud2cdn/video/upload/bookmyplayer/academy/${academyData?.id}/${video}`}
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

export default CoachImage
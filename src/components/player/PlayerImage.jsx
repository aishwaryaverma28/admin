import React, { useState, useRef, useEffect } from 'react'
import AWS from 'aws-sdk';
import axios from 'axios'
import { toast } from "react-toastify";
import { cdnurl, GET_PLAYER_ID, UPDATE_PLAYER, config, getDecryptedToken, } from "../utils/Constants";
import Video from "../../assets/image/video.svg";
import Trash from "../../assets/image/red-bin.svg";


const PlayerImage = (id) => {
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const decryptedToken = getDecryptedToken();
    const [stateBtn, setStateBtn] = useState(0);
    const allowedFileTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/quicktime",
        "video/webm",
        "video/ogg",
    ];
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const fileInputRef2 = useRef(null);
    const [alertShown, setAlertShown] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [alertVideoShown, setAlertVideoShown] = useState(false);
    const [isUploadingMulti, setIsUploadingMulti] = useState(false);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [videoUrls, setVideoUrls] = useState([]);
    const [fileName2, setFileName2] = useState("");
    const [academyData, setAcademyData] = useState({});
    const academyDetails = () => {
        const requestBody = {
            "playerId": id?.id,
            "type": "org"
        };
        axios
            .post(GET_PLAYER_ID, requestBody, {
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
                    if (
                        response?.data?.data[0]?.photos !== "" &&
                        response?.data?.data[0]?.photos !== null
                    ) {
                        const files = response?.data?.data[0]?.photos?.split(",");
                        const uniquePhotoUrls = new Set();
                        const uniqueVideoUrls = new Set();
                        files.forEach(file => {
                            const extension = file.split('.').pop().toLowerCase();
                            if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                                uniquePhotoUrls.add(file);
                            } else if (['mov', 'mp4', 'webm', 'ogg'].includes(extension)) {
                                uniqueVideoUrls.add(file);
                            }
                        });
                        setPhotoUrls(Array.from(uniquePhotoUrls));
                        setVideoUrls(Array.from(uniqueVideoUrls));
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
            // if (!allowedFileTypes.includes(file.type)) {
            //     if (!alertShown) {
            //         alert("Please choose a valid video or image file.");
            //         setAlertShown(true);
            //     }
            //     return;
            // }
            if (file.type.startsWith("video/") && file.size > 49.8 * 1024 * 1024) {
                alert("Video file size should be less than 50MB.");
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
            AWS.config.update({
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
                region: config.region
            });

            const s3 = new AWS.S3();

            const uploadPromises = [
                { bucketName: config.bucketName, dirName: "player/" + (id?.id || "") },
                { bucketName: 'destcdn90', dirName: "player/" + (id?.id || "") }
            ].map((updatedConfig) => {
                const params = {
                    Bucket: updatedConfig.bucketName,
                    Key: updatedConfig.dirName + '/' + modifiedFile.name,
                    Body: modifiedFile
                };

                return s3.upload(params).promise()
                    .then((data) => {
                        const imageUrl = modifiedFile.name;
                        if (data.Location) {
                            return { success: true, imageUrl, updatedConfig };
                        }
                    })
                    .catch((err) => {
                        return { success: false, error: err, updatedConfig };
                    });
            });

            let successfulUploadCount = 0;

            Promise.all(uploadPromises)
                .then((results) => {
                    results.forEach((result) => {
                        if (result.success) {
                            const { imageUrl, updatedConfig } = result;
                            if (updatedConfig.bucketName === config.bucketName) {
                                successfulUploadCount++;
                                photoUrls.push(imageUrl);
                            } else if (updatedConfig.bucketName === 'destcdn90') {
                                successfulUploadCount++;
                            }
                        } else {
                            console.error("Failed to upload:", result.error);
                        }
                    });

                    if (successfulUploadCount === 2) {
                        setPhotoUrls([...photoUrls]);
                        handleSubmit2();
                    } else {
                        console.error("Uploads to both buckets were not successful.");
                    }
                })
                .catch((err) => {
                    console.error("Error uploading to multiple buckets:", err);
                })
                .finally(() => {
                    setIsUploadingMulti(false);
                });
        }
    };
 
    const submitVideo2 = (file) => {
        setIsUploadingMulti(true);
        const selectedVideo = file;
      
        if (selectedVideo) {
          const processedFileName = processImageName(selectedVideo.name);
          const modifiedFile = new File([selectedVideo], processedFileName, { type: selectedVideo.type });
          AWS.config.update({
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
            region: config.region
          });
      
          const s3 = new AWS.S3();
      
          const uploadPromises = [
            { bucketName: config.bucketName, dirName: "player/" + (id?.id || "") },
            { bucketName: 'destcdn90', dirName: "player/" + (id?.id || "") }
          ].map((updatedConfig) => {
            const params = {
              Bucket: updatedConfig.bucketName,
              Key: updatedConfig.dirName + '/' + modifiedFile.name,
              Body: modifiedFile
            };
      
            return s3.upload(params).promise()
              .then((data) => {
                const videoUrl = modifiedFile.name;
                if (data.Location) {
                  return { success: true, videoUrl, updatedConfig };
                }
              })
              .catch((err) => {
                return { success: false, error: err, updatedConfig };
              });
          });
      
          let successfulUploadCount = 0;
      
          Promise.all(uploadPromises)
            .then((results) => {
              results.forEach((result) => {
                if (result.success) {
                  const { videoUrl, updatedConfig } = result;
                  if (updatedConfig.bucketName === config.bucketName) {
                    successfulUploadCount++;
                    videoUrls.push(videoUrl);
                  } else if (updatedConfig.bucketName === 'destcdn90') {
                    successfulUploadCount++;
                  }
                } else {
                  console.error("Failed to upload:", result.error);
                }
              });
      
              if (successfulUploadCount === 2) {
                setVideoUrls([...videoUrls]);
                handleSubmit2();
              } else {
                console.error("Uploads to both buckets were not successful.");
              }
            })
            .catch((err) => {
              console.error("Error uploading to multiple buckets:", err);
            })
            .finally(() => {
                setIsUploadingMulti(false);
            });
    }
};
    //===============================================================================image submit
    const handleSubmit2 = () => {
        const allUrls = [...photoUrls, ...videoUrls];
        const updatedFormData = {
            type: "org",
            name: academyData?.name,
            sport_id: academyData?.sport_id,
            loc_id: academyData?.loc_id,
            logo: fileName,
            photos: allUrls?.join(","),
        }
        axios
            .put(UPDATE_PLAYER + id?.id, updatedFormData
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
                    toast.error(response?.data?.message, {
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

    const handleSubmit = (file) => {
        const allUrls = [...photoUrls, ...videoUrls];
        const updatedFormData = {
            type: "org",
            name: academyData?.name,
            sport_id: academyData?.sport_id,
            loc_id: academyData?.loc_id,
            logo: file,
            photos: allUrls?.join(","),
        }
        axios
            .put(UPDATE_PLAYER + id?.id, updatedFormData
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
                    toast.error(response?.data?.message, {
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
        const combinedDataString = [...updatedNameArray, ...videoUrls].join(",");

        axios
            .put(
                UPDATE_PLAYER + academyData?.id,
                {
                    type: "org",
                    photos: combinedDataString,
                    name: academyData?.name,
                    sport_id: academyData?.sport_id,
                    loc_id: academyData?.loc_id,
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
        console.log(videoToDelete);
        const updatedNameOfStrategy = videoUrls.filter(photo => photo !== videoToDelete);
        setVideoUrls(updatedNameOfStrategy);
        updateData(updatedNameOfStrategy);
    };
    const updateData = (updatedNameArray) => {
        const combinedDataString = [...updatedNameArray, ...photoUrls].join(",");
        axios
            .put(
                UPDATE_PLAYER + academyData?.id,
                {
                    type: "org",
                    photos: combinedDataString,
                    name: academyData?.name,
                    sport_id: academyData?.sport_id,
                    loc_id: academyData?.loc_id,
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

    const handleCheckbox = (photo, index) => {
        setFileName(photo);
        setSelectedPhoto(index);
        handleSubmit(photo)
    };
    return (
        <>
            {/* ================================================================================upload the logo */}
            <section className='img_upload_newflex'>
                <p className="common-fonts">Upload Profile Pic : </p>
                <span className="common-fonts">{fileName ? fileName : academyData?.logo}</span>
                <div className="bmp-upload">
                    {!selectedFile && (
                        <div className="bmp-image-preview">
                            <a href={academyData?.logo === null
                                ? `${cdnurl}asset/images/logo.svg`
                                : `${cdnurl}player/${academyData?.id}/${academyData?.logo}`}
                                target="_blank" rel="noopener noreferrer">
                                <img
                                    src={academyData?.logo === null || academyData?.logo === ""
                                        ? `${cdnurl}asset/images/logo.svg`
                                        : `${cdnurl}player/${academyData?.id}/${academyData?.logo}`}
                                    alt="pofile"
                                    className="bmp-preview-image"
                                />
                            </a>
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
                                        <input
                                            type="checkbox"
                                            className="radio_disable check_input"
                                            checked={selectedPhoto === index}
                                            onChange={() => handleCheckbox(photo, index)}
                                        />
                                        <div className="bmp-video">
                                            <a href={`${cdnurl}player/${academyData?.id}/${photo}`} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`${cdnurl}player/${academyData?.id}/${photo}`}
                                                    alt=""
                                                />
                                            </a>
                                        </div>

                                        <p className="common-fonts bmp-tour">
                                            {photo?.length > 20 ? (
                                                <>{photo?.slice(0, 20)}...</>
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
                                <a href={`${cdnurl}player/${academyData?.id}/${photo}`} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={`${cdnurl}player/${academyData?.id}/${photo}`}
                                        alt=""
                                        key={index}
                                    />
                                </a>
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
                    <div className="outerBox divWidth">
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
                                            onClick={() => deleteVideo(video)}
                                        />
                                    </div>
                                </div>
                                <div className="bmp-player-img">
                                    <a href={`${cdnurl}player/${academyData?.id}/${video}`} target="_blank" rel="noopener noreferrer">
                                        <video width="270" height="140" controls>
                                            <source
                                                src={`${cdnurl}player/${academyData?.id}/${video}`}
                                                type="video/mp4"
                                            />
                                        </video>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>

        </>
    )
}

export default PlayerImage
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  GET_ACADEMY,
  UPDATE_ACADEMY,
  getDecryptedToken,
} from "../utils/Constants";
import "chart.js/auto";
import Photo from "../../assets/image/gallery.svg";
import Video from "../../assets/image/video.svg";
import Trash from "../../assets/image/red-bin.svg";
import Player from "../../assets/image/player.png";
import VideoPlay from "../../assets/image/video-play.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteImage from "./DeleteImage.jsx";
import ProgressBar from "./ProgressBar";

const Gallery = () => {
  const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("academy_id");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileName2, setFileName2] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [academyData, setAcademyData] = useState({});
  const [photosData, setPhotosData] = useState("");
  const [photoUrls, setPhotoUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [newName, setNewName] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteProp, setDeleteProp] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingMulti, setIsUploadingMulti] = useState(false);

  const academyDetails = () => {
    axios
      .get(GET_ACADEMY + academyId, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setAcademyData(response?.data?.data[0]);
        if (response?.data?.data[0].photos !== "" && response?.data?.data[0].photos !== null) {
          setPhotoUrls(response.data.data[0].photos?.split("$@$@$").reverse())
        }
        if (response?.data?.data[0].videos !== "" && response?.data?.data[0].videos !== null) {
          setVideoUrls(response.data.data[0].videos?.split("$@$@$").reverse())
        }
      })
      .catch((error) => {
        console.log(error);;
      });
  };
  useEffect(() => {
    academyDetails();
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    submitImage(event.target.files[0]);
    if (selectedImage) {
      setNewName(selectedImage.name); // Set the file name
      setSelectedFile(selectedImage); // Set the selected file
    }
  };

  const submitImage = (file) => {
    setIsUploading(true);
    const selectedImage = file;
    if (selectedImage) {
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

      fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFileName(data.secure_url);
          handleSubmit("banner", data.secure_url)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsUploading(false); // Upload completed, hide the loader
        });
    }
  }
  const handleButtonClick2 = () => {
    fileInputRef2.current.click();
  };
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      submitImage2(event.target.files[0]);
    }
    else if (file.type.startsWith("video/")) {
      submitVideo2(event.target.files[0]);
    }
  };

  const submitImage2 = (file) => {
    setIsUploadingMulti(true);
    const selectedImage = file;
    if (selectedImage) {
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

      fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFileName2(data.secure_url);
          const imageUrl = data.secure_url;
          if (data.secure_url) {
            const updatedPhotoUrls = [...photoUrls, imageUrl];
            setPhotoUrls(updatedPhotoUrls);
            handleSubmit("photos", updatedPhotoUrls);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsUploadingMulti(false);
        });
    }
  }

  const submitVideo2 = (file) => {
    setIsUploadingMulti(true);
    const selectedImage = file;
    if (selectedImage) {
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

      fetch("https://api.cloudinary.com/v1_1/cloud2cdn/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFileName2(data.secure_url);
          const imageUrl = data.secure_url;
          if (videoUrls && videoUrls.length > 0) {
            const updatedVideoUrls = [...videoUrls, imageUrl];
            setVideoUrls(updatedVideoUrls);
            handleSubmit("videos", updatedVideoUrls);
          } else {
            setVideoUrls([imageUrl]);
            handleSubmit("videos", [imageUrl]);
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


  function handleSubmit(key_name, file) {
    let body = {};
    if (key_name === "banner") {
      body = {
        banner: file
      }
    }
    else if (key_name === "photos") {
      const joinedString = file.join("$@$@$");
      body = {
        photos: joinedString
      }
    }
    else if (key_name === "videos") {
      const joinedString = file.join("$@$@$");
      body = {
        videos: joinedString
      }
    }
    axios
      .put(UPDATE_ACADEMY + academyId, body, {
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
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 2000,
        });
      })
  }

 const handleDeleteOpen = (index, prop) => {
    setIsDeleteModalOpen(true);
    setDeleteIndex(index);
    setDeleteProp(prop);
  };
  const handleDeleteConfirm = () => {
    if (deleteProp === "image") {
      deleteStrategy();
    }
    else if (deleteProp === "video") {
      deleteVideo();
    }
    setIsDeleteModalOpen(false);
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
    const updatedNameString = updatedNameArray.reverse().join('$@$@$');
    axios
      .put(UPDATE_ACADEMY + academyId, {
        photos: updatedNameString,
      }, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
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
    const updatedNameString = updatedNameArray.reverse().join('$@$@$');
    axios
      .put(UPDATE_ACADEMY + academyId, {
        videos: updatedNameString,
      }, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        academyDetails();
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  };

  return (
    <div className="bmp-main-wrapper">
      <div className="bmp-fee-container">
        <div className="bmp-fee-left">
          <p className="common-fonts bmp-fee-timing-2">
            Photos & Video Gallery
          </p>
          <p className="common-fonts bmp-add-photo">
            Add photos and videos of your academy.
          </p>
          <p className="common-fonts bmp-prefer">
            Psst! A secret People prefer videos more than photos.
          </p>


          <div className="bmp-img-section">
            <div>
              <p className="common-fonts bmp-banner-upload">upload banner image</p>
              <p className="common-fonts light-color">
                Recommended image size 820x312
              </p>
              <div className="bmp-upload-2">
                <div className="contact-browse deal-doc-file">
                  <span
                    className="common-fonts common-input contact-tab-input bmp-border"
                    style={{
                      position: "relative",
                      marginRight: "10px",
                    }}
                  >
                    <button
                      className="contact-browse-btn common-fonts"
                      onClick={() => handleButtonClick()}
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
                        {newName
                          ? newName
                          : academyData?.banner?.toString()?.split("/")?.pop()}
                      </span>
                    )}
                  </span>
                </div>

                {selectedFile && (
                  <div className="bmp-image-preview-2">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt=""
                      className="bmp-preview-image"
                    />
                  </div>
                )}
                {!selectedFile && (
                  <div className="bmp-image-preview-2">
                    <img
                      src={academyData?.banner}
                      alt=""
                      className="bmp-preview-image"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      <ProgressBar/>
      </div>

      <div className="bmp-upload-img">
        <div className="bmp-heading-flex">
          <div>
            <p className="common-fonts bmp-banner-upload">
              Upload Academy images/videos
            </p>
            <p className="common-fonts light-color bmp-size">
              Recommended image size 820x312
            </p>
          </div>
          <div className="bmp-total-img">
            <p className="common-fonts bmp-prefer">
              Upload minimum 25 images & videos 6/25
            </p>
          </div>


        </div>

        <div className="bmp-upload-3 bmp-gap">
          <div className="contact-browse deal-doc-file">
            <span
              className="common-fonts common-input contact-tab-input bmp-border-2"
              style={{
                position: "relative",
                marginRight: "10px",
              }}
            >
              <button
                className="contact-browse-btn common-fonts"
                onClick={handleButtonClick2}
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
                ref={fileInputRef2}
                onChange={handleFileChange2}
              />
              {isUploadingMulti ? (
                <span className="common-fonts upload-file-name">Uploading...</span>
              ) : (
                <span className="common-fonts upload-file-name">
                  <p className="common-fonts light-color">You can upload multiple videos and images </p>
                  <p className="common-fonts bmp-format">Upload image/videos in format png, jpg, jpeg, gif, webp, mp4 </p>
                  { }
                </span>
              )}
            </span>
          </div>

          {selectedFile2 && (
            <div className="bmp-new-img">
              <div className="bmp-img-top-icon">
                <div className="bmp-img-name">

                  <div className="bmp-video">
                    <img src={Video} alt="" />
                  </div>

                  <p className="common-fonts bmp-tour">academy tour.gif</p>
                </div>
                <div className="bmp-trash">
                  <img src={Trash} alt="" />
                </div>

              </div>
              <img
                src={URL.createObjectURL(selectedFile2)}
                alt="Selected Preview"
              />
            </div>
          )}
        </div>
      </div>
      {videoUrls?.length === 0 ? (
        <div className='support-no-ticket-found'>
          <p className='common-fonts'>No videos added</p>
        </div>
      ) : (
        < div className="outerBox">
          {
            videoUrls?.map((video, index) => (

              <div className="bmp-new-img">
                <div className="bmp-img-top-icon">
                  <div className="bmp-img-name">
                    <div className="bmp-video">
                      <img src={Video} alt="" />
                    </div>
                    {/* <p className="common-fonts bmp-tour">academy tour.gif</p> */}
                  </div>
                  <div className="bmp-trash">
                    <img src={Trash} alt="" onClick={() => handleDeleteOpen(index, "video")} />
                  </div>
                </div>
                <div className="bmp-player-img">
                  <video width="270" height="140" controls>
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))
          }</div>
      )}

      {photoUrls?.length === 0 ? (
        <div className='support-no-ticket-found'>
          <p className='common-fonts'>No photos added</p>
        </div>
      ) : (
        < div className="outerBox">
          {
            photoUrls?.map((photo, index) => (
              <div className="bmp-new-img">
                <div className="bmp-img-top-icon">
                  <div className="bmp-img-name">

                    <div className="bmp-video">
                      <img
                        src={photo}
                        alt="Selected Preview"
                      />
                    </div>

                    {/* <p className="common-fonts bmp-tour">academy tour.gif</p> */}
                  </div>
                  <div className="bmp-trash">
                    <img src={Trash} alt="" onClick={() => handleDeleteOpen(index, "image")} />
                  </div>

                </div>
                <img
                  src={photo}
                  alt="Selected Preview"
                  key={index}
                />
              </div>
            ))
          }</div>
      )}

      {/* <div className="bmp-bottom-btn">
        <button className="common-fonts common-white-button">Cancel</button>
        <button className="common-fonts common-save-button">Save</button>
      </div> */}

      {isDeleteModalOpen && (
        <DeleteImage
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onDelete={handleDeleteConfirm}
          prop={deleteProp}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Gallery;

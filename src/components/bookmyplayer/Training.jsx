import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  GET_ACADEMY,
  UPDATE_ACADEMY,
  getDecryptedToken,
} from "../utils/Constants";
import Trash from "../../assets/image/red-bin.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteImage from "./DeleteImage.jsx";


const Training = () => {
  const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("academy_id");
  const [isUploadingMulti, setIsUploadingMulti] = useState(false);
  const [fileName2, setFileName2] = useState("");
  const fileInputRef2 = useRef(null);
  const [alertShown, setAlertShown] = useState(false);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteProp, setDeleteProp] = useState(null);
  const [alertVideoShown, setAlertVideoShown] = useState(false);
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const academyDetails = () => {
    axios
      .get(GET_ACADEMY + academyId, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        if (response?.data?.data[0]?.training_ground_photos !== "" && response?.data?.data[0]?.training_ground_photos !== null) {
          setPhotoUrls(response?.data?.data[0]?.training_ground_photos?.split(",")?.reverse())
        }
      })
      .catch((error) => {
        console.log(error);;
      });
  };
  useEffect(() => {
    academyDetails();
  }, []);
  const processImageName = (imageName) => {
    const nameParts = imageName.split('.');
    if (nameParts.length > 1) {
      const namePart = nameParts.slice(0, -1).join('.');
      const processedName = namePart.replace(/[^\w-]/g, '-');
      return `${processedName}.${nameParts[nameParts.length - 1]}`;
    } else {
      return imageName.replace(/[^\w-]/g, '-');
    }
  };
  const showAlertOnce = (message) => {
    if (!alertVideoShown) {
      alert(message);
      setAlertVideoShown(true);
    }
  };

  const handleButtonClick2 = () => {
    fileInputRef2.current.click();
    setAlertShown(false);
  };
  const handleFileChange2 = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!allowedImageTypes.includes(file.type)) {
        if (!alertShown) {
          alert("Please choose a valid image file.");
          setAlertShown(true);
        }
        return;
      }
      if (file.type.startsWith("image/")) {
        submitImage2(file);
      }
    }
  };
  const submitImage2 = (file) => {
    setIsUploadingMulti(true);
    const selectedImage = file;
    if (selectedImage) {
      if (selectedImage.size > 2 * 1024 * 1024) {
        showAlertOnce("Image size should be less than 2MB. Please choose a smaller image.");
        setIsUploadingMulti(false);
        return;
      }
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
          setFileName2(processImageName(selectedImage.name));
          const imageUrl = processImageName(selectedImage.name);
          if (data.secure_url) {
            photoUrls.push(imageUrl)
            setPhotoUrls(photoUrls);
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
  const handleDeleteOpen = (index, prop) => {
    setIsDeleteModalOpen(true);
    setDeleteIndex(index);
    setDeleteProp(prop);
  };
  const handleDeleteConfirm = () => {
    if (deleteProp === "image") {
      deleteStrategy();
    }
    setIsDeleteModalOpen(false);
  };
  console.log(photoUrls)
  const deleteStrategy = () => {
    if (deleteIndex !== null) {
      const updatedNameOfStrategy = [...photoUrls];
      updatedNameOfStrategy.splice(deleteIndex, 1);
      setPhotoUrls(updatedNameOfStrategy);
      updateDataAndCallAPI(updatedNameOfStrategy);
    }
  };
  const updateDataAndCallAPI = (updatedNameArray) => {
    const updatedNameString = updatedNameArray.reverse().join(',');
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
// {/* //////////////////////////////////////////////////////////////////code for tournaments////////////////////////////////////////////////////////////////////////////////////// */}
  const initialPhotoUrls = [...photoUrls];
  const initialFileName2 = fileName2;

  const resetState = () => {
    setPhotoUrls(initialPhotoUrls);
    setFileName2(initialFileName2);
  };

  function handleSubmit2() {

    let body = {
      training_ground_photos: photoUrls.join(","),
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
        setAlertVideoShown(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 2000,
        });
      })
  }

  return (
    <div>
      {/* <>
        <div className="bmpTab2ImgSection">
          <div className="bmp-heading-flex">
            <div>
              <p className="common-fonts bmp-banner-upload">
                Upload training ground images
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
                  multiple
                />
                {isUploadingMulti ? (
                  <span className="common-fonts upload-file-name">Uploading...</span>
                ) : (
                  <span className="common-fonts upload-file-name">
                    <p className="common-fonts light-color">You can upload multiple images </p>
                    <p className="common-fonts bmp-format">Upload image in format png, jpg, jpeg, webp </p>
                    { }
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
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
                          src={`https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${academyId}/${photo}`}
                          alt="Selected Preview"
                        />
                      </div>

                      <p className="common-fonts bmp-tour">academy tour.gif</p>
                    </div>
                    <div className="bmp-trash">
                      <img src={Trash} alt="" onClick={() => handleDeleteOpen(index, "image")} />
                    </div>

                  </div>
                  <img
                    src={`https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${academyId}/${photo}`}
                    alt="Selected Preview"
                    key={index}
                  />
                </div>
              ))
            }</div>
        )}
      </> */}
{/* /////////////////////////////////////////////////////////////////////////////code for tournaments/////////////////////////////////////////////////////////////////////////// */}
      {/* <>
        <div className="bmpTab2ImgSection">
          <div className="bmp-heading-flex">
            <div>
              <p className="common-fonts bmp-banner-upload">
                Upload training ground images
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
                  multiple
                />
                {isUploadingMulti ? (
                  <span className="common-fonts upload-file-name">Uploading...</span>
                ) : (
                  <span className="common-fonts upload-file-name">
                    <p className="common-fonts light-color">You can upload multiple images </p>
                    <p className="common-fonts bmp-format">Upload image in format png, jpg, jpeg, webp </p>
                    { }
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
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
                          src={`https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${academyId}/${photo}`}
                          alt="Selected Preview"
                        />
                      </div>

                      <p className="common-fonts bmp-tour">academy tour.gif</p>
                    </div>
                    <div className="bmp-trash">
                      <img src={Trash} alt="" onClick={() => handleDeleteOpen(index, "image")} />
                    </div>

                  </div>
                  <img
                    src={`https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${academyId}/${photo}`}
                    alt="Selected Preview"
                    key={index}
                  />
                </div>
              ))
            }</div>
        )}
      </>

      <div className="bmp-bottom-btn">
        <button className="common-fonts common-white-button" onClick={resetState}>Cancel</button>
        <button className="common-fonts common-save-button" onClick={handleSubmit2}>Save</button>
      </div>
      {isDeleteModalOpen && (
        <DeleteImage
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onDelete={handleDeleteConfirm}
          prop={deleteProp}
        />
      )} */}
    </div>
  )
}

export default Training

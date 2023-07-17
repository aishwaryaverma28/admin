import React, { useState, useRef } from "react";
import axios from "axios";
import { IMAGE_UP, IMAGE_DEL,IMG_BASE,getDecryptedToken } from "./utils/Constants";
import "./styles/BlogAdd.css";
function ImageUploader({ onDataTransfer }) {
  const fileInputRef = useRef(null);
  const [childData, setChildData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [showChooseButton, setShowChooseButton] = useState(false);
  const [hover, setHover] = useState(false);
  const decryptedToken = getDecryptedToken();
  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
    setShowUploadButton(true);
  };

  const imageUpload = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      console.log("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("blog_img", selectedImage);

    try {
      const response = await axios.post(IMAGE_UP, formData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
        }
      });
      console.log("Image uploaded successfully:", response.data);
      // Perform any additional actions on successful upload
      setShowUploadButton(false);
      setShowEditButton(true);
      setChildData(response.data.data);
      onDataTransfer(response.data.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error condition
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
    setShowChooseButton(false);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(IMAGE_DEL + childData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
        }
      });
      console.log("Image deleted successfully:", response);
      // Perform any additional actions on successful upload
      setSelectedImage(null);
      setShowUploadButton(false);
      setShowEditButton(false);
      setShowChooseButton(true);
      setChildData(response.data.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error condition
    }
  };

  return (
    <>
      {!showUploadButton && !showEditButton && !showChooseButton && (
        <button
          type="button"
          onClick={handleClick}
          className="imageUploaderData"
        >
          Choose Image
        </button>
      )}
      {selectedImage && !showEditButton && (
        <p className="image">Selected Image: {selectedImage.name}</p>
      )}
      <input
        type="file"
        name="blog_img"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageSelect}
      />
      {showUploadButton && !showEditButton && (
        <button
          type="submit"
          onClick={imageUpload}
          className="imageUploaderData"
        >
          Upload
        </button>
      )}
      {showEditButton && (
        <>
          <div className="blogImageEdit">
            <button
              type="button"
              onClick={handleEdit}
              className="imageUploaderData"
            >
              Edit Image
            </button>
            {childData && (
              <div
                className="imageContainer"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <img
                  src={IMG_BASE + childData}
                  alt="image"
                  className="docUpImg"
                />
                {hover && <p className="imageHoverText">{childData}</p>}
              </div>
            )}
          </div>
        </>
      )}
      {showChooseButton && (
        <>
          <button
            type="button"
            onClick={handleClick}
            className="imageUploaderData"
          >
            Choose Image
          </button>
        </>
      )}
    </>
  );
}

export default ImageUploader;

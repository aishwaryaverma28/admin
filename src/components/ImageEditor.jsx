import React, { useState, useRef } from "react";
import axios from "axios";
import { IMAGE_UP, IMAGE_DEL } from "./utils/Constants";
import "./styles/BlogAdd.css";
function ImageEditor({ parentProp, onDataTransfer }) {
  const fileInputRef = useRef(null);
  const [childData, setChildData] = useState(parentProp);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [showChooseButton, setShowChooseButton] = useState(false);
  // console.log(childData)
  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete(IMAGE_DEL + childData);
      console.log("Image deleted successfully:", response);
      // Perform any additional actions on successful upload
      setSelectedImage(null);
      setShowUploadButton(false);
      setShowEditButton(false);
      setShowChooseButton(true);
      setChildData(response.data.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleClick = () => {
    fileInputRef.current.click();
    setShowChooseButton(false);
  };
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
      const response = await axios.post(IMAGE_UP, formData);
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

  return (
    <>
     {showEditButton && (
        <div className="editBox">
          <p className="image">{childData}</p>
          <div className="blogImageEdit">
          <button
            type="button"
            onClick={handleEdit}
            className="imageUploaderData"
          >
            Edit Image
          </button>
           {childData && <img src={"http://core.leadplaner.com:3001/blog/" + childData} alt="image" className="docUpImg" />}
           </div>
        </div>
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
    </>
  );
}

export default ImageEditor;

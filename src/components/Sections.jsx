import React, { useState, useRef } from "react";
import axios from "axios";
import { IMAGE_UP, IMAGE_DEL,decryptedToken,handleApiError } from "./utils/Constants";
import "./styles/BlogAdd.css";
import ReactEditor from "./ReactEditor";
import trash from "../assets/image/delete-icon.svg";
import ImageUploader from "./ImageUploader";

const Sections = () => {
// section states
const [sectionData, setSectionData] = useState([]);
const [sectionTitle, setSectionTitle] = useState("");
const [sectionSort, setSectionSort] = useState(null);
const [dataFromChild, setDataFromChild] = useState("");
const [hideImages, setHideImages] = useState(false);
const [isIndex, setIsIndex] = useState(0);

const fileInputRef = useRef(null);
const [childData, setChildData] = useState("");
const [selectedImage, setSelectedImage] = useState(null);
const [showUploadButton, setShowUploadButton] = useState(false);
const [showEditButton, setShowEditButton] = useState(false);
const [showChooseButton, setShowChooseButton] = useState(false);
// ========================================================================section image added/deleted
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
    const response = await axios.delete( IMAGE_DEL+childData, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    } );
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
  
};

};
// ==========================================================accordion of sub sections
function accordianClick(index) {
    if (index === isIndex) {
      setIsIndex(0);
    } else {
      setIsIndex(index);
    }
  }
  //=============================================================setion title
  const handleSecTitleChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].title = event.target.value;
    setSectionData(newSectionData);
  };
//==============================================================section sort
  const handleSortChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].sort = event.target.value;
    setSectionData(newSectionData);
  };
  //==============================================================sub section image
  const subImageTrasfer = (data, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].image = data;
    setSectionData(newSectionData);
    setHideImages(true);
  };
  //==============================================================sub section editor
  const handleEditorChange = (data, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].section = data;
    setSectionData(newSectionData);
  };

  
  //======================================================================================= sort and title data change
  const handleTitle = (event) => {
    const title = event.target.value;
    setSectionTitle(title);
  };

  const handleSecSortChange = (event) => {
    const sort = parseInt(event.target.value);
    setSectionSort(sort);
  };
  //=======================================================================================editor data transfer
  const handleDataTransfer = (data) => {
    setDataFromChild(data);
  };
  //====================================================================================== handle section data in an array of objects
  const handleAddSection = (e) => {
    e.preventDefault();
    const newSection = {
      heading: sectionTitle,
      sort: sectionSort,
      image: childData,
      section: dataFromChild,
    };
    setSectionData([...sectionData, newSection]);
       // Reset input fields and image state
    setSectionTitle("");
    setSectionSort(0);
    setChildData("");
    setDataFromChild("");
    setShowEditButton(false)
    setSelectedImage("")
  };
  // console.log(sectionData);
  // =====================================================================================delete the targeted section
  const handleDeleteSection = (index) => {
    // e.preventDefault();
    const newSectionData = [...sectionData];
    newSectionData.splice(index, 1);
    setSectionData(newSectionData);
    };

  // console.log(sectionData);

  return (
    <>
              <div className="addSection">
                <div className="fromBlogSection">
                  <input
                    type="text"
                    name="sectionTitle"
                    id="sectiontitle"
                    placeholder="Section Title"
                    onChange={handleTitle}
                    value={sectionTitle}
                  />

                  <div className="formBtnBox">
                    <input
                      type="number"
                      name="Sort"
                      id="Sort"
                      value={sectionSort}
                      placeholder="Sort"
                      onChange={handleSecSortChange}
                    />
                    <div>
   

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
          <p className="image">{childData}</p>
          <button
            type="button"
            onClick={handleEdit}
            className="imageUploaderData"
          >
            Edit Image
          </button>
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
                    </div>

                    <button
                      onClick={handleAddSection}
                      className="addSectionBtn"
                    >
                      Add Section
                    </button>
                  </div>
                </div>

                <div className="formEditor">
                  <ReactEditor onDataTransfer={handleDataTransfer} />
                </div>
              </div>

              {sectionData.map((section, index) => (
                <div key={index} className="section">
                  <div
                    className="sectionDropdown"
                    onClick={() => accordianClick(section.sort)}
                  >
                    <h3>{section.heading}</h3>
                    {isIndex === section.sort ? (
                      <span>
                        <i class="fa-sharp fa-solid fa-minus"></i>
                      </span>
                    ) : (
                      <span>
                        <i className="fa-sharp fa-solid fa-plus"></i>
                      </span>
                    )}
                  </div>
                  <div
                    className={
                      isIndex === section.sort
                        ? "answer display_answer"
                        : "answer"
                    }
                  >
                    <input
                      type="text"
                      name="heading"
                      id="heading"
                      placeholder="Section Title"
                      className="sectionHead"
                      value={section.heading}
                      onChange={(event) => handleSecTitleChange(event, index)}
                    />

                    <div className="sectionBlockOne">
                      <input
                        type="number"
                        name="Sort"
                        id="Sort"
                        placeholder="Sort"
                        className="sectionSort"
                        value={section.sort}
                        onChange={(event) => handleSortChange(event, index)}
                      />
                      <div>
                      {!hideImages && section.image && (
                          <p>{section.image}</p>
                        )}
                        <ImageUploader
                          onDataTransfer={(data) =>
                            subImageTrasfer(data, index)
                          }
                        />
                      </div>
                    </div>
                    <div className="formEditor">
                      <ReactEditor
                        onDataTransfer={(data) =>
                          handleEditorChange(data, index)
                        }
                        initialContent={section.section}
                      />
                    </div>
                    <div className="deleteContainer">
                      <button
                        onClick={() => handleDeleteSection(index)}
                        className="sectionDelete"
                      >
                        <img
                          src={trash}
                          className="deleteIcon"
                          alt="Delete"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
  )
}

export default Sections
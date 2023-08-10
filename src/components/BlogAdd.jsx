import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  BLOG_ADD,
  GET_TAG,
  IMAGE_UP,
  IMAGE_DEL,
  IMG_BASE,
  getDecryptedToken
} from "./utils/Constants";

import "./styles/BlogAdd.css";
import ImageUploader from "./ImageUploader";
import ReactEditor from "./ReactEditor";
import trash from "../assets/image/delete-icon.svg";
import ImageEditor from "./ImageEditor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogAdd = () => {
  const [selectSite, setSelectSite] = useState("");
  const [hover, setHover] = useState(false);
    // section states
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSort, setSectionSort] = useState("");
  const [dataFromChild, setDataFromChild] = useState("");
  const [hideImages, setHideImages] = useState(false);
  const [isIndex, setIsIndex] = useState(-1);
  const fileInputRef = useRef(null);
  const [childData, setChildData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [showChooseButton, setShowChooseButton] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  // tags states
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [tagApi, setTagApi] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  // image useStates
  const [imageName, setImageName] = useState(null);
  const decryptedToken = getDecryptedToken();
  console.log(decryptedToken);
  useEffect(() => {
    axios.get(GET_TAG, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    })
      .then((response) => {
        setTagApi(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  // console.log(tagApi?.data?.data)
  const options = tagApi?.data?.data || [];

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    });

  // ===================================================================functions for tags addition and removal
  const handleTagSelection = (event) => {
    const id = event.target.value;
    setTagId((prevTags) => (prevTags ? `${prevTags},${id}` : id));
    options.map((option) => {
      if (option.id == id) {
        setSelectedTags((prev) => [...prev, option.tag]);
      }
    });
  };

  const handleTagRemoval = (index) => {
    const numbersArray = tagId.split(",");
    numbersArray.splice(index, 1);
    const updatedNumbersString = numbersArray.join(",");
    setTagId(updatedNumbersString);
    const tagUpdate = selectedTags.splice(index, 1);
  };

  //==================================================================== get image name
  const handleImageTransfer = (data) => {
    setImageName(data);
  };

  //===================================================================== function to add date in the form data
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    // console.log(date);
  };

  //===================================================================== function to track on chnage of form paramerters
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  // =====================================================================================section data trasfer
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
      const response = await axios.post(IMAGE_UP, formData,{
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
    } catch(error){
      console.log(error);
    };
  };
  // ==========================================================accordion of sub sections
  function accordianClick(index) {
    if (index === isIndex) {
      setIsIndex(-1);
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
    const sort = event.target.value;
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
      site:"",
      alt:"",
    };
    setSectionData([...sectionData, newSection]);
    // Reset input fields and image state
    setSectionTitle("");
    setSectionSort("");
    setChildData("");
    setDataFromChild("");
    setShowEditButton(false);
    setSelectedImage("");
  };
  // console.log(sectionData);
  // =====================================================================================delete the targeted section
  const handleDeleteSection = (index) => {
    // e.preventDefault();
    const newSectionData = [...sectionData];
    newSectionData.splice(index, 1);
    setSectionData(newSectionData);
  };

  console.log(sectionData);

  // =====================================================================function to handle form data when submited
  function handleSiteSelection(event) {
    // console.log(event.target.value);
    setSelectSite(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      tag: tagId,
      image: imageName,
      date: selectedDate,
      sections: sectionData,
      site: selectSite,
      route: formData.url,
      alt:"",
    };
     console.log(updatedFormData);
    axios.post(BLOG_ADD, updatedFormData, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    }).then((response) => {
      console.log(response);
      toast.success("Blog data updated successfully", {
        position:"top-center",
        autoClose:2000
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function AddTag(event) {
    event.preventDefault();
  }
  // ==========================================================================changes in section

  return (
    <>
      <header className="headerEditor">
        <h2> Add a new Blog</h2>
      </header>
      <form className="scrollCover" onSubmit={handleFormSubmit}>
        <div className="addBlogContainer">
          {/*==============================================================left side of form starts here ============================================================*/}
          <div className="addBlogMainForm">
            <div className="fromFiled">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Blog Title"
                onChange={handleChange}
              />
            </div>
            <div className="fromUrl">
              <input
                type="text"
                name="url"
                id="url"
                placeholder="Url"
                onChange={handleChange}
              />
              <div>
                <ImageUploader onDataTransfer={handleImageTransfer} />
              </div>
            </div>
            <div className="fromFiled">
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
            {/* <BlogSection/> */}

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
                      type="text"
                      name="Sort"
                      id="Sort"
                      value={sectionSort}
                      placeholder="Sort"
                      onChange={handleSecSortChange}
                    />
                    <div>
                      <>
                        {!showUploadButton &&
                          !showEditButton &&
                          !showChooseButton && (
                            <button
                              type="button"
                              onClick={handleClick}
                              className="imageUploaderData"
                            >
                              Choose Image
                            </button>
                          )}
                        {selectedImage && !showEditButton && (
                          <p className="image">
                            Selected Image: {selectedImage.name}
                          </p>
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
                                  {hover && (
                                    <p className="imageHoverText">
                                      {childData}
                                    </p>
                                  )}
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
                    onClick={() => accordianClick(index)}
                  >
                    <h3>{section.heading}</h3>
                    {isIndex === index ? (
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
                      isIndex === index ? "answer display_answer" : "answer"
                    }
                  >
                    <div className="sectionBlockOne">
                      <input
                        type="text"
                        name="Sort"
                        id="Sort"
                        placeholder="Sort"
                        className="SubsectionSort"
                        value={section.sort}
                        onChange={(event) => handleSortChange(event, index)}
                      />
                      <input
                        type="text"
                        name="heading"
                        id="heading"
                        placeholder="Section Title"
                        className="sectionHead"
                        value={section.heading}
                        onChange={(event) => handleSecTitleChange(event, index)}
                      />

                      <div>
                        <ImageEditor
                          parentProp={section.image}
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
                        <img src={trash} className="deleteIcon" alt="Delete" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
          {/*==============================================================left side of form end here ============================================================*/}
          {/*==============================================================right side of form starts here ============================================================*/}
          <div className="addBlogRightForm">
            <div className="tags">
              <div className="tagContent">
                <h3>Tags</h3>
                <div className="contentBox">
                  <select
                    onChange={handleTagSelection}
                    className="tagSelectBox"
                  >
                    <option value="">Select a tag</option>

                    {options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.tag}
                      </option>
                    ))}
                  </select>

                  <button onClick={AddTag} type="button" className="primaryBtn">
                    Add
                  </button>
                </div>
                <div className="tagData">
                  {selectedTags &&
                    selectedTags.map((tag, index) => (
                      <div key={index} className="tagItems">
                        {tag}

                        <i
                          className="fa-solid fa-x"
                          onClick={() => handleTagRemoval(index)}
                        ></i>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="tags">
              <div className="tagContent">
                <h3>Publish</h3>
                <div className="contentBox">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={selectedDate}
                    placeholder="please publish date"
                    onChange={handleDateChange}
                  />
                  <input
                    type="submit"
                    value="Publish"
                    className="secondaryBtn"
                  />
                </div>
              </div>
            </div>
            <div className="tags">
              <div className="tagContent">
                <h3>Site</h3>
                <div className="contentBox">
                  <select
                    onChange={handleSiteSelection}
                    className="SiteSelectBox"
                  >
                    <option value="">Select a Site</option>
                    <option value="leadplaner">leadplaner</option>
                    <option value="bookmyplayer">bookmyplayer</option>
                    <option value="routplaner">routplaner</option>
                  </select>
                </div>
              </div>
              <div className="tagData">
                <div className="tagItems">{selectSite}</div>
              </div>
            </div>
          </div>

          {/*=============================================================right side of form ends here ============================================================*/}
        </div>
      </form>
      <ToastContainer/>
    </>
  );
};

export default BlogAdd;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BLOG_ADD, GET_TAG, IMAGE_UP, IMAGE_DEL } from "./utils/Constants";
import "./styles/BlogAdd.css";
import "./styles/Editor.css";
import ImageUploader from "./ImageUploader";
import ReactEditor from "./ReactEditor";
import trash from "../assets/image/delete-icon.svg";
import ImageEditor from "./ImageEditor";

const BlogAdd = () => {
  // section states
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
  const [sectionData, setSectionData] = useState([]);
  // tags states
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [tagApi, setTagApi] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  // image useStates
  const [imageName, setImageName] = useState(null);

  useEffect(() => {
    axios.get(GET_TAG).then((response) => {
      setTagApi(response);
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
      const response = await axios.post(IMAGE_UP, formData);
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
      // Handle error condition
    }
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

  // console.log(sectionData);

  // =====================================================================function to handle form data when submited
  function handleFormSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      tag: tagId,
      image: imageName,
      date: selectedDate,
      sections: sectionData,
    };
    // console.log(updatedFormData);
    axios.post(BLOG_ADD, updatedFormData).then((response) => {
      console.log(response);
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
          {/*==============================================================right side of form starts here ============================================================*/}
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
                      type="number"
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
          {/*==============================================================right side of form end here ============================================================*/}
          {/*==============================================================left side of form starts here ============================================================*/}
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
          </div>
          {/*==============================================================left side of form ends here ============================================================*/}
        </div>
      </form>
    </>
  );
};

export default BlogAdd;

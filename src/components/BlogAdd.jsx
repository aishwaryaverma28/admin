import React, { useState, useEffect } from "react";
import axios from "axios";
import { BLOG_ADD, GET_TAG } from "./utils/Constants";
import "./styles/BlogAdd.css";
import "./styles/Editor.css";
import ReactEditor from "./ReactEditor";
import trash from "../assets/image/delete-icon.svg";
import ImageUploader from "./ImageUploader";
import Sections from "./Sections";

const BlogAdd = () => {
  // section states
  const [sectionData, setSectionData] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSort, setSectionSort] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");
  const [sectionImage, setSectionImage] = useState("");
  const [hideImages, setHideImages] = useState(false);
  // tags states
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [tagApi, setTagApi] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  // image useStates
  const [imageName, setImageName] = useState(null);


  const [isIndex, setIsIndex] = useState(0);

  useEffect(() => {
    axios.get(GET_TAG).then((response) => {
      setTagApi(response);
    });
  }, []);
  // console.log(tagApi?.data?.data)
  const options = tagApi?.data?.data || [];

  function accordianClick(index) {
    if (index === isIndex) {
      setIsIndex(0);
    } else {
      setIsIndex(index);
    }
  }

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
    console.log(date);
  };

  //===================================================================== function to track on chnage of form paramerters
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }
  // =====================================================================================section data trasfer

  const handleSecTitleChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].title = event.target.value;
    setSectionData(newSectionData);
  };

  const handleSortChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].sort = event.target.value;
    setSectionData(newSectionData);
  };
  const subImageTrasfer = (data, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].image = data;
    setSectionData(newSectionData);
    setHideImages(true);
  };
  const handleEditorChange = (data, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].section = data;
    setSectionData(newSectionData);
  };

  const handleImgTrans = (data) => {
    setSectionImage(data);
  };
  // console.log(sectionImage);
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
      image: sectionImage,
      section: dataFromChild,
    };
    setSectionData([...sectionData, newSection]);
    // Reset input fields and image state
    setSectionTitle("");
    setSectionSort(0);
    setSectionImage("");
    setDataFromChild("");
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

            {/* <>
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
                      <ImageUploader onDataTransfer={handleImgTrans} />
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
            </> */}

            <Sections/>
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

                  <button
                    onClick={AddTag}
                    type="button"
                    className="primaryBtn"
                  >
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

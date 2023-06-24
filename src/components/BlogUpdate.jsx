import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  BLOG_GET,
  BLOG_EDIT,
  SEC_GET,
  IMAGE_UP,
  IMAGE_DEL,
  GET_TAG
} from "./utils/Constants";
import ReactEditor from "./ReactEditor";
import trash from "../assets/image/delete-icon.svg";
import ImageEditor from "./ImageEditor";
import ImageUploader from "./ImageUploader";
import "./styles/BlogAdd.css";
const BlogUpdate = () => {
  const { id } = useParams();
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
  
 // tags states
 const [selectedTags, setSelectedTags] = useState([]);
 const [tagId, setTagId] = useState("");
 const [tagApi, setTagApi] = useState([]);


  const [blogData, setBlogData] = useState([]);
  const [currentBlog, setCurrentBlog] = useState({});
  const [sectionData, setSectionData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    tag: "",
    image: "",
    date: "",
  });
  const [stateBtn, setStateBtn] = useState(0);

  useEffect(() => {
    getBlogInfo();
    }, []);

  async function getBlogInfo() {
    const response = await axios.get(BLOG_GET);
    const data = response.data.data;
    setBlogData(data);
    searchData(data);
    const secResponse = await axios.get(SEC_GET + id);
    const secData = secResponse.data.data;
    setSectionData(secData);
  }

  function searchData(data) {
    const blog = data.find((item) => item.id == id);
    if (blog) {
      setCurrentBlog(blog);
      setFormData({
        ...formData,
        title: blog.title,
        url: blog.url,
        description: blog.description,
        tag: blog.tag,
        image: blog.image,
        date: blog.date.split("T")[0],
      });
      setTagId(blog.tag)      
    }
    tagData();
    }
    useEffect(() => {
      // Function to be called when data is updated
      if (tagId) {
        tagData(); // Replace with your desired function name
      }
    }, [tagId]); // Run the effect when the data state changes
  
    
  //==========================================================================tag part
  useEffect(() => {
    axios.get(GET_TAG).then((response) => {
      setTagApi(response);
    });
    
  }, []);
  const options = tagApi?.data?.data || [];

  const tagData = () => {   
   const ids = tagId.split(",");
// console.log(ids);
   ids.forEach((item) => {
  for (const option of options) {
    if (option.id == item && !selectedTags.includes(option.tag)) {
      setSelectedTags((prev) => [...prev, option.tag]);
      break; // Exit the inner loop after finding a match
    }
  }
});
  
  }
  // console.log(selectedTags)

  const handleTagSelection = (event) => {
    const id = event.target.value;
    setStateBtn(1);
    setTagId((prevTags) => (prevTags ? `${prevTags},${id}` : id));
    options.map((option) => {
      if (option.id == id && !selectedTags.includes(option.tag)) {
        setSelectedTags((prev) => [...prev, option.tag]);
      }
    });
  };

  const handleTagRemoval = (index) => {
    setStateBtn(1);
    const numbersArray = tagId.split(",");
    numbersArray.splice(index, 1);
    const updatedNumbersString = numbersArray.join(",");
    setTagId(updatedNumbersString);
    const tagUpdate = selectedTags.splice(index, 1);
  };

  function AddTag(event) {
    event.preventDefault();
  }
  // ==========================================================================================================================================
  // ========================================================section image added/deleted
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
    setStateBtn(1);
  };
  //==============================================================section sort
  const handleSortChange = (event, index) => {
     const newSectionData = [...sectionData];
    newSectionData[index].sort = event.target.value;
    setSectionData(newSectionData);
    setStateBtn(1);
  };
  //==============================================================sub section image
  const subImageTrasfer = (data, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].image = data;
    setSectionData(newSectionData);
    setHideImages(true);
    setStateBtn(1);
  };
  //==============================================================sub section editor
  const handleEditorChange = (data, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].section = data;
    setSectionData(newSectionData);
    setStateBtn(1);
  };

  //=========================================================== sort and title data change
  const handleTitle = (event) => {
    const title = event.target.value;
    setSectionTitle(title);
  };

  const handleSecSortChange = (event) => {
    const sort = parseInt(event.target.value);
    setSectionSort(sort);
  };
  //==================================================================editor data transfer
  const handleDataTransfer = (data) => {
    setDataFromChild(data);
  };
  //=========================================================handle section data in an array of objects
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
    setStateBtn(1);
  };
  // console.log(sectionData);
  
  // =====================================================================================delete the targeted section
  const handleDeleteSection = (index) => {
    // e.preventDefault();
    const newSectionData = [...sectionData];
    newSectionData.splice(index, 1);
    setSectionData(newSectionData);
    setStateBtn(1);
  };

  // console.log(sectionData);
  // ========================================================================================================================================================================
  
  function handleChange(event) {
    const { name, value } = event.target;
    if (formData[name] !== value) setStateBtn(1);
    setFormData({ ...formData, [name]: value });
  }
  // console.log(formData);
  const handleImageTransfer = (data) => {
    setFormData.image(data);
  };
  function handleFormSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      title: formData.title,
      url: formData.url,
      description: formData.description,
      image: formData.image,
      date: formData.date,
      tag: tagId,
      sections: sectionData,
    };
    // axios.put(BLOG_EDIT+id, updatedFormData).then((response) => {
    //   console.log(response);
    // });
    fetch(BLOG_EDIT + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' // Set the content type to JSON
      },
      body: JSON.stringify(updatedFormData) // Convert the data to JSON string
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    
    console.log(JSON.stringify(updatedFormData));
  }

  return (
    <>
      <header className="headerEditor">
        <h2>Update Blog</h2>
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
                value={formData.title}
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
                value={formData.url}
                onChange={handleChange}
              />
              <div>
                {formData.image ? <ImageEditor
                          parentProp={formData.image}
                          onDataTransfer={handleImageTransfer}
                        /> :  <ImageUploader onDataTransfer={handleImageTransfer} />}
                        </div>
            </div>
            <div className="fromFiled">
              <input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
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

            {/* ============================================================================================================================================== */}
          </div>
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
              <div className="tagContent">
                <h3>Publish</h3>
                <div className="contentBox">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    placeholder="please publish date"
                    onChange={handleChange}
                  />
                  <div className="saveBtnRight">
              {stateBtn === 0 ? (
                <button className="closeBtn">
                  <Link to={"/employee/view"}>Close</Link>
                </button>
              ) : (
                <input
                  type="submit"
                  value="Save"
                  className="secondaryBtn saveBtn"
                />
              )}
            </div>
                 
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </form>
    </>
  );
};

export default BlogUpdate;

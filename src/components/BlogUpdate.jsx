import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  BLOG_GET,
  BLOG_EDIT,
  SEC_GET,
  IMAGE_UP,
  IMAGE_DEL,
  GET_TAG,
  getDecryptedToken
} from "./utils/Constants";
import ReactEditor from "./ReactEditor";
import trash from "../assets/image/delete-icon.svg";
import ImageEditor from "./ImageEditor";
import ImageUploader from "./ImageUploader";
import "./styles/BlogAdd.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftArrow from "../assets/image/arrow-left.svg";
const BlogUpdate = () => {
  const { id } = useParams();
  // section states
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSort, setSectionSort] = useState(null);
  const [sectionImage, setSectionImage] = useState("");
  const [dataFromChild, setDataFromChild] = useState("");
  const [hideImages, setHideImages] = useState(false);
  const [isIndex, setIsIndex] = useState(-1);
  const fileInputRef = useRef(null);
  const [childData, setChildData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);
  const [showChooseButton, setShowChooseButton] = useState(false);
  const decryptedToken = getDecryptedToken();
  // tags states
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [tagApi, setTagApi] = useState([]);
  const [selectSite, setSelectSite] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [currentBlog, setCurrentBlog] = useState({});
  const [sectionData, setSectionData] = useState([]);
  const [pic, setPic] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    tag: "",
    image: "",
    date: "",
    site: "",
    route:"",
  });
  const [stateBtn, setStateBtn] = useState(0);
  const editorRef = useRef();
  useEffect(() => {
    getBlogInfo();
  }, []);

  async function getBlogInfo() {
    const response = await axios.get(BLOG_GET, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    });
    const data = response.data.data;
    setBlogData(data);
    searchData(data);
    const secResponse = await axios.get(SEC_GET + id, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    });
    // const secData = secResponse.data.data;
    // setSectionData(secData);
    const secData = secResponse.data.data;
  const sectionDataWithoutDate = removeDateFromSectionData(secData);
  setSectionData(sectionDataWithoutDate);
    tagData();
    
  }

  const removeDateFromSectionData = (data) => {
    return data.map((section) => {
      // Create a copy of the section object without the 'date' property
      const { date, ...newSection } = section;
      return newSection;
    });
  };

  console.log(sectionData);

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
        site: blog.site,
        route:blog.url,
      });
      setTagId(blog.tag);
      setSelectSite(blog.site);
    }
  }
    //==========================================================================tag part
  useEffect(() => {
    axios.get(GET_TAG, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    }).then((response) => {
      setTagApi(response);
      tagData(); // Call tagData() after receiving the tag data
    });
  }, []);

  const options = tagApi?.data?.data || [];
  const tagData = () => {
    const ids = tagId.split(",");
    const newTags = [];
    ids.forEach((item) => {
      const option = options.find((opt) => opt.id == item);
      if (option && !selectedTags.includes(option.tag)) {
        newTags.push(option.tag);
      }
    });
    setSelectedTags((prevTags) => [...prevTags, ...newTags]);
  };

  useEffect(() => {
    tagData();
  }, [options]); // Run the effect when options (tag data) changes

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
  function handleSiteSelection(event) {
    setSelectSite(event.target.value);
    setStateBtn(1);
  }
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
    newSectionData[index].heading = event.target.value;
    setSectionData(newSectionData);
    setStateBtn(1);
  };
  const handleimageChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].image = event.target.value;
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
    const sort = event.target.value;
    setSectionSort(sort);
  };

  const handleSecImageChange = (event) => {
    const image = event.target.value;
    setSectionImage(image);
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
      // image: childData,
      image: sectionImage,
      section: dataFromChild,
      site:"",
      alt:"",
    };
    setSectionData([...sectionData, newSection]);
    // Reset input fields and image state
    setSectionTitle("");
    setSectionSort(parseInt(sectionSort) + 1);
    setChildData("");
    setDataFromChild("");
    setShowEditButton(false);
    setSelectedImage("");
    setStateBtn(1);
     // Clear the editor content using the ref
  editorRef.current.clearEditorContent(); // Add this line
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

  const handleImageTransfer = (data) => {
    setStateBtn(1);
    // setFormData.image(data);
    setPic(data);
    console.log(data);
  };
  const handleImageEditor = (data) => {
    setStateBtn(1);
    setPic(data);
    console.log(data);
  };
  async function handleFormSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      title: formData.title,
      url: formData.url,
      description: formData.description,
      // image: pic,
      image:formData.image,
      date: formData.date,
      site: selectSite,
      tag: tagId,
      sections: sectionData,
      route:formData.url,
    };
    console.log(JSON.stringify(updatedFormData));
    try {
      const response = await fetch(BLOG_EDIT + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(updatedFormData), // Convert the data to JSON string
      });

      const data = await response.json();
      console.log(data);
      toast.success("Blog data updated successfully", {
        position:"top-center",
        autoClose:2000
      })
    }catch(error){
      console.log(error)
    };
    setStateBtn(0);
  }

  return (
    <>
      <header className="headerEditor">
        <h2>Update Blog</h2>
      </header>
      <div className="back-to-user general-refresh">
      <Link to={"/admin/blog/view"}>
              <button className="common-fonts">
                <img src={LeftArrow} alt="" />
                <span>Back To Blog Table</span>
              </button>
            </Link>
            </div>
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
              <input
                type="text"
                name="image"
                id="image"
                placeholder="image"
                value={formData.image}
                onChange={handleChange}
              />
              {/* <div>
                {formData.image ? (
                  <ImageEditor
                    parentProp={formData.image}
                    onDataTransfer={handleImageEditor}
                  />
                ) : (
                  <ImageUploader onDataTransfer={handleImageTransfer} />
                )}
              </div> */}
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
                      type="text"
                      name="Sort"
                      id="Sort"
                      value={sectionSort}
                      placeholder="Sort"
                      onChange={handleSecSortChange}
                    />
                    <input
                      type="text"
                      name="image"
                      id="image"
                      value={sectionImage}
                      placeholder="image"
                      onChange={handleSecImageChange}
                    />
                    {/* <div>
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
                    </div> */}

                    <button
                      onClick={handleAddSection}
                      className="addSectionBtn"
                    >
                      Add Section
                    </button>
                  </div>
                </div>

                <div className="formEditor">
                <ReactEditor
        ref={editorRef} // Attach the ref here
        onDataTransfer={handleDataTransfer}
      />
                </div>
              </div>

              {sectionData.map((section, index) => (
                <div key={index} className="section">
                  <div
                    className="sectionDropdown"
                    onClick={() => accordianClick(index)}
                  >
                   <div className="accHead">
                      <h3>{section.sort}</h3>
                      <h3>{section.heading}</h3>
                    </div>
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
<input
                        type="text"
                        name="image"
                        id="image"
                        placeholder="image"
                        className="sectionHead"
                        value={section.image}
                        onChange={(event) => handleimageChange(event, index)}
                      />
                      {/* <ImageEditor
                        parentProp={section.image}
                        onDataTransfer={(data) => subImageTrasfer(data, index)}
                      /> */}
                    </div>

                    <div className="formEditor">
                      <ReactEditor
                        onDataTransfer={(data) =>
                          handleEditorChange(data, index)
                        }
                        initialContent={section.section}
                      />
                    </div>
                    {section.id ? (
                      <></>
                    ) : (
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
                    )}
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
                        <Link to={"/admin/blog/view"}>Close</Link>
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
          </div>
        </div>
      </form>
      <ToastContainer/>
    </>
  );
};

export default BlogUpdate;

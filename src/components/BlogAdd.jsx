import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  BLOG_ADD,
  GET_TAG,
  IMAGE_UP,
  IMAGE_DEL,
  IMG_BASE,
  getDecryptedToken,
} from "./utils/Constants";

import "./styles/BlogAdd.css";
import ReactEditor from "./ReactEditor";
import trash from "../assets/image/delete-icon.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogAdd = () => {
  //cloudaniary images
  const [blogImg, setBlogImg] = useState("");

  const [selectSite, setSelectSite] = useState("");
  const [hover, setHover] = useState(false);
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
  const [sectionData, setSectionData] = useState([]);
  // tags states
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [tagApi, setTagApi] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  // image useStates
  const [imageName, setImageName] = useState(null);
  const [stateBtn, setStateBtn] = useState(0);
  const decryptedToken = getDecryptedToken();
  const editorRef = useRef(); // Define the editorRef using useRef
  useEffect(() => {
    axios
      .get(GET_TAG, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        setTagApi(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const options = tagApi?.data?.data || [];

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    meta_description: "",
    keywords: "",
  });

  // ===================================================================functions for tags addition and removal
  const handleTagSelection = (event) => {
    const id = event.target.value;
    setStateBtn(1);
    setTagId((prevTags) => (prevTags ? `${prevTags},${id}` : id));
    options.map((option) => {
      if (option.id == id) {
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

  //==================================================================== get image name
  // const handleImageTransfer = (data) => {
  //   setImageName(data);
  //   setStateBtn(1);
  // };

  //===================================================================== function to add date in the form data
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setStateBtn(1);
    // console.log(date);
  };

  //===================================================================== function to track on chnage of form paramerters
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
    let modifiedValue = value;
    if (name === "title") {
      modifiedValue = modifiedValue.toLowerCase();
      modifiedValue = modifiedValue.replace(/\s+/g, "-");
      modifiedValue = modifiedValue.replace(/[^\w\s-]/g, "");
      setFormData((prev) => {
        return { ...prev, url: modifiedValue };
      });
    }
    setStateBtn(1);
  }
  // =====================================================================================section data trasfer
  // // ========================================================================section image added/deleted
  // const handleImageSelect = (event) => {
  //   setSelectedImage(event.target.files[0]);
  //   setShowUploadButton(true);
  // };

  // const imageUpload = async (event) => {
  //   event.preventDefault();

  //   if (!selectedImage) {
  //     console.log("No image selected.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("blog_img", selectedImage);

  //   try {
  //     const response = await axios.post(IMAGE_UP, formData, {
  //       headers: {
  //         Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
  //       },
  //     });
  //     console.log("Image uploaded successfully:", response.data);
  //     // Perform any additional actions on successful upload
  //     setShowUploadButton(false);
  //     setShowEditButton(true);
  //     setChildData(response.data.data);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     // Handle error condition
  //   }
  // };

  // const handleClick = () => {
  //   fileInputRef.current.click();
  //   setShowChooseButton(false);
  // };

  // const handleEdit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.delete(IMAGE_DEL + childData, {
  //       headers: {
  //         Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
  //       },
  //     });
  //     console.log("Image deleted successfully:", response);
  //     // Perform any additional actions on successful upload
  //     setSelectedImage(null);
  //     setShowUploadButton(false);
  //     setShowEditButton(false);
  //     setShowChooseButton(true);
  //     setChildData(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
    setStateBtn(1);
  };
  //==============================================================section sort
  const handleSortChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].sort = parseInt(event.target.value);
    setSectionData(newSectionData);
    setStateBtn(1);
  };

  const handleimageChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].image = event.target.value;
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

  //======================================================================================= sort and title data change
  const handleTitle = (event) => {
    const title = event.target.value;
    setSectionTitle(title);
    setStateBtn(1);
  };

  const handleSecSortChange = (event) => {
    const sort = parseInt(event.target.value);
    setSectionSort(sort);
    setStateBtn(1);
  };
  const handleSecImageChange = (event) => {
    const image = event.target.value;
    setSectionImage(image);
    setStateBtn(1);
  };
  //=======================================================================================editor data transfer
  const handleDataTransfer = (data) => {
    setDataFromChild(data);
    setStateBtn(1);
  };

  const removeHtmlTags = (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  //====================================================================================== handle section data in an array of objects
  const handleAddSection = (e) => {
    e.preventDefault();
    const plainText = removeHtmlTags(dataFromChild);
    const newSection = {
      heading: sectionTitle,
      sort: parseInt(sectionSort),
      // image: childData,
      image: sectionImage,
      section: plainText,
      site: "",
      alt: "",
    };
    setSectionData([...sectionData, newSection]);
    // Reset input fields and image state
    setSectionTitle("");
    setSectionSort(parseInt(sectionSort) + 1);
    setChildData("");
    setSectionImage("");
    setDataFromChild("");
    setShowEditButton(false);
    setSelectedImage("");
    setStateBtn(1);
    // Clear the editor content using the ref
    editorRef.current.clearEditorContent(); // Add this line
  };
  // =====================================================================================delete the targeted section
  const handleDeleteSection = (index) => {
    const newSectionData = [...sectionData];
    newSectionData.splice(index, 1);
    setSectionData(newSectionData);
    setStateBtn(1);
  };

  // console.log(sectionData);

  // =====================================================================function to handle form data when submited
  function handleSiteSelection(event) {
    setSelectSite(event.target.value);
    setStateBtn(1);
  }

  const resetForm = () => {
    setFormData({
      ...formData,
      title: "",
      url: "",
      description: "",
      meta_description: "",
      keywords: "",
    });
    setSelectSite("");
    setTagId("");
    setSelectedTags([]);
    setTagApi([]);
    setSelectedDate("");
    setSectionData([]);
    setSectionTitle("");
    setSectionSort("");
    setSectionImage("");
    setDataFromChild("");
    setShowUploadButton(false);
    setShowEditButton(false);
    setShowChooseButton(false);
    setSelectedImage(null);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      tag: tagId,
      // image: imageName,
      date: selectedDate,
      sections: sectionData,
      site: selectSite,
      route: formData.url,
      alt: "",
    };
    console.log(updatedFormData);
    // axios
    //   .post(BLOG_ADD, updatedFormData, {
    //     headers: {
    //       Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response?.data?.status);
    //     if (response?.data?.status == 1) {
    //     toast.success("Blog data added successfully", {
    //       position: "top-center",
    //       autoClose: 2000,
    //     });
    //     resetForm();
    //   }else{
    //     toast.error(response?.data?.message, {
    //       position:"top-center",
    //       autoClose:2000
    //     })
    //   }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // setStateBtn(0);
  }

  function AddTag(event) {
    event.preventDefault();
  }

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    submitImage(event.target.files[0]);
  };

  const submitImage = (file) => {    
    const selectedImage = file;
    console.log(selectedImage);
    if (selectedImage) {
      const data = new FormData();
      data.append("file", selectedImage);
      data.append("upload_preset", "zbxquqvw");
      data.append("cloud_name", "cloud2cdn");
      data.append("folder", "bookmyplayer");
      fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data?.url);
          setBlogImg(data?.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <header className="headerEditor">
        <h3> Add a new Blog</h3>
      </header>
      <form className="scrollCover" onSubmit={handleFormSubmit}>
        <div className="addBlogContainer">
          {/*==============================================================left side of form starts here ============================================================*/}
          <div className="addBlogMainForm">
            <div>
              <input
                type="file"
                id="imageUpload"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

            </div>
            <div className="fromFiled">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Blog Title"
                value={formData.title}
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
                disabled
              />
              <div>
                {/* <ImageUploader onDataTransfer={handleImageTransfer} /> */}
                {/* <input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="image"
                  value={formData.image}
                  onChange={handleChange}
                /> */}
                  <div className="blog-browse-img">
                  <button
                className="common-fonts blog-add-img"
                onClick={handleButtonClick}
              >
                Add Image
              </button>
              {(blogImg)?<img src={blogImg} alt="" className="blog-img"/>:<></>}

                  </div>
               
              </div>
            </div>
            <div className="fromFiled">
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="fromFiled">
              <input
                type="text"
                name="meta_description"
                id="meta_description"
                placeholder="Blog Meta Description"
                value={formData.meta_description}
                onChange={handleChange}
              />
            </div>
            <div className="fromFiled">
              <input
                type="text"
                name="keywords"
                id="keywords"
                value={formData.keywords}
                placeholder="Blog Keywords"
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
                    <input
                      type="text"
                      name="image"
                      id="image"
                      value={sectionImage}
                      placeholder="image"
                      onChange={handleSecImageChange}
                    />
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
                    ref={editorRef} // Add this line
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

                      <div>
                        <input
                          type="text"
                          name="image"
                          id="image"
                          placeholder="image"
                          className="sectionHead"
                          value={section.image}
                          onChange={(event) => handleimageChange(event, index)}
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
                  <div className="saveBtnRight">
                    {stateBtn === 0 ? (
                      <button className="closeBtn" disabled>
                        Save
                      </button>
                    ) : (
                      <input
                        type="submit"
                        value="Publish"
                        className="secondaryBtn"
                      />
                    )}
                  </div>
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
      <ToastContainer />
    </>
  );
};

export default BlogAdd;

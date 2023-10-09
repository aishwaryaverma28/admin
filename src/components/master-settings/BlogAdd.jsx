import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  BLOG_ADD,
  GET_TAG,
  GET_TAG_BY_SITE,
  getDecryptedToken,
} from "../utils/Constants";

import "../styles/BlogAdd.css";
import ReactEditor from "../ReactEditor";
import trash from "../../assets/image/delete-icon.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogAdd = () => {
  //cloudaniary images
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRefs = useRef(null);
  const [blogImg, setBlogImg] = useState("");
  const [blogImg2, setBlogImg2] = useState("");
  const [selectSite, setSelectSite] = useState("");
  // section states
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSort, setSectionSort] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");
  const [isIndex, setIsIndex] = useState(-1);  
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [showUploadButton, setShowUploadButton] = useState(false);
  // const [showEditButton, setShowEditButton] = useState(false);
  // const [showChooseButton, setShowChooseButton] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  // tags states
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [tagApi, setTagApi] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [stateBtn, setStateBtn] = useState(0);
  const decryptedToken = getDecryptedToken();
  const editorRef = useRef(); // Define the editorRef using useRef
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    meta_description: "",
    keywords: "",
  });

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

  const getTagBySite = (site) => {
    axios
      .get(GET_TAG_BY_SITE + site, {
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
  }

  const handleReplaceImage = (event, index) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const folder = "bookmyplayer/blog";
      const uniqueFileName = `${folder}/${selectedImage.name.replace(/\.[^/.]+$/, "")}`;

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
          console.log(data);
          // Update the image URL in the sectionData state
          const newSectionData = [...sectionData];
          newSectionData[index].image = selectedImage.name;
          setSectionData(newSectionData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
    const newValue = event.target.value;
    setSectionSort(newValue === "" ? null : parseInt(newValue, 10));
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
  console.log(sectionData);
  const handleAddSection = (e) => {
    e.preventDefault();
    const plainText = removeHtmlTags(dataFromChild);
    const newSection = {
      heading: sectionTitle,
      sort: sectionSort === null ? 1 : parseInt(sectionSort),
      image: blogImg2,
      section: plainText,
      site: "",
      alt: "",
    };
    setSectionData([...sectionData, newSection]);
    setSectionTitle("");
    setSectionSort(sectionSort === null ? 2 : parseInt(sectionSort) + 1);
    setDataFromChild("");
    // setShowEditButton(false);
    // setSelectedImage("");
    setStateBtn(1);
    setBlogImg2("");
    editorRef.current.clearEditorContent();
  };
  // =====================================================================================delete the targeted section
  const handleDeleteSection = (index) => {
    const newSectionData = [...sectionData];
    newSectionData.splice(index, 1);
    setSectionData(newSectionData);
    setStateBtn(1);
  };

  console.log(sectionData);

  // =====================================================================function to handle form data when submited
  function handleSiteSelection(event) {
    setSelectSite(event.target.value);
    setStateBtn(1);
    getTagBySite(event.target.value);
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
    setBlogImg("");
    setSectionSort("");
    setDataFromChild("");
    // setShowUploadButton(false);
    // setShowEditButton(false);
    // setShowChooseButton(false);
    // setSelectedImage(null);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      tag: tagId,
      // image: imageName,
      image: blogImg,
      date: selectedDate,
      sections: sectionData,
      site: selectSite,
      route: formData.url,
      alt: "",
    };
    console.log(updatedFormData);
    axios
      .post(BLOG_ADD, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response?.data?.status);
        if (response?.data?.status == 1) {
          toast.success("Blog data added successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          resetForm();
        } else {
          toast.error(response?.data?.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setStateBtn(0);
  }

  function AddTag(event) {
    event.preventDefault();
  }

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };
  const handleButtonClick2 = (event) => {
    event.preventDefault();
    fileInputRef2.current.click();
  };

  const handleFileChange = (event) => {
    submitImage(event.target.files[0]);
  };
  const handleFileChange2 = (event) => {
    submitImage2(event.target.files[0]);
  };

  const submitImage = (file) => {
    const selectedImage = file;
    console.log(selectedImage);
    if (selectedImage) {
      const folder = "bookmyplayer/blog";
      const uniqueFileName = `${folder}/${selectedImage.name.replace(/\.[^/.]+$/, "")}`;

      const data = new FormData();
      data.append("file", selectedImage);
      data.append("upload_preset", "zbxquqvw");
      data.append("cloud_name", "cloud2cdn");
      data.append("public_id", uniqueFileName);
      // data.append("overwrite", true);

      fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBlogImg(selectedImage.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const submitImage2 = (file) => {
    const selectedImage = file;
    console.log(selectedImage);
    if (selectedImage) {
      const folder = "bookmyplayer/blog";
      const uniqueFileName = `${folder}/${selectedImage.name.replace(/\.[^/.]+$/, "")}`;

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
          setBlogImg2(selectedImage.name);
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
                <div className="blog-browse-img">
                  <button
                    className="common-fonts blog-add-img add-img-2"
                    onClick={handleButtonClick}
                  >
                    Add Image
                  </button>
                  {blogImg ? (
                    blogImg
                  ) : (
                    <></>
                  )}
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
                <input
                  type="file"
                  id="imageUpload"
                  ref={fileInputRef2}
                  onChange={handleFileChange2}
                  style={{ display: "none" }}
                />
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
                      value={sectionSort === null ? "" : sectionSort}
                      placeholder="Sort"
                      onChange={handleSecSortChange}
                    />
                    {/* <input
                      type="text"
                      name="image"
                      id="image"
                      value={sectionImage}
                      placeholder="image"
                      onChange={handleSecImageChange}
                    /> */}
                    <div className="blog-browse-img">
                      <button
                        className="common-fonts blog-add-img add-img-2"
                        onClick={handleButtonClick2}
                      >
                        Add Image
                      </button>
                      {blogImg2 ? (
                       blogImg2
                      ) : (
                        <></>
                      )}
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

                        {/* <input
                          type="text"
                          name="image"
                          id="image"
                          placeholder="image"
                          className="sectionHead"
                          value={section.image}
                          onChange={(event) => handleimageChange(event, index)}
                        /> */}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleReplaceImage(event, index)}
                          style={{ display: "none" }}
                          ref={(input) => (fileInputRefs[index] = input)}
                        />

                        <div className="blog-browse-img">
                        <button
                          className="common-fonts blog-add-img add-img-2"
                          onClick={() => fileInputRefs[index].click()}
                        >
                        {section?.image ? ' change image': ' add image'}
                        </button>
                        {section?.image ? (
                         section?.image
                        ) : (
                          <></>
                        )}
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
                    <option value="ezuka">ezuka</option>
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

import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  SEC_ADD,
  BLOG_GETID,
  BLOG_EDIT,
  SEC_GET,
  GET_TAG,
  GET_TAG_BY_SITE,
  SEC_UPDATE,
  getDecryptedToken,
} from "../utils/Constants";
import ReactEditor from "../ReactEditor";
import trash from "../../assets/image/delete-icon.svg";
import "../styles/BlogAdd.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftArrow from "../../assets/image/arrow-left.svg";
const BlogUpdate = () => {
  const { id } = useParams();
  // section states
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSort, setSectionSort] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");
  const [isIndex, setIsIndex] = useState(-1);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRefs = useRef(null);
  // const [childData, setChildData] = useState("");
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [showEditButton, setShowEditButton] = useState(false);
  const decryptedToken = getDecryptedToken();
  // tags states
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagId, setTagId] = useState("");
  const [tagApi, setTagApi] = useState([]);
  const [selectSite, setSelectSite] = useState("");
  const [sectionData, setSectionData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    meta_description: "",
    keywords: "",
    tag: "",
    image: "",
    date: "",
    site: "",
    route: "",
  });
  const [blogImg2, setBlogImg2] = useState("");
  const [blogImgName, setBlogImgName] = useState("");
  const [blogImgName2, setBlogImgName2] = useState("");
  const [blogImg3, setBlogImg3] = useState("");

  const [stateBtn, setStateBtn] = useState(0);
  const [updateStateBtn, setUpdateStateBtn] = useState(0);
  const editorRef = useRef();
  useEffect(() => {
    getBlogInfo();
  }, []);

  const handleUpdateClick = (event, id) => {
    event.preventDefault();
    const updatedSection = sectionData.find((section) => section.id === id);

    if (!updatedSection) {
      console.error(`Section with id ${id} not found.`);
      return;
    }
    const updatedFormData = {
      heading: updatedSection.heading,
      sort: updatedSection.sort,
      image: updatedSection.image,
      section: updatedSection.section,
      blogid: updatedSection.blogid,
    };
    axios
      .put(SEC_UPDATE + updatedSection.id, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if (response.data.status === 1) {
          toast.success("Section updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("Some error occured", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function getBlogInfo() {
    const response = await axios.get(BLOG_GETID + id, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
      },
    });
    const data = response.data.data[0];
    if (data) {
      setFormData({
        ...formData,
        title: data?.title,
        url: data?.url,
        description: data?.description,
        meta_description: data?.meta_description,
        keywords: data?.keywords,
        tag: data?.tag,
        image: data?.image,
        date: data?.date?.split("T")[0],
        site: data?.site,
        route: data?.url,
      });
      setBlogImg2(data?.image);
      setBlogImgName(data?.image?.split("blog/"));
      setTagId(data?.tag);
      setSelectSite(data?.site);
      getTagBySite(data?.site);
    }
    const secResponse = await axios.get(SEC_GET + id, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
      },
    });
    const secData = secResponse.data.data;
    const sectionDataWithoutDate = removeDateFromSectionData(secData);
    setSectionData(sectionDataWithoutDate);
    tagData();
  }

  const removeDateFromSectionData = (data) => {
    return data.map((section) => {
      const { date, ...newSection } = section;
      return newSection;
    });
  };
  //==========================================================================tag part
  useEffect(() => {
    axios
      .get(GET_TAG, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        setTagApi(response);
        tagData(); // Call tagData() after receiving the tag data
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
  };

  const tagData = () => {
    const ids = tagId?.split(",");
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
    const numbersArray = tagId?.split(",");
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
    getTagBySite(event.target.value);
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
    newSectionData[index].heading = event.target.value;
    setSectionData(newSectionData);
    setUpdateStateBtn(1);
  };

  //==============================================================section sort
  const handleSortChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].sort = event.target.value;
    setSectionData(newSectionData);
    setUpdateStateBtn(1);
  };
  //==============================================================sub section editor
  const handleEditorChange = (data, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].section = data;
    setSectionData(newSectionData);
    setUpdateStateBtn(1);
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

  //==================================================================editor data transfer
  const handleDataTransfer = (data) => {
    setDataFromChild(data);
  };

  const removeHtmlTags = (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  //=========================================================handle section data in an array of objects

  const handleAddSection = (e) => {
    e.preventDefault();
    const plainText = removeHtmlTags(dataFromChild);
    const newSection = {
      heading: sectionTitle,
      sort: parseInt(sectionSort),
      image: blogImg3.split("blog/")[1]?.replace(/\.jpg$/, ""),
      // section: plainText,
      section: `${dataFromChild}`,
      site: "",
      alt: "",
    };
    axios
      .post(SEC_ADD + id, newSection, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response?.data?.status);
        if (response.data.status === 1) {
          toast.success("Section Added successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error(response?.data?.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
        getBlogInfo();
      });
    setSectionTitle("");
    setSectionSort(parseInt(sectionSort) + 1);
    // setChildData("");
    setDataFromChild("");
    // setShowEditButton(false);
    // setSelectedImage("");
    setStateBtn(1);
    editorRef.current.clearEditorContent();
    setBlogImg3("");
  };

  // =====================================================================================delete the targeted section
  const handleDeleteSection = (index) => {
    // e.preventDefault();
    const newSectionData = [...sectionData];
    newSectionData.splice(index, 1);
    setSectionData(newSectionData);
    setStateBtn(1);
  };
  // ========================================================================================================================================================================

  function handleChange(event) {
    const { name, value } = event.target;
    if (formData[name] !== value) setStateBtn(1);
    setFormData({ ...formData, [name]: value });
    let modifiedValue = value;
    if (name === "title") {
      modifiedValue = modifiedValue.toLowerCase();
      modifiedValue = modifiedValue.replace(/\s+/g, "-");
      modifiedValue = modifiedValue.replace(/[^\w\s-]/g, "");
      setFormData((prev) => {
        return { ...prev, url: modifiedValue };
      });
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      title: formData?.title,
      url: formData?.url,
      description: formData?.description,
      meta_description: formData?.meta_description,
      keywords: formData?.keywords,
      image: formData?.image,
      date: formData?.date,
      site: selectSite,
      tag: tagId,
      route: formData?.url,
    };
    try {
      const response = await fetch(BLOG_EDIT + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(updatedFormData), // Convert the data to JSON string
      });

      const data = await response.json();
      console.log(data);
      if (data?.status === 1) {
        toast.success("Blog updated successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error(data?.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setStateBtn(0);
  }

  const submitImage2 = (file) => {
    const selectedImage = file;
    console.log(selectedImage);
    if (selectedImage) {
      const folder = "bookmyplayer/blog";
      const uniqueFileName = `${folder}/${selectedImage.name.replace(
        /\.[^/.]+$/,
        ""
      )}`;

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
          setBlogImg2(data?.url);
          const part = selectedImage.name;
          setBlogImgName(part);
          setFormData((prev) => {
            return { ...prev, image: part };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const submitImage3 = (file) => {
    const selectedImage = file;
    if (selectedImage) {
      const folder = "bookmyplayer/blog";
      const uniqueFileName = `${folder}/${selectedImage.name.replace(
        /\.[^/.]+$/,
        ""
      )}`;

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
          setBlogImg3(data?.url);
          setBlogImgName2(selectedImage.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFileChange2 = (event) => {
    submitImage2(event.target.files[0]);
  };
  const handleFileChange3 = (event) => {
    submitImage3(event.target.files[0]);
  };

  const handleButtonClick2 = (event) => {
    event.preventDefault();
    fileInputRef2.current.click();
    setStateBtn(1);
  };
  const handleButtonClick3 = (event) => {
    event.preventDefault();
    fileInputRef3.current.click();
  };

  const handleReplaceImage = (event, index) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const folder = "bookmyplayer/blog";
      const uniqueFileName = `${folder}/${selectedImage.name.replace(
        /\.[^/.]+$/,
        ""
      )}`;

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

  return (
    <>
      <header className="headerEditor">
        <h3>Update Blog</h3>
      </header>
      <div className="back-to-user general-refresh">
        <Link to={"/lp/settings/blog/view"}>
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
            <input
              type="file"
              id="imageUpload"
              ref={fileInputRef2}
              onChange={handleFileChange2}
              style={{ display: "none" }}
            />
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
                disabled
              />

              <div className="blog-browse-img">
                <button
                  className="common-fonts blog-add-img add-img-2 update-img"
                  onClick={handleButtonClick2}
                >
                  Change Image
                </button>
                {blogImg2 ? blogImgName : <></>}
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
            <div className="fromFiled">
              <input
                type="text"
                name="meta_description"
                id="meta_description"
                value={formData.meta_description}
                placeholder="Blog Meta Description"
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
                  <input
                    type="file"
                    id="imageUpload"
                    ref={fileInputRef3}
                    onChange={handleFileChange3}
                    style={{ display: "none" }}
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
                    <div className="blog-browse-img">
                      <button
                        className="common-fonts blog-add-img add-img-2"
                        onClick={handleButtonClick3}
                      >
                        Add Image
                      </button>
                      {blogImg3 ? blogImgName2 : <></>}
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
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleReplaceImage(event, index)}
                        style={{ display: "none" }}
                        ref={(input) => (fileInputRefs[index] = input)}
                      />
                      <div className="blog-browse-img">
                        <button
                          className="common-fonts blog-add-img add-img-2"
                          onClick={(event) => {
                            event.preventDefault();
                            fileInputRefs[index].click();
                            setUpdateStateBtn(1);
                          }}
                        >
                          {section?.image ? " change image" : " add image"}
                        </button>
                        {section?.image ? (
                          <p className="common-fonts section-img-new">
                            {section?.image}
                          </p>
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
                    <div className="blog-disable">
                      {updateStateBtn === 0 ? (
                        <button
                          disabled
                          className="disabledBtn blog-update-btn"
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="common-fonts common-save-button blog-update-btn"
                          onClick={() => handleUpdateClick(section.id)}
                        >
                          Update
                        </button>
                      )}
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
                        <Link to={"/lp/settings/blog/view"}>Close</Link>
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
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default BlogUpdate;
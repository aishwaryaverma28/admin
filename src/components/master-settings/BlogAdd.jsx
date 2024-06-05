import React, { useState, useEffect, useRef } from "react";
import S3FileUpload from 'react-s3';
import axios from "axios";
import {
  BLOG_ADD,
  GET_TAG,
  GET_TAG_BY_SITE,
  config,
  getDecryptedToken,
  GET_TAG_CATEGORY,
} from "../utils/Constants";
import JoditEditor from "jodit-react";
import "../styles/BlogAdd.css";
import ReactEditor from "../ReactEditor";
import trash from "../../assets/image/delete-icon.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicTable from "./blog/DynamicTable";
import Table from "./blog/Table";

const BlogAdd = () => {
  window.Buffer = window.Buffer || require("buffer").Buffer;
  const org_id = localStorage.getItem("org_id");
  //cloudaniary images
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRefs = useRef(null);
  const [blogImg, setBlogImg] = useState(null);
  const [blogImg2, setBlogImg2] = useState(null);
  const [selectSite, setSelectSite] = useState("");
  // section states
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSort, setSectionSort] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");
  const editor = useRef(null);
  const [isIndex, setIsIndex] = useState(-1);
  const [sectionData, setSectionData] = useState([]);
  const [dataFromTable, setDataFromTable] = useState([]);
  const [tableData, setTableDate] = useState(false);
  // tags states
  const actionOwnerRef = useRef(null);
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [display, setDisplay] = useState("Select Tag");
  const [tagNames, setTagNames] = useState([]);

  const [category, setCategory] = useState([]);
  const [tagId, setTagId] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [stateBtn, setStateBtn] = useState(0);
  const decryptedToken = getDecryptedToken();
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    sport: "",
    description: "",
    meta_description: "",
    keywords: "",
  });

  const getTagCategory = () => {
    axios
      .get(GET_TAG_CATEGORY + org_id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setCategory(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const processImageName = (imageName) => {
    const nameParts = imageName.split(".");
    if (nameParts?.length > 1) {
      const namePart = nameParts.slice(0, -1).join(".");
      const processedName = namePart.replace(/[^\w-]/g, "-");
      return `${processedName}.${nameParts[nameParts.length - 1]}`;
    } else {
      return imageName.replace(/[^\w-]/g, "-");
    }
  };
  // ===================================================================functions for tags addition and removal

  const toggleOwnerDropdown = () => {
    setOwnerOpen(!ownerOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      actionOwnerRef.current &&
      !actionOwnerRef.current.contains(event.target)
    ) {
      setOwnerOpen(false);
    }
  };
  document.addEventListener("click", handleOutsideClick);

  useEffect(() => {
    getTagCategory();
    handleCatogorySelection();
  }, []);

  const handleCatogorySelection = (event) => {
    const value = event?.target?.value;
    let updatedForm = {};

    if (value) {
      updatedForm = {
        sport: value,
        condition: "sport",
        org_id: org_id,
      };
    } else {
      updatedForm = {
        condition: "all",
        org_id: org_id,
      };
    }
    axios
      .post(GET_TAG, updatedForm, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setOptions(
          response?.data?.data?.map((item) => ({
            id: item?.id,
            tag: item?.tag,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheckboxChange = (event, id, tag) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedTags([...selectedTags, { id: id, tag: tag }]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag.id !== id));
    }
  };

  const addTag = () => {
    const ids = selectedTags.map((tag) => tag.id).join(",");
    setTagId(ids);
    const names = selectedTags.map((tag) => tag.tag);
    setTagNames(names);
    setOwnerOpen(false);
    setStateBtn(1);
  };

  const handleTagRemoval = (index) => {
    const updatedSelectedTags = [...selectedTags];
    updatedSelectedTags.splice(index, 1);
    setSelectedTags(updatedSelectedTags);

    const numbersArray = tagId?.split(",");
    numbersArray?.splice(index, 1);
    const updatedNumbersString = numbersArray?.join(",");
    setTagId(updatedNumbersString);

    const updatedNames = [...tagNames];
    updatedNames.splice(index, 1);
    setTagNames(updatedNames);
  };


  const getTagBySite = (site) => {
    axios
      .get(GET_TAG_BY_SITE + site + "/" + org_id, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setOptions(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReplaceImage = (event, index) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const processedFileName = processImageName(selectedImage.name);
      const modifiedFile = new File([selectedImage], processedFileName, { type: selectedImage.type });
      const updatedConfig = {
        ...config,
        dirName: "blog",
      };
      S3FileUpload.uploadFile(modifiedFile, updatedConfig)
        .then((data) => {
          console.log(data);
          const newSectionData = [...sectionData];
          newSectionData[index].image = modifiedFile.name;
          setSectionData(newSectionData);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  };
  //===================================================================== function to add date in the form data
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setStateBtn(1);
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
    } else if (name === "keywords") {
      modifiedValue = modifiedValue.toLowerCase();
      setFormData((prev) => {
        return { ...prev, keywords: modifiedValue };
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
  const handleTableChange = (data, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].data_table = data.map((row) => [...row]);
    setSectionData(newSectionData);
    setStateBtn(1);
  };

  //============================================================ sort and title data change
  const handleTitle = (event) => {
    const title = event.target.value;
    setSectionTitle(title);
    setStateBtn(1);
    setTableDate(false);
  };

  const handleSecSortChange = (event) => {
    const newValue = event.target.value;
    setSectionSort(newValue === "" ? null : parseInt(newValue, 10));
    setStateBtn(1);
    setTableDate(false);
  };

  //===========================================================================================table data
  const handleDataSave = (data) => {
    setTableDate(false);
    setDataFromTable(data);
    setStateBtn(1);
  };
  //=======================================================================================editor data transfer
  const handleDataTransfer = (data) => {
    setTableDate(false);
    setDataFromChild(data);
    setStateBtn(1);
  };

  const removeHtmlTags = (htmlString) => {
    const regex = /<(?!\/?a\s*\/?)[^>]*>/g;
    return htmlString.replace(regex, "");
  };

  //====================================================================================== handle section data in an array of objects

  const handleAddSection = (e) => {
    e.preventDefault();
    console.log(dataFromChild);
    const newSection = {
      heading: sectionTitle,
      sort: sectionSort === null ? 1 : parseInt(sectionSort),
      image: blogImg2,
      section: dataFromChild,
      site: "",
      alt: "",
      data_table: dataFromTable,
    };
    setSectionData([...sectionData, newSection]);
    setSectionTitle("");
    setSectionSort(sectionSort === null ? 2 : parseInt(sectionSort) + 1);
    setDataFromChild("");
    setStateBtn(1);
    setBlogImg2("");
    setDataFromTable([]);
    setTableDate(true);
  };
  // =====================================================================================delete the targeted section
  const handleDeleteSection = (index) => {
    const newSectionData = [...sectionData];
    newSectionData.splice(index, 1);
    setSectionData(newSectionData);
    setStateBtn(1);
  };

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
      sport: "",
      description: "",
      meta_description: "",
      keywords: "",
    });
    setSelectSite("");
    setTagId("");
    setSelectedTags([]);
    setTagNames([]);
    setOptions([]);
    setSelectedDate("");
    setSectionData([]);
    setSectionTitle("");
    setBlogImg("");
    setSectionSort("");
    setDataFromChild("");
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      tag: tagId,
      image: blogImg,
      date: selectedDate,
      // sections: sectionData,
      site: selectSite,
      route: formData?.url,
      alt: "",
      org_id: org_id,
    };

    axios
      .post(BLOG_ADD, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if (response?.data?.status === 1) {
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
    if (selectedImage) {
      const processedFileName = processImageName(selectedImage.name);
      const modifiedFile = new File([selectedImage], processedFileName, { type: selectedImage.type });
      const updatedConfig = {
        ...config,
        dirName: "blog",
      };
      S3FileUpload.uploadFile(modifiedFile, updatedConfig)
        .then((data) => {
          console.log(data)
          setBlogImg(modifiedFile.name);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  };

  const submitImage2 = (file) => {
    const selectedImage = file;
    if (selectedImage) {
      const processedFileName = processImageName(selectedImage.name);
      const modifiedFile = new File([selectedImage], processedFileName, { type: selectedImage.type });
      const updatedConfig = {
        ...config,
        dirName: "blog",
      };
      S3FileUpload.uploadFile(modifiedFile, updatedConfig)
        .then((data) => {
          console.log(data)
          setBlogImg2(modifiedFile.name);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  };
  return (
    <>
      <header className="headerEditor">
        <p className="common-fonts add-new-blog"> Add Blog</p>
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
            <div className="form_group_blog">
              <input
                type="text"
                name="title"
                id="title"
                placeholder=""
                value={formData?.title}
                onChange={handleChange}
                className="new_blog_input form_input_blog"
              />
              <label htmlFor="title" className="common-fonts form_label_blog">
                Blog Title
                <span className="common-fonts redAlert"> *</span>
              </label>
            </div>
            <div className="new_blog_flex">
              <div className="blog-url-input form_group_blog">
                <input
                  type="text"
                  name="url"
                  id="url"
                  placeholder=""
                  value={formData?.url}
                  onChange={handleChange}
                  className="new_blog_input form_input_blog"
                  disabled
                />
                <label htmlFor="title" className="common-fonts blogs-new-label form_label_blog">
                  Url
                  <span className="common-fonts redAlert"> *</span>
                </label>
              </div>

              <div className="browse_new_img">
                <div className="blog-browse-img">
                  <button
                    className="common-fonts blog-add-img add-img-2"
                    onClick={handleButtonClick}
                  >
                    Add Image
                  </button>
                  <div className="blog-new-img">
                    {blogImg ? blogImg : <></>}
                  </div>
                </div>
              </div>
            </div>
            <div className="form_group_blog">
              <input
                type="text"
                name="description"
                id="description"
                placeholder=""
                value={formData?.description}
                onChange={handleChange}
                className="new_blog_input form_input_blog"
              />
              <label htmlFor="title" className="common-fonts blogs-new-label form_label_blog">
                Description
                <span className="common-fonts redAlert"> *</span>
              </label>
            </div>
            <div className="form_group_blog">
              <input
                list="sports"
                name="sport"
                id="sport"
                placeholder=""
                value={formData?.sport}
                onChange={handleChange}
                className="new_blog_input form_input_blog"
              />
              <label htmlFor="sport" className="common-fonts blogs-new-label form_label_blog">
                Blog Sport
              </label>
              <datalist id="sports">
                <option value="archery"></option>
                <option value="arts"></option>
                <option value="athletics"></option>
                <option value="badminton"></option>
                <option value="basketball"></option>
                <option value="bodybuilding"></option>
                <option value="billiards"></option>
                <option value="boxing"></option>
                <option value="chess"></option>
                <option value="cricket"></option>
                <option value="fencing"></option>
                <option value="football"></option>
                <option value="golf"></option>
                <option value="gym"></option>
                <option value="hockey"></option>
                <option value="kabaddi"></option>
                <option value="karate"></option>
                <option value="kho-kho"></option>
                <option value="mma"></option>
                <option value="motorsports"></option>
                <option value="rugby"></option>
                <option value="shooting"></option>
                <option value="skating"></option>
                <option value="sports"></option>
                <option value="squash"></option>
                <option value="swimming"></option>
                <option value="table-Tennis"></option>
                <option value="taekwondo"></option>
                <option value="tennis"></option>
                <option value="volleyball"></option>
                <option value="wrestling"></option>
                <option value="yoga"></option>
                <option value="baseball"></option>
                <option value="silambam"></option>
                <option value="snooker"></option>
                <option value="handball"></option>
                <option value="carrom"></option>
              </datalist>
            </div>
            <div className="form_group_blog">
              <input
                type="text"
                name="meta_description"
                id="meta_description"
                placeholder=""
                value={formData?.meta_description}
                onChange={handleChange}
                className="new_blog_input form_input_blog"
              />
              <label htmlFor="title" className="common-fonts blogs-new-label form_label_blog">
                Meta Description
              </label>
            </div>
            <div className="form_group_blog">
              <input
                type="text"
                name="keywords"
                id="keywords"
                value={formData?.keywords}
                placeholder=""
                onChange={handleChange}
                className="keywordsLower new_blog_input form_input_blog"
              />
              <label htmlFor="title" className="common-fonts blogs-new-label form_label_blog">
                Keywords
              </label>
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
                <div className="">
                  <div className="form_group_blog">
                    <input
                      type="text"
                      name="sectionTitle"
                      id="sectiontitle"
                      placeholder=""
                      onChange={handleTitle}
                      value={sectionTitle}
                      className="new_blog_input form_input_blog"
                    />
                    <label
                      htmlFor="title"
                      className="common-fonts blogs-new-label form_label_blog"
                    >
                      Section
                      <span className="common-fonts redAlert"> *</span>
                    </label>

                  </div>


                  <div className="formBtnBox">
                    <div className="blog-url-input-2 blog-sort form_group_blog">
                      <input
                        type="text"
                        name="Sort"
                        id="Sort"
                        value={sectionSort === null ? "" : sectionSort}
                        placeholder=""
                        onChange={handleSecSortChange}
                        className="new_blog_input form_input_blog"
                      />
                      <label
                        htmlFor="title"
                        className="common-fonts blogs-new-label form_label_blog"
                      >
                        Sort
                        <span className="common-fonts redAlert"> *</span>
                      </label>
                    </div>

                    {/* <input
                      type="text"
                      name="image"
                      id="image"
                      value={sectionImage}
                      placeholder="image"
                      onChange={handleSecImageChange}
                    /> */}
                    <div className="blog-browse-img browse_new_img">
                      <button
                        className="common-fonts blog-add-img add-img-2 add-img-3"
                        onClick={handleButtonClick2}
                      >
                        Add Image
                      </button>
                      <div className="blog-new-img">
                        {" "}
                        {blogImg2 ? blogImg2 : <></>}
                      </div>
                    </div>
                    <button
                      onClick={handleAddSection}
                      className="common-fonts blog-add-img add-img-2 add-img-3 browse_new_img"
                    >
                      Add Section
                      <span className="common-fonts redAlert"> *</span>
                    </button>
                  </div>
                </div>
                <Table onDataSave={handleDataSave} tableFlag={tableData} />
                <div className="formEditor">
                  {/* <ReactEditor
                    ref={editorRef} // Add this line
                    onDataTransfer={handleDataTransfer}
                  /> */}
                  <JoditEditor
                    ref={editor}
                    value={dataFromChild}
                    onChange={(data) => handleDataTransfer(data)}
                  />
                </div>
              </div>
              <div>
                {sectionData?.map((section, index) => (
                  <div
                    key={index}
                    className={`section ${index === 0 ? "first-section" : ""}`}
                  >
                    <div
                      className="sectionDropdown"
                      onClick={() => accordianClick(index)}
                    >
                      <div className="accHead">
                        <h3>{section?.sort}</h3>
                        <h3>{section?.heading}</h3>
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
                          value={section?.sort}
                          onChange={(event) => handleSortChange(event, index)}
                        />
                        <input
                          type="text"
                          name="heading"
                          id="heading"
                          placeholder="Section Title"
                          className="sectionHead"
                          value={section?.heading}
                          onChange={(event) =>
                            handleSecTitleChange(event, index)
                          }
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
                            onClick={() => fileInputRefs[index].click()}
                          >
                            {section?.image ? " change image" : " add image"}
                          </button>
                          <div className="blog-new-img">
                            {section?.image ? section?.image : <></>}
                          </div>
                        </div>
                      </div>
                      <DynamicTable
                        onDataSave={(data) => handleTableChange(data, index)}
                        initialData={section.data_table}
                      />
                      <div className="formEditor">
                        {/* <ReactEditor
                          onDataTransfer={(data) =>
                            handleEditorChange(data, index)
                          }
                          initialContent={section?.section}
                        /> */}
                        <JoditEditor
                          value={section?.section}
                          onChange={(data) => handleEditorChange(data, index)}
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
              </div>
            </>
          </div>
          {/*==============================================================left side of form end here ============================================================*/}
          {/*==============================================================right side of form starts here ============================================================*/}
          <div className="addBlogRightForm">
            <div className="tags">
              <div className="tag-box">
                <h3 className="common-fonts">
                  Tags <span className="common-fonts redAlert"> *</span>
                </h3>
                <div className="contentBox">
                  <select
                    name="categoryDropdown"
                    onChange={handleCatogorySelection}
                    className="tagSelectBox"
                  >
                    <option value="">Category</option>

                    {category?.map((data) => (
                      <option key={data?.sport} value={data?.sport}>
                        {data?.sport}
                      </option>
                    ))}
                  </select>
                  <div className="dropdown-container" ref={actionOwnerRef}>
                    <div className="new_tag" onClick={toggleOwnerDropdown}>
                      {display}
                      <i
                        className={`fa-sharp fa-solid ${ownerOpen ? "fa-angle-up" : "fa-angle-down"
                          }`}
                      ></i>
                    </div>
                    {ownerOpen && (
                      <div className="dropdown_newtag">
                        <ul>
                          {options
                            ?.filter(
                              (option) =>
                                !tagId
                                  ?.split(",")
                                  ?.includes(option.id?.toString())
                            )
                            .map((option) => (
                              <li
                                key={option?.id}
                                value={option?.id}
                                className="tag_new_li"
                              >
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className={`cb1`}
                                    name="headerCheckBox"
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        e,
                                        option.id,
                                        option.tag
                                      )
                                    }
                                  />
                                  <span className="checkmark"></span>
                                </label>
                                {option?.tag}
                              </li>
                            ))}
                        </ul>
                        <div className="new_tags_btn">
                          <button
                            onClick={addTag}
                            className="common-save-button"
                          >
                            Add tags
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="tagData">
                  {tagNames &&
                    tagNames?.map((tag, index) => (
                      <div key={index} className="tagItems">
                        {tag}
                        <i
                          className="fa-solid fa-x blog-cross"
                          onClick={() => handleTagRemoval(index)}
                        ></i>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="tags">
              <div className="tag-box">
                <h3 className="common-fonts">
                  Publish <span className="common-fonts redAlert"> *</span>
                </h3>
                <div className="contentBox blog-add-date">
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
                      <input
                        type="submit"
                        value="Publish"
                        className="common-fonts common-inactive-button blog-publish"
                        disabled
                      />
                    ) : (
                      <input
                        type="submit"
                        value="Publish"
                        className="common-fonts common-save-button blog-publish"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="tags">
              <div className="tag-box">
                <h3 className="common-fonts">Site</h3>
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
              {/* <div className="tagData tag-box tag-box-2">
                <div className={selectSite ? "tagItems" : ""}>{selectSite}</div>
              </div> */}
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

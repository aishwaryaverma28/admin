import React, { useState, useEffect, useRef } from 'react'
import { GET_TAG, GET_TAG_CATEGORY, getDecryptedToken } from '../../utils/Constants';
import axios from 'axios';

const TagDropDown = () => {
    const org_id = localStorage.getItem("org_id");
    const decryptedToken = getDecryptedToken();
    //==========================tag dropdown
    const actionOwnerRef = useRef(null);
    const [ownerOpen, setOwnerOpen] = useState(false);
    const [display, setDisplay] = useState("Select Tag");
    const [tagNames, setTagNames] = useState([]);

    const [category, setCategory] = useState([]);
    const [tagId, setTagId] = useState("");
    const [options, setOptions] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

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

    //==================================================== tag drop down          

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
                    response?.data?.data?.map((item) => ({ id: item?.id, tag: item?.tag }))
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
            setSelectedTags(selectedTags.filter(tag => tag.id !== id));
        }
    };

    console.log(tagId);

    const addTag = () => {
        const ids = selectedTags.map(tag => tag.id).join(',');
        setTagId(ids);
        const names = selectedTags.map(tag => tag.tag);
    setTagNames(names);
        setOwnerOpen(false);
    };

    const handleTagRemoval = (index) => {
        const numbersArray = tagId?.split(",");
        numbersArray?.splice(index, 1);
        const updatedNumbersString = numbersArray?.join(",");
        setTagId(updatedNumbersString);
        const updatedNames = [...tagNames];
        updatedNames.splice(index, 1);
        setTagNames(updatedNames)
      };
    
    return (
        <>
            <select
                name="categoryDropdown"
                onChange={handleCatogorySelection}
                className="tagSelectBox"
            >
                <option value="">category</option>

                {category?.map((data) => (
                    <option key={data?.sport} value={data?.sport}>
                        {data?.sport}
                    </option>
                ))}
            </select>
            <div className="dropdown-container" ref={actionOwnerRef}>
                <div className="dropdown-header2" onClick={toggleOwnerDropdown}>
                    {display}
                    <i
                        className={`fa-sharp fa-solid ${ownerOpen ? "fa-angle-up" : "fa-angle-down"
                            }`}
                    ></i>
                </div>
                {ownerOpen && (
                    <ul className="dropdown-menu owner-menu">
                        {options
                            ?.filter(
                                (option) =>
                                    !tagId?.split(",")?.includes(option.id?.toString())
                            )
                            .map((option) => (
                                <li key={option?.id} value={option?.id}>
                                    <label className="custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className={`cb1`}
                                            name="headerCheckBox"
                                            onChange={(e) =>
                                                handleCheckboxChange(e, option.id, option.tag)
                                            }
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    {option?.tag}
                                </li>
                            ))}
                        <button onClick={addTag}>Add tags</button>
                    </ul>
                )}
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

        </>
    )
}

export default TagDropDown

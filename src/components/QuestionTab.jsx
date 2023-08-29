import React, { useState, useEffect } from "react";
import SearchIcon from "../assets/image/search.svg";
import axios from "axios";
import {
  GET_ALL_SEARCH,
  GET_SEARCH_ID,
  getDecryptedToken,
  handleLogout,
} from "./utils/Constants";

const QuestionTab = () => {
  const decryptedToken = getDecryptedToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [data, setData] = useState([]);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setShowSearchResult(query.length > 0);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(GET_ALL_SEARCH, {
        params: { query: searchQuery }, // Pass query as a parameter
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      });
      if (response.data.status === 1) {
        console.log(response?.data?.data);
        setData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.data?.message === "Invalid or expired token.") {
        alert(error?.response?.data?.message);
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const data2 = ["hello", "hiii"];

  return (
    <div className="question-tab">
      <p className="common-fonts question-tab-top">How can we help you?</p>
      <p className="common-fonts question-tab-note">
        Tell us your problem so we can get you the right help and support.
      </p>

      <div className="recycle-search-box">
        <span className="question-search-icon">
          <img src={SearchIcon} alt="" />
        </span>
        <input
          type="text"
          className="question-search-input recycle-fonts"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      {showSearchResult && (
        <div className="search_result">
          {data2?.map((item, index) => (
            <p className="common-fonts" key={index}>{item}</p>
          ))}
        </div>
      )}

      <p className="common-fonts question-para">
        Lorem ipsum dolor sit amet consectetur...
      </p>
      <p className="common-fonts question-para">
        Lorem ipsum dolor sit amet consectetur...
      </p>
    </div>
  );
};

export default QuestionTab;

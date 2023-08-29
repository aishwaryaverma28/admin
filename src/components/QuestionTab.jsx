import React, { useState, useEffect } from "react";
import SearchIcon from '../assets/image/search.svg';
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
  const [data, setData] = useState([]);

   useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      const response = await axios.get(GET_ALL_SEARCH + searchQuery, { // Use searchQuery in the API call
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

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  

  return (
    <div className='question-tab'>
      <p className='common-fonts question-tab-top'>How can we help you?</p>
      <p className='common-fonts question-tab-note'>Tell us your problem so we can get you the right help and support.</p>

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
{data && data.map((item) => {
  console.log(item.title);
  <>
  <div className="searchSection" key={item.id}></div>
  </>
})}
<p className='common-fonts question-para'>Lorem  ipsum dolor sit amet consectetur. Aenean sit pulvinar at libero pellentesque massa dictum euismod rhoncus. Quis eget dolor turpis nec integer odio lectus. Nec consectetur urna pretium sit eleifend facilisis facilisi a et. Blandit massa sollicitudin proin adipiscing enim feugiat ornare at. In ipsum orci iaculis sed convallis ac tempus turpis. 
</p>
<p className='common-fonts question-para'>Lorem  ipsum dolor sit amet consectetur. Aenean sit pulvinar at libero pellentesque massa dictum euismod rhoncus. Quis eget dolor turpis nec integer odio lectus. Nec consectetur urna pretium sit eleifend facilisis facilisi a et. Blandit massa sollicitudin proin adipiscing enim feugiat ornare at. In ipsum orci iaculis sed convallis ac tempus turpis. 
</p>


    </div>
  )
}

export default QuestionTab; 
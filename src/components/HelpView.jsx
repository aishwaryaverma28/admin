import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GET_ALL_SEARCH,getDecryptedToken } from './utils/Constants';


const HelpView = () => {
    const [value, setValue] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const decryptedToken = getDecryptedToken();

  function handleFormSubmit() {
    const updatedFormData = {
      condition: "all",
    };
    console.log(updatedFormData);
    axios
      .post( GET_ALL_SEARCH, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleFormSubmit();
  }, []);


  return (
    <div>HelpView</div>
  )
}

export default HelpView
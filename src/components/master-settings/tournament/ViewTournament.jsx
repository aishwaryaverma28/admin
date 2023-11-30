import React, { useState, useEffect } from "react";
import "../../styles/Tournament.css"
import axios from "axios";
import { GET_ALL_LEAGUE, getDecryptedToken } from "../../utils/Constants";
import { Link } from "react-router-dom";
import TournamentTable from "./TournamentTable";

const ViewTournament = () => {
  const [value, setValue] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const decryptedToken = getDecryptedToken();
console.log(decryptedToken)
  function handleFormSubmit() {
    axios
      .get(GET_ALL_LEAGUE, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        console.log(response?.data?.data);
        setTableData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleFormSubmit();
  }, []);

  const selectRows = (e) => {
    setValue(e.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = (tableData || []).filter((item) => {
    const values = Object.values(item);
    for (let i = 0; i < values.length; i++) {
      if (
        values[i] &&
        values[i].toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });

  return (
    <div>ViewTournament</div>
  )
}

export default ViewTournament
import React, { useEffect, useState } from "react";

import { SEARCH_CITY, GET_ALL_CITY, getDecryptedToken } from "../utils/Constants";
import axios from "axios";

const CityTable = () => {
  const decryptedToken = getDecryptedToken();
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [searchQuery, setSearchQuery] = useState("");
  const [pageGroup, setPageGroup] = useState(1);
  const pagesPerGroup = 3;

  const fetchData = (page, limit) => {
    axios
      .post(
        GET_ALL_CITY,
        {
          page: page.toString(), limit: limit.toString(), tbl: "adm_location_master",
          sort: "id asc",
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      )
      .then((response) => {
        setAllData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [page]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    const body = {
      tbl: "adm_location_master",
      term: value
    }
    if (value?.length <= 0) {
      fetchData(page, limit);
    } else {
      axios.post(SEARCH_CITY, body, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
        .then(response => {
          setAllData(response?.data?.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }

  const totalPages = 100;

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
      if (page % pagesPerGroup === 0) {
        setPageGroup((prevGroup) => prevGroup + 1);
      }
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      if ((page - 1) % pagesPerGroup === 0) {
        setPageGroup((prevGroup) => prevGroup - 1);
      }
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page_number ${i === page ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const resetData = () => {
    fetchData(page, limit);
  };

  return (
    <>
      <div className="performance_title2">
        <input
          type="text"
          className="recycle-search-input recycle-fonts"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="leads_new_btn">
          <button
            type="button"
            className="helpBtn genral-refresh-icon"
            title="Refresh"
            onClick={resetData}
          >
            <i className="fa-sharp fa-solid fa-rotate "></i>
          </button>
        </div>
      </div>

      <div className="marketing-all-table otp_table">
        <table>
          <thead>
            <tr>
              <th className="common-fonts">Id</th>
              <th className="common-fonts">City</th>
              <th className="common-fonts">State</th>
              <th className="common-fonts">Url</th>
              <th className="common-fonts">Latitude</th>
              <th className="common-fonts">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {allData?.map((item) => (
              <tr key={item.id}>
                <td className="common-fonts">{item?.id}</td>
                <td className="common-fonts">{item?.city}</td>
                <td className="common-fonts">{item?.state}</td>
                <td className="common-fonts"><div className="otp_desc">{item?.url}</div></td>
                <td className="common-fonts">{item?.lat}</td>
                <td className="common-fonts">{item?.lng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table_pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          &lt;
        </button>
        {renderPageNumbers()}
        <button onClick={handleNextPage} disabled={page === totalPages}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default CityTable;

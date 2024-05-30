import React, { useEffect, useState } from "react";
import Back from "../../assets/image/arrow-left.svg";
import { GET_OTP, getDecryptedToken } from "../utils/Constants";
import axios from "axios";

const OtpTable = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [allData, setAllData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;
  const [pageGroup, setPageGroup] = useState(1);
  const pagesPerGroup = 3;

  const formatDate = (isoDate) => {
    const options = {
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };

  const fetchData = (page, limit) => {
    axios
      .post(
        GET_OTP,
        { page: page.toString(), limit: limit.toString() },
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = allData.filter((item) =>
    item.id.toString().includes(searchQuery) ||
    (item.attr7 && item.attr7.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="performance_title2">
        <img src={Back} alt="" onClick={onClose} />
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

      <div className="marketing-all-table url_table">
        <table>
          <thead>
            <tr>
              <th className="common-fonts">Id</th>
              <th className="common-fonts">Mobile</th>
              <th className="common-fonts">Name</th>
              <th className="common-fonts">OTP</th>
              <th className="common-fonts">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="common-fonts">{item.id}</td>
                <td className="common-fonts">{item.attr7}</td>
                <td className="common-fonts">{item.attr4}</td>
                <td className="common-fonts">{item.attr8}</td>
                <td className="common-fonts">
                  {formatDate(item.creation_date)}
                </td>
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

export default OtpTable;

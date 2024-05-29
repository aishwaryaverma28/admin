import React, { useEffect, useState } from "react";
import Back from "../../assets/image/arrow-left.svg";
import UrlModal from "./UrlModal.jsx";
import { SHOW_URL, getDecryptedToken } from "../utils/Constants";
import axios from "axios";

const ViewLeadsTable = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [allData, setAllData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [openUrlModal, setOpenUrlModal] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 100;
  const [pageGroup, setPageGroup] = useState(1);
  const pagesPerGroup = 3;

  const addUrlModalClick = () => {
    setOpenUrlModal(true);
  };

  const addUrlModalClose = () => {
    setOpenUrlModal(false);
  };

  const fetchData = (page, limit) => {
    axios
      .post(
        SHOW_URL,
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

  const fetchDataCall = () => {
    axios
      .post(
        SHOW_URL,
        { page: "1", limit: "145" },
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

  useEffect(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setCurrentData(allData.slice(startIndex, endIndex));
  }, [allData, page]);

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

  const getAvailabilityText = (type, value) => {
    if (type === "aid" || type === "llid" || type === "sdid") {
      return value === 1 ? (
        <span className="url_available"> : Available</span>
      ) : (
        <span className="url_unavailable"> : Not Available</span>
      );
    }
    return null;
  };

  return (
    <>
      <div className="performance_title2">
        <img src={Back} alt="" onClick={onClose} />

        <div className="leads_new_btn">
          <button
            className="common-fonts common-save-button"
            onClick={addUrlModalClick}
          >
            Add Url
          </button>
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
              <th className="common-fonts">S No</th>
              <th className="common-fonts">Id</th>
              <th className="common-fonts">Old Url (To Be Deleted)</th>
              <th className="common-fonts">New Url (Correct Url)</th>
              <th className="common-fonts underline_status">Old Url Status</th>
              <th className="common-fonts">New Url Status</th>
            </tr>
          </thead>
          <tbody>
            {allData?.map((item, index) => (
              <tr key={item?.id}>
                <td className="common-fonts">{(page - 1) * 100 + index + 1}</td>
                <td className="common-fonts">{item?.id}</td>
                <td className="common-fonts">{item?.old_url}</td>
                <td className="common-fonts">{item?.new_url}</td>
                <td className="common-fonts">
                  {item?.old_url_type}
                  {getAvailabilityText(item?.old_url_type, item?.[`old_url_${item?.old_url_type}`])}
                </td>
                <td className="common-fonts">
                  {item?.new_url_type}
                  {getAvailabilityText(item?.new_url_type, item?.[`new_url_${item?.new_url_type}`])}
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
      {openUrlModal && <UrlModal onClose={addUrlModalClose} api={fetchDataCall} />}
    </>
  );
};

export default ViewLeadsTable;

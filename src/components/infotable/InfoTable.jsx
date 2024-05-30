import React, { useEffect, useState } from "react";
import Back from "../../assets/image/arrow-left.svg";
import { LEADS_BY_CITY, getDecryptedToken } from "../utils/Constants";
import axios from "axios";
import InfoModal from "./InfoModal.jsx";

const InfoTable = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [allData, setAllData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;
  const [pageGroup, setPageGroup] = useState(1);
  const pagesPerGroup = 3;

  const [openModal, setOpenModal] = useState(false);

  const infoModalClick = () => {
    setOpenModal(true)
  }
  const infoModalClose = () => {
    setOpenModal(false)
  }

  const fetchData = (page, limit) => {
    axios
      .post(
        LEADS_BY_CITY,
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

  return (
    <>
      <div className="performance_title2">
        <img src={Back} alt="" onClick={onClose} />
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

      <div className="marketing-all-table info_table">
        <table>
          <thead>
            <tr>
              <th className="common-fonts">Id</th>
              <th className="common-fonts">Sport</th>
              <th className="common-fonts">City</th>
              <th className="common-fonts">Leads</th>
              <th className="common-fonts">Verified Academies</th>
              <th className="common-fonts">Academies</th>
              <th className="common-fonts">Coaches</th>
            </tr>
          </thead>
          <tbody>
          {allData.map((item) => (
              <tr key={item.id}>
                <td className="common-fonts">{item.id}</td>
                <td className="common-fonts">{item.sport}</td>
                <td className="common-fonts">{item.city}</td>
                <td className="common-fonts" onClick={infoModalClick}>{item.lead_generation !== null ? item.lead_generation : 0}</td>
                <td className="common-fonts" onClick={infoModalClick}>{item.verified_academies !== null ? item.verified_academies : 0}</td>
                <td className="common-fonts" onClick={infoModalClick}>{item.total_academies !== null ? item.total_academies : 0}</td>
                <td className="common-fonts" onClick={infoModalClick}>{item.total_coaches !== null ? item.total_coaches : 0}</td>
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
      {
        openModal && (
          <InfoModal onClose={infoModalClose} />
        )
      }
    </>
  );
};

export default InfoTable;

import React, { useEffect, useState } from "react";
import Back from "../../assets/image/arrow-left.svg";
import { ALL_REVIEWS, getDecryptedToken } from "../utils/Constants";
import axios from "axios";
import UpdateReview from "./UpdateReview";

const AllReviews = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedRowData, setSelectedRowData] = useState(null); // State to hold data for the selected row
  const [openUrlModal, setOpenUrlModal] = useState(false);
  const limit = 20;
  const [pageGroup, setPageGroup] = useState(1);
  const pagesPerGroup = 3;

  const fetchData = (page, limit) => {
    axios
      .post(
        ALL_REVIEWS,
        {
          page: page.toString(), limit: limit.toString(),
          sort: "id desc",
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

  const fetchUpdate = () => {
    axios
      .post(
        ALL_REVIEWS,
        {
          page: page.toString(), limit: limit.toString(),
          sort: "id desc",
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


  const addUrlModalClick = (rowData) => {
    setSelectedRowData(rowData);
    setOpenUrlModal(true);
  };

  const addUrlModalClose = () => {
    setOpenUrlModal(false);
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

      <div className="marketing-all-table review_table">
        <table>
          <thead>
            <tr>
              <th className="common-fonts">Id</th>
              <th className="common-fonts">Name</th>
              <th className="common-fonts">Object Id</th>
              <th className="common-fonts">Type</th>
              <th className="common-fonts">Comment</th>
              <th className="common-fonts">Rating</th>
            </tr>
          </thead>
          <tbody>
            {allData?.map((item) => (
              <tr key={item.id} onClick={() => addUrlModalClick(item)}> {/* Pass row data to addUrlModalClick */}
                <td className="common-fonts">{item?.id}</td>
                <td className="common-fonts">{item?.name}</td>
                <td className="common-fonts">{item?.object_id}</td>
                <td className="common-fonts">{item?.object_type}</td>
                <td className="common-fonts"><div className="otp_desc">{item?.comment}</div></td>
                <td className="common-fonts">{item?.rating}
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
      {openUrlModal && <UpdateReview onClose={addUrlModalClose} rowData={selectedRowData} api={fetchUpdate} />}
    </>
  )
}

export default AllReviews

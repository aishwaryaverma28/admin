import React, { useEffect, useState } from "react";
import Back from "../../assets/image/arrow-left.svg";
import { LEADS_BY_CITY, getDecryptedToken } from "../utils/Constants";
import axios from "axios";
import InfoAcademy from "./InfoAcademy.jsx";

const InfoTable = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [allData, setAllData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [pageGroup, setPageGroup] = useState(1);
  const pagesPerGroup = 3;
  const [openAcademy, setOpenAcademy] = useState(false);
  const [data, setData] = useState();
  const [entity, setEntity] = useState();
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortColumn, setSortColumn] = useState("lead_generation");
  const totalPages = 100;
  const infoAcademyClick = (data, entity) => {
    setData(data);
    setEntity(entity);
    setOpenAcademy(true);
  };
  const infoAcademyClose = () => {
        setOpenAcademy(false);
      };
  const fetchData = (page, limit, column = sortColumn, order = sortOrder) => {
    axios
      .post(
        LEADS_BY_CITY,
        { page: page?.toString(), limit: limit?.toString(), order, ordercol: column },
        { headers: { Authorization: `Bearer ${decryptedToken}` } }
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
  }, [page, sortOrder, sortColumn]);

  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

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
    const startPage = Math.max(1, (pageGroup - 1) * pagesPerGroup + 1);
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
              <th className="common-fonts" onClick={() => handleSort("id")}>
                Id {sortColumn === "id" && <span>{sortOrder === "desc" ? "▼" : "▲"}</span>}
              </th>
              <th className="common-fonts" onClick={() => handleSort("sport")}>
                Sport {sortColumn === "sport" && <span>{sortOrder === "desc" ? "▼" : "▲"}</span>}
               </th>
               <th className="common-fonts" onClick={() => handleSort("city")}>
                 City {sortColumn === "city" && <span>{sortOrder === "desc" ? "▼" : "▲"}</span>}
               </th>
               <th className="common-fonts" onClick={() => handleSort("lead_generation")}>
                 Leads {sortColumn === "lead_generation" && <span>{sortOrder === "desc" ? "▼" : "▲"}</span>}
               </th>
               <th className="common-fonts" onClick={() => handleSort("verified_academies")}>
               Verified Academies {sortColumn === "verified_academies" && <span>{sortOrder === "desc" ? "▼" : "▲"}</span>}
               </th>
               <th className="common-fonts" onClick={() => handleSort("total_academies")}>
               Academies {sortColumn === "total_academies" && <span>{sortOrder === "desc" ? "▼" : "▲"}</span>}
               </th>
               <th className="common-fonts" onClick={() => handleSort("total_coaches")}>
               Coaches {sortColumn === "total_coaches" && <span>{sortOrder === "desc" ? "▼" : "▲"}</span>}
               </th>
             </tr>
           </thead>
          <tbody>
          {allData?.map((item) => (
              <tr key={item.id}>
                <td className="common-fonts">{item?.id}</td>
                <td className="common-fonts">{item?.sport}</td>
                <td className="common-fonts">{item?.city}</td>
                <td className="common-fonts">{item?.lead_generation !== null ? item?.lead_generation : 0}</td>
                <td className="common-fonts" onClick={item?.verified_academies !== null ? () => infoAcademyClick(item, "verified_academy") : null}>{item?.verified_academies !== null ? item.verified_academies : 0}</td>
                <td className="common-fonts" onClick={item?.total_academies !== null ? () => infoAcademyClick(item, "academy") : null}>{item?.total_academies !== null ? item?.total_academies : 0}</td>
                <td className="common-fonts" onClick={item?.total_coaches !== null ? () => infoAcademyClick(item, "coach") : null}>{item?.total_coaches !== null ? item?.total_coaches : 0}</td>
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
        openAcademy && (
          <InfoAcademy onClose={infoAcademyClose} page={page} limit={limit} data={data} entity={entity} />
        )
      }
    </>
  );
};

export default InfoTable;

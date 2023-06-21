import React, { useState } from "react";
import "./styles/EmployeeView.css";
import {Link} from "react-router-dom";
const TableWithPagination = ({ data, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const middlePage = Math.ceil(maxVisiblePages / 2);
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= middlePage) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + middlePage > totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - middlePage + 1;
      endPage = currentPage + middlePage - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          className="numBtn"
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            fontWeight: currentPage === i ? "bolder" : "normal",
          }}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>S NO.</th>
            <th>ECODE</th>
            <th>ETYPE</th>
            <th>NAME</th>
            <th>DOB</th>
            <th>PHONE</th>
            <th>CUR. ADDRESS</th>
            <th>PER. ADDRESS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{row.emp_no}</td>
              <td>{row.position}</td>
              <td className="employeeName">
                <Link to={"/employee/view/"+row.id} key={row.id}>
                {row.first_name} {row.last_name}
                </Link>
              </td>
              <td>{row.dob}</td>
              <td>{row.mobile}</td>
              <td>{row.address1}</td>
              <td>{row.address2}</td>
              <td>{}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <div className="paginationContent">
          <button
            className="prevBtn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>

          {renderPageNumbers()}

          <button
            className="prevBtn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableWithPagination;

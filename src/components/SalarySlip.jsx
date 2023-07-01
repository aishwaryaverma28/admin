import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewProfile from './ViewProfile';
import './styles/EmployeeProfile.css';
import './styles/SalarySlip.css';
import PDFConverter from './PDFConverter';

import { EMPLOYEE_GETID } from './utils/Constants';

const SalarySlip = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2023); // Set default year to 2023
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [empData, setEmpData] = useState([]);

  useEffect(() => {
    getEmployeeInfo();
  }, []);

  async function getEmployeeInfo() {
    const response = await axios.get(EMPLOYEE_GETID);
    const data = response.data.data;
    setEmpData(data[0]);
  }

  useEffect(() => {
    axios.get('http://core.leadplaner.com:3001/api/employee/getPayslips/1').then((response) => {
      setTableData(response.data.data);
    });
  }, []);

  useEffect(() => {
    const filteredData = tableData.filter((item) => item.year === selectedYear);
    setFilteredData(filteredData);
    setCurrentPage(1);
  }, [tableData, selectedYear]);

  const selectRows = (e) => {
    const selectedRows = parseInt(e.target.value);
    setItemsPerPage(selectedRows);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderTableData = () => {
    if (currentItems.length === 0) {
      return (
        <tr>
          <td colSpan="5">No data available</td>
        </tr>
      );
    }

    return currentItems.map((item, index) => (
      <tr key={index}>
        <td>{item.month}</td>
        <td>{item.year}</td>
        <td>{item.payableAmt}</td>
        <td>{item.netSalary}</td>
        <td>
          <PDFConverter />
        </td>
      </tr>
    ));
  };

  const renderPageNumbers = () => {
    if (totalPages === 1) {
      return null;
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : null}>
          <a onClick={() => setCurrentPage(i)}>{i}</a>
        </li>
      );
    }

    return (
      <nav>
        <ul className="pagination">{pageNumbers}</ul>
      </nav>
    );
  };

  return (
    <div className="salary-slip-container">
      <ViewProfile empData={empData} />
      <div className="salary-slip-table">
        <h2>Salary Slip</h2>
        <div className="select-rows">
          <span>Show rows:</span>
          <select value={itemsPerPage} onChange={selectRows}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Payable Amount</th>
              <th>Net Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
        {renderPageNumbers()}
        
      </div>
    </div>
  );
};

export default SalarySlip;

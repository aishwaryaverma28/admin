import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewProfile from './ViewProfile'
import "./styles/EmployeeProfile.css";
import "./styles/SalarySlip.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EMPLOYEE_GETID } from "./utils/Constants";

const SalarySlip = () => {
   const [tableData, setTableData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [empData, setEmpData] = useState([]);
  const [salaryData, setSalaryData]=useState([]);
   const startYear = 2023;
  const endYear = 2026;


  useEffect(() => {
    getEmployeeInfo();
     }, []);

  async function getEmployeeInfo() {
    const response = await axios.get(EMPLOYEE_GETID);
    const data = response.data.data;
    setEmpData(data[0]);    
  }
  
  useEffect(() => {
    axios.get("http://core.leadplaner.com:3001/api/employee/getPayslips/1").then((response) => {
      setTableData(response.data.data);
    });
  }, []);

  useEffect(() => {
    const filteredData = tableData.filter((item) => item.year === selectedYear);
    setFilteredData(filteredData);
    setCurrentPage(1);
  }, [tableData, selectedYear]);

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get("http://core.leadplaner.com:3001/api/employee/getPayslip/1");
      const apiData = response.data;
      const input = document.getElementById('salary-slip');
  
      if (apiData.data.id === tableData.id) {
        setSalaryData(apiData.data);
      }
  
      setTimeout(() => {
        html2canvas(input)
          .then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('salary_slip.pdf');
          });
      }, 1000); // Delay of 1 second (1000 milliseconds)
    } catch (error) {
      console.error('Error retrieving data from API:', error);
    }
  };
  
      console.log(salaryData);
  



  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  const selectRows = (e) => {
    const selectedRows = parseInt(e.target.value);
    setItemsPerPage(selectedRows);
    setCurrentPage(1); // Reset to the first page when changing the number of rows
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const maxButtons = 3;
    const middleButton = Math.floor(maxButtons / 2);
    let startButton, endButton;

    if (currentPage <= middleButton) {
      startButton = 1;
      endButton = Math.min(totalPages, maxButtons);
    } else if (currentPage > totalPages - middleButton) {
      startButton = Math.max(totalPages - maxButtons + 1, 1);
      endButton = totalPages;
    } else {
      startButton = currentPage - middleButton;
      endButton = currentPage + middleButton;
    }

    for (let i = startButton; i <= endButton; i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </>
    );
  };

  return (
    <>
      <ViewProfile />
      <div className='slarySLipRow1'>
        <select value={selectedYear} onChange={handleYearChange} className='selectYear'>
          <option value="">Select Year</option>
          {Array.from({ length: endYear - startYear + 1 }, (_, index) => (
            <option key={startYear + index} value={startYear + index}>
              {startYear + index}
            </option>
          ))}
        </select>
        <label className="entriesLable">
          Show
          <select value={itemsPerPage} onChange={selectRows} className="entries">
          <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
          Entries
        </label>
      </div>

      <table className='salaryTable'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item,index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td className='salaryDate'>{item.month+","+item.year}
              <button className='downBtn' onClick={handleDownloadPDF}>
              <i className="fa-sharp fa-solid fa-download"></i>
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {renderPaginationButtons()}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <>
    
    
    <div  id='salary-slip' className='salarySlip'>
      <div className='billTitle'>
      <h1>Ezuka</h1>
      <div className='billAdress'><h3>Eruka Services Ltd</h3>
      <h3>Bourne Business Park, 4 Dashwood Lang Rd, Addlestone KT15 2HJ, United Kingdom</h3>
      </div>
      </div>
    <table className="salaryData">
       <tbody>
        
        <tr>
          <td className='salaryCell'><h3>Employee Name</h3></td>
          <td className='salaryCell'>{empData.first_name+" "+empData.last_name} </td>
          <td rowSpan={5} className='salaryCell'></td>
          
          <td className='salaryCell'><h3>Date Of Joining</h3></td>
          <td className='salaryCell'>{empData.hire_date && empData.hire_date.split("T")[0]}</td>

        </tr>
        <tr>
          <td className='salaryCell'><h3>Employee Code</h3></td>
          <td className='salaryCell'>{empData.emp_no}</td>
          
          <td className='salaryCell'><h3>Place of Posting</h3></td>
          <td className='salaryCell'>{empData.country}</td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Department</h3></td>
          <td className='salaryCell'>{empData.department} </td>
          
          <td className='salaryCell'><h3>Working Days</h3></td>
          {/* <td className='salaryCell'>{salaryData[0].working_days}</td> */}
          <td className='salaryCell'>
  {salaryData && salaryData.length > 0
    ? `${salaryData[0].working_days}`
    : '0'}
</td>

        </tr>
        <tr>
          <td className='salaryCell'><h3>Month</h3></td>
          <td className='salaryCell'>
  {salaryData && salaryData.length > 0
    ? `${salaryData[0].month}, ${salaryData[0].year}`
    : '0'}
</td>

          
          <td className='salaryCell'><h3>Bank / Account Number</h3></td>
          <td className='salaryCell'>{empData.bank_details ? empData.bank_details.split(",")[1] : ""}</td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Position</h3></td>
          <td className='salaryCell'>{empData.position}</td>
          
          <td className='salaryCell'><h3>Sort Code</h3></td>
          <td className='salaryCell'>202464</td>
        </tr>
        <tr>
          <td colSpan={5} className='salaryCell'></td>
        </tr>
        <tr>
          <td colSpan={3} className='salaryCell'><h3>Earning (Rs) </h3></td>
          <td colSpan={2} className='salaryCell'><h3>Deductions(Rs)</h3></td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Particulars</h3></td>
          <td className='salaryCell'><h3>Actual Amount</h3></td>
          <td className='salaryCell'><h3>Payable Amt</h3></td>
          <td className='salaryCell'><h3>Particulars</h3></td>
          <td className='salaryCell'><h3>Amount</h3></td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Basic Salary</h3></td>
          {/* <td className='salaryCell'>{salaryData[0].salary}</td> */}
          <td className='salaryCell'>
  {salaryData && salaryData.length > 0
    ? `${salaryData[0].salary}`
    : '0'}
</td>

<td className='salaryCell'>
  {salaryData && salaryData.length > 0
    ? `${salaryData[0].salary}`
    : '0'}
</td>
          <td className='salaryCell'><h3>Tax</h3></td>
          <td className='salaryCell'>
  {salaryData && salaryData.length > 0
    ? `${salaryData[0].tax}`
    : '0'}
</td>
        </tr>
        <tr>
          <td className='salaryCell'></td>
          <td className='salaryCell'></td>
          <td className='salaryCell'></td>
          <td className='salaryCell'><h3>NI Contribution</h3></td>
          <td className='salaryCell'>0</td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Incentives</h3></td>
          <td className='salaryCell'></td>
          <td className='salaryCell'></td>
          <td rowSpan={2} colSpan={2} className='salaryCell'></td>
          
        </tr>
        <tr>
          <td className='salaryCell'><h3>Arrears</h3></td>
          <td className='salaryCell'></td>
          <td className='salaryCell'></td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Total</h3></td>
          <td className='salaryCell'>
  {salaryData && salaryData.length > 0
    ? `${salaryData[0].salary}`
    : '0'}
</td>
<td className='salaryCell'>
  {salaryData && salaryData.length > 0
    ? `${salaryData[0].salary}`
    : '0'}
</td>
          <td className='salaryCell'><h3>Total Deductions</h3></td>
          <td className='salaryCell'>0</td>
        </tr>
        <tr>
          <td colSpan={3} className='salaryCell'></td>
          <td className='salaryCell'><h3>Net Salary</h3></td>
          <td className='salaryCell'>
  {salaryData && salaryData.length > 0
    ? `${salaryData[0].salary}`
    : '0'}
</td>
        </tr>
      </tbody>
      </table>
      <div className='billFoot'><h3>For Ezuka Services Ltd</h3>
      <h3>This is computer generated statement hence signature is not required.</h3></div>
      </div>
    </>
    </>
  )
}

export default SalarySlip;



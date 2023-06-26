import React from 'react'
import ViewProfile from './ViewProfile';
import "./styles/SalarySlip.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SalarySlip = () => {
  const handleDownloadPDF = () => {
    const input = document.getElementById('salary-slip');

    html2canvas(input)
      .then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('salary_slip.pdf');
      });
  };
  return (
    <>
    <ViewProfile/>
    <button onClick={handleDownloadPDF}>Download PDF</button>
    <div id="salary-slip" className='salarySlip'>
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
          <td className='salaryCell'>Chenna M </td>
          <td rowSpan={5} className='salaryCell'></td>
          
          <td className='salaryCell'><h3>Date Of Joining</h3></td>
          <td className='salaryCell'>April/6/2023</td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Employee Code</h3></td>
          <td className='salaryCell'>GES-9 </td>
          
          <td className='salaryCell'><h3>Place of Posting</h3></td>
          <td className='salaryCell'>India</td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Department</h3></td>
          <td className='salaryCell'>ERP </td>
          
          <td className='salaryCell'><h3>Working Days</h3></td>
          <td className='salaryCell'>30</td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Month</h3></td>
          <td className='salaryCell'>April/2023 </td>
          
          <td className='salaryCell'><h3>Bank / Account Number</h3></td>
          <td className='salaryCell'>SBI
            041010101010101
          </td>
        </tr>
        <tr>
          <td className='salaryCell'><h3>Position</h3></td>
          <td className='salaryCell'>Senior Oracle Consultant</td>
          
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
          <td className='salaryCell'>10,50,000</td>
          <td className='salaryCell'>87,500</td>
          <td className='salaryCell'><h3>Tax</h3></td>
          <td className='salaryCell'>0</td>
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
          <td className='salaryCell'>87,500</td>
          <td className='salaryCell'>87,500</td>
          <td className='salaryCell'><h3>Total Deductions</h3></td>
          <td className='salaryCell'>0</td>
        </tr>
        <tr>
          <td colSpan={3} className='salaryCell'></td>
          <td className='salaryCell'><h3>Net Salary</h3></td>
          <td className='salaryCell'>87500</td>
        </tr>
      </tbody>
      </table>
      <div className='billFoot'><h3>For Ezuka Services Ltd</h3>
      <h3>This is computer generated statement hence signature is not required.</h3></div>
      </div>
    </>
  )
}

export default SalarySlip
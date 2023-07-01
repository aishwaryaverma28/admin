import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const EzukaSlip = () => {
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
     
  return (
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
  )
}

export default EzukaSlip
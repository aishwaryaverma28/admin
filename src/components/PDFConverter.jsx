import React from 'react';
import html2pdf from 'html2pdf.js';

const PDFConverter = () => {
  const handleDownload = () => {
    // Get the HTML content as a string
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    <table class="custom-table" border="1" width="650" style="border-collapse: collapse; text-align: center;" cellpadding="2" cellspacing="10">
    <tr>
      <th colspan="1">
        <img src="https://www.ezuka.com/assets/logo-ezuka.png" alt="" style="width: 160px;" />
      </th>
      <th colspan="4">
        Ezuka Services Ltd <br />
        Bourne Business Park, 4 Dashwood Lang Rd, Addlestone KT15 2HJ, United Kingdom
      </th>
    </tr>
    <tr>
      <th>Employee Name</th>
      <td>Chenna M</td>
      <th style="border: none;"></th>
      <th>Date Of Joining</th>
      <td>April/6/2023</td>
    </tr>
    <tr>
      <th>Employee Code</th>
      <td>GES-9</td>
      <th style="border: none;"></th>
      <th>Place of Posting</th>
      <td>India</td>
    </tr>
    <tr>
      <th>Department</th>
      <td>ERP</td>
      <th style="border: none;"></th>
      <th>Working Days</th>
      <td>23</td>
    </tr>
    <tr>
      <th>Month</th>
      <td>Apr-2023</td>
      <th style="border: none;"></th>
      <th>Bank / Account Number</th>
      <td>SBI 041010100080951</td>
    </tr>
    <tr>
      <th>Position</th>
      <td>Senior Oracle Cons</td>
      <th style="border: none;"></th>
      <th>Sort Code</th>
      <td>202464</td>
    </tr>
    <tr>
      <td colspan="5" style="height: 20px;"></td>
    </tr>
    <tr>
      <th colspan="3">Earnings (Rs)</th>
      <th colspan="3">Deductions (Rs)</th>
    </tr>
    <tr>
      <th>Particulars</th>
      <th>Actual Amount</th>
      <th>Payable Amt</th>
      <th>Particulars</th>
      <th>Amount</th>
    </tr>
    <tr>
      <th><b>Basic Salary</b></th>
      <td>10,50,000</td>
      <td>87,500</td>
      <th>Tax</th>
      <td>0</td>
    </tr>
    <tr>
      <td colspan="3"></td>
      <th>NI Contribution</th>
      <td>0</td>
    </tr>
    <tr>
      <th>Incentives</th>
      <td></td>
      <td></td>
      <td colspan="2" style="border: none;"></td>
    </tr>
    <tr>
      <th>Arrears</th>
      <td></td>
      <td></td>
      <td colspan="2" style="border: none;"></td>
    </tr>
    <tr>
      <th>Total</th>
      <td>87,500</td>
      <td>87,500</td>
      <th>Total Deductions</th>
      <td>0</td>
    </tr>
    <tr>
      <td colspan="3"></td>
      <th>Net Salary</th>
      <td>87500</td>
    </tr>
    <tr>
      <td colspan="5">
        <b>For Ezuka Services Ltd</b> <br />
        <i>This is computer-generated statement; hence signature is not required.</i>
      </td>
    </tr>
  </table>
    </body>
    </html>
    `;

    // Set the options for PDF generation
    const options = {
      margin: 10,
      filename: 'output.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Create the PDF using html2pdf
    html2pdf().set(options).from(htmlContent).save();
  };

  return (
    <div>
      <button onClick={handleDownload}>Download as PDF</button>
    </div>
  );
};

export default PDFConverter;

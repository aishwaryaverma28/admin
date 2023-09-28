import React, { useEffect, useState, useRef } from "react";
import "../styles/CPGenral.css";
import Papa from "papaparse";
import axios from "axios";
import {IMPORT_CSV,
  getDecryptedToken,} from "../utils/Constants";
  import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImportTab = () => {
  const decryptedToken = getDecryptedToken();
  const fileInputRef = useRef(null);
  const [csvData, setCsvData] = useState([]);
  const [activeTab, setActiveTab] = useState("leads");

  function handleTabChange(tabName) {
    setActiveTab(tabName);
  }
  const handleCsvFileImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Assume the first row contains headers
        complete: (result) => {
          const dataWithIntValues = result?.data.map((row) => ({
            ...row,
            value: parseInt(row?.value), // Parse the "value" field as an integer
            stage_id: parseInt(row?.stage_id),
          }));
          // Store CSV data in state
          const dataWithoutLastValue = dataWithIntValues.slice(0, -1);
          setCsvData(dataWithoutLastValue);
          postCsvDataToAPI(dataWithoutLastValue);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error.message);
        },
      });
    }
  };
  // Function to handle "Import" menu item click
  const handleImportClick = () => {
    // Trigger a click event on the hidden file input element
    fileInputRef.current.click();
  };
  const postCsvDataToAPI = async (csvData) => {
    try {
      const response = await axios.post(
        IMPORT_CSV,
        {
          data: csvData,
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      );
      if (response.data.status === 1) {
        toast.success("Import successfull", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("Some Error Occured", {
          position: "top-center",
          autoClose: 2000,
        });
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error posting CSV data:", error);
      // Handle the error as needed
    }
  };

  const jsonLeadData = [
    {
      source: "google",
      lead_name: "sampleName",
      position: "samplePosition",
      company_name: "sampleCompany",
      registration_no: "sampleRegister",
      employees: "sampleEmployee",
      first_name: "sampleFname",
      last_name: "sampleLname",
      type: "open",
      value: 1000,
      address1: "sampleAddress1",
      address2: "sampleAddress2",
      city: "sampleCity",
      state: "sampleState",
      country: "sampleCountry",
      pin: "samplePin1",
      phone: "samplePhone",
      email: "sample@example.com",
      website: "https://wwww.example.com",
      stage_id: 13,
      stage_name: "New",
    },
  ];

  const downloadLeadCSV = () => {
    const csv = Papa.unparse(jsonLeadData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lead.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  const jsonDealData = [
    {
      lead_id: 1111111,
      deal_name: "dealName",
      currency: "GBP",
      organization: "Ezuka",
      probability: "50",
      closure_date: "2022-02-12",
      value: 3000,
      email: "email@Ezuka.com",
      contact: "contact@Ezuka.com",
      pipeline_id: 1,
      mobile: "sampleMobileNumber",
      introducer_name: "John Due",
      introducer_firm_name: "Doe And Associates",
      data_enquiry_receive: "2023-08-24",
      borrower_entry: "2023-08-25",
      security_value: 10000,
      loan_amount: 50000,
      deposit: 2500,
      type_of_security: "Mortgage",
      loan_type: "Fixed Rate",
      lender: 1,
      lead_source: "Website",
      engagement_fee: 1500,
      engagement_fee_paid: 500,
      broker_fee: 2000,
      broker_fee_paid: 1000,
      procuration_fee: 800,
      procuration_fee_paid: 400,
      deal_commission: 3000,
      completion_date: "2023-09-15",
    },
  ];

  const downloadDealCSV = () => {
    const csv = Papa.unparse(jsonDealData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "deal.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const jsonCompanyData = [
    // Your JSON data here
    {
      name: "ABC Inc.",
      orgid: "ORG123",
      address1: "123 Main Street",
      address2: "Suite 456",
      city: "Anytown",
      country: "UK",
      postcode: 1234,
      email: "abc@gmail.com",
      phone: "samplePhone",
      valuation: 100000,
      valuation_in: "GBP",
      domain: "abcinc.com",
      industry: "Technology",
    },
    // Add more data as needed
  ];

  const downloadCompanyCSV = () => {
    const csv = Papa.unparse(jsonCompanyData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  const jsonPeopleData = [
    // Your JSON data here
    {
      "name": "John Doe",
      "organization": "ABC Corporation",
      "phone": "+1-123-456-7890",
      "email": "johndoe@example.com",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001"
    }
  ];

  const downloadPeopleCSV = () => {
    const csv = Papa.unparse(jsonPeopleData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "people.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  return (
    <div>
      <div className="cp-billings-tabs">
        <button
          className={`common-fonts ${activeTab === "leads" ? "cp-active" : ""}`}
          onClick={() => handleTabChange("leads")}
        >
          Leads
        </button>

        <button
          className={`common-fonts ${activeTab === "deals" ? "cp-active" : ""}`}
          onClick={() => handleTabChange("deals")}
        >
          Deals
        </button>

        <button
          className={`common-fonts ${
            activeTab === "company" ? "cp-active" : ""
          }`}
          onClick={() => handleTabChange("company")}
        >
          Company
        </button>
        <button
          className={`common-fonts ${
            activeTab === "people" ? "cp-active" : ""
          }`}
          onClick={() => handleTabChange("people")}
        >
          People
        </button>
      </div>

      {activeTab === "leads" && (
        <div>
          <div className="import-tab-btn">
            <button
              className="common-white-button common-fonts sample-download"
              onClick={downloadLeadCSV}
            >
              Sample Download
            </button>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleCsvFileImport}
            />
            <button className="common-save-button common-fonts"onClick={handleImportClick}>Import</button>
          </div>

          <div className="import-tab-table">
            <table>
              <thead>
                <tr>
                  <th className="common-fonts">S NO</th>
                  <th className="common-fonts">DATE</th>
                  <th className="common-fonts">FILE NAME</th>
                  <th className="common-fonts">TOTAL COUNT</th>
                  <th className="common-fonts">SUCCESS</th>
                  <th className="common-fonts">FAILED</th>
                  <th className="common-fonts">USER</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="common-fonts">1</td>
                  <td className="common-fonts">Sep 6, 2023</td>
                  <td className="common-fonts">Import Leads file</td>
                  <td className="common-fonts">100</td>
                  <td className="common-fonts">85</td>
                  <td className="common-fonts">15</td>
                  <td className="common-fonts">Anant Singh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === "deals" && (
        <div>
          <div className="import-tab-btn">
            <button
              className="common-white-button common-fonts sample-download"
              onClick={downloadDealCSV}
            >
              Sample Download
            </button>
            <button className="common-save-button common-fonts">Import</button>
          </div>

          <div className="import-tab-table">
            <table>
              <thead>
                <tr>
                  <th className="common-fonts">S NO</th>
                  <th className="common-fonts">DATE</th>
                  <th className="common-fonts">FILE NAME</th>
                  <th className="common-fonts">TOTAL COUNT</th>
                  <th className="common-fonts">SUCCESS</th>
                  <th className="common-fonts">FAILED</th>
                  <th className="common-fonts">USER</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="common-fonts">1</td>
                  <td className="common-fonts">Sep 6, 2023</td>
                  <td className="common-fonts">Import Leads file</td>
                  <td className="common-fonts">100</td>
                  <td className="common-fonts">85</td>
                  <td className="common-fonts">15</td>
                  <td className="common-fonts">Anant Singh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === "company" && (
        <div>
          <div className="import-tab-btn">
            <button
              className="common-white-button common-fonts sample-download"
              onClick={downloadCompanyCSV}
            >
              Sample Download
            </button>
            <button className="common-save-button common-fonts">Import</button>
          </div>

          <div className="import-tab-table">
            <table>
              <thead>
                <tr>
                  <th className="common-fonts">S NO</th>
                  <th className="common-fonts">DATE</th>
                  <th className="common-fonts">FILE NAME</th>
                  <th className="common-fonts">TOTAL COUNT</th>
                  <th className="common-fonts">SUCCESS</th>
                  <th className="common-fonts">FAILED</th>
                  <th className="common-fonts">USER</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="common-fonts">1</td>
                  <td className="common-fonts">Sep 6, 2023</td>
                  <td className="common-fonts">Import Leads file</td>
                  <td className="common-fonts">100</td>
                  <td className="common-fonts">85</td>
                  <td className="common-fonts">15</td>
                  <td className="common-fonts">Anant Singh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === "people" && (
        <div>
          <div className="import-tab-btn">
            <button
              className="common-white-button common-fonts sample-download"
              onClick={downloadPeopleCSV}
            >
              Sample Download
            </button>
            <button className="common-save-button common-fonts">Import</button>
          </div>

          <div className="import-tab-table">
            <table>
              <thead>
                <tr>
                  <th className="common-fonts">S NO</th>
                  <th className="common-fonts">DATE</th>
                  <th className="common-fonts">FILE NAME</th>
                  <th className="common-fonts">TOTAL COUNT</th>
                  <th className="common-fonts">SUCCESS</th>
                  <th className="common-fonts">FAILED</th>
                  <th className="common-fonts">USER</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="common-fonts">1</td>
                  <td className="common-fonts">Sep 6, 2023</td>
                  <td className="common-fonts">Import Leads file</td>
                  <td className="common-fonts">100</td>
                  <td className="common-fonts">85</td>
                  <td className="common-fonts">15</td>
                  <td className="common-fonts">Anant Singh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ImportTab;

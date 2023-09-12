import React, { useState, useEffect } from 'react';
import {
  handleLogout,
  getDecryptedToken,
  REQ_DOCUMENT
} from "../utils/Constants";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DealAttachments = () => {
  const decryptedToken = getDecryptedToken();
  const [documentList, setDocumentList] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [fileName, setFileName] = useState("");

  const fetchDocuments = () => {
    axios
      .get(REQ_DOCUMENT + "deal", {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const requiredDocuments = response?.data?.data.filter(
          (doc) => doc.is_required === 1
        );
        setDocumentList(requiredDocuments);
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.message === "Invalid or expired token.") {
          alert(error?.response?.data?.message);
          handleLogout();
        }
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDocumentChange = (event) => {
    const selectedDocument = event.target.value;
    setSelectedDocuments((prevSelected) => [...prevSelected, selectedDocument]);
  };

  const availableDocuments = documentList.filter(
    (doc) => !selectedDocuments.includes(doc.document_name)
  );

  return (
    <div>
      <div className='deal-doc-list'>
        <p className='common-fonts deal-browse-doc'>Browse-documents</p>
        <div>
          <select
            name=""
            id=""
            className='deal-doc-select'
            onChange={handleDocumentChange}
            value=""
          >
            <option value="" disabled>
              Select a document
            </option>
            {availableDocuments.map((doc) => {
              return (
                <option key={doc.id} value={doc.document_name}>
                  {doc.document_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {selectedDocuments.map((selectedDocument, index) => (
        <div key={index} className="contact-tab-fields deal-doc-verify">
          <label
            className="common-fonts contact-tab-label deal-doc-label"
          >
            <span>{selectedDocument}</span>{" "}
            <i className="fa fa-check-circle deal-doc-tick" aria-hidden="true"></i>{" "}
            <span>(Uploaded)</span>
          </label>
          <div className="contact-browse deal-doc-file">
            <span
              className="common-fonts common-input contact-tab-input"
              style={{
                position: "relative",
                marginRight: "10px",
              }}
            >
              <button className="contact-browse-btn common-fonts">Browse</button>

              <input
                type="file"
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: "100%",
                }}
                onChange={handleFileChange}
              />
              <button className='deal-doc-eye'> <i className="fa-sharp fa-solid fa-eye "></i></button>
              {fileName && (
                <span className="common-fonts upload-file-name">
                  Selected File: {fileName}
                </span>
              )}
            </span>
          </div>
        </div>
      ))}

      <div className='deal-doc-btn'>
        <button className='common-fonts common-white-button'>Cancel</button>
        <button className='common-fonts common-save-button'>Save</button>
      </div>
    </div>
  );
};

export default DealAttachments;

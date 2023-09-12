import React, { useState, useRef, useEffect } from 'react';
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
  const fileInputRef = useRef(null);

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
    const selectedDocumentName = event.target.value;
    const selectedDocument = availableDocuments.find(
      (doc) => doc.document_name === selectedDocumentName
    );

    if (selectedDocument) {
      setSelectedDocuments((prevSelected) => [...prevSelected, selectedDocument]);
    }
  };

  const availableDocuments = documentList.filter(
    (doc) => !selectedDocuments.some((selectedDoc) => selectedDoc.id === doc.id)
  );



  const handleBrowseClick = (doc) => {
    console.log(doc)
      fileInputRef.current.click();
  };
  

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
            {availableDocuments.map((doc) => (
              <option key={doc.id} value={doc.document_name}>
                {doc.document_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedDocuments.map((doc, index) => (
        <div key={index} className="contact-tab-fields deal-doc-verify">
          <label
            className="common-fonts contact-tab-label deal-doc-label"
          >
            <span>{doc.document_name}</span>{" "}
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
              <button className="contact-browse-btn common-fonts" onClick={()=>handleBrowseClick(doc)}>Browse</button>

              <input
                type="file"
                style={{
                   display: "none",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: "100%",
                }}
                ref={fileInputRef}
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

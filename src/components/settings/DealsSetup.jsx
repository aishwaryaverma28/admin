import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  REQ_DOCUMENT,
  UPDATE_DOCUMENT,
  getDecryptedToken,
} from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddComponent from "../AddComponent";
import "../styles/DealUpdate.css";
import SetUp from "../../assets/image/setup.svg";
import GreaterUp from "../../assets/image/greater-up.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";

const DealsSetup = ({type}) => {
  const decryptedToken = getDecryptedToken();
  const [customDocuments, setCustomDocuments] = useState([]);
  const [showBasic, setShowBasic] = useState(false);
  // const [showClients, setShowClients] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [doc, setDoc] = useState([]);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  const fetchDocs = () => {
    axios
      .get(REQ_DOCUMENT + type, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setDoc(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  useEffect(() => {
    const updatedSelectedIds = doc
      .filter((item) => item.is_required === 1)
      .map((item) => item.id);
    setSelectedDocumentIds(updatedSelectedIds);
  }, [doc]);

  const handleCheckboxChange = (id) => {
    setSelectedDocumentIds((prevIds) => {
      const updatedIds = prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id];
      // Determine the is_required value based on checkbox state
      const isRequiredValue = updatedIds.includes(id) ? 1 : 0;
      // Call the updateFields function here with the updated selectedDocumentIds and is_required value
      updateFields(id, isRequiredValue);
      return updatedIds;
    });
  };

  const updateFields = (updatedIds, isRequiredValue) => {
    const dataToUpdate = {
      docId: updatedIds,
      is_required: isRequiredValue,
    };

    axios
      .put(UPDATE_DOCUMENT, dataToUpdate, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        toast.success("Document updated successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
        toast.error("Failed to update fields");
      });
  };

  const handleAddDocument = () => {
    setCustomDocuments([...customDocuments, ""]);
  };

  const toggleBasic = () => {
    setShowBasic(!showBasic);
  };

  // const toggleClients = () => {
  //   setShowClients(!showClients);
  // };

  const toggleCustom = () => {
    setShowCustom(!showCustom);
  };

  const handleOpenDocumentModal = () => {
    setIsDocumentModalOpen(true);
  };
  const handleCloseDocumentModal = () => {
    setIsDocumentModalOpen(false);
  };

  return (
    <div className="ds-setup-container">
      <p className="common-fonts ds-setup-heading">creating deals</p>

      <div className="ds-setup-flex">
        <img src={SetUp} alt="" />
        <div class="ds-setup-text-box">
          <p className="common-fonts ds-setup-blue-text">
            customize the “create deals” data fields
          </p>
          <p className="common-fonts ds-setup-text">
            You can enhance the quality of data by selecting certain fields and
            highlighting some as important.
          </p>
        </div>
      </div>

      <div className="ds-setup-check">
        <label className="custom-checkbox">
          <input type="checkbox" className={`cb1`} name="" />
          <span className="checkmark"></span>
        </label>
        <p className="commom-fonts ds-setup-check-text">
          Apply default date to new deals
        </p>
      </div>
      <p className="comon-fonts ds-setup-select-text">
        Select default close date when creating a deal{" "}
      </p>

      <div className="ds-setup-radio">
        <input type="radio" name="setup" id="ds-setup-1" />
        <label htmlFor="ds-setup-1" className="common-fonts">
          End of certain period
        </label>
      </div>
      <select name="" id="" className="ds-setup-select">
        <option value="">This Month</option>
      </select>
      <div className="ds-setup-radio">
        <input type="radio" name="setup" id="ds-setup-2" />
        <label htmlFor="ds-setup-2" className="common-fonts">
          Time from deal creation
        </label>
      </div>

      <div className="ds-setup-accordian">
        <div>
          <div className="ds-setup-table-container">
            <p className="common-fonts ds-setup-doc">Documents</p>

            <div>
              <div className="ds-setup-table-heading" onClick={toggleBasic}>
                <img src={showBasic ? GreaterUp : GreaterDown} alt="" />
                <p className="common-fonts ds-setup-basic">basic documents</p>
              </div>

              {showBasic && (
                <>
                  <div className="ds-setup-table">
                    <table>
                      <tbody>
                        {doc.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  className={`cb1`}
                                  name=""
                                  onChange={() => handleCheckboxChange(item.id)}
                                  checked={selectedDocumentIds.includes(
                                    item.id
                                  )}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </td>
                            <td className="common-fonts">
                              {item.document_name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="ds-setup-add">
                    <button
                      className="common-save-button"
                      onClick={handleOpenDocumentModal}
                    >
                      Add Field
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* <div>
              <div className="ds-setup-table-heading"  onClick={toggleClients}>
                <img src={showClients ? GreaterUp : GreaterDown} alt="" />
                <p className="common-fonts ds-setup-basic">Client</p>
              </div>
              {
                showClients && (
                  <div className="ds-setup-table">
                <table>
                  <thead>
                    <tr>
                      <td>
                        <label className="custom-checkbox">
                          <input type="checkbox" className={`cb1`} name="" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td className="common-fonts">Pan Card</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="custom-checkbox">
                          <input type="checkbox" className={`cb1`} name="" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td className="common-fonts">Aadhar Card</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="custom-checkbox">
                          <input type="checkbox" className={`cb1`} name="" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td className="common-fonts">Photo</td>
                    </tr>
                    <tr>
                      <td>
                        <label className="custom-checkbox">
                          <input type="checkbox" className={`cb1`} name="" />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td className="common-fonts">Bank Approval Letter</td>
                    </tr>
                  </thead>
                </table>
              </div>
                )
              }

            </div> */}
            {/* 
            <div>
              <div className="ds-setup-table-heading" onClick={toggleCustom}>
                <img src={showCustom ? GreaterUp : GreaterDown} alt="" />
                <p className="common-fonts ds-setup-basic">Custom</p>
              </div>
              {showCustom && (
                <>
                  <div className="ds-setup-table">
                    <table>
                      <thead>
                        <tr>
                          <td>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                className={`cb1`}
                                name=""
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td className="common-fonts">Pan Card</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                className={`cb1`}
                                name=""
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td className="common-fonts">Aadhar Card</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                className={`cb1`}
                                name=""
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td className="common-fonts">Photo</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                className={`cb1`}
                                name=""
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td className="common-fonts">Bank Approval Letter</td>
                        </tr>
                        <tr>
                          <td>
                            <label className="custom-checkbox">
                              <input
                                type="checkbox"
                                className={`cb1`}
                                name=""
                              />
                              <span className="checkmark"></span>
                            </label>
                          </td>
                          <td className="common-fonts">
                            <input
                              type="text"
                              className="common-fonts ds-setup-input"
                              placeholder="Enter bank approval letter"
                            />
                          </td>
                        </tr>
                        {customDocuments.map((_, index) => (
                          <tr key={index}>
                            <td>
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  className={`cb1`}
                                  name=""
                                />
                                <span className="checkmark"></span>
                              </label>
                            </td>
                            <td className="common-fonts">
                              <input
                                type="text"
                                className="common-fonts ds-setup-input"
                                placeholder="Enter bank approval letter"
                              />
                            </td>
                          </tr>
                        ))}
                      </thead>
                    </table>
                  </div>
                  <div className="ds-setup-add">
                    <button
                      className="common-save-button"
                      onClick={handleAddDocument}
                    >
                      Add Document Feild
                    </button>
                  </div>
                </>
              )}
            </div> */}
          </div>
        </div>
      </div>

      {/* <div className="cp-bottom">
        <button className="common-white-button">Cancel</button>
        <button className="common-save-button cp-save">Save</button>
      </div> */}
      {isDocumentModalOpen && (
        <AddComponent onClose={handleCloseDocumentModal} docsData={fetchDocs} type={"deal"}/>
      )}
      <ToastContainer />
    </div>
  );
};

export default DealsSetup;

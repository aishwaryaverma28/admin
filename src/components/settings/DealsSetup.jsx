import React, { useState } from "react";
import "../styles/DealUpdate.css";
import SetUp from "../../assets/image/setup.svg";
import GreaterUp from "../../assets/image/greater-up.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";

const DealsSetup = () => {
  const [customDocuments, setCustomDocuments] = useState([]);
  const [showBasic, setShowBasic] = useState(false);
  const [showClients, setShowClients] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const handleAddDocument = () => {
    setCustomDocuments([...customDocuments, ""]);
  };

  const toggleBasic = () => {
    setShowBasic(!showBasic);
  };
  
  const toggleClients = () => {
    setShowClients(!showClients);
  };
  
  const toggleCustom = () => {
    setShowCustom(!showCustom);
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
              <div className="ds-setup-table-heading"  onClick={toggleBasic}>
                <img src={showBasic ? GreaterUp : GreaterDown} alt="" />
                <p className="common-fonts ds-setup-basic">basic documents</p>
              </div>

              {
                showBasic && (
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

            </div>

            <div>
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

            </div>
            <div>
              <div className="ds-setup-table-heading"  onClick={toggleCustom}>
                <img src={showCustom ? GreaterUp : GreaterDown} alt="" />
                <p className="common-fonts ds-setup-basic">Custom</p>
              </div>
              {
                showCustom && (
                  <>
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
                    <tr>
                        <td>
                          <label className="custom-checkbox">
                            <input type="checkbox" className={`cb1`} name="" />
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
                            <input type="checkbox" className={`cb1`} name="" />
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
                )
              }

            </div>
          </div>
        </div>
      </div>

      <div className="cp-bottom">
        <button className="common-white-button">Cancel</button>
        <button className="common-save-button cp-save">Save</button>
      </div>
    </div>
  );
};

export default DealsSetup;

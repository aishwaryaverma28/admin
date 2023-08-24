import React from "react";
import StageIcon from "../../../assets/image/stage-icon.svg";
import DeleteIcon from "../../../assets/image/delete-icon.svg";
import { useState } from "react";

const Stage = () => {
    const [customDocuments, setCustomDocuments] = useState([]);

    const handleAddDocument = () => {
        setCustomDocuments([...customDocuments, ""]);
      };
  return (
    <div className="stage-table">
      <table>
        <thead>
          <tr>
            <th className="common-fonts stage-head">STAGE NAME</th>
            <th className="common-fonts stage-head">POBABILITY</th>
            <th className="common-fonts stage-head">PIPELINE NAME</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="common-fonts">
            <div className="stage-data">
            <div className="pipeline-container">
                <span className="pipeline-icon">
                 <img src={StageIcon} alt="" />
                </span>
                <input
                  type="text"
                  className="pipeline-input common-input common-fonts"
                  value="Enquiry Recieved"
                />
              </div>
              <img src={DeleteIcon} alt="" />

            </div>
            </td>

            <td>
                <select name="" id="" className="common-fonts stage-percent">
                    <option value="">100%</option>
                </select>
            </td>

            <td>
                <p className="common-fonts stage-sales">Sale Pipeline</p>
            </td>
          </tr>
          <tr>
            <td className="common-fonts">
            <div className="stage-data">
            <div className="pipeline-container">
                <span className="pipeline-icon">
                 <img src={StageIcon} alt="" />
                </span>
                <input
                  type="text"
                  className="pipeline-input common-input common-fonts"
                  value="Site Visited"
                />
              </div>
              <img src={DeleteIcon} alt="" />

            </div>
            </td>

            <td>
                <select name="" id="" className="common-fonts stage-percent">
                    <option value="">100%</option>
                </select>
            </td>

            <td>
                <p className="common-fonts stage-sales">Sale Pipeline</p>
            </td>
          </tr>
          <tr>
            <td className="common-fonts">
            <div className="stage-data">
            <div className="pipeline-container">
                <span className="pipeline-icon">
                 <img src={StageIcon} alt="" />
                </span>
                <input
                  type="text"
                  className="pipeline-input common-input common-fonts"
                  value="Contacted"
                />
              </div>
              <img src={DeleteIcon} alt="" />

            </div>
            </td>

            <td>
                <select name="" id="" className="common-fonts stage-percent">
                    <option value="">100%</option>
                </select>
            </td>

            <td>
                <p className="common-fonts stage-sales">Sale Pipeline</p>
            </td>
          </tr>
          <tr>
            <td className="common-fonts">
            <div className="stage-data">
            <div className="pipeline-container">
                <span className="pipeline-icon">
                 <img src={StageIcon} alt="" />
                </span>
                <input
                  type="text"
                  className="pipeline-input common-input common-fonts"
                  value="Converted"
              />
              </div>
              <img src={DeleteIcon} alt="" />

            </div>
            </td>

            <td>
                <select name="" id="" className="common-fonts stage-percent">
                    <option value="">100%</option>
                </select>
            </td>

            <td>
                <p className="common-fonts stage-sales">Sale Pipeline</p>
            </td>
          </tr>
          <tr>
            <td className="common-fonts">
            <div className="stage-data">
            <div className="pipeline-container">
                <span className="pipeline-icon">
                 <img src={StageIcon} alt="" />
                </span>
                <input
                  type="text"
                  className="pipeline-input common-input common-fonts"
                  value="Qualification"
                />
              </div>
              <img src={DeleteIcon} alt="" />

            </div>
            </td>

            <td>
                <select name="" id="" className="common-fonts stage-percent">
                    <option value="">100%</option>
                </select>
            </td>

            <td>
                <p className="common-fonts stage-sales">Sale Pipeline</p>
            </td>
          </tr>
          {customDocuments.map((_, index) => (
          <tr>
            <td className="common-fonts">
            <div className="stage-data">
            <div className="pipeline-container">
                <span className="pipeline-icon">
                 <img src={StageIcon} alt="" />
                </span>
                <input
                  type="text"
                  className="pipeline-input common-input common-fonts"
                  value=""
                />
              </div>
              <img src={DeleteIcon} alt="" />

            </div>
            </td>

            <td>
                <select name="" id="" className="common-fonts stage-percent">
                    <option value="">100%</option>
                </select>
            </td>

            <td>
                <p className="common-fonts stage-sales">Sale Pipeline</p>
            </td>
          </tr>
          ))}
          <tr>
            <td>
                <p className="common-fonts stages-addition" onClick={handleAddDocument}>+ Add Stages</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Stage;

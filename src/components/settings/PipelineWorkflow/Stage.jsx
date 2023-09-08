import React,{ useState, useEffect } from "react";
import StageIcon from "../../../assets/image/stage-icon.svg";
import DeleteIcon from "../../../assets/image/delete-icon.svg";
import axios from "axios";
import {
  GET_ALL_STAGE,
  getDecryptedToken,
} from "../../utils/Constants";

const Stage = () => {
  const [stages, setStages] = useState([]);
    const [customDocuments, setCustomDocuments] = useState([]);
    const decryptedToken = getDecryptedToken();

    const fetchStatus = () => {
      axios
        .get(GET_ALL_STAGE+"/deal", {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        })
        .then((response) => {
          console.log(response?.data?.message);
          setStages(response?.data?.message?.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
  useEffect(() => {
    fetchStatus();
  }, []);

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
          {stages.map((item) => 
          <tr key={item.id}>
            <td className="common-fonts">
            <div className="stage-data">
            <div className="pipeline-container">
                <span className="pipeline-icon">
                 <img src={StageIcon} alt="" />
                </span>
                <input
                  type="text"
                  className="pipeline-input common-input common-fonts"
                  value={item.display_name}
                />
              </div>
              <img src={DeleteIcon} alt="" />

            </div>
            </td>

            <td>
                <select name="" id="" className="common-fonts stage-percent">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                    <option value="100">100</option>
                </select>
            </td>

            <td>
                <p className="common-fonts stage-sales">Sale Pipeline</p>
            </td>
          </tr>
          )}
          
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

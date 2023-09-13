import React, { useState, useEffect } from "react";
import StageIcon from "../../../assets/image/stage-icon.svg";
import DeleteIcon from "../../../assets/image/delete-icon.svg";
import axios from "axios";
import {
  GET_ALL_STAGE,
  getDecryptedToken,
  ADD_STAGE,
} from "../../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stage = ({ type }) => {
  const [stages, setStages] = useState([]);
  const [customDocuments, setCustomDocuments] = useState([]);
  const decryptedToken = getDecryptedToken();
  const [stateBtn, setStateBtn] = useState(0);
  const [showAddStageInput, setShowAddStageInput] = useState(true);
  const [details, setDetails] = useState({
    display_name: "",
    stage_type: type,
    stage_name: "",
    position: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "display_name") {
      // Convert display_name to lowercase and replace spaces with underscores
      updatedValue = value.toLowerCase().replace(/ /g, "_");
      setDetails((prev) => {
        return { ...prev, [name]: value, stage_name: updatedValue };
      });
    } else {
      setDetails((prev) => {
        return { ...prev, [name]: value };
      });
    }

    setStateBtn(1);
  }

  const fetchStatus = () => {
    axios
      .get(GET_ALL_STAGE + "/" + type, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setStages(response?.data?.message?.reverse());
        setDetails((prev) => {
          return { ...prev, position: response?.data?.message?.length + 1 };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleAddStage() {
    axios
      .post(ADD_STAGE, details, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        toast.success("Stage Added Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setShowAddStageInput(false);
        setStateBtn(0);
        setDetails({
          display_name: "",
          stage_type: type,
          stage_name: "",
          position: 0,
        });
        fetchStatus();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleAddDocument = () => {
      setCustomDocuments([""]);
      setShowAddStageInput(true);

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
          {stages.map((item) => (
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
          ))}

          {showAddStageInput && customDocuments.map((_, index) => (
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
                      name="display_name"
                      onChange={handleChange}
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
                <div className="stage-new-save">
                  <p className="common-fonts stage-sales">Sale Pipeline</p>
                  {stateBtn === 0 ? (
                    <button className="disabledBtn" disabled>
                      Save
                    </button>
                  ) : (
                    <button
                      className="common-save-button"
                      onClick={handleAddStage}
                    >
                      Save
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <p
                className="common-fonts stages-addition"
                onClick={handleAddDocument}
              >
                + Add Stages
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  );
};

export default Stage;

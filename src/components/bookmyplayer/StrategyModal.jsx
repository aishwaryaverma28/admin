import React, { useState, useEffect } from "react";
import "../styles/HelpModal.css";
import axios from "axios";
import { UPDATE_ACADEMY, getDecryptedToken } from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StrategyModal = ({ onClose, newData, name, fetchData, array }) => {
  const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("academy_id");
  const [stateBtn, setStateBtn] = useState(0);
  const [sName, setSName] = useState("");
  const [descrip, setDescrip] = useState("");
  const [xyz, setXyz] = useState("");
  const [abc, setAbc] = useState("");
const [ num, setNum]= useState([]);

useEffect(() => {
  setNum(array);
}, [array]);

  const handleNameChange = (e) => {
    setStateBtn(1);
    const newStrategyName = e.target.value;
    setSName(newStrategyName);
    if (name === null ||  name === "") {
      setXyz(newStrategyName);
    } else {
      const joinedString = name + "$@$@$" + newStrategyName;
      setXyz(joinedString);
    }
  };

  const handleDescChange = (e) => {
    setStateBtn(1);
    const newStrategyName = e.target.value;
    setDescrip(newStrategyName);
    if (newData === null || newData === "") {
      setAbc(newStrategyName);
    } else {
      const joinedString = newData + "$@$@$" + newStrategyName;
      setAbc(joinedString);
    }
  };
  const handleSave = () => {
    if (!num?.includes("3")) {
      num.push("3");
      setNum(num);
    }
    const combinedProgress = num.join(",");
    const updatedFormData = {
      training_strategy: abc,
      strategy_name: xyz,
      completion_percentage: combinedProgress,
    };
    if(updatedFormData.training_strategy==="" || updatedFormData.strategy_name===""){
      toast.error("Please Enter Name and Description Both", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }
    axios
      .put(UPDATE_ACADEMY + academyId, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        if (response.data.status === 1) {
          toast.success("Details updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          fetchData();
          onClose();
        } else {
          toast.error("Some Error Occurred", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .finally(() => {
        setStateBtn(0);
      });
  };
  return (
    <>
      <div className="help-modal-container">
        <div className="help-modal-box">
          <section>
            <div className="bmp-add-new-batch">
              <p className="common-fonts bmp-add-heading">Add Strategy</p>
            </div>

            <div className="bmp-modal-form">
              <div className="bmp-add-fields">
                <label htmlFor="" className="common-fonts light-color">
                  Strategy Name
                </label>
                <input
                  type="text"
                  className="common-fonts common-input bmp-modal-input"
                  value={sName}
                  onChange={handleNameChange}
                />
              </div>
              <div className="bmp-add-fields">
                <label htmlFor="" className="common-fonts light-color">
                  Strategy Description
                </label>
                <textarea
                  name=""
                  id=""
                  rows="5"
                  className="common-fonts bmp-strategy-input bmp-modal-input"
                  value={descrip}
                  onChange={handleDescChange}
                ></textarea>
              </div>
            </div>

            <div className="bmp-add-bottom-btn">
              <button className="common-fonts common-white-button" onClick={onClose}>
                Cancel
              </button>
              {stateBtn === 0 ? (
                <button className="disabledBtn">Save</button>
              ) : (
                <button
                  className="common-fonts common-save-button"
                  onClick={handleSave}
                >
                  Save
                </button>
              )}
            </div>
          </section>
        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default StrategyModal;

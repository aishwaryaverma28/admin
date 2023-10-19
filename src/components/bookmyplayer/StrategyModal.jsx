import React, { useState } from "react";
import "../styles/HelpModal.css";
import axios from "axios";
import { UPDATE_ACADEMY, getDecryptedToken, } from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";



const StrategyModal = ({ onClose, newData}) => {
  console.log(newData)
console.log("hello")
  const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("id");
  const [stateBtn, setStateBtn] = useState(0); 
  const [formData, setFormData] = useState({
    strategy_name: "",
    strategy_desc: ""
  });


  const handleNameChange = (e) => {
    setStateBtn(1);
    setFormData({ ...formData, strategy_name: e.target.value });
  };

  const handleDescChange = (e) => {
    setStateBtn(1);
    setFormData({ ...formData, strategy_desc: e.target.value });
  };







  

  const handleSave = () => {
    console.log(formData);
    const updatedFormData = {
      training_strategy:[
        JSON.stringify(formData),
      ]}
    axios.put(UPDATE_ACADEMY + academyId, updatedFormData, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
      },
    })
      .then((response) => {
        console.log("response")
        console.log(response)
        if (response.data.status === 1) {
          toast.success("Details updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
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
            <label htmlFor="" className="common-fonts light-color">Strategy Name</label>
                <input type="text" className="common-fonts common-input bmp-modal-input"  value={formData.strategy_name}
                  onChange={handleNameChange}/>
            </div>
            <div className="bmp-add-fields">
            <label htmlFor="" className="common-fonts light-color">Strategy Description</label>
                <textarea name="" id="" rows="5" className="common-fonts bmp-strategy-input bmp-modal-input" value={formData.strategy_desc}
                  onChange={handleDescChange}></textarea>
            </div>
          </div>

          <div className="bmp-add-bottom-btn">
            <button className="common-fonts common-white-button">Cancel</button>
            {stateBtn === 0 ? (
                        <button className="disabledBtn">Save</button>
                      ) : (
                        <button className="common-fonts common-save-button" onClick={handleSave}>Save</button>
                      )}
          </div>
          

          </section>
          
        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default StrategyModal;

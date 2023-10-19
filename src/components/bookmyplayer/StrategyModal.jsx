import React, { useState } from "react";
import "../styles/HelpModal.css";


const StrategyModal = ({ onClose }) => {

  const [formData, setFormData] = useState({
    strategy_name: "",
    strategy_desc: ""
  });

  const handleNameChange = (e) => {
    setFormData({ ...formData, strategy_name: e.target.value });
  };

  const handleDescChange = (e) => {
    setFormData({ ...formData, strategy_desc: e.target.value });
  };

  const handleSave = () => {
    // Here, you can access formData and do whatever you want with it
    console.log(formData);
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
            <button className="common-fonts common-save-button" onClick={handleSave}>Save</button>
          </div>
          

          </section>
          
        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
    </>
  );
};

export default StrategyModal;

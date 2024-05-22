import React, { useState } from "react";
import axios from "axios";
import { getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";

const UrlModal = ({ onClose }) => {
  const decryptedToken = getDecryptedToken();
  const [stateBtn, setStateBtn] = useState(0);
  const [oldUrl, setOldUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [oldUrlData, setOldUrlData] = useState(null);
  const [newUrlData, setNewUrlData] = useState(null);

  const handleCheckClick = async (url, type, setData) => {
    try {
      const response = await axios.post(
        "https://bmp.leadplaner.com/api/api/bmp/redirect/find",
        { type, url },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      );
      console.log(response?.data?.data);
      if (response?.data?.status === 1) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.post(
        "https://bmp.leadplaner.com/api/api/bmp/redirect/add",
        { old_url: oldUrl, new_url: newUrl },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      );
      if (response.data.status === 1) {
        toast.success("Details updated successfully", {
          position: "top-center",
          autoClose: 1000,
        });
      } else {
        toast.error(response?.data?.message, {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("An error occurred while updating details", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const renderUrlData = (data) => {
    return (
      <div className="url-data">
        {data.map((item) => (
          <div key={item.id} className="url-data-item">
            <p>ID: {item.id}</p>
            <p>Old URL: {item.old_url}</p>
            <p>New URL: {item.new_url}</p>
            <p>Total: {item.total}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="help-modal-container lead_modal_input">
      <div className="leftCreateClose2" onClick={onClose}></div>
      <div className="help-modal-box">
        <header className="headerEditor">
          <p className="common-fonts add-new-blog">Add Url</p>
        </header>

        <div className="helpContainer">
          <div className="lead_input_box">
            <div>
              <div className="check_url_box">
                <p className="helpTitle">Old Url</p>
                <button
                  className="common-fonts common-save-button help-save"
                  onClick={() => handleCheckClick(oldUrl, 1, setOldUrlData)}
                >
                  Check
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter Old Url"
                name="old_url"
                className="common-input"
                value={oldUrl}
                onChange={(e) => setOldUrl(e.target.value)}
              />
            </div>
            <div>
              <div className="check_url_box">
                <p className="helpTitle">New Url</p>
                <button
                  className="common-fonts common-save-button help-save"
                  onClick={() => handleCheckClick(newUrl, 2, setNewUrlData)}
                >
                  Check
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter New Url"
                name="new_url"
                className="common-input"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />
        {oldUrlData && renderUrlData(oldUrlData)}
        {newUrlData && renderUrlData(newUrlData)}
        <div className="url_bottom_btn">
          <button className="common-fonts common-delete-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="common-fonts common-save-button help-save"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </div>
      <div className="help-cross" onClick={onClose}>
        X
      </div>
    </div>
  );
};

export default UrlModal;

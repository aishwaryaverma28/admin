import React, { useState } from "react";
import axios from "axios";
import { getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";

const UrlModal = ({ onClose, api }) => {
  const decryptedToken = getDecryptedToken();
  const [stateBtn, setStateBtn] = useState(0);
  const [oldUrl, setOldUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [oldUrlData, setOldUrlData] = useState(null);
  const [newUrlData, setNewUrlData] = useState(null);
  const [loadingOldUrl, setLoadingOldUrl] = useState(false);
  const [loadingNewUrl, setLoadingNewUrl] = useState(false);
  const [oldUrlNotFound, setOldUrlNotFound] = useState(false);
  const [newUrlNotFound, setNewUrlNotFound] = useState(false);

  const handleCheckClick = async (url, type, setData, setLoading, setNotFound) => {
    setLoading(true);
    setNotFound(false);
    setData(null);
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
      setLoading(false);
      if (response?.data?.status === 1 && response?.data?.data?.length > 0) {
        setData(response?.data?.data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      setLoading(false);
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
        api()
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

  const renderUrlData = (data, notFound, type) => {
    if (notFound) {
      return <><p className="url_text">{type} data not found</p><br/></>;
    }
    return (
      <div className="url-data">
        {data?.map((item) => (
          <div key={item.id} className="url-data-item">
            <p>ID: <span>{item.id}</span> </p>
            <p className="url_text">Old URL: <span>{item.old_url}</span> </p>
            <p className="url_text">New URL: <span>{item.new_url}</span> </p>
            <p>Total: <span>{item.total}</span> </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="help-modal-container lead_modal_input url_new_modal">
      <div className="leftCreateClose2" onClick={onClose}></div>
      <div className="help-modal-box">
        <header className="headerEditor">
          <p className="common-fonts add-new-blog">Academy Redirect Form</p>
        </header>

        <div className="helpContainer">
          <div className="lead_input_box">
            <div>
              <div className="check_url_box">
                <p className="helpTitle">Old Url</p>
                {loadingOldUrl && <p>Loading...</p>}
                <button
                  className="common-fonts common-save-button help-save"
                  onClick={() => handleCheckClick(oldUrl, 1, setOldUrlData, setLoadingOldUrl, setOldUrlNotFound)}
                >
                  Check
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter Old Url"
                name="old_url"
                className={`common-input url_input ${oldUrlData ? 'red_border' : ''}`}
                value={oldUrl}
                onChange={(e) => setOldUrl(e.target.value)}
              />              
            </div>
            <div>
              <div className="check_url_box">
                <p className="helpTitle">New Url</p>                
              {loadingNewUrl && <p>Loading...</p>}
                <button
                  className="common-fonts common-save-button help-save"
                  onClick={() => handleCheckClick(newUrl, 2, setNewUrlData, setLoadingNewUrl, setNewUrlNotFound)}
                >
                  Check
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter New Url"
                name="new_url"
                className={`common-input url_input ${newUrlData ? 'red_border' : ''}`}
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />
        {renderUrlData(oldUrlData, oldUrlNotFound, "Old")}
        {renderUrlData(newUrlData, newUrlNotFound, "New")}
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

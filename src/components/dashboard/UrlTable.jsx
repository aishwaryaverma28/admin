import React, { useEffect, useState } from "react";
import Back from "../../assets/image/arrow-left.svg";
import UrlModal from "./UrlModal.jsx";

const ViewLeadsTable = ({ onClose }) => {
  const [openUrlModal, setOpenUrlModal] = useState(false);

  const addUrlModalClick = () => {
    setOpenUrlModal(true);
  };
  const addUrlModalClose = () => {
    setOpenUrlModal(false);
  };

  return (
    <>
      <div className="performance_title2">
        <img src={Back} alt="" onClick={onClose} />

        <div className="leads_new_btn">
          <button
            className="common-fonts common-save-button"
            onClick={addUrlModalClick}
          >
            Add Url
          </button>
        </div>
      </div>

      <div className="marketing-all-table url_table">
        <table>
          <thead>
            <tr>
              <th className="common-fonts">S No</th>
              <th className="common-fonts">Old Url</th>
              <th className="common-fonts">New Url</th>
              <th className="common-fonts">Status</th>
              <th className="common-fonts">Old Url Status</th>
              <th className="common-fonts">New Url Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="common-fonts">1</td>
              <td className="common-fonts">
                https://www.bookmyplayer.com/squash/squash-court-agra-aid-2016
              </td>
              <td className="common-fonts">
                https://www.bookmyplayer.com/squash/squash-court-agra-aid-2014
              </td>
              <td className="common-fonts">Inserted</td>
              <td className="common-fonts">Not Available</td>
              <td className="common-fonts compressEmail">Available</td>
            </tr>
          </tbody>
        </table>
      </div>
      {openUrlModal && <UrlModal onClose={addUrlModalClose} />}
    </>
  );
};

export default ViewLeadsTable;

import React, { useEffect, useState, useRef } from "react";
import DocSign from '../../assets/image/docsign.png';



const DealDocPreview = ({ onClose }) => {
  return (
    <>
      <div className="help-modal-container">
           <div className="help-modal-box">
              <div className="doc-preview-top">
                <div className="doc-preview-number">
                  <p className="common-fonts doc-preview-one">1</p>
                </div>

                <div className="doc-preview-para">
                  <p className="common-fonts doc-preview-heading">Document Preview</p>
                </div>
              </div>
              <div className="doc-preview-sample">
                <button className="common-white-green-button common-fonts">docusign sample file <i class="fa fa-pencil preview-pen"></i></button>
              </div>

              <div>
                <img src={DocSign} alt="" />
              </div>

              <div className="preview-btn">
                <button className="common-fonts common-white-button">Cancle</button>
                <button className="common-fonts common-save-button">Save</button>
              </div>
           </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
    </>
  );
};

export default DealDocPreview;

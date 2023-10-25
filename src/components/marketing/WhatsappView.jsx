import React from "react";
import NoImage from "../../assets/image/no-img.svg";
import Gallery from "../../assets/image/gallery-2.svg";
import { useRef } from "react";
import { useState } from "react";
import Video from "../../assets/image/video.svg";
import ReactEditor from "../ReactEditor";


const WhatsappView = () => {
  const fileInputRef = useRef(null);
  const editorRef = useRef();
  const [fileName, setfileName] = useState("");
  const [selectedFile, setselectedFile] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setfileName(file.name);
    setselectedFile(file);
  };

  const handleDataTransfer = (data) => {
    setDataFromChild(data);
  };

  // const removeHtmlTags = (htmlString) => {
  //   const tempDiv = document.createElement("div");
  //   tempDiv.innerHTML = htmlString;
  //   return tempDiv.textContent || tempDiv.innerText || "";
  // };

  return (
    <div>
      <div className="whatsapp-view-container">
        <div className="whatsapp-view-left">
          <div className="whatsapp-display">
            <div className="whatsapp-img-display">
              <img src={NoImage} alt="" />
            </div>

            <div>
              <p className="common-fonts whatsapp-your-text">{dataFromChild}</p>
            </div>
          </div>
          <div className="whatsapp-left-btn">
            <button className="common-fonts">Button</button>
          </div>
        </div>

        <div className="whatsapp-right">
          <div className="whatsapp-top-label">
            <label htmlFor="" className="comon-fonts">
              Campaign Name
            </label>
            <input type="text" className="common-fonts common-input" />
          </div>

          <div>
          <div className="whatsapp-top-label">
            <label htmlFor="" className="comon-fonts whatsapp-new-label">
              Campaign Image
            </label>
          </div>
            <div className="bmp-upload-3 bmp-gap">
         
            <div className="contact-browse deal-doc-file">
              <span
                className="common-fonts common-input contact-tab-input whatsapp-border"
                style={{
                  position: "relative",
                  marginRight: "10px",
                }}
              >
                <button
                  className="contact-browse-btn common-fonts"
                  onClick={() => handleButtonClick()}
                >
                  Add Image
                </button>

                <input
                  type="file"
                  style={{
                    display: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: "100%",
                  }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <span className="common-fonts upload-file-name whatsapp-new-flex">
                <img src={Gallery} alt="" />
                <div className="whatsapp-para">
                <p className="common-fonts light-color">
                    Add image from your computer
                  </p>
                  <p className="common-fonts bmp-format">
                    Support .jpg, .png, .gif, .mp4 max 10 mb
                  </p>
                </div>
                
                </span>
              </span>
            </div>

            {selectedFile && (
              <div className="bmp-image-preview-2 whatsapp-preview-img">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Preview"
                  className="bmp-preview-image"
                />
              </div>
            )}
          </div>
          </div>

          <div>
          <div className="whatsapp-top-label">
            <label htmlFor="" className="comon-fonts whatsapp-new-label-2">
              Campaign Description
            </label>
            <div className="formEditor whatsapp-editor">
                  <ReactEditor
                    ref={editorRef} // Add this line
                    onDataTransfer={handleDataTransfer}
                  />
                </div>
          </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default WhatsappView;

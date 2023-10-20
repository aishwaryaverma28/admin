import React, { useState, useRef } from 'react';
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import User from "../../assets/image/user-img.png";


const Gallery = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [academyData, setAcademyData] = useState({});


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setSelectedFile(file);
  };


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  const options = {
    cutout: "85%", // Adjusts the thickness of the progress bar
    maintainAspectRatio: false,
    legend: {
      display: false, // Hide legend
    },
    tooltip: {
      enabled: false, // Hide tooltips
    },
  };

  const data = {
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#007bff", "#d3d3d3"],
        hoverBackgroundColor: ["#0056b3", "#d3d3d3"],
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className='bmp-main-wrapper'>
            <div className="bmp-fee-container">
        <div className="bmp-fee-left">
          <p className="common-fonts bmp-fee-timing-2">Photos & Video Gallery</p>
          <p className="common-fonts bmp-add-photo">Add photos and videos of your academy.</p>
          <p className="common-fonts bmp-prefer">Psst! A secret People prefer videos more than photos.</p>
          <div className="bmp-new-flex">

          </div>
        </div>

        <div className="bmp-top-right">
          <div className="status-of-profile">
            <p className="common-fonts">Update Profile</p>
            <div className="progress-bar">
              <div className="bmp-small-circle bmp-completed-stage">1</div>
              <div className="bmp-line"></div>
              <div className="bmp-small-circle bmp-completed-stage">2</div>
              <div className="bmp-line"></div>
              <div className="bmp-small-circle">3</div>
              <div className="bmp-line"></div>
              <div className="bmp-small-circle">4</div>
            </div>
          </div>

          <div className="bmp-msg">
            <p className="common-fonts bmp-now ">Profile Complete</p>
            <div className="bmp-circle">
              <Doughnut data={data} options={options} />
              <div className="circle-percentage">
                <span className="common-fonts percentage-value">70%</span>
              </div>
            </div>
            <button className="common-fonts bmp-complete-btn">
              Complete Now
            </button>
          </div>
        </div>
      </div>

      <div className='bmp-img-section'>
        <div>
          <p className='common-fonts bmp-banner-upload'>upload banner image</p>
          <p className='common-fonts light-color bmp-size'>Recommended image size 820x312</p>
          <div className="bmp-upload-2">
              <div className="contact-browse deal-doc-file">
                <span
                  className="common-fonts common-input contact-tab-input bmp-border"
                  style={{
                    position: "relative",
                    marginRight: "10px",
                  }}
                >
                  <button
                    className="contact-browse-btn common-fonts"
                    onClick={() => handleButtonClick()}
                  >
                    Browse
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
                  <span className="common-fonts upload-file-name">
                     {fileName} 
                    {}
                  </span>
                </span>
              </div>

              {selectedFile && (
                <div className="bmp-image-preview-2">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected Preview"
                    className="bmp-preview-image"
                  />
                </div>
              )}
            </div>

        </div>
      </div>
    </div>
  )
}

export default Gallery
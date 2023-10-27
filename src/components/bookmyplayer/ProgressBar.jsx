import React, {useState} from 'react'
import { Doughnut } from "react-chartjs-2";

const ProgressBar = ({array}) => {
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
        
  return (
    <>
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

    </>
  )
}

export default ProgressBar
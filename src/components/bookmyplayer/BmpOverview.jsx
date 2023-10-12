import React from "react";
import "../styles/bmp.css";
import Map from "../../assets/image/map.png";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const BmpOverview = () => {
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
    <div className="bmp-container">
      <div>
        <p className="common-fonts bmp-top">Address & Contact details</p>

        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Academy name
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Address
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            City
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Zip
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Phone Number
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Whatsapp Number
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Email
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Website
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>

        <p className="common-fonts bmp-social">Social</p>

        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Facebook
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Twitter
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Instagram
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
      </div>

      <div>
        <div className="bmp-top-right">
          
          <div className="status-of-profile">
           <p className="common-fonts">Status of profile</p>
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

          <div className="bmp-progress">
            <div className="bmp-circle">
              <Doughnut data={data} options={options} />
              <div className="circle-percentage">
                <span className="common-fonts percentage-value">70%</span>
              </div>
            </div>

            <div className="bmp-msg">
              <p className="common-fonts bmp-now ">
                Complete Your Profile <span>NOW!</span>
              </p>
              <button className="common-fonts bmp-complete-btn">
                Complete Now
              </button>
            </div>
          </div>
        </div>

        <p className="common-fonts bmp-social">Map Location</p>

        <div className="bmp-map">
          <img src={Map} alt="" />
        </div>

        <p className="common-fonts bmp-social">Social</p>

        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            What’s your squad size
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Average age of your team
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Founded on
          </label>
          <input type="date" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            National player in your team
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
        <div className="bmp-input-flex">
          <label htmlFor="" className="common-fonts bmp-academy-name">
            Head Coach
          </label>
          <input type="text" className="common-fonts common-input bmp-input" />
        </div>
      </div>
    </div>

    <div className="bmp-bottom-btn">
      <button className="common-fonts common-white-button">cancel</button>
      <button className="common-save-button common-save">Save</button>
    </div>
    </>
  );
};

export default BmpOverview;

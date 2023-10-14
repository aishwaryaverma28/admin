import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useState } from "react";
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import Trash from "../../assets/image/TrashFill.svg";
import Pen from "../../assets/image/pen.svg";

const FeesNBatches = () => {
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

  const [fileName, setFileName] = useState("");
  const [openBatch, setOpenBatch] = useState(1);

  const handleBatchClick = (index) => {
    setOpenBatch(openBatch === index ? null : index);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // You can also perform other operations with the file here if needed.
    }
  };

  return (
    <div>
      <div className="bmp-fee-container">
        <div className="bmp-fee-left">
          <p className="common-fonts bmp-fee-timing">Timimg & Fee</p>
          <div className="bmp-new-flex">
            <button className="common-save-button common-fonts bmp-batch-btn">
              Add Batch
            </button>
            <div className="file-input-wrapper">
              <label htmlFor="file-input" className="custom-new-btn">
                Upload Broucher
              </label>
              <input
                type="file"
                id="file-input"
                className="file-input-new"
                onChange={handleFileChange}
              />
              <span id="file-name">{fileName}</span>
            </div>
          </div>
        </div>

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
      </div>

      <div className="bmp-fee-middle">
        <div className="bmp-fee-batch" onClick={() => handleBatchClick(1)}>
        <img src={openBatch === 1 ? GreaterDown : GreaterArrow} alt="" />
          <p className="common-fonts">New Batch</p>
        </div>
        
        {openBatch === 1 && (
        <div className="bmp-fee-box">
          <div className="bmp-box-top">
            <p className="common-fonts">Age Group</p>
            <div className="bmp-fee-corner">
              <p className="common-fonts">created on oct 10, 2023</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" />
            </div>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">5-7 yrs</div>
            <div className="common-fonts bmp-fee-yrs">8-10 yrs</div>
            <div className="common-fonts bmp-fee-yrs">11-13 yrs</div>
            <div className="common-fonts bmp-fee-yrs">14-16 yrs</div>
            <div className="common-fonts bmp-fee-yrs">16-18 yrs</div>
          </div>

          <div className="bmp-box-top">
            <p className="common-fonts">Weekly Days</p>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">Mon-Wed-Fri</div>
          </div>
          <div className="bmp-box-top">
            <p className="common-fonts">Timings</p>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">10:00 am to 12:00 pm</div>
            <div className="common-fonts bmp-fee-yrs">12:00 pm to 02:00 pm</div>
          </div>

          <div className="bmp-box-top">
            <p className="common-fonts">Fee</p>
          </div>

          <div className="bmp-double-flex">
            <div className="bmp-fee-input-flex">
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Months
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Days/Week
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Amout
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
            </div>
            <div className="bmp-fee-input-flex">
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Days/Week
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Months
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
            </div>
          </div>
        </div>
        )}

        <div className="bmp-fee-batch" onClick={() => handleBatchClick(2)}>
        <img src={openBatch === 2 ? GreaterDown : GreaterArrow} alt="" />
          <p className="common-fonts">U-17 Batch</p>
        </div>

        {openBatch === 2 && (
        <div className="bmp-fee-box">
          <div className="bmp-box-top">
            <p className="common-fonts">Age Group</p>
            <div className="bmp-fee-corner">
              <p className="common-fonts">created on oct 10, 2023</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" />
            </div>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">5-7 yrs</div>
            <div className="common-fonts bmp-fee-yrs">8-10 yrs</div>
            <div className="common-fonts bmp-fee-yrs">11-13 yrs</div>
            <div className="common-fonts bmp-fee-yrs">14-16 yrs</div>
            <div className="common-fonts bmp-fee-yrs">16-18 yrs</div>
          </div>

          <div className="bmp-box-top">
            <p className="common-fonts">Weekly Days</p>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">Mon-Wed-Fri</div>
          </div>
          <div className="bmp-box-top">
            <p className="common-fonts">Timings</p>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">10:00 am to 12:00 pm</div>
            <div className="common-fonts bmp-fee-yrs">12:00 pm to 02:00 pm</div>
          </div>

          <div className="bmp-box-top">
            <p className="common-fonts">Fee</p>
          </div>

          <div className="bmp-double-flex">
            <div className="bmp-fee-input-flex">
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Months
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Days/Week
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Amout
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
            </div>
            <div className="bmp-fee-input-flex">
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Days/Week
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Months
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
            </div>
          </div>
        </div>
        )}


        <div className="bmp-fee-batch" onClick={() => handleBatchClick(3)}>
        <img src={openBatch === 3 ? GreaterDown : GreaterArrow} alt="" />
          <p className="common-fonts">National Batch</p>
        </div>

        {openBatch === 3 && (
        <div className="bmp-fee-box">
          <div className="bmp-box-top">
            <p className="common-fonts">Age Group</p>
            <div className="bmp-fee-corner">
              <p className="common-fonts">created on oct 10, 2023</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" />
            </div>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">5-7 yrs</div>
            <div className="common-fonts bmp-fee-yrs">8-10 yrs</div>
            <div className="common-fonts bmp-fee-yrs">11-13 yrs</div>
            <div className="common-fonts bmp-fee-yrs">14-16 yrs</div>
            <div className="common-fonts bmp-fee-yrs">16-18 yrs</div>
          </div>

          <div className="bmp-box-top">
            <p className="common-fonts">Weekly Days</p>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">Mon-Wed-Fri</div>
          </div>
          <div className="bmp-box-top">
            <p className="common-fonts">Timings</p>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">10:00 am to 12:00 pm</div>
            <div className="common-fonts bmp-fee-yrs">12:00 pm to 02:00 pm</div>
          </div>

          <div className="bmp-box-top">
            <p className="common-fonts">Fee</p>
          </div>

          <div className="bmp-double-flex">
            <div className="bmp-fee-input-flex">
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Months
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Days/Week
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Amout
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
            </div>
            <div className="bmp-fee-input-flex">
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Days/Week
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Months
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
            </div>
          </div>
        </div>
        )}

        <div className="bmp-fee-batch"  onClick={() => handleBatchClick(4)} >
        <img src={openBatch === 4 ? GreaterDown : GreaterArrow} alt="" />
          <p className="common-fonts">State Batch</p>
        </div>

        {openBatch === 4 && (
        <div className="bmp-fee-box">
          <div className="bmp-box-top">
            <p className="common-fonts">Age Group</p>
            <div className="bmp-fee-corner">
              <p className="common-fonts">created on oct 10, 2023</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" />
            </div>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">5-7 yrs</div>
            <div className="common-fonts bmp-fee-yrs">8-10 yrs</div>
            <div className="common-fonts bmp-fee-yrs">11-13 yrs</div>
            <div className="common-fonts bmp-fee-yrs">14-16 yrs</div>
            <div className="common-fonts bmp-fee-yrs">16-18 yrs</div>
          </div>

          <div className="bmp-box-top">
            <p className="common-fonts">Weekly Days</p>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">Mon-Wed-Fri</div>
          </div>
          <div className="bmp-box-top">
            <p className="common-fonts">Timings</p>
          </div>

          <div className="bmp-yrs">
            <div className="common-fonts bmp-fee-yrs">10:00 am to 12:00 pm</div>
            <div className="common-fonts bmp-fee-yrs">12:00 pm to 02:00 pm</div>
          </div>

          <div className="bmp-box-top">
            <p className="common-fonts">Fee</p>
          </div>

          <div className="bmp-double-flex">
            <div className="bmp-fee-input-flex">
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Months
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Days/Week
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Amout
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
            </div>
            <div className="bmp-fee-input-flex">
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Days/Week
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
              <div className="bmp-input-fields">
                <label htmlFor="" className="common-fonts bmp-fee-label">
                  Months
                </label>
                <input
                  type="number"
                  className="common-fonts common-input bmp-fee-input"
                />
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default FeesNBatches;

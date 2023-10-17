import React,{ useState }  from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import Trash from "../../assets/image/TrashFill.svg";
import Pen from "../../assets/image/pen.svg";
import BatchModal from "./BatchModal.jsx";
import axios from "axios";
import {getDecryptedToken,} from "../utils/Constants";

const FeesNBatches = () => {
  const decryptedToken = getDecryptedToken();
  const [isBatchModalOpen , setIsBatchModalOpen] = useState(false);
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

  const handleBatchModal = () => {
    setIsBatchModalOpen(true)
  }
  const handleBatchModalClose = () => {
    setIsBatchModalOpen(false)
  }

  return (
    <div>
      <div className="bmp-fee-container">
        <div className="bmp-fee-left">
          <p className="common-fonts bmp-fee-timing">Timimg & Fee</p>
          <div className="bmp-new-flex">
            <button className="common-save-button common-fonts bmp-batch-btn" onClick={handleBatchModal}>
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

      <div className="bmp-fee-middle">
        <div className="bmp-fee-batch" >
        <img src={openBatch === 1 ? GreaterDown : GreaterArrow} alt="" onClick={() => handleBatchClick(1)} />
        <div className="bmp-batch-date">
        <p className="common-fonts" onClick={() => handleBatchClick(1)}>New Batch</p> 
        {
          openBatch === 1 ? (<></>) : (
            <div className="bmp-fee-corner">
              <p className="common-fonts">created on oct 10, 2023</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" />
            </div>
          ) 
        }

        </div>
          
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

        <div className="bmp-fee-batch" >
        <img src={openBatch === 2 ? GreaterDown : GreaterArrow} alt="" onClick={() => handleBatchClick(2)}/>
        <div className="bmp-batch-date">
        <p className="common-fonts" onClick={() => handleBatchClick(2)}>U-17 Batch</p> 
        {
          openBatch === 2 ? (<></>) : (
            <div className="bmp-fee-corner">
              <p className="common-fonts">created on oct 10, 2023</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" />
            </div>
          ) 
        }

        </div>
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


        <div className="bmp-fee-batch" >
        <img src={openBatch === 3 ? GreaterDown : GreaterArrow} alt="" onClick={() => handleBatchClick(3)} />
        <div className="bmp-batch-date">
        <p className="common-fonts" onClick={() => handleBatchClick(3)}>National Batch</p> 
        {
          openBatch === 3 ? (<></>) : (
            <div className="bmp-fee-corner">
              <p className="common-fonts">created on oct 10, 2023</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" />
            </div>
          ) 
        }

        </div>
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
        <div className="bmp-batch-date">
        <p className="common-fonts">State Batch</p> 
        {
          openBatch === 4 ? (<></>) : (
            <div className="bmp-fee-corner">
              <p className="common-fonts">created on oct 10, 2023</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" />
            </div>
          ) 
        }

        </div>
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
      {
        isBatchModalOpen && (

          <BatchModal onClose={handleBatchModalClose} />
        )
      }
    </div>
  );
};

export default FeesNBatches;

import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useState } from "react";
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import Trash from "../../assets/image/TrashFill.svg";
import Pen from "../../assets/image/pen.svg";
import StrategyModal from "./StrategyModal.jsx";
import DeleteStrategyModal from "./DeleteStrategyModal.jsx";
import axios from "axios";
import { GET_ACADEMY, getDecryptedToken, } from "../utils/Constants";
import { useEffect } from "react";

const TraningNStrategy = () => {
  const [openBatch, setOpenBatch] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const decryptedToken = getDecryptedToken();
  const id = localStorage.getItem("id");
  const [newData, setNewData] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleDeleteOpen = () => {
    setIsDeleteModalOpen(true)
  }
  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false)
  }

  const handleBatchClick = (index) => {
    setOpenBatch(openBatch === index ? null : index);
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


  const fetchAcademyDetails = () => {
    axios.get(GET_ACADEMY+id, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    }).then((response) => {
      console.log(JSON.parse(response.data.data[0].training_strategy));
      setNewData(JSON.parse(response.data.data[0].training_strategy));
      // console.log("response")
})
  }

  useEffect(()=>{
    fetchAcademyDetails();
  },[])

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
    <div>
      <div className="bmp-fee-container">
        <div className="bmp-fee-left">
          <p className="common-fonts bmp-fee-timing">training strategy</p>
          <div className="bmp-new-flex">
            <button className="common-save-button common-fonts bmp-batch-btn" onClick={handleModalOpen}>
              Add Strategy
            </button>
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

      <div>
        <div className="bmp-strategy-details">
        <img src={openBatch === 1 ? GreaterDown : GreaterArrow} alt="" onClick={() => handleBatchClick(1)} />
          <div className="bmp-strategy-box">
          <div className="bmp-fee-corner">
              <p className="common-fonts" onClick={() => handleBatchClick(1)}>Technical</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" onClick={handleDeleteOpen} />
            </div>
            {openBatch === 1 && (
            <div className="bmp-strategy-content">
              <p className="common-fonts">Technical assessment mainly involves skills and technique like Passing (short and long range), Controlling, Attacking, Tackling, Defensive duties</p>
            </div>
            )}

          </div>
          
        </div>
        <div className="bmp-strategy-details">
        <img src={openBatch === 2 ? GreaterDown : GreaterArrow} alt="" onClick={() => handleBatchClick(2)} />
          <div className="bmp-strategy-box">
          <div className="bmp-fee-corner">
              <p className="common-fonts" onClick={() => handleBatchClick(2)}>Physical</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" onClick={handleDeleteOpen} />
            </div>
            {openBatch === 2 && (
            <div className="bmp-strategy-content">
              <p className="common-fonts">Technical assessment mainly involves skills and technique like Passing (short and long range), Controlling, Attacking, Tackling, Defensive duties</p>
            </div>
            )}

          </div>
          
        </div>
        <div className="bmp-strategy-details">
        <img src={openBatch === 3 ? GreaterDown : GreaterArrow} alt="" onClick={() => handleBatchClick(3)} />
          <div className="bmp-strategy-box">
          <div className="bmp-fee-corner">
              <p className="common-fonts" onClick={() => handleBatchClick(3)}>Pchycological</p>
              <img src={Pen} alt="" className="bmp-fee-pen" />
              <img src={Trash} alt="" onClick={handleDeleteOpen}/>
            </div>
            {openBatch === 3 && (
            <div className="bmp-strategy-content">
              <p className="common-fonts">Technical assessment mainly involves skills and technique like Passing (short and long range), Controlling, Attacking, Tackling, Defensive duties</p>
            </div>
            )}

          </div>
          
        </div>
      </div>
      {
        isModalOpen && (
          <StrategyModal onClose={handleModalClose} newData={newData} />
        )
      }

      {
        isDeleteModalOpen && (
          <DeleteStrategyModal onClose={handleDeleteClose} />
        )
      }
    </div>
  );
};

export default TraningNStrategy;

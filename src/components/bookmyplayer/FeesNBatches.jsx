import React, { useRef,useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import GreaterArrow from "../../assets/image/greater-arrow.svg";
import GreaterDown from "../../assets/image/greater-arrow-down.svg";
import Trash from "../../assets/image/TrashFill.svg";
import Pen from "../../assets/image/pen.svg";
import BatchModal from "./BatchModal.jsx";
import axios from "axios";
import { GET_BATCH, getDecryptedToken } from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const FeesNBatches = () => {
  const decryptedToken = getDecryptedToken();
  const fileInputRef = useRef(null);
  const academyId = localStorage.getItem("id");
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batch, setBatch] = useState([]);
  const id= localStorage.getItem('id');
  const [param, setParam] = useState("");
  const [batchId, setBatchId] = useState(null);
  const [obj, setObj] = useState({});
  const [groupCount, setGroupCount] = useState(null);
  const [timingsCount, setTimingsCount] = useState(null);
  const [fieldCount, setFieldCount] = useState(null);


  
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

  const fetchBatch = () =>{
    axios
    .get(GET_BATCH + id, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
      },
    })
    .then((response) => {
      setBatch(response?.data?.data)

      
    })
    .catch((error) => {
      console.log(error);
    });

  }

  useEffect(() => {
fetchBatch();
  }, []);


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

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    submitImage(event.target.files[0]);
  };

  const submitImage = (file) => {
    const selectedImage = file;
    console.log(file);
    if (selectedImage) {
      const folder = 'bookmyplayer/academy/' + academyId;
      const uniqueFileName = `${folder}/${selectedImage.name.replace(
        /\.[^/.]+$/,
        ""
      )}`;
      const data = new FormData();
      data.append("file", selectedImage);
      data.append("upload_preset", "zbxquqvw");
      data.append("cloud_name", "cloud2cdn");
      data.append("public_id", uniqueFileName);

      fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.secure_url);
          setFileName(data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBatchModal = (param, batchId = null) => {
    setIsBatchModalOpen(true);
    setParam(param);
    setBatchId(batchId);
    const selectedBatch = batch.find(batchItem => batchItem.id === batchId);
  setObj(selectedBatch);
  setGroupCount(selectedBatch?.age_group?.split(",")?.length)
  setTimingsCount(selectedBatch?.timing?.split(",")?.length)
  setFieldCount(selectedBatch?.fees?.split(",")?.length)
  };
  const handleBatchModalClose = () => {
    setIsBatchModalOpen(false);
  };

  

  return (
    <div>
      <div className="bmp-fee-container">
        <div className="bmp-fee-left">
          <p className="common-fonts bmp-fee-timing">Timimg & Fee</p>
          <div className="bmp-new-flex">
            <button
              className="common-save-button common-fonts bmp-batch-btn"
              onClick={()=>handleBatchModal("post")}
            >
              Add Batch
            </button>
            <div className="file-input-wrapper">
              <label htmlFor="file-input" className="custom-new-btn"  onClick={handleButtonClick}>
                Upload Broucher
              </label>
              <input
                type="file"
                id="file-input"
                className="file-input-new"
                ref={fileInputRef}
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
      {batch?.map((batch, index) => (
        <>
        <div className="bmp-fee-batch">
          <img
            src={openBatch === 1 ? GreaterDown : GreaterArrow}
            alt=""
            onClick={() => handleBatchClick(index)}
          />
          <div className="bmp-batch-date">
            <p className="common-fonts" onClick={() => handleBatchClick(index)}>
              {batch?.title}
            </p>
            {openBatch === index ? (
              <></>
            ) : (
              <div className="bmp-fee-corner">
                <p className="common-fonts">created on {batch?.creation_date?.split('T')[0]}</p>
                <img src={Pen} alt="" className="bmp-fee-pen" onClick={()=>handleBatchModal("put", batch.id)} />
                <img src={Trash} alt="" />
              </div>
            )}
          </div>
        </div>

        {openBatch === index && (
          <div className="bmp-fee-box">
            <div className="bmp-box-top">
              <p className="common-fonts">Age Group</p>
              <div className="bmp-fee-corner">
                <p className="common-fonts">created on {batch?.creation_date?.split('T')[0]}</p>
                <img src={Pen} alt="" className="bmp-fee-pen" onClick={()=>handleBatchModal("put", batch.id)}  />
                <img src={Trash} alt="" />
              </div>
            </div>

            <div className="bmp-yrs">
                  
                    {batch?.age_group.split(',')?.map((age, index)=>{
                      return(
                        <div className="common-fonts bmp-fee-yrs" key={index}>
                        {age}
                        </div>
                      )
                    })}
            </div>

            <div className="bmp-box-top">
              <p className="common-fonts">Weekly Days</p>
            </div>

            <div className="bmp-yrs">
              <div className="common-fonts bmp-fee-yrs">{batch?.weekly_days.split(',').join('-')}</div>
            </div>
            <div className="bmp-box-top">
              <p className="common-fonts">Timings</p>
            </div>

            <div className="bmp-yrs">
              
              {batch?.timing.split(',')?.map((time, index)=>{
                      return(
                        <div className="common-fonts bmp-fee-yrs">
                {time}
              </div>
                      )
                    })}
            </div>

            <div className="bmp-box-top">
              <p className="common-fonts">Fee</p>
            </div>

            <div className="bmp-double-flex">
            {
              batch?.fees?.split(',')?.map((fees, index)=>{
                return (
                  <div className="bmp-fee-input-flex">
                <div className="bmp-input-fields">
                  <label htmlFor="" className="common-fonts bmp-fee-label">
                    Months
                  </label>
                  <input
                    type="number"
                    className="common-fonts common-input bmp-fee-input"
                    value={fees.split(' ')[0]}
                    disabled
                  />
                </div>
                <div className="bmp-input-fields">
                  <label htmlFor="" className="common-fonts bmp-fee-label">
                    Amout
                  </label>
                  <input
                    type="number"
                    className="common-fonts common-input bmp-fee-input"
                    value={fees.split('month-')[1]}
                    disabled
                  />
                </div>
              </div>
                )
              })
            }

            </div>
          </div>
        )}
        </>
      ))}
      </div>
      {isBatchModalOpen && <BatchModal onClose={handleBatchModalClose} fetchBatch={fetchBatch} param={param} obj={obj} ageCount={groupCount} timeCount={timingsCount} feeCount={fieldCount} batchId={batchId} />}
      <ToastContainer />
    </div>
  );
};

export default FeesNBatches;

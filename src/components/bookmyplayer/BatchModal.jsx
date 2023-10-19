import React, { useState } from "react";
import "../styles/HelpModal.css";
import axios from "axios";
import { getDecryptedToken, ADD_BATCH, UPDATE_BATCH } from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const BatchModal = ({ onClose,batchId, fetchBatch, param, obj={
  age_group:"",
  weekly_days:"",
  timing:"",
  fees:"",
  title:""
} , ageCount=1, timeCount=1, feeCount=1 }) => {
  console.log(obj)
  console.log("hyt")
  const decryptedToken = getDecryptedToken();
  const [selectedDays, setSelectedDays] = useState([]);
  const [days, setDays] = useState("");
  const [groupCount, setGroupCount] = useState(ageCount);
  const [timingsCount, setTimingsCount] = useState(timeCount);
  const [fieldCount, setFieldCount] = useState(feeCount);
  const orgId = localStorage.getItem("org_id");
  const [inputValues, setInputValues] = useState([]);
  const [amountValues, setAmountValues] = useState([]);
  const [newArr, setNewArr] = useState([]);
  const [amountArr, setNewAmountArr] = useState([]);
  const [timingValues, setTimingValues] = useState([]);
  const [timeArr, setTimeArr] = useState([]);
  const id=localStorage.getItem('id');

  const handleTimingChange = (index, value, type) => {
    const newValues = [...timingValues];
    newValues[index] = { ...newValues[index], [type]: value };
    setTimingValues(newValues);
  };

  const handleGroupChange = (index, value, type) => {
    const newValues = [...inputValues];
    newValues[index] = { ...newValues[index], [type]: value };
    setInputValues(newValues);
  };

  const handleAmountChange = (index, value, type) => {
    const newValues = [...amountValues];
    newValues[index] = { ...newValues[index], [type]: value };
    setAmountValues(newValues);
  };

  useEffect(() => {
    setSelectedDays(obj?.weekly_days?.split(',') || []);
  }, []);



  useEffect(() => {
    const filteredValues = inputValues
      .filter(
        (value) => value && value.from !== undefined && value.to !== undefined
      )
      .map((value) => `${value.from}-${value.to}yrs`);

    setNewArr(filteredValues);
  }, [inputValues]);

  useEffect(() => {
    const filteredValues = amountValues
      .filter(
        (value) =>
          value && value.month !== undefined && value.amount !== undefined
      )
      .map((value) => `${value.month} month-${value.amount}`);

    setNewAmountArr(filteredValues);
  }, [amountValues]);

  useEffect(() => {
    const filteredValues = timingValues
      .filter(
        (value) =>
          value &&
          value.toTime !== undefined &&
          value.fromTime !== undefined &&
          value.period !== undefined &&
          value.period2 !== undefined
      )
      .map(
        (value) =>
          `${value.fromTime}${value.period} to ${value.toTime}${value.period2}`
      );

    setTimeArr(filteredValues);
  }, [timingValues]);

  const [batchDetails, setBatchDetails] = useState({
    academy_id: parseInt(id),
    age_group: "",
    weekly_days: "",
    timing: "",
    fees: "",
    title: "",
  });

  //   {
  //     "academy_id": 1,
  //     "age_group": "5-6yrs,9-10yrs,11-15yrs",
  //     "weekly_days": "sun,mon,wed,sat",
  //     "timing": "8am-10am,10am-12pm,12pm-2pm,2pm-4pm,4pm-6pm,6pm-8pm",
  //     "fees": "3 month-11123,6 month-4322"
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const val= value;


    setBatchDetails({
      ...batchDetails,
      [name]: val,
    });
    // setStateBtn(1);
  };

  const fetchBatchData = () => {
    const body = {
      ...batchDetails,
      age_group: [...newArr].join(","),
      fees: [...amountArr].join(","),
      timing: [...timeArr].join(","),
    };
    console.log(body);
    if(param==="post"){
      axios
      .post(ADD_BATCH, body, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
        },
      })
      .then((response) => {
        // Reset input fields and counts after successful API call
        setBatchDetails({
          academy_id: parseInt(id),
          age_group: "",
          weekly_days: "",
          timing: "",
          fees: "",
          title: "",
        });
        setInputValues([]);
        setAmountValues([]);
        setTimingValues([]);
        setGroupCount(1);
        setTimingsCount(1);
        setFieldCount(1);
        onClose();
        if(response?.data?.status===1){
          toast.success("Batch added successfully!", {
            position: "top-center",
            autoClose: 2000,
          });
        }else{
          toast.error(response?.data?.message
            
            , {
            position: "top-center",
            autoClose: 2000,
          });
        }
       
        fetchBatch();
      })
      .catch((error) => {
        toast.error("Some Error Occoured!", {
          position: "top-center",
          autoClose: 2000,
        });
        setBatchDetails({
          academy_id: 1,
          age_group: "",
          weekly_days: "",
          timing: "",
          fees: "",
          title: "",
        });
        setInputValues([]);
        setAmountValues([]);
        setTimingValues([]);
        setGroupCount(1);
        setTimingsCount(1);
        setFieldCount(1);
        onClose();
        
      });
    }else{
      if(param==="put"){
        axios
        .put(UPDATE_BATCH+batchId, body, {
          headers: {
            Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
          },
        })
        .then((response) => {
          // Reset input fields and counts after successful API call
          setBatchDetails({
            academy_id: parseInt(id),
            age_group: "",
            weekly_days: "",
            timing: "",
            fees: "",
            title: "",
          });
          setInputValues([]);
          setAmountValues([]);
          setTimingValues([]);
          setGroupCount(1);
          setTimingsCount(1);
          setFieldCount(1);
          onClose();
          if(response?.data?.status===1){
            toast.success("Batch Updated successfully!", {
              position: "top-center",
              autoClose: 2000,
            });
          }else{
            toast.error(response?.data?.message+" update"
              
              , {
              position: "top-center",
              autoClose: 2000,
            });
          }
         
          fetchBatch();
        })
        .catch((error) => {
          toast.error("Some Error Occoured in update!", {
            position: "top-center",
            autoClose: 2000,
          });
          setBatchDetails({
            academy_id: 1,
            age_group: "",
            weekly_days: "",
            timing: "",
            fees: "",
            title: "",
          });
          setInputValues([]);
          setAmountValues([]);
          setTimingValues([]);
          setGroupCount(1);
          setTimingsCount(1);
          setFieldCount(1);
          onClose();
          
        });
      }
    }

  };

  const AddFields = () => {
    setFieldCount(fieldCount + 1);
  };
  const AddTimings = () => {
    setTimingsCount(timingsCount + 1);
  };

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      // If the day is already selected, remove it
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      // If the day is not selected, add it
      setSelectedDays([...selectedDays, day]);
    }
  };

  useEffect(() => {
    const selectedDaysString = selectedDays.join(",");
    setBatchDetails((prevBatchDetails) => ({
      ...prevBatchDetails,
      weekly_days: selectedDaysString,
    }));
  }, [selectedDays]);

  const addGroup = () => {
    setGroupCount(groupCount + 1);
  };


 

  return (
    <>
      <div className="help-modal-container">
        <div className="help-modal-box">
          <section>
            <div className="bmp-add-new-batch">
              <p className="common-fonts bmp-add-heading">Add Batch</p>
            </div>

            <div className="bmp-wrapper">
              <div className="bmp-modal-form">
                <div className="bmp-add-fields">
                  <label htmlFor="" className="common-fonts light-color">
                    Batch Name
                  </label>
                  <input
                    type="text"
                    className="common-fonts common-input bmp-modal-input"
                    name="title"
                    onChange={handleInputChange}
                    value={obj?.title}
                  />
                </div>

                {[...Array(groupCount)].map((_, index) => (
                  <div className="bmp-agegroup">
                    <label htmlFor="" className="common-fonts light-color">
                      Age Group
                    </label>
                    <div className="bmp-input-flex-2 bmp-add-fields">
                      <input
                        type="number"
                        className="common-fonts common-input bmp-modal-input"
                        value={(obj.age_group && obj.age_group.split(',')[index]?.split('-')[0]) || ""}
                        onChange={(e) =>
                          handleGroupChange(index, e.target.value, "from")
                        }
                      />
                      <p className="common-fonts light-color bmp-to">To</p>
                      <input
                        type="number"
                        className="common-fonts common-input bmp-modal-input"
                        value={(obj?.age_group && obj?.age_group?.split(',')[index]?.split('-')[1]?.replace('yrs', '')?.trim()) || ""}

                        onChange={(e) =>
                          handleGroupChange(index, e.target.value, "to")
                        }
                      />
                    </div>
                  </div>
                ))}

                <div></div>

                <div className="bmp-group">
                  <button
                    className="common-fonts common-white-blue-button"
                    onClick={addGroup}
                  >
                    + Add Groups
                  </button>
                </div>

                <div className="bmp-add-fields">
                  <label htmlFor="" className="common-fonts light-color">
                    Weekly days
                  </label>
                  <div className="bmp-days">
                    <div
                      className={`common-fonts bmp-add-days bmp-add-days-1 ${
                        selectedDays.includes("Sun") ? "blueDiv" : ""
                      }`}
                      onClick={() => handleDayClick("Sun")}
                    >
                      Sun
                    </div>
                    <div
                      className={`common-fonts bmp-add-days ${
                        selectedDays.includes("Mon") ? "blueDiv" : ""
                      }`}
                      onClick={() => handleDayClick("Mon")}
                    >
                      Mon
                    </div>
                    <div
                      className={`common-fonts bmp-add-days ${
                        selectedDays.includes("Tue") ? "blueDiv" : ""
                      }`}
                      onClick={() => handleDayClick("Tue")}
                    >
                      Tue
                    </div>
                    <div
                      className={`common-fonts bmp-add-days ${
                        selectedDays.includes("Wed") ? "blueDiv" : ""
                      }`}
                      onClick={() => handleDayClick("Wed")}
                    >
                      Wed
                    </div>
                    <div
                      className={`common-fonts bmp-add-days ${
                        selectedDays.includes("Thu") ? "blueDiv" : ""
                      }`}
                      onClick={() => handleDayClick("Thu")}
                    >
                      Thu
                    </div>
                    <div
                      className={`common-fonts bmp-add-days ${
                        selectedDays.includes("Fri") ? "blueDiv" : ""
                      }`}
                      onClick={() => handleDayClick("Fri")}
                    >
                      Fri
                    </div>
                    <div
                      className={`common-fonts bmp-add-days bmp-add-days-2 ${
                        selectedDays.includes("Sat") ? "blueDiv" : ""
                      }`}
                      onClick={() => handleDayClick("Sat")}
                    >
                      Sat
                    </div>
                  </div>
                </div>

                {[...Array(timingsCount)].map((_, index) => (
                  <div>
                    <label htmlFor="" className="common-fonts light-color">
                      Timings
                    </label>
                    <div className="bmp-input-flex-2 bmp-add-fields bmp-new-timing">
                      <div className="">
                        <input
                          className="common-fonts common-input common-fonts bmp-time-input"
                          placeholder="Enter Time"
                          value={obj?.timing && (obj?.timing?.split(',')[index]?.split('to')[0]?.replace(/[APap][Mm]/g, '').trim() || "")}
                          onChange={(e) =>
                            handleTimingChange(
                              index,
                              e.target.value,
                              "fromTime"
                            )
                          }
                        ></input>
                      </div>
                      <select
                        name="time"
                        id=""
                        className="common-fonts common-input bmp-modal-select"
                        onChange={(e) =>
                          handleTimingChange(index, e.target.value, "period")
                        }
                        value={obj?.timing?.split(',')[index]?.split('to')[0]?.replace(/\d+/g, '').trim()}
                      >
                        <option value="">AM/PM</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>

                      <p className="common-fonts light-color bmp-to">To</p>

                      <div className="">
                        <input
                          className="common-fonts common-input common-fonts bmp-time-input"
                          placeholder="Enter Time"
                          value={
    timingValues[index]?.toTime || 
    (obj?.timing?.split(',')[index]?.split('to')[1]?.replace(/[APap][Mm]/g, '').trim() || ""
    )
  }
                          onChange={(e) =>
                            handleTimingChange(index, e.target.value, "toTime")
                          }
                        ></input>
                      </div>

                      <select
                        name=""
                        id=""
                        className="common-fonts common-input bmp-modal-select"
                        onChange={(e) =>
                          handleTimingChange(index, e.target.value, "period2")
                        }
                        value={obj?.timing?.split(',')[index]?.split('to')[1]?.replace(/\d+/g, '').trim()}
                      >
                        <option value="">AM/PM</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                ))}

                <div className="bmp-group">
                  <button
                    className="common-fonts common-white-blue-button"
                    onClick={AddTimings}
                  >
                    + Add Timings
                  </button>
                </div>

                {[...Array(fieldCount)].map((_, index) => (
                  <div>
                    <label htmlFor="" className="common-fonts light-color">
                      Fee
                    </label>
                    <div className="bmp-input-flex-2 bmp-add-fields  bmp-new-timing">
                      <select
                        name=""
                        id=""
                        className="common-fonts common-input bmp-modal-select-2 bmp-select-fee"
                        value={obj?.fees?.split(',')[index]?.split(' month-')[0] || ""}
                        onChange={(e) =>
                          handleAmountChange(index, e.target.value, "month")
                        }
                      >
                        <option value="">Months</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                      {/* <select
                    name=""
                    id=""
                    className="common-fonts common-input bmp-modal-select bmp-select-fee"
                  >
                    <option value="">Days/Week</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select> */}

                      <input
                        type="text"
                        className="common-fonts common-input bmp-modal-input"
                        placeholder="Enter your amount"
                        value={obj?.fees?.split(',')[index]?.split(' month-')[1] || ""}
                        onChange={(e) =>
                          handleAmountChange(index, e.target.value, "amount")
                        }
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <button
                    className="common-fonts common-white-blue-button"
                    onClick={AddFields}
                  >
                    + Add fields
                  </button>
                </div>
              </div>

              <div className="bmp-add-bottom-btn">
                <button className="common-fonts common-white-button">
                  Cancel
                </button>
                <button
                  className="common-fonts common-save-button"
                  onClick={fetchBatchData}
                >
                {
                  param==="post" ? "Save" : "Update"
                }
                </button>
              </div>
            </div>
          </section>
        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
    </>
  );
};

export default BatchModal;

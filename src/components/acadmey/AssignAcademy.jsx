import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  GET_ACADEMY,
  SEARCH_ACADMEY_ID,
  ACADMEY_SEARCH_API,
  ASSIGN_ACADEMY,
  ASSIGN_NEW_ACADEMY,
  getDecryptedToken,
} from "../utils/Constants.js"
import { toast } from 'react-toastify';
import AcadmeyLead from '../lead/AcadmeyLead.jsx';
const AssignAcademy = ({ id, tempAcademyId, onLeadAdded }) => {
  const decryptedToken = getDecryptedToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleChecked, setToggleChecked] = useState(false);
  const [academy, setAcademy] = useState([])
  const [data, setData] = useState({})
  const [selectedObj, setSelectedObj] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (object) => {
    setModalVisible(true);
    setSelectedObj(object);
  }
  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchLead = () => {
    let body = {
        academy_id: tempAcademyId,
        type: "temp"
      };
      
    axios
        .post(GET_ACADEMY, body, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
        .then((response) => {
            setData(response?.data?.data[0]);
        })
        .catch((error) => {
            console.log(error);
        });
};
useEffect(() => {
    fetchLead();
}, []);

  const handleToggleChange = () => {
    setToggleChecked(!toggleChecked);
    setSearchQuery("");
  };
  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (value?.length === 0) {
      // getAllVerify();
    } else {
      if (!toggleChecked && value?.length < 3) {
        return;
      }
      let apiUrl = '';
      apiUrl = toggleChecked
        ? `${SEARCH_ACADMEY_ID}${value}`
        : `${ACADMEY_SEARCH_API}${value}`;
      axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
        .then(response => {
          setAcademy(response?.data?.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };
  //==========================================api call to assign the academy to user
  function academyAssign(object) {
    const body = {
      userId: id,
      academyId: object.id,
      tempAcademyId: tempAcademyId
    }
    axios.post(ASSIGN_ACADEMY, body, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    })
      .then((response) => {
        if (response?.data?.status === 1){
          console.log(response?.data)
        toast.success("Acadmey assigned successfully", {
          position: "top-center",
          autoClose: 1000,
        });
        onLeadAdded();
      }else{
        toast.error(response?.data?.message, {
          position: "top-center",
          autoClose: 1000,
        });
      }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 1000,
        });
      })
  }

  function academyNewAssign() {
    const body = {
      userId: id,
      tempAcademyId: tempAcademyId
    }
    axios.post(ASSIGN_NEW_ACADEMY, body, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    })
      .then((response) => {
      openModal(response?.data?.data?.insertId)
        if (response?.data?.status === 1){
        toast.success("Acadmey added successfully", {
          position: "top-center",
          autoClose: 1000,
        });
      }else{
        toast.error(response?.data?.message, {
          position: "top-center",
          autoClose: 1000,
        });
      }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 1000,
        });
      })
  }
 
  return (
    <>
      <div className="recycle-search-box">
        <input
          type="text"
          className="recycle-fonts assign-search"
          placeholder="Search for academy"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="recycle-search-icon">
          <div>
            <label className="password-switch lead-switch">
              <input
                type="checkbox"
                checked={toggleChecked}
                onChange={handleToggleChange}
              />
              <span className="password-slider lead-slider password-round"></span>
            </label>
          </div>
        </span>
      </div>
      <>
      <div className="academy-card">
            <div className="card-container">
              <div className="card-leftBox">
                <div className="user-details">
                  <p className="heading">
                    {data.id} - {data.name}
                  </p>
                </div>
                <div className="lead-value">
                </div>
                <div className="contact-details">
                  <div className="mail sportCap">
                    <p>{data.sport}</p>
                  </div>
                  <div className="mail">
                    <p>{data.phone}</p>
                  </div>
                  <div className="mail sportCap">
                    <p>{data.city}, {data.state}</p>
                  </div>
                </div>
              </div>
              <div className="DealCard-rightBox">
                <div className="mail">
                  <div className="new_preview_flex">
                    <img
                      src={data?.logo === null
                        ? "https://bmpcdn.s3.ap-south-1.amazonaws.com/default/academy_default_logo.webp"
                        : `https://bmpcdn.s3.ap-south-1.amazonaws.com/academy_temp/${data?.id}/${data?.logo}`}
                      alt="pofile"
                      className="bmp-preview-image"
                    />
                    <div className='new_btnflex'>
                    <button type="button" className="common-save-button " onClick={academyNewAssign}>
                    New Academy
                  </button> 
                    </div>

                  </div>
                </div>
                
              </div>
            </div>
          </div>
      </>
      <>
        {academy.map((object) => (
          <div key={object.id} className="academy-card">
            <div className="card-container">
              <div className="card-leftBox">
                <div className="user-details">
                  <p className="heading">
                    {object.id} - {object.name}
                  </p>
                </div>
                <div className="lead-value">
                </div>
                <div className="contact-details">
                  <div className="mail sportCap">
                    <p>{object.sport}</p>
                  </div>
                  <div className="mail">
                    <p>{object.phone}</p>
                  </div>
                  <div className="mail sportCap">
                    <p>{object.city}, {object.state}</p>
                  </div>
                </div>
              </div>
              <div className="DealCard-rightBox">
                <div className="mail">
                  <div className="new_preview_flex">
                    <img
                      src={object?.logo === null
                        ? "https://bmpcdn.s3.ap-south-1.amazonaws.com/default/academy_default_logo.webp"
                        : `https://bmpcdn.s3.ap-south-1.amazonaws.com/academy/${object?.id}/${object?.logo}`}
                      alt="pofile"
                      className="bmp-preview-image"
                    />
                    <div className='new_btnflex'>
                    {/* <button type="button" className="common-save-button ">
                    New Academy
                  </button>  */}
                <button type="button" className="common-save-button" onClick={() => academyAssign(object)}>
                  Assign
                </button>
                    </div>

                  </div>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </>
      {modalVisible && (
        <AcadmeyLead
          selectedItem={selectedObj}
          closeModal={closeModal}
        />
      )}
    </>
  )
}

export default AssignAcademy
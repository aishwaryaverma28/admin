import React, { useEffect } from 'react';
import Calender from "../../assets/image/calendar.svg";
import axios from 'axios';
import { GET_APPROVAL, getDecryptedToken } from '../utils/Constants.js';
import { useState } from 'react';
import ApprovalModal from './ApprovalModal.jsx';

const Approval = () => {
  const decryptedToken = getDecryptedToken();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const academyId = localStorage.getItem("academy_id");
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState([]);

  const openModal = (data) => {
     setIsOpen(true);
     setItem(data);
  }

  const closeModal = () => {
    setIsOpen(false);

 }

  const approvalData = () => {
    axios.post(GET_APPROVAL, {
      "academy_id": academyId
    }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    }).then((response) => {
      setData(response?.data?.data);
      console.log(response?.data?.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }

  useEffect(()=>{
   approvalData();
  },[])
  return (
    <>

<div>
      <p className='common-fonts bmp_approval'>Approval Status</p>
    </div>

    <div className='bmp_approval_btn'>
      <div>
        <button className='common-fonts bmp_date_button'><img src={Calender} alt="" />Any Date</button>
      </div>

      <div>
         <button className='common-fonts common-delete-button bmp_revoke'>Revoke</button>
         <button className='common-fonts common-save-button'>Proceed</button>
      </div>
    </div>

    <div className='bmp_approval_table'>
    <table>
      <thead>
        <tr>
          <th className='common-fonts'>Sno.</th>
          <th className='common-fonts'>Date</th>
          <th className='common-fonts'>Rejected Fields</th>
          <th className='common-fonts'>Approved Fields</th>
          <th className='common-fonts'>Remarks</th>
        </tr>
      </thead>
      <tbody>

      {isLoading ? (
          <tr>
            <td
              colSpan={5}
              style={{ padding: "1.5rem", textAlign: "center" }}
            >
              Loading...
            </td>
          </tr>
        ) : data?.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              No data found
            </td>
          </tr>
        ) : (
          data?.map((item, index) => (
        <tr key={item.id} onClick={() => openModal(item)}>
          <td className='common-fonts'>1</td>
          <td className='common-fonts'>2023-10-05</td>
          <td className='common-fonts'>overview, training & strategy</td>
          <td className='common-fonts'>photos & videos, fee & batches</td>
          <td className='common-fonts'>Lorem ipsum dolor sit amet consectetur. Sit eu quam rhoncus commodo et pellentesque sagittis. Viverra</td>
        </tr>
          ))
        )}
      </tbody>
    </table>

    </div>
    {
      isOpen && (
        <ApprovalModal onClose={closeModal} item={item} />
      )
    }

    </>

  )
}

export default Approval

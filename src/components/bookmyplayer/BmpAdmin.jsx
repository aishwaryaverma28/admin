import React, { useEffect } from 'react';
import axios from 'axios';
import { GETALL_ACADEMY,getDecryptedToken } from '../utils/Constants.js';
import { useState } from 'react';


const BmpAdmin = () => {
  const decryptedToken = getDecryptedToken();
  const [data, setData] = useState([]);

  const getAllAcademy = () => {
    axios.get(GETALL_ACADEMY, {
      headers: {
        Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
      }
    }).then((response) => {
      setData(response?.data?.data);
    }).catch((error)=>{
      console.log(error);
    });
  }

  useEffect(() => {
    getAllAcademy();
  }, []);
  return (
    <div className='bmp_admin_table'>
      <table>
      <thead>

      <tr>
          <th>id</th>
          <th>Academy Name</th>
        </tr>

      </thead>

      <tbody>
      {data.map((data) => (
        <tr key={data?.id}>
          <td>{data?.id}</td>
          <td>{data?.name}</td>
        </tr>
      ))}


      </tbody>
        
      </table>
    </div>
  )
}

export default BmpAdmin
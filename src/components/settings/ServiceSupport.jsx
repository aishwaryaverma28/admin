import React,{useEffect,useState} from 'react';
import '../styles/CPGenral.css';
import axios from "axios";
import {
  getDecryptedToken,
} from "../utils/Constants";

const ServiceSupport = () => {
  const decryptedToken = getDecryptedToken();
  const[ticket,setTicket] = useState([]);
  const getTicket = () => {
    axios
      .get("http://core.leadplaner.com:3001/api/user/ticket/getAll/all", {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setTicket(response?.data?.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTicket();
  }, []);
  console.log(ticket)
  return (
    <div>
      {(ticket.length===0) ? <p>No ticket found</p>:
      <>
      <p className='common-fonts ss-heading'>Service request</p>      
    <div className="service-support-table">
      <table>
        <thead>
          <tr>
            <th className="common-fonts">s no</th>
            <th className="common-fonts">Title</th>
            <th className="common-fonts">description</th>
            <th className="common-fonts">category</th>
            <th className="common-fonts">priority</th>
            <th className="common-fonts">status</th>
            <th className="common-fonts">assigned to</th>
            <th className="common-fonts">created date</th>
            <th className="common-fonts">update date</th>
          </tr>
        </thead>

        <tbody>
          {ticket.map((item)=> <>
            <tr key={item.id}>
            <td className="common-fonts">{item.id}</td>
            <td className="common-fonts">{item.title.slice(0,10)+"..."}</td>
            <td className="common-fonts">{item.description.slice(0,10)+"..."}</td>
            <td className="common-fonts">{item.category}</td>
            <td className="common-fonts">{item.priority}</td>
            <td className="common-fonts">{item.status}</td>
            <td className="common-fonts">Uday Mishra</td>
            <td className="common-fonts">{item.created_at.split("T")[0]}</td>
            <td className="common-fonts">{item.updated_at.split("T")[0]}</td>
          </tr>
          </>)}
        </tbody>
      </table>
    </div>
    </>
}
    </div>

  )
}

export default ServiceSupport
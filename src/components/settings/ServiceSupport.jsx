import React, { useEffect, useState } from 'react';
import '../styles/CPGenral.css';
import axios from 'axios';
import ContactSupport from './ContactSupport';
import {
  getDecryptedToken,
  SERVICE_SUPPORT
} from '../utils/Constants';
import ServiceRequestTab from './ServiceRequestTab';

const ServiceSupport = () => {
  const decryptedToken = getDecryptedToken();
  const [ticket, setTicket] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // State for selected ticket
  const [isServiceTabOpen, setIsServiceTabOpen] = useState(false);
  const [isContactTabOpen, setIsContactTabOpen] = useState(false);
  const [isEditContact ,  setIsEditContact] = useState(false)

  const getTicket = () => {
    axios
      .get(SERVICE_SUPPORT, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setTicket(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTicket();
  }, []);

  const handleOpenServiceTab = (item) => {
    setSelectedTicket(item); // Set the selected ticket item
    setIsServiceTabOpen(true);
    
  };

  const handleCloseServiceTab = () => {
    setIsServiceTabOpen(false);
  };

  const openContactTab = (item) => {
    setIsEditContact(true);
    setIsContactTabOpen(true);
    setSelectedTicket(item);
  
    
  }

  const serviceRefresh = () => {
    getTicket();
  }

  if(isContactTabOpen){
    return(
      <ContactSupport isEditContact={isEditContact} ticket={selectedTicket}/>
    )
  }
  else{

    return (
      <div>
        {ticket.length === 0 ? (
          <p>No ticket found</p>
        ) : (
          <>
          <div className='service-req-top'>
            <p className="common-fonts ss-heading">Service request</p>
            <button type="button" className="helpBtn genral-refresh-icon label-refresh-icon" title="Refresh" onClick={serviceRefresh}>
              <i class="fa-sharp fa-solid fa-rotate "></i>
              </button>
          </div>
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
                    <th></th>
                  </tr>
                </thead>
  
                <tbody>
                  {ticket.map((item) => (
                    <tr key={item.id} >
                      <td className="common-fonts">{item.id}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)} >{item.title.slice(0, 10) + '...'} </td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)} >{item.description.slice(0, 10) + '...'}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.category}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.priority}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.status}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.assigned_to}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.created_at.split('T')[0]}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.updated_at.split('T')[0]}</td>
                      <td onClick={() => openContactTab(item)}><div><i className="fa-solid fa-pen"></i></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {isServiceTabOpen && <ServiceRequestTab ticket={selectedTicket} onClose={handleCloseServiceTab} />}
      </div>
    );

  }


};

export default ServiceSupport;

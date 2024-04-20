import React, { useEffect, useState } from 'react';
import '../styles/CPGenral.css';
import axios from 'axios';
import {
  getDecryptedToken,
  SERVICE_SUPPORT,GET_SERVICE 
} from '../utils/Constants';
import ServiceRequestTab from '../settings/ServiceRequestTab';
import EditRequest from '../settings/EditRequest';

const Support = () => {
  const orgId = localStorage.getItem('org_id');
  const landingUrl = localStorage.getItem("landingUrl");
  const decryptedToken = getDecryptedToken();
  const [ticket, setTicket] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // State for selected ticket
  const [isServiceTabOpen, setIsServiceTabOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading,setLoading] = useState(true);

  const getTicket = () => {
    axios
      .post(SERVICE_SUPPORT,{org_id: orgId}, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setTicket(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getMyTicket = () => {
    axios
      .get(GET_SERVICE + orgId, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setTicket(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (landingUrl === "/lp/bmp/overview" || landingUrl === '/lp/bmp/admin') {
      getMyTicket();
    } else {
      getTicket();
    }    
  }, []);

  const handleOpenServiceTab = (item) => {
    setSelectedTicket(item); // Set the selected ticket item
    setIsServiceTabOpen(true);
    
  };

  const handleCloseServiceTab = () => {
    setIsServiceTabOpen(false);
  };

  const openContactTab = (item) => {
    setSelectedTicket(item);
    setIsEditOpen(true);
  }
  const serviceRefresh = () => {
    getTicket();
  }

  const handleEditClose = () => {
    setIsEditOpen(false);
  }

    return (
      <div>
        {isLoading ? (
           <div className='support-no-ticket-found'>
           <p className='common-fonts'>Loading...</p>
           </div>
        ) :
        ticket.length === 0 ? (
           <div className='support-no-ticket-found'>
          <p className='common-fonts'>No ticket found</p>
          </div>
        ) : (
          <>
          <div className='service-req-top'>
            <p className="common-fonts ss-heading ticket-head-left">Tickets</p>
            <button type="button" className="helpBtn genral-refresh-icon label-refresh-icon" title="Refresh" onClick={serviceRefresh}>
              <i class="fa-sharp fa-solid fa-rotate "></i>
              </button>
          </div>
            <div className="service-support-table ticket-table">
              <table>
                <thead>
                  <tr>
                    <th className="common-fonts">S No</th>
                    <th className="common-fonts">Title</th>
                    <th className="common-fonts">Description</th>
                    <th className="common-fonts">Category</th>
                    <th className="common-fonts">Priority</th>
                    <th className="common-fonts">Status</th>
                    <th className="common-fonts">Created Date</th>
                    <th className="common-fonts">Update Date</th>
                    <th></th>
                  </tr>
                </thead>
  
                <tbody>
                  {ticket.map((item) => (
                    <tr key={item.id} >
                      <td className="common-fonts">{item.id}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)} >{item.title} </td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)} ><div className="leads_desc">{item.description}</div></td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.category}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.priority}</td>
                      <td className="common-fonts" onClick={() => handleOpenServiceTab(item)}>{item.status}</td>
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

        {
          isEditOpen && <EditRequest onClose={handleEditClose} ticket={selectedTicket}/>
        }
      </div>
    );

  }




export default Support;

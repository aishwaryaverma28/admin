import React, { useEffect, useState } from 'react';
import '../styles/CPGenral.css';
import axios from 'axios';
import {
  ACADEMY_TICKETS,
  getDecryptedToken,
} from '../utils/Constants';
import SupportRequest from "./SupportRequest";

const Support = () => {
  const decryptedToken = getDecryptedToken();
  const [ticket, setTicket] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [pageGroup, setPageGroup] = useState(1);
  const pagesPerGroup = 3;

  const getTicket = (page) => {
    const body = {
      sort: "t.id desc",
      page: page,
      limit: limit,
      cond: "t.title = 'contact support'",
    }
    axios
      .post(ACADEMY_TICKETS, body, {
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
    getTicket(page);
  }, [page]);

  const totalPages = 100;

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
      if (page % pagesPerGroup === 0) {
        setPageGroup((prevGroup) => prevGroup + 1);
      }
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      if ((page - 1) % pagesPerGroup === 0) {
        setPageGroup((prevGroup) => prevGroup - 1);
      }
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page_number ${i === page ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  const openContactTab = (item) => {
    setSelectedTicket(item);
    setIsEditOpen(true);
  }
  const serviceRefresh = () => {
    getTicket(page);
  }

  const handleEditClose = () => {
    setIsEditOpen(false);
  }

  return (
    <div>
      <>
        <div className='service-req-top'>
          <p className="common-fonts ss-heading ticket-head-left">Support</p>
          <div className="select action-select">
          </div>
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
                <th className="common-fonts">Status</th>
                <th className="common-fonts">Created Date</th>
              </tr>
            </thead>
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
                <tbody>
                  {ticket.map((item) => (
                    <tr key={item.id} onClick={() => openContactTab(item)}>
                      <td className="common-fonts">{item.id}</td>
                      <td className="common-fonts" >{item.title} </td>
                      <td className="common-fonts" ><div className="leads_desc">{item.description}</div></td>
                      <td className="common-fonts">{item.category}</td>
                      <td className="common-fonts">{item.status}</td>
                      <td className="common-fonts">{item.created_at.split('T')[0]}</td>
                    </tr>
                  ))}
                </tbody>
              )}
          </table>
          <div className="table_pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              &lt;
            </button>
            {renderPageNumbers()}
            <button onClick={handleNextPage} disabled={page === totalPages}>
              &gt;
            </button>
          </div>
        </div>
      </>
      {
        isEditOpen && <SupportRequest onClose={handleEditClose} ticket={selectedTicket} getTicket={getTicket} page={page}/>
      }
    </div>
  );

}




export default Support;

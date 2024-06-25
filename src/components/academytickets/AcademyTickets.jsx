import React, { useEffect, useState } from 'react';
import '../styles/CPGenral.css';
import axios from 'axios';
import {
  ACADEMY_TICKETS,
  getDecryptedToken,
} from '../utils/Constants';
import EditRequest from './EditRequest';

const AcademyTickets = () => {
  const decryptedToken = getDecryptedToken();
  const [ticket, setTicket] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isServiceTabOpen, setIsServiceTabOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('status=0');
  const [page, setPage] = useState(1);
  const limit = 10;
  const [pageGroup, setPageGroup] = useState(1);
  const pagesPerGroup = 3;

  const getTicket = (page, limit) => {
    const body = {
      sort: "id desc",
      page: page,
      limit: limit,
      cond: selectedOption
    }
    axios
      .post(ACADEMY_TICKETS, body, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data?.data)
        setTicket(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const formatDate = (isoDate) => {
    const options = {
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };
  useEffect(() => {
    getTicket(page, limit);
  }, [page, selectedOption]);

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

  const resetData = () => {
    getTicket(page, limit);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const openContactTab = (item) => {
    setSelectedTicket(item);
    setIsEditOpen(true);
  }
  const handleEditClose = () => {
    setIsEditOpen(false);
  }

  return (
    <div>
      <>
        <div className='service-req-top'>
          <p className="common-fonts ss-heading ticket-head-left">Tickets</p>
          <div className="select action-select">
            <select value={selectedOption} onChange={handleOptionChange} id="sports_lead">
              <option value="status=0">Open</option>
              <option value="status=1">Answered</option>
              <option value="status=2">Closed</option>
            </select>
          </div>
          <button type="button" className="helpBtn genral-refresh-icon label-refresh-icon" title="Refresh" onClick={resetData}>
            <i class="fa-sharp fa-solid fa-rotate "></i>
          </button>
        </div>
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
            <div className="marketing-all-table ticket_tbl">
              <table>
                <thead>
                  <tr>
                    <th className="common-fonts">Id</th>
                    <th className="common-fonts">Title</th>
                    <th className="common-fonts">Mobile</th>
                    <th className="common-fonts">Email</th>
                    <th className="common-fonts">Description</th>
                    <th className="common-fonts">Category</th>
                    <th className="common-fonts">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ticket?.map((item) => (
                    <tr key={item.id} onClick={() => openContactTab(item)}>
                      <td className="common-fonts">{item?.id}</td>
                      <td className="common-fonts">{item?.title}</td>
                      <td className="common-fonts">{item?.phone}</td>
                      <td className="common-fonts">{item?.email}</td>
                      <td className="common-fonts"><div className="ticket_des">{item?.description}</div></td>
                      <td className="common-fonts url_available">{item?.category}</td>
                      <td className="common-fonts">
                        {formatDate(item?.created_at)}
                      </td>
                    </tr>
                  ))} 
                </tbody>
              </table>
            </div>
          )}
        <div className="table_pagination">
          <button onClick={handlePreviousPage} disabled={page === 1}>
            &lt;
          </button>
          {renderPageNumbers()}
          <button onClick={handleNextPage} disabled={page === totalPages}>
            &gt;
          </button>
        </div>
      </>
      {
        isEditOpen && <EditRequest onClose={handleEditClose} rowData={selectedTicket} />
      }
    </div>
  );

}




export default AcademyTickets;

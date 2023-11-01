import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {
  GET_ACC_LEAD, getDecryptedToken,
} from "../utils/Constants";
import star from "../../assets/image/star.svg"


const BMPLeads = () => {
  const decryptedToken = getDecryptedToken();
  const academyId = parseInt(localStorage.getItem("academy_id"));
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (isoDate) => {
    const options = { year: '2-digit', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', options);
  };

  const reviewData = () => {
    axios.get(GET_ACC_LEAD +academyId+"/academy", {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    })
      .then((response) => {
        console.log(response?.data?.data)
        if (response?.data?.status === 1) {
          setReview(response?.data?.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false);
      })
  }
  useEffect(() => {
    reviewData();
  }, [])

  return (
    <div className='marketing-all-table'>
    <table>
      <thead>
        <tr>
          <th className='common-fonts'>S No</th>
          <th className='common-fonts'>DATE</th>
          <th className='common-fonts'>NAME</th>
          <th className='common-fonts'>PHONE</th>
          <th className='common-fonts'>DESCRIPTION</th>
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
        ) : review.length === 0 ? (
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              No data found
            </td>
          </tr>
        ) : (
          review.map((item, index) => (
            <tr key={item.id} >
              <td className='common-fonts'>{index + 1}</td>
              <td className='common-fonts'>{formatDate(item.creation_date)}</td>
              <td className='common-fonts'>{item.name}</td>
              <td className='common-fonts'>{item.phone}</td>
              <td className='common-fonts'> {item.comment.length > 50 ? (
                    <>{item.comment.slice(0, 50)}...</>
                  ) : (
                    <>{item.comment}</>
                  )}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
  )
}

export default BMPLeads

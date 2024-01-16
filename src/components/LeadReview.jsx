import React, {useState} from 'react'
import LeadReviewModal from './LeadReviewModal';

const LeadReview = ({leads}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const handleModalOpen = (msg) => {
    setMessage(msg);
    setIsDeleteModalOpen(true);
  }
  
   return (
    <div className='marketing-all-table'>
    <table>
        <caption>LEADS DATA</caption>
      <thead>
        <tr>
          <th className='common-fonts'>S No</th>
          <th className='common-fonts'>NAME</th>
          <th className='common-fonts'>PHONE</th>
          <th className='common-fonts'>EMAIL</th>
          <th className='common-fonts'>MESSAGE</th>
        </tr>
      </thead>
      <tbody>
        {
          leads?.map((item, index) => (
            <tr key={item?.id} onClick={() => handleModalOpen(item.message)}>
              <td className='common-fonts'>{index + 1}</td>
              <td className='common-fonts'>{item?.name}</td>
              <td className='common-fonts'>{item?.phone}</td>
              <td className='common-fonts'>{item?.email}</td>
              <td className='common-fonts'> {item?.message?.length > 50 ? (
                    <>{item?.message?.slice(0, 50)}...</>
                  ) : (
                    <>{item?.message}</>
                  )}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
    {isDeleteModalOpen && (
        <LeadReviewModal
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          message={message}
        />
      )}

    </div>
  )
}

export default LeadReview
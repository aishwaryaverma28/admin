import React from 'react'

const LeadReview = ({leads}) => {
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
            <tr key={item?.id}>
              <td className='common-fonts'>{index + 1}</td>
              <td className='common-fonts'>{item?.name}</td>
              <td className='common-fonts'>{item?.phone}</td>
              <td className='common-fonts'>{item?.email}</td>
              <td className='common-fonts'> {item?.message?.length > 50 ? (
                    <>{item?.description?.slice(0, 50)}...</>
                  ) : (
                    <>{item?.description}</>
                  )}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </div>
  )
}

export default LeadReview
import React from 'react'

const AllCampaignTable = () => {

    
  return (
    <div>
     <div className='marketing-all-table'>
        <table>
            <thead>
                <tr>
                    <th className='common-fonts'>S No</th>
                    <th className='common-fonts'>Campaign Name</th>
                    <th className='common-fonts'>Sent On</th>
                    <th className='common-fonts'>Delivered To</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='common-fonts'>1</td>
                    <td className='common-fonts'>Sales Campaign</td>
                    <td className='common-fonts'>Oct 11 , 2023 at 6:00 PM</td>
                    <td className='common-fonts'>30</td>
                </tr>
            </tbody>
        </table>
     </div>
    </div>
  )
}

export default AllCampaignTable

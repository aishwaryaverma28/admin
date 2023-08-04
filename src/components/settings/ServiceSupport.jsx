import React from 'react';
import '../styles/CPGenral.css';

const ServiceSupport = () => {
  return (
    <div>
      <p className='common-fonts ss-heading'>Service request</p>

      
    <div className="service-support-table">
      <table>
        <thead>
          <tr>
            <th className="common-fonts">s no</th>
            <th className="common-fonts">contact</th>
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
          <tr>
            <td className="common-fonts">inc0027899</td>
            <td className="common-fonts">Anant Singh Cha...</td>
            <td className="common-fonts">Unable to create deals </td>
            <td className="common-fonts">Technical</td>
            <td className="common-fonts">High</td>
            <td className="common-fonts">Open</td>
            <td className="common-fonts">Uday Mishra</td>
            <td className="common-fonts">August 3, 2023</td>
            <td className="common-fonts">August 2, 2023</td>
          </tr>
          <tr>
            <td className="common-fonts">inc0027899</td>
            <td className="common-fonts">Anant Singh Cha...</td>
            <td className="common-fonts">Unable to create deals </td>
            <td className="common-fonts">Technical</td>
            <td className="common-fonts">High</td>
            <td className="common-fonts">Open</td>
            <td className="common-fonts">Uday Mishra</td>
            <td className="common-fonts">August 3, 2023</td>
            <td className="common-fonts">August 2, 2023</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>

  )
}

export default ServiceSupport
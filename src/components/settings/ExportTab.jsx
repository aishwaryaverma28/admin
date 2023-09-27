import React from 'react';
import '../styles/CPGenral.css';
import { useState } from 'react';


const ExportTab = () => {
  const [activeTab, setActiveTab] = useState('leads');

  function handleTabChange(tabName){
    setActiveTab(tabName)
  }
  return (

 <div>
  <div className="cp-billings-tabs">
    <button  
    className={`common-fonts ${activeTab === "leads" ? "cp-active" : ""
  }` }  onClick={() => handleTabChange('leads')}
    >Leads</button>


    <button className={`common-fonts ${activeTab === "deals" ? "cp-active" : ""
  }` }  onClick={() => handleTabChange('deals')}
    >Deals</button>



    <button className={`common-fonts ${activeTab === "contacts" ? "cp-active" : ""
  }` }  onClick={() => handleTabChange('contacts')}
    >Contact</button>
  </div>


  {activeTab === "leads" && 
  <div>
    <div className='import-tab-btn'> 
      <button className='common-save-button common-fonts'>Export</button>
    </div>

    <div className='import-tab-table'>
    <table>
      <thead>
        <tr>
          <th className='common-fonts'>S NO</th>
          <th className='common-fonts'>DATE</th>
          <th className='common-fonts'>FILE NAME</th>
          <th className='common-fonts'>TOTAL COUNT</th>
          <th className='common-fonts'>SUCCESS</th>
          <th className='common-fonts'>FAILED</th>
          <th className='common-fonts'>USER</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='common-fonts'>1</td>
          <td className='common-fonts'>Sep 6, 2023</td>
          <td className='common-fonts'>Import Leads file</td>
          <td className='common-fonts'>100</td>
          <td className='common-fonts'>85</td>
          <td className='common-fonts'>15</td>
          <td className='common-fonts'>Anant Singh</td>
        </tr>
      </tbody>
    </table>

    </div>
  </div>
  
         }
  {activeTab === "deals" && (
    <div>
    <div className='import-tab-btn'>
      <button className='common-save-button common-fonts'>Export</button>
    </div>

    <div className='import-tab-table'>
    <table>
      <thead>
        <tr>
          <th className='common-fonts'>S NO</th>
          <th className='common-fonts'>DATE</th>
          <th className='common-fonts'>FILE NAME</th>
          <th className='common-fonts'>TOTAL COUNT</th>
          <th className='common-fonts'>SUCCESS</th>
          <th className='common-fonts'>FAILED</th>
          <th className='common-fonts'>USER</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='common-fonts'>1</td>
          <td className='common-fonts'>Sep 6, 2023</td>
          <td className='common-fonts'>Import Leads file</td>
          <td className='common-fonts'>100</td>
          <td className='common-fonts'>85</td>
          <td className='common-fonts'>15</td>
          <td className='common-fonts'>Anant Singh</td>
        </tr>
      </tbody>
    </table>

    </div>
  </div>
          )
         }
  {activeTab === "contacts" && (
    <div>
    <div className='import-tab-btn'>
      <button className='common-save-button common-fonts'>Export</button>
    </div>

    <div className='import-tab-table'>
    <table>
      <thead>
        <tr>
          <th className='common-fonts'>S NO</th>
          <th className='common-fonts'>DATE</th>
          <th className='common-fonts'>FILE NAME</th>
          <th className='common-fonts'>TOTAL COUNT</th>
          <th className='common-fonts'>SUCCESS</th>
          <th className='common-fonts'>FAILED</th>
          <th className='common-fonts'>USER</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='common-fonts'>1</td>
          <td className='common-fonts'>Sep 6, 2023</td>
          <td className='common-fonts'>Import Leads file</td>
          <td className='common-fonts'>100</td>
          <td className='common-fonts'>85</td>
          <td className='common-fonts'>15</td>
          <td className='common-fonts'>Anant Singh</td>
        </tr>
      </tbody>
    </table>

    </div>
  </div>
          )
         }
 </div>
  )
}

export default ExportTab
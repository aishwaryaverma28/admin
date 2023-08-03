import React, { useRef, useState } from 'react';
import '../styles/CompanyProducts.css';


const CPProducts = () => {
    const actionDropDownRef = useRef(null);
    const [actionopen, setActionOpen] = useState(false);

    const toggleActionDropdownStatic = () => {
        setActionOpen(!actionopen);
      };
    
  return (
    <section>
        <div className='cp-top'>
            <button className='common-save-button'>Add Product</button>
        </div>

        <div className='cp-table'>
            <table>
                <thead>
                    <tr >
                        <th>
                        <label className="cp-checkbox">
                            <input type="checkbox" className="cb1" />
                            <span className="checkmark"></span>
                          </label>
                        </th>
                        <th className='common-fonts'>name</th>
                        <th className='common-fonts'>product code</th>
                        <th className='common-fonts'>unit price</th>
                        <th className='common-fonts'>create date</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><label className="cp-checkbox">
                            <input type="checkbox" className="cb1" />
                            <span className="checkmark"></span>
                          </label>
                        </td>
                        <td>
                            <div className='cp-action'>
                            <p className='common-fonts'>Lorem ipsum</p>
                            <div className="select action-select">
                                <div className="dropdown-container" ref={actionDropDownRef}>
                                  <div className="dropdown-header2" onClick={toggleActionDropdownStatic}>
                                    Actions <i
                                      className={`fa-sharp fa-solid ${actionopen ? "fa-angle-up" : "fa-angle-down"
                                        }`}
                                    ></i>
                                  </div>
                                  {actionopen && (
                                    <ul className="dropdown-menu user-team-dropdown-position">
                                      <li>
                                        Edit
                                      </li>
                                      <li>
                                        Clone
                                      </li>
                                      <li>
                                        Delete
                                      </li>
                                    </ul>
                                  )}
                                </div>
                              </div>
                            </div>
                           
                        </td>
                        <td className='common-fonts cp-code'>a001</td>
                        <td className='common-fonts'>$852</td>
                        <td className='common-fonts'>A day ago</td>
                    </tr>
                </tbody>
            </table>

        </div>

    </section>
  )
}

export default CPProducts
import React from 'react';
import '../styles/CPGenral.css';
import GreaterArrowDown from '../../assets/image/greater-arrow-down.svg';

const LabelsTab = () => {
  return (
    <section>
        <div className='label-tab-top'>
            <div className='label-tab-leads'>
            <img src={GreaterArrowDown} alt="" />
            
             <p className='common-fonts'>leads</p>

            </div>

            <div>
                <button className='common-save-button'>Add new button</button>
            </div>

        </div>

        <div className='leads-tab-table'>
            <table>
                <thead>
                    <tr>
                        <th>
                        <label className="cp-checkbox lead-checkbox">
                            <input type="checkbox" className="cb1" />
                            <span className="checkmark"></span>
                          </label>
                        </th>
                        <th className='common-fonts'></th>
                        <th className='common-fonts'></th>
                        <th className='common-fonts'></th>
                        <th className='common-fonts'></th>
                        <th className='common-fonts'></th>
                        <th className='common-fonts'></th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='common-fonts'></td>
                        <td className='common-fonts'></td>
                        <td className='common-fonts'></td>
                        <td className='common-fonts'></td>
                        <td className='common-fonts'></td>
                        <td className='common-fonts'></td>
                        <td className='common-fonts'></td>
                    </tr>
                </tbody>
            </table>

        </div>
    </section>
  )
}

export default LabelsTab
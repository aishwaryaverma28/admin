import React, { useState } from 'react';
import '../styles/CPGenral.css';
import GreaterArrowDown from '../../assets/image/greater-arrow-down.svg';
import LabelModal from './LabelModal';

const LabelsTab = () => {
const [openLeadModal, setOpenLeadModal] = useState(false);

const handleLabelSave = () => {

}

const handleOpenLabel = () => {
    setOpenLeadModal(true);
}

const handleCloseLabel = () => {
    setOpenLeadModal(false);
}
    return (
        <section>
            <div className='label-tab-top'>
                <div className='label-tab-leads'>
                    <img src={GreaterArrowDown} alt="" />

                    <p className='common-fonts'>leads</p>

                </div>

                <div>
                    <button className='common-save-button' onClick={handleOpenLabel}>Add new button</button>
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
                            <th className='common-fonts'>LABEL NAME</th>
                            <th className='common-fonts'>COLOR</th>
                            <th className='common-fonts'>NOTES</th>
                            <th className='common-fonts'>LEADS</th>
                            <th className='common-fonts'>DEALS</th>
                            <th className='common-fonts'>CONTACTS</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='common-fonts'><label className="cp-checkbox lead-checkbox">
                                <input type="checkbox" className="cb1" />
                                <span className="checkmark"></span>
                            </label></td>
                            <td className='common-fonts'>Hot</td>
                            <td className='common-fonts'id='leads-red'><div className='leads-tab-red'></div></td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>

                        </tr>
                        <tr>
                            <td className='common-fonts'><label className="cp-checkbox lead-checkbox">
                                <input type="checkbox" className="cb1" />
                                <span className="checkmark"></span>
                            </label></td>
                            <td className='common-fonts'>cold</td>
                            <td className='common-fonts'><div className='leads-tab-blue'></div></td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>

                        </tr>
                        <tr>
                            <td className='common-fonts'><label className="cp-checkbox lead-checkbox">
                                <input type="checkbox" className="cb1" />
                                <span className="checkmark"></span>
                            </label></td>
                            <td className='common-fonts'>warm</td>
                            <td className='common-fonts'><div className='leads-tab-yellow'></div></td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>
                            <td className='common-fonts'>
                                <div className='leads-table-td'>
                                <label className="cp-checkbox lead-checkbox">
                                    <input type="checkbox" className="cb1" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            </td>

                        </tr>
                    </tbody>
                </table>

            </div>
            {
                openLeadModal && (
                    <LabelModal onClose={handleCloseLabel} onSave={handleLabelSave}/>
                )
            }

        </section>

    )
}

export default LabelsTab
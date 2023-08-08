import React, { useState, useEffect } from 'react';
import '../styles/CPGenral.css';
import GreaterArrowDown from '../../assets/image/greater-arrow-down.svg';
import LabelModal from './LabelModal';
import { getDecryptedToken, GET_LABEL, handleLogout } from "../utils/Constants";
import axios from "axios";

const LabelsTab = () => {
    const [openLeadModal, setOpenLeadModal] = useState(false);
    const [labelData, setLabelData] = useState([]);
    const decryptedToken = getDecryptedToken();
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state


    useEffect(() => {
        fetchData();
    }, [decryptedToken]);

    const fetchData = async () => {
        try {
            const response = await axios.get(GET_LABEL, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
                },
            });
            if (response.data.status === 1) {
                setLabelData(response.data.data);
            } else {
                if (response.data.message === "Token has expired") {
                    alert(response.data.message);
                    handleLogout();
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

  
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

            {
                labelData.length === 0 ? (
                    <div className='no-label-found common-fonts'>
                        <p >No Labels Found</p>
                    </div>
                ) :
                    (
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
                                    {
                                        labelData.map(data=>{
                                            return(
                                                <tr key={data.id}>
                                                <td className='common-fonts'><label className="cp-checkbox lead-checkbox">
                                                    <input type="checkbox" className="cb1" />
                                                    <span className="checkmark"></span>
                                                </label></td>
                                                <td className='common-fonts'>{data.name}</td>
                                                <td className='common-fonts'><div className={'leads-tab-color'} style={{ backgroundColor: data.colour_code }} ></div></td>
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

                                            )
                                        })
                                    }


                                </tbody>
                            </table>

                        </div>
                    )
            }


            {
                openLeadModal && (
                    <LabelModal onClose={handleCloseLabel} fetchColor = {fetchData} />
                )
            }

        </section>

    )
}

export default LabelsTab
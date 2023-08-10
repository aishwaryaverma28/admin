import React, { useState, useEffect } from 'react';
import '../styles/CPGenral.css';
import GreaterArrowDown from '../../assets/image/greater-arrow-down.svg';
import LabelModal from './LabelModal';
import { getDecryptedToken, GET_LABEL, handleLogout, UPDATE_LABEL } from "../utils/Constants";
import axios from "axios";

const LabelsTab = () => {
    const [openLeadModal, setOpenLeadModal] = useState(false);
    const [labelData, setLabelData] = useState([]);
    const decryptedToken = getDecryptedToken();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [selectedDeals, setSelectedDeals] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [initialData, setInitialData] = useState([]);
    


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(GET_LABEL, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
                },
            });
            if (response.data.status === 1) {
                setLabelData(response.data.data);
                setInitialData(response.data.data);
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

    console.log(labelData)
    console.log("opq")

    const handleOpenLabel = () => {
        setOpenLeadModal(true);
    }

    const handleCloseLabel = () => {
        setOpenLeadModal(false);
    }

    const handleUpdateLabel = () => {
        const updatedLabelData = labelData.map(data => {
            const entityParts = [
                selectedNotes.includes(data?.id) ? 'notes' : null,
                selectedLeads.includes(data?.id) ? 'leads' : null,
                selectedDeals.includes(data?.id) ? 'deals' : null,
                selectedContacts.includes(data?.id) ? 'contacts' : null,
            ].filter(entity => entity !== null);
        
            const entityValue = entityParts.length > 0 ? entityParts.join(',') : null;
        
            return {
                id: data?.id,
                name: data?.name,
                colour_code: data?.colour_code,
                entity: entityValue,
            };
        });

        const changedEntities = updatedLabelData.filter((updatedObj, index) => {
            const initialObj = initialData[index]; // Corresponding object in initialData array
          
            return updatedObj.entity !== initialObj.entity;
          });

        axios.put(UPDATE_LABEL,{data:changedEntities},{
            headers: {
              Authorization: `Bearer ${decryptedToken}` // Include the JWT token in the Authorization header
            }
          }).then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error)
          });
    }

    const handleNoteCheckboxChange = (noteId) => {
        if (selectedNotes.includes(noteId)) {
            setSelectedNotes(prevNotes => prevNotes.filter(id => id !== noteId));
        } else {
            setSelectedNotes(prevNotes => [...prevNotes, noteId]);
        }
    };
    const handleLeadCheckboxChange = (leadId) => {
        if (selectedLeads.includes(leadId)) {
            setSelectedLeads(prevLeads => prevLeads.filter(id => id !== leadId));
        } else {
            setSelectedLeads(prevLeads => [...prevLeads, leadId]);
        }
    };
    const handleDealCheckboxChange = (dealId) => {
        if (selectedDeals.includes(dealId)) {
            setSelectedDeals(prevDeals => prevDeals.filter(id => id !== dealId));
        } else {
            setSelectedDeals(prevDeals => [...prevDeals, dealId]);
        }
    };
    const handleContactCheckboxChange = (contactId) => {
        if (selectedContacts.includes(contactId)) {
            setSelectedContacts(prevContact => prevContact.filter(id => id !== contactId));
        } else {
            setSelectedContacts(prevContact => [...prevContact, contactId]);
        }
    };
    return (
        <section>
            <div className='label-tab-top'>
                <div className='label-tab-leads'>
                    <img src={GreaterArrowDown} alt="" />

                    <p className='common-fonts'>leads</p>

                </div>

                <div>
                    <button className='common-white-button label-update-btn' onClick={handleUpdateLabel}>Update</button>
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
                                                            <input type="checkbox" className="cb1" onChange={() => handleNoteCheckboxChange(data.id)} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className='common-fonts'>
                                                    <div className='leads-table-td'>
                                                        <label className="cp-checkbox lead-checkbox">
                                                            <input type="checkbox" className="cb1" onChange={() => handleLeadCheckboxChange(data.id)} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className='common-fonts'>
                                                    <div className='leads-table-td'>
                                                        <label className="cp-checkbox lead-checkbox">
                                                            <input type="checkbox" className="cb1" onChange={() => handleDealCheckboxChange(data.id)} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className='common-fonts'>
                                                    <div className='leads-table-td'>
                                                        <label className="cp-checkbox lead-checkbox">
                                                            <input type="checkbox" className="cb1" onChange={() => handleContactCheckboxChange(data.id)} />
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
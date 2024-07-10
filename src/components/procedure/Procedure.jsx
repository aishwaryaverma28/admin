import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { EXECUTE_PROCEDURE, getDecryptedToken } from '../utils/Constants';

const Procedure = () => {
    const decryptedToken = getDecryptedToken();

    const handleSubmit = (procedure, successMessage) => {
        axios.post(EXECUTE_PROCEDURE, { procedure }, {
            headers: { Authorization: `Bearer ${decryptedToken}` },
        })
        .then((response) => {
            if (response.data.status === 1) {
                toast.success(successMessage, {
                    position: 'top-center',
                    autoClose: 2000,
                });
            } else {
                toast.error(response.data.message, {
                    position: 'top-center',
                    autoClose: 2000,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const procedures = [
        { id: 1, title: 'Insert unique coach listings', procedure: 'insert_unique_coach_listings', successMessage: 'Coach Procedure Successful' },
        { id: 2, title: 'Insert Verified Academies Coaches', procedure: 'Insert_Verified_Academies_Coaches', successMessage: 'Academy Procedure Successful' },
        { id: 3, title: 'Insert nearby unique coach listings', procedure: 'insert_nearby_unique_coach_listings', successMessage: 'Coach Listings Procedure Successful' },
    ];

    return (
        <>
            <div className='service-req-top'>
                <p className="common-fonts ss-heading ticket-head-left">Procedure</p>
            </div>
            <div className="marketing-all-table ticket_tbl">
                <table>
                    <thead>
                        <tr>
                            <th className="common-fonts">S.No</th>
                            <th className="common-fonts">Title</th>
                            <th className="common-fonts">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {procedures.map(({ id, title, procedure, successMessage }) => (
                            <tr key={id}>
                                <td className="common-fonts">{id}</td>
                                <td className="common-fonts">{title}</td>
                                <td className="common-fonts">
                                    <button
                                        className="common-save-button permission-save-btn"
                                        onClick={() => handleSubmit(procedure, successMessage)}
                                    >
                                        Execute
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Procedure;

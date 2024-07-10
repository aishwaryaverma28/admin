import React from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import {EXECUTE_PROCEDURE, getDecryptedToken} from "../utils/Constants"
const Procedure = () => {
    const decryptedToken = getDecryptedToken();
    const handleSubmit1 = () => {
        axios.post(EXECUTE_PROCEDURE, {
            procedure: "insert_unique_coach_listings"
        }, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
        .then((response) => {
            if (response.data.status === 1) {
                toast.success("Coach Procedure Successful", {
                    position: "top-center",
                    autoClose: 2000,
                });
            } else {
                toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleSubmit2 = () => {
        axios.post(EXECUTE_PROCEDURE, {
            procedure: "Insert_Verified_Academies_Coaches"
        }, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
        .then((response) => {
            if (response.data.status === 1) {
                toast.success("Academy Procedure Successful", {
                    position: "top-center",
                    autoClose: 2000,
                });
            } else {
                toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <>
            <div className='service-req-top'>
                <p className="common-fonts ss-heading ticket-head-left"> Procedure</p>
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
                        <tr >
                            <td className="common-fonts">1</td>
                            <td className="common-fonts">Insert unique coach listings</td>
                            <td className="common-fonts"><button
                                className="common-save-button permission-save-btn"
                            onClick={handleSubmit1}
                            >
                                Execute
                            </button></td>
                        </tr>
                        <tr >
                            <td className="common-fonts">2</td>
                            <td className="common-fonts">Insert Verified Academies Coaches</td>
                            <td className="common-fonts"><button
                                className="common-save-button permission-save-btn"
                            onClick={handleSubmit2}
                            >
                                Execute
                            </button></td>
                        </tr>
                    </tbody> 
                </table>
            </div>
        </>)
}

export default Procedure
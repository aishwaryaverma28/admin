import React, { useState, useEffect } from 'react'
import { getDecryptedToken, ACADEMY_TICKETS } from "../utils/Constants";
import axios from "axios";
import AddTicket from './AddTicket';
import StaticTickets from './StaticTickets';
const TicketModal = ({ data }) => {
    const decryptedToken = getDecryptedToken();
    const [allTickets, setAllTickets] = useState([])
    const getTickets = () => {
        axios
            .post(ACADEMY_TICKETS, {
                sort: "id desc",
                page: 1,
                limit: 10,
                cond: `t.user_id = ${data}`
            }, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                setAllTickets(response?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getTickets()
    }, [])

    return (
        <>
            <AddTicket data={data} />
            <br />
            <StaticTickets data={data} tickets={allTickets} />
        </>
    )
}

export default TicketModal
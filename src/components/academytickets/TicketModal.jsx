import React, { useState,useEffect } from 'react'
import { config, getDecryptedToken,GET_USER_TICKETS } from "../utils/Constants";
import AWS from 'aws-sdk';
import axios from "axios";
import { toast } from "react-toastify";
import AddTicket from './AddTicket';
import StaticTickets from './StaticTickets';
const TicketModal = ({ data }) => {
    console.log(data);
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const decryptedToken = getDecryptedToken();
        const getTickets = () => {
        axios
            .post(GET_USER_TICKETS + data,{
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
                console.log(response?.data?.data)
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
        <AddTicket data={data}/>
        <br/>
        <StaticTickets/>
        </>
    )
}

export default TicketModal
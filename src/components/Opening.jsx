import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { BMP_USER } from './utils/Constants';
import loader from "../assets/image/loader.gif"
import CryptoJS from "crypto-js";
const secretKey = "mySecretKey123";
const Opening = () => {
    const { source, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    async function getBMPUser() {
        let body = {};
        body = {
            userId: id,
        };
        try {
            const response = await axios.post(BMP_USER, body);
            const data = response?.data?.user;
            console.log(response);
            if (response.data.status === 1) {
                localStorage.setItem("org_id", data?.org_id);
                let role = data?.type?.toLowerCase()
                localStorage.setItem("role_name", data?.type?.toLowerCase());
                localStorage.setItem("academy_id", data?.parent_id);
                localStorage.setItem("id", id);
                if (role === "academy") {
                    const permissions = "/lp/bmp,/lp/bmp/overview,/lp/bmp/fees,/lp/bmp/training,/lp/bmp/gallery,/lp/bmp/reviews,/lp/bmp/leads,/lp/bmp/support,/lp/bmp/help"
                    const userPath = permissions.split(",");
                    const userPathTot = userPath.join(",");
                    const encryptedUserPathTot = CryptoJS.AES.encrypt(
                        userPathTot,
                        secretKey
                    ).toString();
                    localStorage.setItem("encryptedUserPathTot", encryptedUserPathTot);
                    localStorage.setItem("landingUrl", "/lp/bmp/overview");
                    navigate("/lp/bmp/overview");
                }
                else if (role === "player") {
                    const permissions = "/lp/bmp,/lp/bmp/overview,/lp/bmp/fees,/lp/bmp/training,/lp/bmp/gallery,/lp/bmp/reviews,/lp/bmp/leads,/lp/bmp/support,/lp/bmp/help"
                    const userPath = permissions.split(",");
                    const userPathTot = userPath.join(",");
                    const encryptedUserPathTot = CryptoJS.AES.encrypt(
                        userPathTot,
                        secretKey
                    ).toString();
                    localStorage.setItem("encryptedUserPathTot", encryptedUserPathTot);
                    localStorage.setItem("landingUrl", "/lp/bmp/overview");
                    navigate("/lp/bmp/overview");
                }
                else if (role === "academy_admin") {
                    const permissions = "/lp/bmp,/lp/bmp/admin,/lp/bmp/overview,/lp/bmp/fees,/lp/bmp/training,/lp/bmp/gallery,/lp/bmp/reviews,/lp/bmp/leads,/lp/bmp/support,/lp/bmp/help"
                    const userPath = permissions.split(",");
                    const userPathTot = userPath.join(",");
                    const encryptedUserPathTot = CryptoJS.AES.encrypt(
                        userPathTot,
                        secretKey
                    ).toString();
                    localStorage.setItem("encryptedUserPathTot", encryptedUserPathTot);
                    localStorage.setItem("landingUrl", "/lp/bmp/admin");
                    navigate("/lp/bmp/admin");
                }
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBMPUser();
    }, []);

    return (
        <>
            {isLoading ? (<img src={loader} alt="loading" />) : (<h2> loading </h2>)}
        </>
    )
}

export default Opening
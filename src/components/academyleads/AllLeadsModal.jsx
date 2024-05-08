import React, { useState, useEffect } from 'react'
import {
    GET_ACADEMY,
    getDecryptedToken
} from "./../utils/Constants";
import axios from 'axios';

const AllLeadsModal = ({ closeModal, object, sport }) => {
    const decryptedToken = getDecryptedToken();
    const [editedItem, setEditedItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [distAcad, setDistAcad] = useState([]);

    const fetchLead = () => {
        let body = {
            lat: parseInt(object?.academy_lat),
            lng: parseInt(object?.academy_lng),
            count: parseInt(object?.cnt),
            sport: sport,
            distance: 100,
        };

        axios
            .post("https://bmp.leadplaner.com/api/api/bmp/academy/getnearby", body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                console.log(response?.data?.data)
                setDistAcad(response?.data?.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };
    const academyDist = () => {
        let body = {
            academy_id: object?.academy_id
        };
        axios
            .post(GET_ACADEMY, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                console.log(response?.data?.data)
                setEditedItem(response?.data?.data[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        fetchLead();
        academyDist()
    }, []);
    return (
        <div className="modal">
            <div className="leftClose" onClick={closeModal}></div>
            <div className="customization_popup_container">
                <span className="close" onClick={closeModal}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </span>
                <div className="user-details--right">
                    <div className="tab-navigation">

                    </div>
                    <div className="tab-content margin-left">
                        <>
                            <div className="academy-card">
                                <div className="card-container">
                                    <div className="card-leftBox">
                                        <div className="user-details">
                                            <p className="heading">
                                                {editedItem?.id} - {editedItem?.name}
                                            </p>
                                        </div>
                                        <div className="lead-value">
                                        </div>
                                        <div className="contact-details">
                                            <div className="mail sportCap">
                                                <p>{editedItem?.sport}</p>
                                            </div>
                                            <div className="mail">
                                                <p>{editedItem?.phone}</p>
                                            </div>
                                            <div className="mail sportCap">
                                                <p>{editedItem?.city}, {editedItem?.state}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="DealCard-rightBox">
                                        <div className="mail">
                                            <div className="new_preview_flex">
                                                <a href={editedItem?.logo === null
                                                    ? `https://bmpcdn.s3.ap-south-1.amazonaws.com/default/academy_default_logo.webp`
                                                    : `https://bmpcdn.s3.ap-south-1.amazonaws.com/academy/${editedItem?.id}/${editedItem?.logo}`} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                        src={editedItem?.logo === null
                                                            ? `https://bmpcdn.s3.ap-south-1.amazonaws.com/default/academy_default_logo.webp`
                                                            : `https://bmpcdn.s3.ap-south-1.amazonaws.com/academy/${editedItem?.id}/${editedItem?.logo}`}
                                                        alt="pofile"
                                                        className="bmp-preview-image"
                                                    />
                                                </a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            
                        </>
                        {isLoading ? (
                            <div className='support-no-ticket-found'>
                                <p className='common-fonts'>Loading...</p>
                            </div>
                        ) : (<>
                            {distAcad && distAcad?.map((item) => (

                                <div className="academy-card">
                                    <div className="card-container">
                                        <div className="card-leftBox">
                                            <div className="user-details">
                                                <p className="heading">
                                                    {item?.id} - {item?.name}
                                                </p>
                                            </div>
                                            <div className="contact-details">
                                                <div className="mail sportCap">
                                                    <p>{item?.sport}</p>
                                                </div>
                                                <div className="mail">
                                                    <p>{item?.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="DealCard-rightBox">
                                        {(item.email_verified === 1 || item.mobile_verified === 1) && (
                  <div className="greenVerified"></div>
                )}
                                            <div className="mail">
                                            <label className="radio-inline">
                          <input
                            type="checkbox"
                            name=""
                            value="1"
                            className="radio_disable check_input"
                            // onChange={handleCheckboxChange}
                            // checked={trainingLocation.includes("1")}
                          />
                        </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            ))}
                        </>)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllLeadsModal
import React, { useState, useEffect } from 'react'
import {
    GET_ACADEMY,
    getDecryptedToken
} from "./../utils/Constants";
import axios from 'axios';
import tick from "../../assets/image/star_tick.svg"
import cross from "../../assets/image/unverified.svg"
const AllLeadsModal = ({ closeModal, object, sport }) => {
    const decryptedToken = getDecryptedToken();
    const [editedItem, setEditedItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [distAcad, setDistAcad] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedDistance, setSelectedDistance] = useState(100);

    const fetchLead = (distance) => {
        let body = {
            lat: parseInt(object?.academy_lat),
            lng: parseInt(object?.academy_lng),
            count: parseInt(object?.cnt),
            sport: sport,
            distance: distance,
        };

        axios
            .post("https://bmp.leadplaner.com/api/api/bmp/academy/getnearby", body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
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
                setEditedItem(response?.data?.data[0]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        fetchLead(selectedDistance);
        academyDist();
    }, [selectedDistance]);

    const handleDistanceChange = (event) => {
        setSelectedDistance(parseInt(event.target.value));
    };

    const handleCheckboxChange = (event, id) => {
        const isChecked = event.target.checked;
        setSelectedIds(prevIds => {
            if (isChecked) {
                return [...prevIds, id];
            } else {
                return prevIds.filter(selectedId => selectedId !== id);
            }
        });
    };
    console.log(selectedIds);
    return (
        <div className="modal">
            <div className="leftClose" onClick={closeModal}></div>
            <div className="customization_popup_container">
                <span className="close" onClick={closeModal}>
                    <i className="fa-sharp fa-solid fa-xmark"></i>
                </span>
                <div className="user-details--right">
                    {/* <div className="tab-navigation">

                    </div> */}
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
                                            <div className="mail">
                                                {item.mobile_verified === 1 ?
                                                    <img src={tick} alt="verified" /> : <img src={cross} alt="unverified" />
                                                }
                                            </div>
                                            <div className="mail">
                                                <label className="radio-inline2">
                                                    <input
                                                        type="checkbox"
                                                        className="radio_disable check_input_2"
                                                        onChange={(event) => handleCheckboxChange(event, item.id)}
                                            checked={selectedIds.includes(item.id)}
                                                    />
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            ))}
                        </>)}
                    </div>
                    <div className="modalLeftBtnBox2">
                    <div className='new_btnflex'>
                            <select id="distance_lead" value={selectedDistance} onChange={handleDistanceChange}>
                                <option value="">Distance</option>
                                <option value="100">100 Km</option>
                                <option value="200">200 km</option>
                                <option value="300">300 Km</option>
                                <option value="400">400 Km</option>
                                <option value="500">500 Km</option></select>
                        </div>
                        <div className='new_btnflex'>
                            <select id="sports_lead">
                                <option value="">Gap</option>
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hour</option>
                                <option value="3">3 Hour</option>
                                <option value="4">4 Hour</option>
                                <option value="5">5 Hour</option></select>
                        </div>
                        <button
                            className="convertToDeal"
                        // onClick={() => handleViewSite(editedItem?.url)}
                        >Assign
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllLeadsModal
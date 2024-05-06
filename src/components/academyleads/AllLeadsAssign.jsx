import React from 'react'

const AllLeadsAssign = () => {
    return (
        <>

            <>
                <div className="academy-card">
                    <div className="card-container">
                        <div className="card-leftBox">
                            <div className="user-details">
                                <p className="heading">
                                    1234 - Dolphin Swimming Pool SAAP Edupugallu
                                </p>
                            </div>
                            <div className="lead-value">
                            </div>
                            <div className="contact-details">
                                <div className="mail sportCap">
                                    <p>Swimming</p>
                                </div>
                                <div className="mail">
                                    <p>000000000000</p>
                                </div>
                                <div className="mail sportCap">
                                    <p>Mumbai, Maharastra</p>
                                </div>
                            </div>
                        </div>
                        <div className="DealCard-rightBox">
                            <div className="mail">
                                <div className="new_preview_flex">
                                    {/* <a href={data?.profile_img === null
                  ? "https://bmpcdn.s3.ap-south-1.amazonaws.com/coach/14/logo1.jpg"
                  : `https://bmpcdn.s3.ap-south-1.amazonaws.com/coach_temp/${data?.id}/${data?.profile_img}`} target="_blank" rel="noopener noreferrer">
                  <img
                    src={data?.profile_img === null
                      ? "https://bmpcdn.s3.ap-south-1.amazonaws.com/coach/14/logo1.jpg"
                      : `https://bmpcdn.s3.ap-south-1.amazonaws.com/coach_temp/${data?.id}/${data?.profile_img}`}
                    alt="pofile"
                    className="bmp-preview-image"
                  />
                </a> */}
                                    <div className='new_btnflex'>
                                        <select id="sports_lead">
                                            <option value="">Gap</option>
                                            <option value="1">1 Hour</option>
                                            <option value="2">2 Hour</option>
                                            <option value="3">3 Hour</option>
                                            <option value="4">4 Hour</option>
                                            <option value="5">5 Hour</option></select>
                                    </div>
                                    <div className='new_btnflex'>
                                        {/* <button type="button" className="common-save-button " onClick={academyNewAssign}>
                    New Coach
                  </button> */}
                                        <button type="button" className="common-save-button ">
                                            Assign
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default AllLeadsAssign
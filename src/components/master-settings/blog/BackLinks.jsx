import React from 'react'

const BackLinks = ({ backlink, handleCategorySelection }) => {
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        handleCategorySelection(selectedValue);
      };

    return (
        <div className="tags">
            <div className="tagContent tag-box">
                <h3>Backlinks</h3>
                <div className="contentBox">
                    <select
                        name="categoryDropdown"
                        onChange={handleChange}
                        className="tagSelectBox">
                        <option value="">Sport</option>
                        {/* {backlink?.map((data) => (
                      <option key={data?.sport} value={data?.sport}>
                        {data?.sport}
                      </option>
                    ))} */}
                    <option value={"football"}>
                        {"football"}
                      </option>
                    </select>                    
                </div>  
                <div>
                    {backlink && backlink.map((data) => (
                        <>
                            <div>{data.keyword}</div>
                            <span>{data.url}</span>
                        </>
                    ))}
                </div>              
            </div>

        </div>
    )
}

export default BackLinks
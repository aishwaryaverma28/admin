import React from "react";

const BackLinks = ({ backlink, handleCategorySelection }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    handleCategorySelection(selectedValue);
  };

  return (
    <div className="tags">
      <div className="tag-box">
        <h3 className="common-fonts">Backlinks</h3>  
        <div className="contentBox">
          <select
            name="categoryDropdown"
            onChange={handleChange}
            className="tagSelectBox"
          >
            <option value="">Sport</option>
            {/* {backlink?.map((data) => (
                      <option key={data?.sport} value={data?.sport}>
                        {data?.sport}
                      </option>
                    ))} */}
            {/* <option value={"football"}>
                        {"football"}
                      </option> */}

            <option value={"archery"}>{"Archery"}</option>
            <option value={"arts"}>{"Arts"}</option>
            <option value={"athletics"}>{"Athletics"}</option>
            <option value={"badminton"}>{"Badminton"}</option>
            <option value={"basketball"}>{"Basketball"}</option>
            <option value={"billiards"}>{"Billiards"}</option>
            <option value={"bodybuilding"}>{"Bodybuilding"}</option>
            <option value={"boxing"}>{"Boxing"}</option>
            <option value={"chess"}>{"Chess"}</option>
            <option value={"cricket"}>{"Cricket"}</option>
            <option value={"fencing"}>{"Fencing"}</option>
            <option value={"football"}>{"Football"}</option>
            <option value={"golf"}>{"Golf"}</option>
            <option value={"hockey"}>{"Hockey"}</option>
            <option value={"kabaddi"}>{"Kabaddi"}</option>
            <option value={"karate"}>{"Karate"}</option>
            <option value={"kho-kho"}>{"Kho-Kho"}</option>
            <option value={"mma"}>{"MMA"}</option>
            <option value={"motorsports"}>{"Motorsports"}</option>
            <option value={"rugby"}>{"Rugby"}</option>
            <option value={"shooting"}>{"Shooting"}</option>
            <option value={"skating"}>{"Skating"}</option>
            <option value={"sports"}>{"Sports"}</option>
            <option value={"squash"}>{"Squash"}</option>
            <option value={"swimming"}>{"Swimming"}</option>
            <option value={"table-tennis"}>{"Table-Tennis"}</option>
            <option value={"taekwondo"}>{"Taekwondo"}</option>
            <option value={"tennis"}>{"Tennis"}</option>
            <option value={"volleyball"}>{"Volleyball"}</option>
            <option value={"wrestling"}>{"Wrestling"}</option>
            <option value={"yoga"}>{"Yoga"}</option>
          </select>
        </div>
        <div className="key_url_box">
          {backlink &&
            backlink.map((data) => (
              <>
                <div className="key_url">
                <div className="data_keyowrd">{data.keyword}</div>
                <span>{data.url}</span>
                </div>

              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BackLinks;

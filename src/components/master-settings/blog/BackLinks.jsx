import React from "react";

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

            <option value={"Archery"}>{"Archery"}</option>
            <option value={"Arts"}>{"Arts"}</option>
            <option value={"Athletics"}>{"Athletics"}</option>
            <option value={"Badminton"}>{"Badminton"}</option>
            <option value={"Basketball"}>{"Basketball"}</option>
            <option value={"Billiards"}>{"Billiards"}</option>
            <option value={"Bodybuilding"}>{"Bodybuilding"}</option>
            <option value={"Boxing"}>{"Boxing"}</option>
            <option value={"Chess"}>{"Chess"}</option>
            <option value={"Cricket"}>{"Cricket"}</option>
            <option value={"Fencing"}>{"Fencing"}</option>
            <option value={"Football"}>{"Football"}</option>
            <option value={"Golf"}>{"Golf"}</option>
            <option value={"Hockey"}>{"Hockey"}</option>
            <option value={"Kabaddi"}>{"Kabaddi"}</option>
            <option value={"Karate"}>{"Karate"}</option>
            <option value={"Kho-Kho"}>{"Kho-Kho"}</option>
            <option value={"MMA"}>{"MMA"}</option>
            <option value={"Motorsports"}>{"Motorsports"}</option>
            <option value={"Rugby"}>{"Rugby"}</option>
            <option value={"Shooting"}>{"Shooting"}</option>
            <option value={"Skating"}>{"Skating"}</option>
            <option value={"Sports"}>{"Sports"}</option>
            <option value={"Squash"}>{"Squash"}</option>
            <option value={"Swimming"}>{"Swimming"}</option>
            <option value={"Table-Tennis"}>{"Table-Tennis"}</option>
            <option value={"Taekwondo"}>{"Taekwondo"}</option>
            <option value={"Tennis"}>{"Tennis"}</option>
            <option value={"Volleyball"}>{"Volleyball"}</option>
            <option value={"Wrestling"}>{"Wrestling"}</option>
            <option value={"Yoga"}>{"Yoga"}</option>
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

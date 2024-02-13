import React from "react";
import Back from "../assets/image/arrow-left.svg";

const ViewLeadsTable = ({ data, onClose }) => {
  const formatDate = (isoDate) => {
    const options = {
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <div className="performance_title">
        <img src={Back} alt="" onClick={onClose} />
        <span>PERFORMANCE DATA</span>
          <span>Total Lead: {data?.length}</span>
      </div>

      <div className="marketing-all-table lead_last_border new_table_1">
        <table>
          <thead>
            <tr>
              <th className="common-fonts">S No</th>
              <th className="common-fonts">DATE</th>
              <th className="common-fonts">NAME</th>
              <th className="common-fonts">OBJ TYPE</th>
              <th className="common-fonts section_count">PHONE</th>
              <th className="common-fonts section_count">TYPE</th>
              <th className="common-fonts section_count">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item?.id}>
                <td className="common-fonts">{index + 1}</td>
                <td className="common-fonts">
                  {formatDate(item?.creation_date)}
                </td>
                <td className="common-fonts">{item?.name}</td>
                <td className="common-fonts">{item?.object_type}</td>
                <td className="common-fonts">{item?.phone}</td>
                <td className="common-fonts">{item?.type}</td>
                <td className="common-fonts">
                  <div className="leads_desc">{item?.description}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewLeadsTable;

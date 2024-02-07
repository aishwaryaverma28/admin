import React from "react";
import Back from "../assets/image/arrow-left.svg"
const BlogPerformance = ({ data , onClose}) => {

  console.log(data);
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
    <div className="performance_table_box">
      <div className="marketing-all-table new_table_1">
        <div className="performance_title">
        <img src={Back} alt=""  onClick={onClose}/>
          <span>PERFORMANCE DATA</span>
          <span>Total Blog: {data?.length}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th className="common-fonts">S No</th>
              <th className="common-fonts">DATE</th>
              <th className="common-fonts">BLOG TITLE</th>
              <th className="common-fonts section_count">VIEW COUNT</th>
              <th className="common-fonts section_count">SECTION COUNT</th>
              <th className="common-fonts">SPORT</th>
              <th className="common-fonts section_count">WORD COUNT</th>
                <th className="common-fonts section_count">CREATED BY</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item?.id}>
                <td className="common-fonts">{index + 1}</td>
                <td className="common-fonts">
                  {formatDate(item?.creation_date)}
                </td>
                <td className="common-fonts">{item?.title}</td>
                <td className="common-fonts">{item?.view_count}</td>
                <td className="common-fonts">{item?.section_count}</td>
                <td className="common-fonts">{item?.sport}</td>
                <td className="common-fonts"> {item?.word_count}</td>
                <td className="common-fonts"> {item?.created_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPerformance;

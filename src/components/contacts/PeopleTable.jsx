import React, { useState } from "react";
import Search from "../../assets/image/search.svg";
import User from "../../assets/image/user.svg";
import { format } from "date-fns";
import { Link } from "react-router-dom";


const PeopleTable = ({personData, loading}) => {
 const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy"); // Change the format as per your requirement
  };

  const filteredPersonData = personData.filter((item) => {
    const name = item?.name?.toLowerCase() || "";
    const company = item?.organization?.toLowerCase() || "";
    const creationDate = formatDate(item?.creation_date) || "";
    const updateDate = formatDate(item?.update_date) || "";
    const email = item?.email?.toLowerCase() || "";
    const phone = item?.phone?.toLowerCase() || "";
    const state = item?.state?.toLowerCase() || "";
    const city = item?.city?.toLowerCase() || "";
    const searchPerson = searchQuery.toLowerCase();

    // Check if the search query matches any of the fields
    const matchesSearchQuery =
      name?.includes(searchPerson) ||
      company?.includes(searchPerson) ||
      email?.includes(searchPerson) ||
      phone?.includes(searchPerson) ||
      state?.includes(searchPerson) ||
      city?.includes(searchPerson) ||
      creationDate?.includes(searchPerson) ||
      updateDate?.includes(searchPerson);

    return matchesSearchQuery;
  });

  return (
    <div>
      <div className="contact-search-container">
        <div className="recycle-search-box">
          <input
            type="text"
            className="recycle-search-input recycle-fonts"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="recycle-search-icon">
            <img src={Search} alt="" />
          </span>
        </div>

        <div>
          <button className="common-fonts common-white-green-button">
            Export
          </button>
        </div>
      </div>
      <div className="contact-cp-table">
        <table>
          <thead>
            <tr>
              <th className="contact-box">
                <label className="custom-checkbox">
                  <input type="checkbox" className="cb1" name="" />
                  <span className="checkmark"></span>
                </label>
              </th>
              <th className="common-fonts contact-th">Name</th>
              <th className="common-fonts contact-th">Company</th>
              <th className="common-fonts contact-th">Email</th>
              <th className="common-fonts contact-th">Phone</th>
              <th className="common-fonts contact-th">State</th>
              <th className="common-fonts contact-th">City</th>
              <th className="common-fonts contact-th">Creation Date</th>
              <th className="common-fonts contact-th">Update Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : filteredPersonData.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            ) : (
                filteredPersonData.map((person) => {
                return (
                  <tr key={person.id}>
                    <th className="contact-box">
                      <label className="custom-checkbox">
                        <input type="checkbox" className="cb1" name="" />
                        <span className="checkmark"></span>
                      </label>
                    </th>
                    <td className="common-fonts ">
                    <Link to={`/lp/contacts/people/${person.id}`}>
                      <span className="contact-building">
                        <img src={User} alt="" />
                      </span>{" "}
                      {person.name}
                      </Link>
                    </td>
                    <td className="common-fonts">{person.organization}</td>
                    <td className="common-fonts person-email">{person.email}</td>
                    <td className="common-fonts">{person.phone}</td>
                    <td className="common-fonts">{person.state}</td>
                    <td className="common-fonts">{person.city}</td>
                    <td className="common-fonts">
                      {formatDate(person.creation_date.split("T")[0])}
                    </td>
                    <td className="common-fonts">
                      {formatDate(person.update_date.split("T")[0])}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PeopleTable

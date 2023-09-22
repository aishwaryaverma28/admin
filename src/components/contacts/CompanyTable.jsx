import React,{ useState, useEffect } from "react";
import Search from "../../assets/image/search.svg";
import Building from "../../assets/image/building.svg";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const CompanyTable = ({ companyData, loading, onSelectedIdsChange  }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isTableHeaderChecked, setIsTableHeaderChecked] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy"); // Change the format as per your requirement
  };

  const filteredCompanyData = companyData.filter((item) => {
    const name = item?.name?.toLowerCase() || "";
    const industry = item?.industry?.toLowerCase() || "";
    const email = item?.email?.toLowerCase() || "";
    const phone = item?.phone?.toLowerCase() || "";
    const country = item?.country?.toLowerCase() || "";
    const city = item?.city?.toLowerCase() || "";
    const creationDate = formatDate(item?.creation_date) || "";
    const valuationIn = item?.valuation_in?.toLowerCase() || "";
    const domain = item?.domain?.toLowerCase() || "";
    const fullVal =
      `${item.valuation} ${item.valuation_in}`.toLowerCase() || "";
    const searchCompany = searchQuery.toLowerCase();

    // Check if the search query matches any of the fields
    const matchesSearchQuery =
      name?.includes(searchCompany) ||
      industry?.includes(searchCompany) ||
      email?.includes(searchCompany) ||
      phone?.includes(searchCompany) ||
      country?.includes(searchCompany) ||
      city?.includes(searchCompany) ||
      valuationIn?.includes(searchCompany) ||
      fullVal?.includes(searchCompany) ||
      creationDate?.includes(searchCompany) ||
      domain?.includes(searchCompany);

    return matchesSearchQuery;
  });
  const handleTableHeaderCheckboxChange = () => {
    if (isTableHeaderChecked) {
      setSelectedIds([]);
      onSelectedIdsChange(selectedIds);
    } else {
      const allIds = filteredCompanyData.map((company) => company.id);
      setSelectedIds(allIds);
      onSelectedIdsChange(selectedIds);
    }
    setIsTableHeaderChecked(!isTableHeaderChecked);
  };

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      // If the ID is already selected, remove it
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      onSelectedIdsChange(selectedIds);
    } else {
      // If the ID is not selected, add it
      setSelectedIds([...selectedIds, id]);
      onSelectedIdsChange(selectedIds);
    }
  };

  // Use useEffect to monitor changes in selectedIds and update isTableHeaderChecked accordingly
  useEffect(() => {
    const isAllChecked = filteredCompanyData.every((company) =>
      selectedIds.includes(company.id)
    );
    onSelectedIdsChange(selectedIds);
    setIsTableHeaderChecked(isAllChecked);
  }, [selectedIds, filteredCompanyData]);

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
                <input
                type="checkbox"
                className="cb1"
                name=""
                checked={isTableHeaderChecked}
                onChange={handleTableHeaderCheckboxChange}
              />
                  <span className="checkmark"></span>
                </label>
              </th>
              <th className="common-fonts contact-th">Company Name</th>
              <th className="common-fonts contact-th">Industry</th>
              <th className="common-fonts contact-th">Email</th>
              <th className="common-fonts contact-th">Phone</th>
              <th className="common-fonts contact-th">Country</th>
              <th className="common-fonts contact-th">City</th>
              <th className="common-fonts contact-th">Valuation</th>
              <th className="common-fonts contact-th">Domain</th>
              <th className="common-fonts contact-th">Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : filteredCompanyData.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            ) : (
              filteredCompanyData.map((company) => {
                return (
                  <tr key={company.id}>
                    <th className="contact-box">
                      <label className="custom-checkbox">
                      <input
                      type="checkbox"
                      className="cb1"
                      name=""
                      checked={selectedIds.includes(company.id)}
                      onChange={() => handleCheckboxChange(company.id)}
                    />
                        <span className="checkmark"></span>
                      </label>
                    </th>
                    <td className="common-fonts ">
                      <Link to={`/lp/contacts/company/${company.id}`}>
                        <span className="contact-building">
                          <img src={Building} alt="" />
                        </span>{" "}
                        {company.name}
                      </Link>
                    </td>

                    <td className="common-fonts">{company.industry}</td>
                    <td className="common-fonts person-email">
                      {company.email}
                    </td>
                    <td className="common-fonts">{company.phone}</td>
                    <td className="common-fonts">{company.country}</td>
                    <td className="common-fonts">{company.city}</td>
                    <td className="common-fonts">
                      {company.valuation} {company.valuation_in}
                    </td>
                    <td className="common-fonts">{company.domain}</td>
                    <td className="common-fonts">
                      {formatDate(company.creation_date.split("T")[0])}
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
};

export default CompanyTable;

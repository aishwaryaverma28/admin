import React, { useRef, useState, useEffect } from "react";
import "../styles/CompanyProducts.css";
import ProductPopUp from "./ProductPopUp";
import axios from "axios";
import {
   GET_ALL_PRODUCT,
  getDecryptedToken,
} from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CPProducts = () => {
  const decryptedToken = getDecryptedToken();
  const actionDropDownRef = useRef(null);
  const [actionopen, setActionOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = () => {
    axios
      .get(GET_ALL_PRODUCT, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        setProduct(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

  const toggleActionDropdownStatic = () => {
    setActionOpen(!actionopen);
  };

  const handleAddProduct = () => {
    setIsProductModalOpen(true);
  };

  const handleCloseAddProduct = () => {
    setIsProductModalOpen(false);
  };

  return (
    <section>
      <div className="cp-top">
        <button className="common-save-button" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
      {loading ? (
        // Show a loading message or spinner while data is loading
        <p>Loading...</p>
      ) : (
        <div className="cp-table">
          <table>
            <thead>
              <tr>
                <th>
                  <label className="cp-checkbox">
                    <input type="checkbox" className="cb1" />
                    <span className="checkmark"></span>
                  </label>
                </th>
                <th className="common-fonts">name</th>
                <th className="common-fonts">product code</th>
                <th className="common-fonts">unit price</th>
                <th className="common-fonts">create date</th>
              </tr>
            </thead>
            {product.length === 0 ? (
              <p>No Product found</p>
            ) : (
              <tbody>
                {product.map((item) => (
                <tr key={item.id}>
                  <td>
                    <label className="cp-checkbox">
                      <input type="checkbox" className="cb1" />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td>
                    <div className="cp-action">
                      <p className="common-fonts">{item.name}</p>
                      <div className="select action-select">
                        <div
                          className="dropdown-container"
                          ref={actionDropDownRef}
                        >
                          <div
                            className="dropdown-header2"
                            onClick={toggleActionDropdownStatic}
                          >
                            Actions{" "}
                            <i
                              className={`fa-sharp fa-solid ${
                                actionopen ? "fa-angle-up" : "fa-angle-down"
                              }`}
                            ></i>
                          </div>
                          {actionopen && (
                            <ul className="dropdown-menu user-team-dropdown-position">
                              <li>Edit</li>
                              <li>Clone</li>
                              <li>Delete</li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="common-fonts cp-code">{item.product_code}</td>
                  <td className="common-fonts">{item.product_price}</td>
                  <td className="common-fonts">{item.creation_date.split("T")[0]}</td>
                </tr>
                ))}                
              </tbody>
            )}
          </table>
        </div>
      )}
      {isProductModalOpen && <ProductPopUp onClose={handleCloseAddProduct} getCall={getProduct}/>}
      <ToastContainer />
    </section>
  );
};

export default CPProducts;

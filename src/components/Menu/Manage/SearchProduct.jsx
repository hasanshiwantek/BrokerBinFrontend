import React, { memo, useState, useCallback } from "react";
import css from "../../../styles/SearchProducts.module.css";
import { tableData } from "../../../data/tableData";
import Filter from "../../Filter";
import CompaniesListingParts from "../../CompaniesListingParts";
import ProductsPieChart from "../../ProductsPieChart";
import MyRFQNew from "../../Popups/MyRFQNew";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { FaEye, FaShieldAlt } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import Header from "../../Header";

const SearchProduct = () => {
  const [companiesListingParts, setCompaniesListingParts] = useState(true);
  const [graphToggle, setGraphToggle] = useState(false);
  const [filterToggle, setFilterToggle] = useState(true);
  const [popUpRfq, setPopUpRfq] = useState(false);
  const [togglePopUp, setTogglePopUp] = useState(false);

  const handleShowPopupMyRFQNew = useCallback((event) => {
    event.stopPropagation(); // Stop the click event from propagating to the document
    setPopUpRfq((prev) => !prev);
  }, []);

  return (
    <>
      <div className={css.layout}>
        {filterToggle && <Filter setFilterToggle={setFilterToggle} />}
        <div className={css.tableArea}>
          {graphToggle && <ProductsPieChart setGraphToggle={setGraphToggle} />}
          <div className={css.productTable}>
            <ProductTableBtn
              setGraphToggle={setGraphToggle}
              setFilterToggle={setFilterToggle}
              handleShowPopupMyRFQNew={handleShowPopupMyRFQNew}
              popUpRfq={popUpRfq}
              setPopUpRfq={setPopUpRfq}
            />
            <MemoizedProductTableDetail setTogglePopUp={setTogglePopUp} />
          </div>
          {companiesListingParts && (
            <CompaniesListingParts
              setCompaniesListingParts={setCompaniesListingParts}
            />
          )}
        </div>
      </div>
      {togglePopUp && <CompanyDetails setTogglePopUp={setTogglePopUp} />}
    </>
  );
};

const ProductTableBtn = memo(
  ({
    setGraphToggle,
    setFilterToggle,
    handleShowPopupMyRFQNew,
    popUpRfq,
    setPopUpRfq,
  }) => {
    return (
      <div className={css.productTableBtn}>
        <button type="button" onClick={handleShowPopupMyRFQNew}>
          RFQ
        </button>
        {popUpRfq && <MyRFQNew setPopUpRfq={setPopUpRfq} />}
        <button type="button">Add</button>
        <a href="/cartpart">Cart</a>
        <button type="button" onClick={() => setFilterToggle((prev) => !prev)}>
          Filters
        </button>
        <button type="button" onClick={() => setGraphToggle((prev) => !prev)}>
          Graph View
        </button>
      </div>
    );
  }
);

const ProductTableDetail = memo(({ setTogglePopUp }) => {
  const handleShowPopupCompanyDetails = (event) => {
    event.stopPropagation(); // Stop the click event from propagating to the document
    setTogglePopUp((prev) => !prev);
  };

  return (
    <div className={css.productTableDetail}>
      {[tableData[0]].map((e) => (
        <p key={e.model}>
          Part #:{e.model} : {e.mfg},Inc : {e.mfg} {e.model}
        </p>
      ))}
      <table>
        <thead>
          <tr>
            <th>Cart</th>
            <th>
              <span>
                <FaShieldAlt />
                Company
              </span>
            </th>
            <th>PVR</th>
            <th>Ctry</th>
            <th>Part / Model</th>
            <th>History</th>
            <th>TS</th>
            <th>Mfg</th>
            <th>Cond</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Age</th>
            <th>Product Description</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((e, i) => (
            <tr className={css.tableData} key={i}>
              <td>
                <input type="checkbox" name="addToCart" id="addToCart" />
              </td>
              <td>
                <a onClick={handleShowPopupCompanyDetails}>
                  {e.company}
                </a>
              </td>
              <td>
                <FaEye />
              </td>
              <td>{e.country}</td>
              <td>{e.model}</td>
              <td>
                <MdShowChart />
              </td>
              <td>
                {e.ts ? (
                  <IoCheckmarkCircle
                    style={{ color: "var(--primary-color)" }}
                  />
                ) : (
                  <BiBlock />
                )}
              </td>
              <td>{e.mfg}</td>
              <td>{e.cond}</td>
              <td>{e.price}</td>
              <td>{e.quantity}</td>
              <td>{e.age}</td>
              <td>{e.description}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Cart</th>
            <th>
              <span>
                <FaShieldAlt />
                Company
              </span>
            </th>
            <th>PVR</th>
            <th>Ctry</th>
            <th>Part / Model</th>
            <th>History</th>
            <th>TS</th>
            <th>Mfg</th>
            <th>Cond</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Age</th>
            <th>Product Description</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

const MemoizedProductTableDetail = memo(ProductTableDetail);

export default SearchProduct;

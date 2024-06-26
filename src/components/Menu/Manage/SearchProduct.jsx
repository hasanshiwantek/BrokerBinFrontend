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
import { useDispatch, useSelector } from "react-redux";
import {
  setGraphToggle,
  setFilterToggle,
  setPopUpRfq,
  setTogglePopUp,
  setSelectedProducts,
} from "../../../ReduxStore/SearchProductSlice";

const SearchProduct = () => {
  const { companiesListingParts, graphToggle, filterToggle, togglePopUp } =
    useSelector((store) => store.searchProductStore);

  const dispatch = useDispatch();

  const handleShowPopupMyRFQNew = useCallback((event) => {
    event.stopPropagation(); // Stop the click event from propagating to the document
    dispatch(setPopUpRfq());
  }, []);

  return (
    <>
      <div className={css.layout}>
        {filterToggle && <Filter />}
        <div className={css.tableArea}>
          {graphToggle && <ProductsPieChart />}
          <div className={css.productTable}>
            <ProductTableBtn
              handleShowPopupMyRFQNew={handleShowPopupMyRFQNew}
            />
            <MemoizedProductTableDetail />
          </div>
          {companiesListingParts && <CompaniesListingParts />}
        </div>
      </div>
      {togglePopUp && <CompanyDetails />}
    </>
  );
};

const ProductTableBtn = memo(({ handleShowPopupMyRFQNew }) => {
  const { popUpRfq } = useSelector((store) => store.searchProductStore);

  const dispatch = useDispatch();

  return (
    <div className={css.productTableBtn}>
      <button type="button" onClick={handleShowPopupMyRFQNew}>
        RFQ
      </button>
      {popUpRfq && <MyRFQNew />}
      <button type="button">Add</button>
      <a href="/cartpart">Cart</a>
      <button type="button" onClick={() => dispatch(setFilterToggle())}>
        Filters
      </button>
      <button type="button" onClick={() => dispatch(setGraphToggle())}>
        Graph View
      </button>
    </div>
  );
});

const ProductTableDetail = memo(() => {
  const { selectedProducts } = useSelector((store) => store.searchProductStore);
  const dispatch = useDispatch();
  const handleShowPopupCompanyDetails = (event) => {
    event.stopPropagation(); // Stop the click event from propagating to the document
    dispatch(setTogglePopUp());
  };

  const selectProduct = (id) => {
    const filteredProducts = () => {
      if (
        selectedProducts.length !== 0 &&
        selectedProducts.some((product) => product.id === id)
      ) {
        // Remove product if already selected
        return selectedProducts.filter((product) => product.id !== id);
      } else {
        // Add product if not selected
        const selectedProduct = tableData.find((item) => item.id === id);
        return [...selectedProducts, selectedProduct];
      }
    };
    dispatch(setSelectedProducts(filteredProducts()));
  };

  const isSelected = (id) => {
    return selectedProducts.some((product) => product.id === id);
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
                <input
                  type="checkbox"
                  name="addToCart"
                  id={e.id}
                  // value={select}
                  checked={isSelected(e.id)}
                  onChange={() => selectProduct(e.id)}
                />
              </td>
              <td>
                <a onClick={handleShowPopupCompanyDetails}>{e.company}</a>
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

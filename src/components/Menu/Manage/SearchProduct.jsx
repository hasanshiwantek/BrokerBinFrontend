import React, { memo, useState, useCallback, useEffect } from "react";
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
  setSearchResponse,
  setCurrentPagePrev,
  setCurrentPageNext,
} from "../../../ReduxStore/SearchProductSlice";

const SearchProduct = () => {
  const {
    companiesListingParts,
    graphToggle,
    filterToggle,
    togglePopUp,
    searchResponse,
  } = useSelector((store) => store.searchProductStore);

  const dispatch = useDispatch();

  // Load search response from local storage if available
  useEffect(() => {
    const storedSearchResponse = localStorage.getItem("searchResponse");
    if (storedSearchResponse) {
      dispatch(setSearchResponse(JSON.parse(storedSearchResponse)));
    }
  }, [dispatch]);

  const handleShowPopupMyRFQNew = useCallback((event) => {
    event.stopPropagation(); // Stop the click event from propagating to the document
    dispatch(setPopUpRfq());
  }, []);

  return (
    <>
      <div className={css.layout}>
        {filterToggle && <Filter />}
        {searchResponse.length == 0 ? (
          <div className={css.searchResult}>
            Found {searchResponse.length} results
          </div>
        ) : (
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
        )}
      </div>
      {togglePopUp && <CompanyDetails />}
    </>
  );
};

const ProductTableBtn = memo(({ handleShowPopupMyRFQNew }) => {
  const { popUpRfq, searchResponse } = useSelector(
    (store) => store.searchProductStore
  );

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
  const { selectedProducts, searchResponse, currentPage, itemsPerPage } =
    useSelector((store) => store.searchProductStore);

  const paginatedSearchResponse = searchResponse.slice(
    currentPage * itemsPerPage,
    itemsPerPage * (currentPage + 1)
  );

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
        const selectedProduct = searchResponse.find((item) => item.id === id);
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
          {paginatedSearchResponse.map((e, i) => (
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
              <td>{e.partModel}</td>
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
              <td>{e.productDescription}</td>
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
      <div className={css.tablePagination}>
        <button
          type="button"
          onClick={() => dispatch(setCurrentPagePrev())}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          {currentPage + 1}/{Math.ceil(searchResponse.length / itemsPerPage)}
        </span>
        <button
          type="button"
          onClick={() => dispatch(setCurrentPageNext())}
          disabled={
            currentPage === Math.ceil(searchResponse.length / itemsPerPage) - 1
          }
        >
          Next
        </button>
      </div>
    </div>
  );
});

const MemoizedProductTableDetail = memo(ProductTableDetail);

export default SearchProduct;

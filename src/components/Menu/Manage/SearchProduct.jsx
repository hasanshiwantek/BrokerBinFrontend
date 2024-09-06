import React, { useEffect, useRef } from "react";
import css from "../../../styles/SearchProducts.module.css";
import Filter from "../../Filter";
import CompaniesListingParts from "../../CompaniesListingParts";
import ProductsPieChart from "../../ProductsPieChart";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import {
  searchProductQuery,
  setCurrentPage,
  setSelectedProducts,
  setCurrentPagePrev,
  setCurrentPageNext,
  setTogglePopUp,
  setPopupCompanyDetail,
  setFilterToggle,
  setPopUpRfq,
  setGraphToggle,
  searchProductHistory,
} from "../../../ReduxStore/SearchProductSlice";
import LoadingState from "../../../LoadingState";
import { FaEye, FaShieldAlt } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import MyRFQNew from "../../Popups/MyRFQNew";
import ErrorStatus from "../../Error/ErrorStatus";

const SearchProduct = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const searchString = location.state || {};

  const {
    searchResponse,
    gettingProducts,
    gettingHistory,
    error,
    page,
    pageSize,
    filterToggle,
    graphToggle,
    companiesListingParts,
    togglePopUp,
  } = useSelector((store) => store.searchProductStore);

  const dispatch = useDispatch();

  // Effect 2: Perform the search query when the page or query changes
  useEffect(() => {
    // Dispatch the search query
    console.log("Product Search");
    dispatch(
      searchProductQuery({
        token,
        page,
        pageSize,
        search: searchString,
      })
    );
    
    dispatch(searchProductHistory({ token }));

  }, [token, page, pageSize, searchString, dispatch]);

  if (gettingProducts) {
    return <LoadingState />;
  }

  if (gettingHistory) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorStatus error={error} />;
  }

  return (
    <div className={css.layout}>
      {filterToggle && <Filter />}
      {searchResponse?.data?.length === 0 ? (
        <div className={css.searchResult}>
          <h1 style={{ fontSize: "5rem", marginLeft: "5rem" }}>
            <strong>Found {searchResponse?.data?.length} results</strong>
          </h1>
        </div>
      ) : (
        <div className={css.tableArea}>
          {graphToggle && <ProductsPieChart />}
          <div className={css.productTable}>
            <ProductTableBtn />
            <ProductTableDetail />
          </div>
          {companiesListingParts && <CompaniesListingParts />}
        </div>
      )}
      {togglePopUp && <CompanyDetails />}
    </div>
  );
};

const ProductTableBtn = React.memo(() => {
  const { popUpRfq } = useSelector((store) => store.searchProductStore);
  const dispatch = useDispatch();

  const handleShowPopupMyRFQNew = React.useCallback(
    (event) => {
      event.stopPropagation();
      dispatch(setPopUpRfq());
    },
    [dispatch]
  );

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

const ProductTableDetail = React.memo(() => {
  const { selectedProducts, searchResponse, page, pageSize } = useSelector(
    (store) => store.searchProductStore
  );

  const dispatch = useDispatch();

  const handleShowPopupCompanyDetails = (event, id) => {
    event.stopPropagation();
    const companyDetail = searchResponse.data.filter((e) => e.id === id);
    dispatch(setPopupCompanyDetail(companyDetail));
    dispatch(setTogglePopUp());
  };

  const selectProduct = (id) => {
    const filteredProducts = () => {
      if (
        selectedProducts.length !== 0 &&
        selectedProducts.some((product) => product.id === id)
      ) {
        return selectedProducts.filter((product) => product.id !== id);
      } else {
        const selectedProduct = searchResponse?.data?.find(
          (item) => item.id === id
        );
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
            <th>HECI / CLEI</th>
            <th>Mfg</th>
            <th>Cond</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Age</th>
            <th>Product Description</th>
          </tr>
        </thead>
        <tbody>
          {searchResponse?.data?.map((e, i) => (
            <tr className={css.tableData} key={i}>
              <td>
                <input
                  type="checkbox"
                  name="addToCart"
                  id={e.id}
                  checked={isSelected(e.id)}
                  onChange={() => selectProduct(e.id)}
                />
              </td>
              <td>
                <a
                  onClick={(event) =>
                    handleShowPopupCompanyDetails(event, e.id)
                  }
                >
                  {e.mfg}
                </a>
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
              <td>{e.heciClei}</td>
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
            <th>HECI / CLEI</th>
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
          disabled={page === 1}
        >
          ⬅️
        </button>
        <span>
          {page}/{searchResponse?.lastPage}
        </span>
        <button
          type="button"
          onClick={() => dispatch(setCurrentPageNext())}
          disabled={page === searchResponse?.lastPage}
        >
          ➡️
        </button>
      </div>
    </div>
  );
});

export default SearchProduct;

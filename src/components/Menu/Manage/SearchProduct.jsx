
import React, { useCallback, useEffect, useRef, useState } from "react";
import css from "../../../styles/SearchProducts.module.css";
import Filter from "../../Filter";
import CompaniesListingParts from "../../CompaniesListingParts";
import ProductsPieChart from "../../ProductsPieChart";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import shieldImage from "../../../assets/shield-img.png"
import { countriesList } from "../../../data/services"


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
  setHoverCompanyDetail,
  searchByKeyword,

} from "../../../ReduxStore/SearchProductSlice";
import LoadingState from "../../../LoadingState";
import { FaEye, FaShieldAlt } from "react-icons/fa";
import { MdShowChart } from "react-icons/md";
import { BiBlock } from "react-icons/bi";
import { IoCheckmarkCircle } from "react-icons/io5";
import MyRFQNew from "../../Popups/MyRFQNew";
import ErrorStatus from "../../Error/ErrorStatus";
import AddToHotList from "./AddToHotList";

const SearchProduct = () => {

  const token = Cookies.get("token");
  const location = useLocation();
  const dispatch = useDispatch();

  // Extract 'page' and 'searchString' from URL
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const searchString = queryParams.get("query") || "";
  const partModel = queryParams.get("partModel") || "";
  console.log("Query " + searchString);
  console.log("PartModel " + partModel);
  const {
    searchResponseMatched,
    searchResponseNotMatched,
    gettingProducts,
    gettingHistory,
    error,
    filterToggle,
    graphToggle,
    companiesListingParts,
    togglePopUp,
  } = useSelector((store) => store.searchProductStore);


  // searchResponseMatched.map((item) => { console.log("Part Model " + item.partModel) })
  if (searchResponseMatched) {
    Object.entries(searchResponseMatched || {}).forEach(([partModel, details]) => {
      console.log("Part Model:", partModel, details);
      console.log("Data:", details.data);
      console.log("searchResponseMatched:", searchResponseMatched);

    });
  }
  
  // Fetch data whenever 'page' or 'searchString' changes
  // Fetch data whenever 'page' or 'searchString' changes

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const searchString = queryParams.get("query") || "";
  //   const partModel = queryParams.get("partModel") || "";

  //   if (searchString) {
  //     // Dispatch action for general search with query
  //     dispatch(searchProductQuery({ token, page, search: searchString }));
  //   } else if (partModel) {
  //     // Dispatch action for search by part model
  //     dispatch(searchByKeyword({ token, page, partModel: partModel }));
  //   }

  //   // Dispatch action to get search history
  //   dispatch(searchProductHistory({ token }));
  // }, [location, dispatch, token, page]); 

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(location.search);
  //   const searchString = queryParams.get("query") || ""; // e.g., "part1 part2"
  //   const partModel = queryParams.get("partModel") || "";
  
  //   if (searchString) {
  //     // Split the search string if it contains multiple parts
  //     const parts = searchString.split(" ");
  //     parts.forEach((part) => {
  //       // Dispatch action for each part
  //       dispatch(searchProductQuery({ token, page, search: part }));
  //     });
  //   }
  
  //   if (partModel) {
  //     // Dispatch action for search by specific part model
  //     dispatch(searchByKeyword({ token, page, partModel }));
  //   }
  
  //   // Dispatch action to get search history
  //   dispatch(searchProductHistory({ token }));
  // }, [location, dispatch, token, page]);
  

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchString = queryParams.get("query") || ""; // For multi-part search (e.g., "part1 part2")
    const partModel = queryParams.get("partModel") || ""; // For single specific part model search
  
    if (searchString) {
      // Split the search string into parts and dispatch actions for each part
      const parts = searchString.split(" ");
      parts.forEach((part) => {
        dispatch(searchProductQuery({ token, page, search: part })).then((result) =>
          console.log("searchProductQuery result:", result)
        );
      });
    }
  
    if (partModel) {
      // Dispatch action for single specific part model
      dispatch(searchByKeyword({ token, page, partModel })).then((result) =>
        console.log("searchByKeyword result:", result)
      );
    }
  
    // Fetch search history
    dispatch(searchProductHistory({ token })).then((result) =>
      console.log("searchProductHistory result:", result)
    );
  }, [location, dispatch, token, page]);
  


  if (gettingProducts) {
    return <LoadingState />;
  }

  if (gettingHistory) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorStatus error={error} />;
  }

  // Show the Hotlist modal if no matching partModel results are found
  //  if (searchResponseMatched?.length === 0 && partModel) {
  //   return (
  //     <div>
  //       <h2>No Results Found For Selected Part Model: {partModel}</h2>
  //       <AddToHotList item={partModel} />
  //     </div>
  //   );
  // }

  console.log("searchResponseMatched:", searchResponseMatched);

  return (

    <div className={css.layout}>
    {filterToggle && <Filter />}

    <div className={css.layoutTables} style={Object.keys(searchResponseMatched || {}).length <= 0 ? { margin: "0 auto" } : null}>
      {/* Check if no search results matched and either partModel or searchString is available */}
      {Object.keys(searchResponseMatched || {}).length === 0 && (searchString || partModel) ? (
        <div>
          <h2>No Results Found For Selected Part Model: {searchString || partModel}</h2>
          <AddToHotList item={searchString || partModel} /> {/* This triggers the Hotlist modal */}
        </div>
      ) : (
        // Render the products if available
        Object.entries(searchResponseMatched || {}).map(([partModel, details], index) => (
          <div className={css.tableArea} key={index}>
            {graphToggle && <ProductsPieChart />} {/* Graph toggle for each part */}
            <div className={css.productTable}>
              <h3>Results for: {partModel}</h3>
              <ProductTableBtn />
              <ProductTableDetail partData={details.data} page={details.page} totalCount={details.totalCount} />
            </div>
          </div>
        ))
      )}
    </div>

    {togglePopUp && <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />}
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
      <button>
        <a href="/cartpart" style={{ fontSize: "1em", color: "#444" }}>Cart</a>
      </button>
      <button type="button" onClick={() => dispatch(setFilterToggle())}>
        Filters
      </button>
      <button type="button" onClick={() => dispatch(setGraphToggle())}>
        GraphView
      </button>
    </div>
  );
});

const ProductTableDetail = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;

  const {
    selectedProducts,
    searchResponseMatched,
    hoverCompanyDetail,
  } = useSelector((store) => store.searchProductStore);

  const handleShowPopupCompanyDetails = (event, companyId) => {
    event.stopPropagation();

    const companyDetail = Object.values(searchResponseMatched).flatMap((item) =>
      item.data.find((e) => e.addedBy?.company?.id === companyId)
    );

    if (companyDetail?.addedBy?.company) {
      dispatch(setPopupCompanyDetail([companyDetail.addedBy.company]));
    } else {
      console.error("Company not found!");
    }

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
        const selectedProduct = Object.values(searchResponseMatched).flatMap(
          (item) => item.data
        ).find((item) => item.id === id);

        return [...selectedProducts, selectedProduct];
      }
    };
    dispatch(setSelectedProducts(filteredProducts()));
  };

  const handleHoverCompanyDetail = (event, id) => {
    const companyDetail = Object.values(searchResponseMatched).flatMap((item) =>
      item.data.find((e) => e.id === id)
    );
    dispatch(setHoverCompanyDetail(companyDetail?.addedBy?.company));
  };

  const isSelected = (id) => {
    return selectedProducts.some((product) => product.id === id);
  };

  console.log("searchResponseMatched:", searchResponseMatched);

  return (
    <div className={css.productTableDetail}>
      {Object.entries(searchResponseMatched || {}).map(([partModel, details], index) => (
        <div key={index} className={css.tableContainer}>
          <h3>Results for: {partModel}</h3>
          <table>
            <thead>
              <tr>
                <th>Cart</th>
                <th>Company</th>
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
              {details.data.map((e, i) => (
                <tr key={i} className={css.tableData}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected(e.id)}
                      onChange={() => selectProduct(e.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                  <td>
                    <a
                      style={{ color: "#428bca", fontWeight: "500" }}
                      onClick={(event) =>
                        handleShowPopupCompanyDetails(event, e.addedBy.company.id)
                      }
                      onMouseEnter={(event) => handleHoverCompanyDetail(event, e.id)}
                    >
                      {e.addedBy.company.name}
                    </a>
                  </td>
                  <td>View</td>
                  <td>{e.company_country}</td>
                  <td>{e.partModel}</td>
                  <td>History</td>
                  <td>{e.ts ? "Yes" : "No"}</td>
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
          </table>
        </div>
      ))}
    </div>
  );
});


export default SearchProduct;
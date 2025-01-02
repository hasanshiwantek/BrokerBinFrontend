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
  setSearchResponse,
  // setSearchResponseMatched

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
  // console.log("Query " + searchString);
  // console.log("PartModel " + partModel);
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
      // console.log("Part Model:", partModel, details);
      // console.log("Data:", details.data);
      // console.log("searchResponseMatched:", searchResponseMatched);

    });
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchString = queryParams.get("query") || ""; // For multi-part search (e.g., "part1 part2")
    const partModel = queryParams.get("partModel") || ""; // For single specific part model search

    dispatch(setSearchResponse({}));

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


  console.log("searchResponseMatched:", searchResponseMatched);

  return (

    <div className={css.layout}>
      {filterToggle && <Filter />}

      <div className={css.layoutTables} style={Object.keys(searchResponseMatched || {}).length <= 0 ? { margin: "0 auto" } : null}>
        {Object.keys(searchResponseMatched || {}).length === 0 || Object.values(searchResponseMatched).every(part => part.data.length === 0) ? (
          <div>
            <h2>No Results Found For Selected Part Model: {searchString || partModel}</h2>
            <AddToHotList item={searchString || partModel} /> 
          </div>
        ) : (
          // Render the products if available
          Object.entries(searchResponseMatched || {}).map(([partModel, details]) =>
            details.data.length > 0 && ( // Check if data is not empty
              <div className={css.tableArea} key={partModel}>
                {graphToggle && <ProductsPieChart />} 
                <div className={css.productTable}>
                  <ProductTableBtn />
                  <ProductTableDetail partData={details.data} partModel={partModel} page={details.page} totalCount={details.totalCount} />
                </div>
              </div>
            )
          )
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

const ProductTableDetail = React.memo(({ partModel, partData }) => {
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

    const companyDetail = Object.values(searchResponseMatched || {}).flatMap((item) =>
      item.data.find((e) => e.addedBy?.company?.id === companyId)
    )[0];

    console.log('COMPANYID:', companyId, 'COMPANYDETAIL:', companyDetail)

    // const companyDetail = searchResponseMatched[partModel]?.data.find(
    //   (e) => e.addedBy?.company?.id === companyId
    // );

    if (companyDetail?.addedBy?.company) {
      dispatch(setPopupCompanyDetail([companyDetail.addedBy.company]));
      console.log('SETPOPUPCOMPANYDETAIL:', setPopupCompanyDetail);

    } else {
      console.error("Company not found!");
    }
    dispatch(setTogglePopUp());
  };

  // const selectProduct = (id) => {
  //   const filteredProducts = () => {
  //     if (
  //       selectedProducts.length !== 0 &&
  //       selectedProducts.some((product) => product.id === id)
  //     ) {
  //       return selectedProducts.filter((product) => product.id !== id);
  //     } else {
  //       const selectedProduct = Object.values(searchResponseMatched).flatMap(
  //         (item) => item.data
  //       ).find((item) => item.id === id);

  //       return [...selectedProducts, selectedProduct];
  //     }
  //   };
  //   dispatch(setSelectedProducts(filteredProducts()));
  // };

  // const selectProduct = (id, partModel) => {
  //   const filteredProducts = () => {
  //     if (
  //       selectedProducts.length !== 0 &&
  //       selectedProducts.some((product) => product.id === id)
  //     ) {
  //       return selectedProducts.filter((product) => product.id !== id);
  //     } else {
  //       const selectedProduct = searchResponseMatched[partModel]?.data.find(
  //         (item) => item.id === id
  //       );

  //       return [...selectedProducts, selectedProduct];
  //     }
  //   };
  //   dispatch(setSelectedProducts(filteredProducts()));
  // };

  const selectProduct = (id) => {
    const filteredProducts = selectedProducts.some((product) => product.id === id)
      ? selectedProducts.filter((product) => product.id !== id)
      : [...selectedProducts, partData.find((item) => item.id === id)];
    dispatch(setSelectedProducts(filteredProducts));
  };

  const handleHoverCompanyDetail = (event, id) => {
    const companyDetail = Object.values(searchResponseMatched).flatMap((item) =>
      item.data.find((e) => e.id === id)
    )[0]; // Get the first matching result

    console.log("HOVERED COMPANY DETAIL:", companyDetail);

    if (companyDetail?.addedBy?.company) {
      dispatch(setHoverCompanyDetail(companyDetail.addedBy.company));
      console.log("SET HOVER COMPANY DETAIL:", companyDetail.addedBy.company);
    } else {
      console.error("Company not found for hover!");
    }
  };

  const isSelected = (id) => {
    return selectedProducts.some((product) => product.id === id);
  };

  const handlePrevPage = () => {
    const newPage = page - 1;

    // Ensure we don't navigate to a page number less than 1
    if (newPage < 1) return;

    // Determine which parameter to use based on the current URL
    const queryParams = new URLSearchParams(location.search);
    const currentQuery = queryParams.get("query");
    const currentPartModel = queryParams.get("partModel");

    // Use the same parameter as in the current URL
    const url = currentQuery
      ? `/inventory/search?page=${newPage}&query=${encodeURIComponent(currentQuery)}`
      : `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(currentPartModel)}`;

    navigate(url, { replace: true });

    console.log("Navigating to URL:", url); // Debug log
  };


  // const {
  //   // selectedProducts,
  //   // searchResponseMatched,
  //   pageSize,
  //   totalCount,
  //   // hoverCompanyDetail,
  // } = useSelector((store) => store.searchProductStore);


  const totalCount=searchResponseMatched[partModel]?.totalCount;
  const pageSize=searchResponseMatched[partModel]?.pageSize;
  console.log("Total Count:", totalCount);
  console.log("Page Size:", pageSize);

  const totalPages = Math.ceil(totalCount / pageSize);

  console.log("Total Pages:", totalPages);


  
  const handleNextPage = () => {
    const newPage = page + 1;

    // Determine which parameter to use based on the current URL
    const queryParams = new URLSearchParams(location.search);
    const currentQuery = queryParams.get("query");
    const currentPartModel = queryParams.get("partModel");

    // Use the same parameter as in the current URL
    const url = currentQuery
      ? `/inventory/search?page=${newPage}&query=${encodeURIComponent(currentQuery)}`
      : `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(currentPartModel)}`;

    navigate(url, { replace: true });

    console.log("Navigating to URL:", url); // Debug log
  };



  return (

    <div className={css.productTableDetail}>
      <div className={css.tableContainer}>
        <h3>Results for: {partModel}</h3>
        <table>
          <thead>
            <tr>
              <th>Cart</th>
              <th>
                <img
                  src={shieldImage}
                  alt=""
                  style={{ width: "18px", fontWeight: "bold" }}
                />
              </th>
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
            {partData?.map((e, i) => (
              <tr key={i} className={css.tableData}>
                <td>
                  <input
                    type="checkbox"
                    checked={isSelected(e.id)}
                    onChange={() => selectProduct(e.id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td></td>
                <td>
                  <a
                    style={{ color: "#428bca", fontWeight: "500" }}
                    onClick={(event) =>
                      handleShowPopupCompanyDetails(event, e.addedBy.company.id)
                    }
                    onMouseEnter={(event) =>
                      handleHoverCompanyDetail(event, e.id)
                    }
                  >
                    {e.addedBy.company.name}
                  </a>
                </td>
                <td>
                  <FaEye />
                </td>
                <td>
                  {countriesList.find(
                    (country) =>
                      country.label.toLowerCase().trim() ===
                      e.addedBy.company.country.toLowerCase().trim()
                  )?.value || e.addedBy.company.country}
                </td>
                <td>{e.partModel}</td>
                <td>
                  <MdShowChart />
                </td>
                <td>
                  {e.ts ? (
                    <IoCheckmarkCircle style={{ color: "red" }} />
                  ) : (
                    <BiBlock style={{ color: "red" }} />
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
                <img
                  src={shieldImage}
                  alt=""
                  style={{ width: "18px", fontWeight: "bold" }}
                />
              </th>
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
          </tfoot>
        </table>
        <div className={`${css.tablePagination}`}>
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={page === 1}
            className="text-gray-600 text-lg font-bold"
          >
            Prev
          </button>
          <span className="text-white text-lg font-bold ">
            {page}/{totalPages}
          </span>
          <button
            className="text-gray-600 text-lg font-bold"
            type="button"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>

  );
});



export default SearchProduct;

























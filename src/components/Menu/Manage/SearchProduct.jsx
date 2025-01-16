
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
import { NavLink } from "react-router-dom";
import { fetchUserData } from "../../../ReduxStore/ProfleSlice";

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
  clearSearchResponseMatched,
  searchProductFilter,
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
import { sortInventory } from "../../../ReduxStore/SearchProductSlice";


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
    filteredSearchResponse,
    keywordPage,
    keywordPageSize,
    keywordTotalCount
  } = useSelector((store) => store.searchProductStore);

  const isFilterActive = !!(
    filteredSearchResponse &&
    searchResponseMatched &&
    Object.keys(filteredSearchResponse).length > 0 &&
    JSON.stringify(filteredSearchResponse) !== JSON.stringify(searchResponseMatched)
  );

  useEffect(()=>{
    console.log("filterToggle:", filterToggle);
  }, [])

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
    if (!isFilterActive) {
      dispatch(clearSearchResponseMatched());
      dispatch(setSearchResponse({}));
    }

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

  const [currentQuery, setCurrentQuery] = useState(searchString || partModel);

  useEffect(() => {
    if (searchString || partModel) {
      setCurrentQuery(searchString || partModel); // Update with latest search or partModel
    }
  }, [searchString, partModel]);
  // const initialQuery = useRef(searchString); // Save the initial query
  

  useEffect(() => {
    console.log("Filtered Search Response:", filteredSearchResponse);
  }, [filteredSearchResponse]);


  if (gettingProducts) {
    return <LoadingState />;
  }

  if (gettingHistory) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorStatus error={error} />;
  }

  const partModels = []
  partModels.push(searchString)
  console.log("Searched PartModels ", partModels)

  // Extracting all prices
  let priceKey = null;

  for (const key in searchResponseMatched) {
    const dataArray = searchResponseMatched[key].data;
    if (dataArray && dataArray.length > 0) {
      priceKey = Object.keys(dataArray[0]).find(k => k === 'price');
      break; // Stop after finding the first 'price' key
    }
  }
  console.log("Key:", priceKey);
  const sortPage = 1;
  const sortPageSize = 20;






  return (

    <div className={css.layout}>

      {filterToggle && <Filter currentQuery={currentQuery}/>}

      <div className={css.layoutTables} style={Object.keys(filteredSearchResponse || searchResponseMatched || {}).length <= 0 ? { margin: "0 auto" } : null}>
        {Object.keys(filteredSearchResponse || searchResponseMatched || {}).length === 0 || Object.values(filteredSearchResponse || searchResponseMatched).every((part) => Array.isArray(part?.data) && part.data.length === 0
        ) ? (
          <div>
            <h2>No Results Found For Selected Part Model: {searchString || partModel}</h2>
            <AddToHotList item={searchString || partModel} />
          </div>
        ) : (
          // Render the products if available
          Object.entries(filteredSearchResponse || searchResponseMatched || {}).map(([partModel, details], index) =>
            details?.data?.length > 0 && ( // Check if data is not empty
              <div className={css.tableArea} key={`${partModel}-${index}`}>
                {graphToggle && <ProductsPieChart />}
                <div className={css.productTable}>
                  <ProductTableBtn />
                  <ProductTableDetail 
                  partData={details.data} 
                  partModel={partModel} 
                  page={details.page}
                  totalCount={details.totalCount}
                  partModels={partModels} 
                  sortPageSize={sortPageSize} 
                  sortPage={sortPage} 
                  token={token} 
                  searchString={searchString}
                  isFilterActive={isFilterActive} />
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
      <button  >
        <NavLink to={"/inventory/add"} className="!text-2xl !ml-4" >
          Add
        </NavLink>
      </button>
      <button>
        {/* <a href="/cartpart" style={{ fontSize: "1em", color: "#444" }}>Cart</a> */}
      </button>
      <button type="button" onClick={() => dispatch(setFilterToggle())}>
        Filters
      </button>
      {/* <button type="button" onClick={() => dispatch(setGraphToggle())}>
        GraphView
      </button> */}
    </div>
  );
});

const ProductTableDetail = React.memo(({ partModel, partData, partModels, isFilterActive,  searchString }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;

  const {
    selectedProducts,
    searchResponseMatched,
    filteredSearchResponse,
    hoverCompanyDetail,
    appliedFilters,
  } = useSelector((store) => store.searchProductStore);

  console.log("SearchResponse From UI ", searchResponseMatched)


  const user_id = Cookies.get("user_id");
  const { initialData, user } = useSelector(
    (state) => state.profileStore
  );

  const id = user?.user?.id || user_id;

  console.log("Logged In User Data from Search Product Page ", initialData);


  const loggedInUserCompany = initialData?.company?.name
  console.log("LoggedIn User Company ", loggedInUserCompany)

  useEffect(() => {
    console.log(id);
    dispatch(fetchUserData({ id, token }));
  }, []);

  // Extract all company names
  const companyNames = Object.values(searchResponseMatched)
    .flatMap((response) => response.data) // Extract all `data` arrays
    .map((item) => item.addedBy?.company?.name) // Extract `company.name`
    .filter(Boolean); // Remove undefined or null names

  console.log("Company Names:", companyNames);




  const keys = Object.keys(searchResponseMatched);
  console.log(keys); // Output: ["001NFM", "002CR", "003442U"]

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
  
    const queryParams = new URLSearchParams(location.search);
    const currentQuery = queryParams.get("query");
    const currentPartModel = queryParams.get("partModel");
  
    console.log("isFilterActive in handlePrevPage:", isFilterActive); // Add this here
    console.log("Filters sent to searchProductFilter:", { ...filteredSearchResponse, page: newPage }); // Add this here
  
    if (isFilterActive) {
      // Handle pagination for filtered data
      const filters = {
        ...appliedFilters, // Include applied filters
        partModel: partModel,
        page: newPage,
        pageSize: 20,
      };
  
      dispatch(searchProductFilter({ token, filters }));
      const url = `/inventory/search?page=${newPage}`; // Update URL for filtered pagination
      navigate(url, { replace: true });
    } else {
      // Navigate normally for search API
      const url = currentQuery
        ? `/inventory/search?page=${newPage}&query=${encodeURIComponent(currentQuery)}`
        : `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(currentPartModel)}`;
  
      navigate(url, { replace: true });
    }
  };
  




  const [searchSource, setSearchSource] = useState("search"); // "search" or "keyword"


  const totalCount = searchResponseMatched[partModel]?.totalCount;
  const pageSize = searchResponseMatched[partModel]?.pageSize;
  console.log("Total Count:", totalCount);
  console.log("Page Size:", pageSize);

  const totalPages = Math.ceil(totalCount / pageSize);

  console.log("Total Pages:", totalPages);

  const token = Cookies.get("token")



  const { keywordPage, keywordPageSize, keywordTotalCount } = useSelector((state) => state.searchProductStore)
  const keywordTotalPages = Math.ceil(keywordTotalCount, keywordPageSize)
  console.log("Keyword Page From Frontend: ", keywordPage)
  console.log("Keyword PageSize From Frontend: ", keywordPageSize)
  console.log("Keyword totalCount From Frontend: ", keywordTotalCount)
  console.log("Keyword TotalPages: ", keywordTotalPages)


  // Check if searchString or partModel is present
  const isSearchPagination = Boolean(searchString);
  const isKeywordPagination = Boolean(partModel);

  console.log("isKeywordPgination " + isKeywordPagination)
  console.log("isSearchPagination " + isSearchPagination)

  // Determine totalPages and currentPage based on the condition
  const totalPagess = isSearchPagination
    ? Math.ceil(totalCount / pageSize) // Use search pagination
    : isKeywordPagination
      ? Math.ceil(keywordTotalCount / keywordPageSize) // Use keyword pagination
      : 1; // Default to 1 if no condition is met

  const currentPage = isSearchPagination ? page : keywordPage;

  console.log("Pagination Source:", isSearchPagination ? "Search" : "Keyword");
  console.log("Total Pages:", totalPagess);
  console.log("Current Page:", currentPage);




  // const handleNextPage = () => {
  //   const newPage = page + 1;

  //   // Determine which parameter to use based on the current URL
  //   const queryParams = new URLSearchParams(location.search);
  //   const currentQuery = queryParams.get("query");
  //   const currentPartModel = queryParams.get("partModel");

  //   // Use the same parameter as in the current URL
  //   const url = currentQuery
  //     ? `/inventory/search?page=${newPage}&query=${encodeURIComponent(currentQuery)}`
  //     : `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(currentPartModel)}`;

  //   navigate(url, { replace: true });

  //   console.log("Navigating to URL:", url); // Debug log
  // };

  // const handlePrevPage = () => {
  //   const newPage = page - 1;

  //   // Ensure we don't navigate to a page number less than 1
  //   if (newPage < 1) return;

  //   // Determine which parameter to use based on the current URL
  //   const queryParams = new URLSearchParams(location.search);
  //   const currentQuery = queryParams.get("query");
  //   const currentPartModel = queryParams.get("partModel");

  //   // Use the same parameter as in the current URL
  //   const url = currentQuery
  //     ? `/inventory/search?page=${newPage}&query=${encodeURIComponent(currentQuery)}`
  //     : `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(currentPartModel)}`;

  //   navigate(url, { replace: true });

  //   console.log("Navigating to URL:", url); // Debug log
  // };





  const handleNextPage = () => {
    const newPage = page + 1;
  
    // Determine query parameters for current search
    const queryParams = new URLSearchParams(location.search);
    const currentQuery = queryParams.get("query");
    const currentPartModel = queryParams.get("partModel");
  
    console.log("isFilterActive in handleNextPage:", isFilterActive); // Add this here
    console.log("Filters sent to searchProductFilter:", { ...filteredSearchResponse, page: newPage }); // Add this here

    if (isFilterActive) {
      // Handle pagination for filtered data
      const filters = {
        // ...filteredSearchResponse, // Include the filtered data
        ...appliedFilters,
        partModel: partModel,
        page: newPage,
        pageSize: 20,
    };
    
      dispatch(searchProductFilter({token, filters}));
      const url = `/inventory/search?page=${newPage}`;
    navigate(url, { replace: true });
      
    } else {
      // Navigate normally for search API
      const url = currentQuery
        ? `/inventory/search?page=${newPage}&query=${encodeURIComponent(
            currentQuery
          )}`
        : `/inventory/search?page=${newPage}&partModel=${encodeURIComponent(
            currentPartModel
          )}`;
  
      navigate(url, { replace: true });
    }
  };
  

const [sortBy, setSortBy] = useState(null); // Initially no column is sorted
  const [sortOrder, setSortOrder] = useState("desc"); // Default to "desc"


  // console.log("Payload from ProductTable Page", payload)
  console.log("token", token)

  const handleSort = (column) => {
    if (sortBy === column) {
      // If the same column is clicked, toggle the sortOrder
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // For a new column, reset sortBy to the column and keep sortOrder as "desc"
      setSortBy(column);
      setSortOrder("desc");
    }

    // Create the payload for dispatch
    const payload = {
      search: keys, // Ensure search is formatted as an array
      sortBy: column,
      sortOrder: sortBy === column ? (sortOrder === "asc" ? "desc" : "asc") : "desc", // Toggle or default to "desc"
      page: 1,                         // Reset to the first page
      pageSize: 20,                    // Adjust page size if needed
    };

    console.log("Sorting Payload:", payload);
    dispatch(sortInventory({ token, payload }));
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
              <th onClick={() => handleSort("heciClei")} style={{ cursor: "pointer" }}>HECI / CLEI {sortBy === "heciClei" && (sortOrder === "asc" ? "↑" : "↓")} </th>

              <th onClick={() => handleSort("mfg")} style={{ cursor: "pointer" }} >Mfg {sortBy === "mfg" && (sortOrder === "asc" ? "↑" : "↓")}</th>

              <th onClick={() => handleSort("cond")} style={{ cursor: "pointer" }} >Cond{sortBy === "cond" && (sortOrder === "asc" ? "↑" : "↓")}</th>

              <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
                Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>

              <th onClick={() => handleSort("quantity")} style={{ cursor: "pointer" }}>
                Quantity {sortBy === "quantity" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>

              <th>Age </th>
              <th>Product Description</th>
            </tr>
          </thead>
          <tbody>
            {partData
              ?.slice() // Create a shallow copy of partData to avoid mutating the original array
              .sort((a, b) => {
                // Check if the company matches the logged-in user's company
                const isAUserCompany =
                  a.addedBy?.company?.name?.toLowerCase() === loggedInUserCompany?.toLowerCase();
                const isBUserCompany =
                  b.addedBy?.company?.name?.toLowerCase() === loggedInUserCompany?.toLowerCase();

                // Sort to prioritize logged-in user's company
                if (isAUserCompany && !isBUserCompany) return -1; // a comes before b
                if (!isAUserCompany && isBUserCompany) return 1; // b comes before a
                return 0; // Keep the same order for others
              })
              .map((e, i) => (
                <tr
                  key={i}
                  style={
                    e.addedBy?.company?.name?.toLowerCase() === loggedInUserCompany?.toLowerCase()
                      ? { backgroundColor: "#ffb" } // Highlight if the company matches
                      : null
                  }
                >
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
                        e.addedBy?.company?.country?.toLowerCase().trim()
                    )?.value || e.addedBy?.company?.country || "N/A"}
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
              <th onClick={() => handleSort("heciClei")} style={{ cursor: "pointer" }}>HECI / CLEI {sortBy === "heciClei" && (sortOrder === "asc" ? "↑" : "↓")} </th>

              <th onClick={() => handleSort("mfg")} style={{ cursor: "pointer" }} >Mfg {sortBy === "mfg" && (sortOrder === "asc" ? "↑" : "↓")}</th>

              <th onClick={() => handleSort("cond")} style={{ cursor: "pointer" }} >Cond{sortBy === "cond" && (sortOrder === "asc" ? "↑" : "↓")}</th>

              <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
                Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>

              <th onClick={() => handleSort("quantity")} style={{ cursor: "pointer" }}>
                Quantity {sortBy === "quantity" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th>Age</th>
              <th>Product Description</th>
            </tr>
          </tfoot>
        </table>



        <div className={`${css.tablePagination}`}>
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="text-gray-600 text-lg font-bold"
          >
            Prev
          </button>
          <span className="text-white text-lg font-bold ">
            {currentPage}/{totalPagess}
          </span>
          <button
            className="text-gray-600 text-lg font-bold"
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPagess}
          >
            Next
          </button>
        </div>

      </div>
    </div>

  );
});



export default SearchProduct;



import React, { useCallback, useEffect, useRef, useState } from "react";
import css from "@/styles/SearchProducts.module.css";
import ProductsPieChart from "../ProductsPieChart";
import CompanyDetails from "../Popups/CompanyDetails/CompanyDetails";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import {
  searchProductQuery,
  setTogglePopUp,
  searchProductHistory,
  searchByKeyword,
  setSearchResponse,
  clearSearchResponseMatched,
} from "@/ReduxStore/SearchProductSlice";
import LoadingState from "@/LoadingState";
import ErrorStatus from "../Error/ErrorStatus";
import AddToHotList from "./AddToHotlist";
import ProductTableBtn from "./ProductTableBtn";
import ProductTableDetail from "./ProductTableDetail";
import Filter from "./Filter";
import CompanyListingTable from "./Table";

const SearchProduct = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const dispatch = useDispatch();

  // Extract 'page' and 'searchString' from URL
  const queryParams = new URLSearchParams(location.search);
  const sortBy = queryParams.get("sortBy") || null;
  const sortOrder = queryParams.get("sortOrder") || null;
  const page = parseInt(queryParams.get("page")) || 1;
  const searchString = queryParams.get("query") || "";
  const partModel = queryParams.get("partModel") || "";
  console.log("SearchString" + searchString);
  console.log("PartModel keyword " + partModel);
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
    keywordTotalCount,
  } = useSelector((store) => store.searchProductStore);

  console.log("SEARCHRESPONSEMATCHED", searchResponseMatched);
  
  const isFilterActive = !!(
    filteredSearchResponse &&
    searchResponseMatched &&
    Object.keys(filteredSearchResponse).length > 0 &&
    JSON.stringify(filteredSearchResponse) !==
      JSON.stringify(searchResponseMatched)
  );

  //   useEffect(() => {
  //     console.log("filterToggle:", filterToggle);
  //   }, []);

  // searchResponseMatched.map((item) => { console.log("Part Model " + item.partModel) })
  if (searchResponseMatched) {
    Object.entries(searchResponseMatched || {}).forEach(
      ([partModel, details]) => {}
    );
  }

  // const [sortBy, setSortBy] = useState(null);
  // const [sortOrder, setSortOrder] = useState("desc");
  // const sortByRef = useRef(null);
  // const sortOrderRef = useRef("desc");

  // const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchString = queryParams.get("query") || ""; // Multi-part search
    const partModel = queryParams.get("partModel") || ""; // Single part
    // const sortBy = queryParams.get("sortBy") || null;
    // const sortOrder = queryParams.get("sortOrder") || "desc";
    const partModelArr = [];
    partModelArr.push(partModel);
    console.log("PARTMODEL ARRAY:", partModelArr);

    if (!sortBy || page > 1) {
      // ✅ If a new search query or partModel is detected, clear previous filters
      if (searchString || partModel) {
        dispatch(clearSearchResponseMatched());
        dispatch(setSearchResponse({}));
      }

      // ✅ If a search query exists, dispatch searchProductQuery for each part
      if (searchString) {
        const parts = searchString.split(" ");
        parts.forEach((part) => {
          console.log("sortBy:", sortBy);
          console.log("sortOrder:", sortOrder);
          dispatch(
            searchProductQuery({
              token,
              page: page,
              sortBy,
              sortOrder,
              search: part,
            })
          ).then((result) => console.log("searchProductQuery result:", result));
        });
      }

      // ✅ If a single part model is searched, dispatch searchByKeyword
      if (partModel) {
        dispatch(
          searchByKeyword({ token, page: page, sortBy, sortOrder, partModel })
        ).then((result) => console.log("searchByKeyword result:", result));
      }
    }

    // ✅ Fetch search history
    dispatch(searchProductHistory({ token })).then((result) =>
      console.log("searchProductHistory result:", result)
    );
    console.log("Effect triggered:", { searchString, partModel, token });
  }, [location.search, dispatch, token]); // 🔹 Only trigger when URL params change

  const [currentQuery, setCurrentQuery] = useState(searchString || partModel);

  useEffect(() => {
    if (searchString || partModel) {
      setCurrentQuery(searchString || partModel); // Update with latest search or partModel
    }
  }, [searchString, partModel]);
  // const initialQuery = useRef(searchString); // Save the initial query

  console.log("Current Query: ", currentQuery);

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

  const partModels = [];
  partModels.push(searchString);
  console.log("Searched PartModels ", partModels);

  // Extracting all prices
  let priceKey = null;

  for (const key in searchResponseMatched) {
    const dataArray = searchResponseMatched[key].data;
    if (dataArray && dataArray.length > 0) {
      priceKey = Object.keys(dataArray[0]).find((k) => k === "price");
      break; // Stop after finding the first 'price' key
    }
  }
  
  console.log("Key:", priceKey);
  const sortPage = 1;
  const sortPageSize = 20;

  const isKeywordSearch = Boolean(partModel);
  const isQuerySearch = Boolean(searchString);
  console.log("SEARCH RESPONSE MATCH", searchResponseMatched);

  return (
    <div className={`${css.layout}`}>
      {/* ✅ Show Filter only if there are search results */}
      {filterToggle &&
        Object.values(filteredSearchResponse || searchResponseMatched).some(
          (part) => part?.data?.length || part?.length > 0
        ) && <Filter currentQuery={currentQuery} />}

      <div
        className={`${css.layoutTables} !mx-auto`}
        style={
          Object.keys(filteredSearchResponse || searchResponseMatched || {})
            .length <= 0
            ? { margin: "0" }
            : null
        }
      >
        {Object.keys(filteredSearchResponse || searchResponseMatched || {})
          .length === 0 ||
        Object.values(filteredSearchResponse || searchResponseMatched).every(
          (part) => Array.isArray(part?.data) && part.data.length === 0
        ) ? (
          // ✅ No results case
          <div className="">
            <AddToHotList item={searchString || partModel} />
          </div>
        ) : isKeywordSearch ? (
          // ✅ Single table for `searchByKeyword`
          <div className={css.tableArea}>
            {graphToggle && <ProductsPieChart />}
            <div className={css.productTable}>
              <ProductTableBtn />
              <ProductTableDetail
                partData={
                  searchResponseMatched?.foundItems
                    ? searchResponseMatched.foundItems // After sorting
                    : Object.values(searchResponseMatched).flatMap(
                        (details) => details.data || []
                      )
                } // Merging all partModels
                partModel={partModel || "All Results"} // Displaying a single table
                keyWordPartModel={partModel}
                totalCount={
                  Object.values(searchResponseMatched)[0]?.totalCount || 0
                } // Taking totalCount from the first key
                page={Object.values(searchResponseMatched)[0]?.page || 1} // Using common page value
                partModels={[]} // Empty since all merged
                isFilterActive={isFilterActive}
                searchString={searchString}
                sortBy={sortBy}
                // setSortBy={setSortBy}
                sortOrder={sortOrder}
                // setSortOrder={setSortOrder}
              />
            </div>
          </div>
        ) : (
          // ✅ Multiple tables for `searchProductQuery`
          Object.entries(filteredSearchResponse || searchResponseMatched || {})
            .filter(([key]) => key !== "filters")
            .map(([partModel, details], index) => (
              <div key={`${partModel}-${index}`}>
                {details?.data?.length > 0 ? (
                  // ✅ Render table for available parts
                  <div className={css.tableArea}>
                    {graphToggle && <ProductsPieChart />}
                    <div className={css.productTable}>
                      <ProductTableBtn />
                      <ProductTableDetail
                        partData={details.data}
                        partModel={partModel}
                        totalCount={details.totalCount}
                        page={details.page}
                        partModels={partModels}
                        isFilterActive={isFilterActive}
                        searchString={searchString}
                        sortPageSize={sortPageSize}
                        sortPage={sortPage}
                        token={token}
                        sortBy={sortBy}
                        // setSortBy={setSortBy}
                        sortOrder={sortOrder}
                        // setSortOrder={setSortOrder}
                      />
                    </div>
                  </div>
                ) : (
                  // ✅ Show Hotlist only for unavailable parts
                  <div key={`hotlist-${partModel}`}>
                    <AddToHotList item={partModel} />
                  </div>
                )}
              </div>
            ))
        )}
        {Object.keys(searchResponseMatched || {}).filter(
          (key) => key !== "filters"
        ).length === 1 &&
          searchResponseMatched?.[Object.keys(searchResponseMatched)[0]]?.data
            ?.length > 0 && (
            <CompanyListingTable
              entries={Object.entries(searchResponseMatched)}
            />
          )}
      </div>

      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
    </div>
  );
};

export default SearchProduct;

import React, { useEffect, useState } from "react";
import css from "@/styles/SearchProducts.module.css";
import ProductsPieChart from "../ProductsPieChart";
import CompanyDetails from "../Popups/CompanyDetails/CompanyDetails";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import LoadingState from "@/LoadingState";
import ErrorStatus from "../Error/ErrorStatus";
import AddToHotList from "./AddToHotlist";
import ProductTableBtn from "./ProductTableBtn";
import ProductTableDetail from "./ProductTableDetail";
import Filter from "./Filter";
import CompanyListingTable from "./Table";
import { searchProductQuery, setTogglePopUp, searchProductHistory, searchByKeyword, clearSearchResponseMatched } from "@/ReduxStore/SearchProductSlice";

const SearchProduct = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const sortBy = queryParams.get("sortBy") || "";
  const sortOrder = queryParams.get("sortOrder") || "";
  const page = parseInt(queryParams.get("page")) || 1;
  const searchString = queryParams.get("query") || "";
  const partModel = queryParams.get("partModel") || "";

  const {
    searchResponseMatched,
    gettingProducts,
    gettingHistory,
    error,
    filterToggle,
    graphToggle,
    togglePopUp,
    appliedFilters,
  } = useSelector((store) => store.searchProductStore);

  console.log("searchResponseMatched", searchResponseMatched)

  useEffect(() => {
    dispatch(clearSearchResponseMatched());
    if (searchString) {
      const parts = searchString.split(" ");
      parts.forEach((part) => {
        dispatch(searchProductQuery({ token, page, sortBy, sortOrder, search: part, filters: appliedFilters || {} }));
      });
    }
    if (partModel) {
      dispatch(searchByKeyword({ token, page, sortBy, sortOrder, partModel, filters: appliedFilters || {} }));
    }
    dispatch(searchProductHistory({ token }));
  }, [location.search, dispatch, token, appliedFilters]);

  const [currentQuery, setCurrentQuery] = useState(searchString || partModel);

  useEffect(() => {
    if (searchString || partModel) {
      setCurrentQuery(searchString || partModel); // Update with latest search or partModel
    }
  }, [searchString, partModel]);

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
  const sortPage = 1;
  const sortPageSize = 20;
  const isKeywordSearch = Boolean(partModel) && !!searchResponseMatched?.foundItems;

  // const noResults =
  // (!searchString && !partModel) ||
  // (partModel
  //   ? !(searchResponseMatched?.foundItems?.length > 0)
  //   : Object.entries(searchResponseMatched || {})
  //       .filter(([key]) => key !== "filters")
  //       .every(([, entry]) => !entry?.data?.length)
  // );

  const noResults =
  partModel
    ? !(searchResponseMatched?.foundItems?.length > 0)
    : Object.entries(searchResponseMatched || {})
        .filter(([key]) => key !== "filters" && key !== "foundItems" && key !== "notFoundPartModels")
        .every(([, part]) =>
          Array.isArray(part?.data) ? part.data.length === 0 :
          Array.isArray(part) ? part.length === 0 : true
        );

  return (
    <div className={`${css.layout} ${noResults ? css.layoutColumnCenter : ""}`}>

      {/* {filterToggle &&
        Object.values(searchResponseMatched).some(
          (part) => part?.data?.length || part?.length > 0
        ) && <Filter currentQuery={currentQuery} />} */}

        {filterToggle &&
  (
    (Array.isArray(searchResponseMatched?.foundItems) && searchResponseMatched.foundItems.length > 0) ||
    Object.entries(searchResponseMatched || {})
      .filter(([key, val]) =>
        key !== "notFoundPartModels" &&
        key !== "filters" &&
        key !== "foundItems" &&
        typeof val === "object" &&
        val !== null &&
        "data" in val
      )
      .some(([, part]) => Array.isArray(part.data) && part.data.length > 0)
  ) && <Filter currentQuery={currentQuery} />}

      <div
        className={`${css.layoutTables} `}
        style={
          Object.keys(searchResponseMatched || {})
            .length <= 0
            ? { margin: "0" }
            : null
        }
      >
        {isKeywordSearch ? (
          (!searchResponseMatched?.foundItems || searchResponseMatched?.foundItems.length === 0) ? (
            <div className="">
              <AddToHotList item={searchString || partModel} />
            </div>
          ) : (
            <div className={css.tableArea}>
              {graphToggle && <ProductsPieChart />}
              <div className={css.productTable}>
                <ProductTableBtn />
                <ProductTableDetail
                  partData={searchResponseMatched?.foundItems || []}
                  partModel={partModel || "All Results"}
                  keyWordPartModel={partModel}
                  totalCount={searchResponseMatched?.totalCount || 0}
                  page={searchResponseMatched?.page || 1}
                  partModels={[]}
                  searchString={searchString}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  // sortPage={sortPage}
                  // sortPageSize={sortPageSize}
                  
                />
              </div>
            </div>
          )
        ) : (
          // Multiple tables for `searchProductQuery`
          Object.entries(searchResponseMatched || {})
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
                        searchString={searchString}
                        sortPageSize={sortPageSize}
                        sortPage={sortPage}
                        token={token}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                      />
                    </div>
                  </div>
                ) : (
                  <div key={`hotlist-${partModel}`}>
                    <AddToHotList item={partModel} />
                  </div>
                )}
              </div>
            ))
        )}

        {isKeywordSearch && searchResponseMatched?.foundItems?.length > 0 && (
          <CompanyListingTable
            entries={
              isKeywordSearch
                ? [["foundItems", { data: searchResponseMatched.foundItems }]] // ✅ wrap in { data: ... }
                : Object.entries(searchResponseMatched)
            }
          />
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
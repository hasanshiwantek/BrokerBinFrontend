import React, { useState, memo, useEffect } from "react";
import css from "@/styles/Filter.module.css";
import { partVariance } from "@/data/tableData";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  setFilterToggle,
  setAppliedFilters,
  clearSearchResponseMatched,
  searchProductQuery,
} from "@/ReduxStore/SearchProductSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Filter = ({ currentQuery }) => {

  const [collapsedSections, setCollapsedSections] = useState({
    manufacturer: false,
    condition: false,
    region: false,
    country: false,
    searchHistory: false,
    partVariance: false,
  });

  const [filters, setFilters] = useState({
  mfg: [],
  cond: [],
  country: [],
  region: [],
});

  const token = Cookies.get("token");
  const location = useLocation();
  // const searchString = location.state || {};
  const { searchResponseMatched, searchHistory, appliedFilters } = useSelector(
    (store) => store.searchProductStore
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle section collapse state
  const toggleSection = (sectionName) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

    // ✅ Merge `data` and `foundItems` to handle both cases correctly
  const allItems = [
    ...(searchResponseMatched?.test?.data || []),
    ...(searchResponseMatched?.foundItems || []),
  ];
  console.log("ALL ITEMS: ",allItems);

  const applyFilters = () => {
  const queryParams = new URLSearchParams(location.search);
  const searchString = queryParams.get("query") || "";
  const partModel = queryParams.get("partModel") || "";
  dispatch(setAppliedFilters(filters));

  const payload = {
    token,
    page: 1,
    filters,
    sortBy: queryParams.get("sortBy") || "",
    sortOrder: queryParams.get("sortOrder") || "",
  };
  if (searchString) {
    dispatch(searchProductQuery({ ...payload, search: searchString }));
  } else if (partModel) {
    dispatch(searchByKeyword({ ...payload, partModel }));
  }
};

useEffect(() => {
  if (appliedFilters && Object.keys(appliedFilters).length > 0) {
    setFilters(appliedFilters);
  }
}, []);

  const handleClearFilters = (event) => {
    event.preventDefault();
    dispatch(clearSearchResponseMatched());
    dispatch(setAppliedFilters({})); // reset Filters..
    navigate(
      `/inventory/search?page=1&query=${encodeURIComponent(currentQuery)}`
    ); // Reset to initial query
    dispatch(searchProductQuery({ token, page: 1, search: currentQuery })); // Fetch initial query data
  };

  const handleCheckboxChange = (key, value) => {
  setFilters((prev) => {
    const alreadySelected = prev[key].includes(value);
    return {
      ...prev,
      [key]: alreadySelected
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    };
  });
};

const filtersFromApi = searchResponseMatched?.filters || {};

const {
  manufacturers = {},
  conditions = {},
  regions = {},
  countries = {},
} = filtersFromApi

  return (
    <div className={css.filterSection}>
      <div id={css.advancedFilters}>
        <div>
          <button
            type="button"
            style={{ color: "#428bca", fontWeight: "600", fontSize: "14px" }}
            onClick={() => dispatch(setFilterToggle())}
          >
            Advanced Filters
            <FaWindowClose style={{ color: "#444" }} />
          </button>
        </div>
        {/* <div>
            <p>Adv</p>
            <button type="button">
              <BsToggleOn />
            </button>
          </div> */}
      </div>
      <>
        {/* Manufacturer Section */}
        <div className={css.interSection}>
          <div>
            <h6>Manufacturer</h6>
            <button type="button" onClick={() => toggleSection("manufacturer")}>
              {collapsedSections.manufacturer ? "+" : "-"}
            </button>
          </div>
          {!collapsedSections.manufacturer && (
            <div>
              {Object.entries(manufacturers).map(([label, count]) => (
                <div key={label}>
                  <input
                    type="checkbox"
                    name="mfg"
                    value={label}
                    id={label}
                    checked={filters.mfg.includes(label)}
                    onChange={() => handleCheckboxChange("mfg", label)}
                  />
                  <label htmlFor={label}>
                    {label} ({count})
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Condition Section */}
        <div className={css.interSection}>
          <div>
            <h6>Condition</h6>
            <button type="button" onClick={() => toggleSection("condition")}>
              {collapsedSections.condition ? "+" : "-"}
            </button>
          </div>
          {!collapsedSections.condition && (
            <div>
              {Object.entries(conditions).map(([label, count]) => (
                <div key={label}>
                  <input 
                  type="checkbox" 
                  name="cond"
                  value={label} 
                  id={label}
                  checked={filters.cond.includes(label)}
                  onChange={() => handleCheckboxChange("cond", label)}  
                  />
                  <label htmlFor={label}>
                    {label} ({count})
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={css.interSection}>
          <div>
            <h6>Region</h6>
            <button type="button" onClick={() => toggleSection("region")}>
              {collapsedSections.region ? "+" : "-"}
            </button>
          </div>
          {!collapsedSections.region && (
            <div>
              {Object.entries(regions).map(([label, count]) => (
                <div key={label}>
                  <input
                    type="checkbox"
                    name="region"
                    value={label}
                    id={label}
                    checked={filters.region.includes(label)}
                    onChange={() => handleCheckboxChange("region", label)}
                  />
                  <label htmlFor={label}>
                    {label} ({count})
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Country Section */}
        <div className={css.interSection}>
          <div>
            <h6>Country</h6>
            <button type="button" onClick={() => toggleSection("country")}>
              {collapsedSections.country ? "+" : "-"}
            </button>
          </div>
          {!collapsedSections.country && (
            <div>
              {Object.entries(countries).map(([label, count]) => (
                <div key={countries}>
                  <input
                    type="checkbox"
                    name="country"
                    value={label}
                    id={countries}
                    checked={filters.country.includes(label)}
                    onChange={() => handleCheckboxChange("country", label)}
                  />
                  <label htmlFor={label}>
                    {label} ({count})
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="submit"
          id={css.applyFilter}
          value="Apply Filters"
          className={css.applyFilterBtn}
          onClick={applyFilters}
        />
        <button 
          className={`${css.applyFilterBtn}   !bg-[#f06622] !rounded`}
          onClick={handleClearFilters}>Clear filters</button>
      </>

      {/* Search History Section */}
      <div className={css.interSection}>
        <div>
          <h6>Search History</h6>
          <button type="button" onClick={() => toggleSection("searchHistory")}>
            {collapsedSections.searchHistory ? "+" : "-"}
          </button>
        </div>
        {!collapsedSections.searchHistory && (
          <div className={css.searchHistory}>
            {searchHistory.map((e) => {
              const searchedDate = new Date(e.searched_at);
              const referenceDate = new Date();
              const isToday =
                searchedDate.toDateString() === referenceDate.toDateString();
              const notToday = referenceDate.getDate() - searchedDate.getDate();

              return (
                <div key={e.id} className={css.querySec}>
                  <span>{e.query}</span>
                  {isToday && <span>today</span>}
                  {!isToday && <span>{notToday} days ago</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Part Variance Section */}
      <div className={css.interSection}>
        <div>
          <h6>Part # / HECI Variance</h6>
          <button type="button" onClick={() => toggleSection("partVariance")}>
            {collapsedSections.partVariance ? "+" : "-"}
          </button>
        </div>
        {!collapsedSections.partVariance && (
          <div className={css.searchHistory}>
            {partVariance.map((e, i) => (
              <div key={i}>{e}</div>
            ))}
          </div>
        )}
        <span id={css.customizeDisplayBtn}>
          <button type="button">
            <NavLink to={"/myprofile/Options"}>Customize Display</NavLink>
          </button>
        </span>
      </div>
    </div>
  );
};

export default memo(Filter);
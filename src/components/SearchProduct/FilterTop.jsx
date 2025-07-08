import React, { useState, memo, useEffect } from "react";
import css from "@/styles/FilterTop.module.css";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  setFilterToggle,
  setAppliedFilters,
  partVariance,
  searchProductQuery,
  searchByKeyword,
} from "@/ReduxStore/SearchProductSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import useDefaultSettings from "../hooks/UseDefaultSettings";
import { setFilterMode } from "@/ReduxStore/SearchProductSlice";
const FilterTop = ({ currentQuery }) => {
  console.log("rendered: Filter");

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
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("partModel") || queryParams.get("query");

  // const searchString = location.state || {};
  const {
    searchResponseMatched,
    searchHistory,
    appliedFilters,
    partVarianceState,
  } = useSelector((store) => store.searchProductStore);

  const filterMode = useSelector(
    (state) => state.searchProductStore.filterMode
  );
  const isAdvanced = filterMode === "advanced";

  const { showFilters, displayFiltersPosition } = useDefaultSettings();

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

  const applyFilters = () => {
    const queryParams = new URLSearchParams(location.search);
    const searchString = queryParams.get("query") || "";
    const partModel = queryParams.get("partModel") || "";
    const sortBy = queryParams.get("sortBy") || "";
    const sortOrder = queryParams.get("sortOrder") || "";
    dispatch(setAppliedFilters(filters));
    const payload = {
      token,
      page: 1,
      filters,
      sortBy,
      sortOrder,
    };
    if (searchString) {
      dispatch(searchProductQuery({ ...payload, search: searchString }));
    } else if (partModel) {
      dispatch(searchByKeyword({ ...payload, partModel }));
    }
  };

  const handleSearchFromHistory = (partModel) => {
    dispatch(setAppliedFilters({})); // Optional: clear filters for fresh search
    navigate(
      `/inventory/search?page=1&query=${encodeURIComponent(partModel)}`,
      {
        replace: true,
      }
    );
  };

  const handleSearchFromVariance = (partModel) => {
    dispatch(setAppliedFilters({})); // Optional: clear filters for fresh search
    navigate(
      `/inventory/search?page=1&partModel=${encodeURIComponent(partModel)}`,
      {
        replace: true,
      }
    );
  };

  useEffect(() => {
    if (appliedFilters && Object.keys(appliedFilters).length > 0) {
      setFilters(appliedFilters);
    }
  }, []);

  useEffect(() => {
    dispatch(partVariance({ token, part: query }));
  }, []);

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
  // console.log("Filters partmodel", filtersFromApi);

  const {
    manufacturers = {},
    conditions = {},
    regions = {},
    countries = {},
  } = filtersFromApi;

  const toggleMode = () => {
    dispatch(setFilterMode(isAdvanced ? "standard" : "advanced"));
  };

  const applySingleFilter = (key, value) => {
    const newFilters = {
      mfg: [],
      cond: [],
      country: [],
      region: [],
      [key]: [value],
    };
    setFilters(newFilters);

    const queryParams = new URLSearchParams(location.search);
    const searchString = queryParams.get("query") || "";
    const partModel = queryParams.get("partModel") || "";
    const sortBy = queryParams.get("sortBy") || "";
    const sortOrder = queryParams.get("sortOrder") || "";

    const payload = {
      token,
      page: 1,
      filters: newFilters, // ✅ updated filters
      sortBy,
      sortOrder,
    };

    if (searchString) {
      dispatch(searchProductQuery({ ...payload, search: searchString }));
    } else if (partModel) {
      dispatch(searchByKeyword({ ...payload, partModel }));
    }
  };

  return (
    <>
      <div className={`${css.filterTopSection} `}>
        <div id={css.advancedFilters}>
          <div className="flex justify-between gap-5 items-center bg-[var(--secondary-bgColor)] border-b-2 border-[#9b9a9a] p-2 ">
            <div>
              <button
                type="button"
                className="flex justify-start gap-2 items-center ml-5"
                style={{
                  color: "#428bca",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
                onClick={() => dispatch(setFilterToggle(false))} // hide filter
              >
                {isAdvanced ? "Advanced Filters" : "Filters"}
                <FaWindowClose style={{ color: "#444" }} />
              </button>
            </div>

            <div>
              <button
                type="button"
                className={`${css.tools_toggle} text-black !text-lg flex mr-5 justify-start gap-2 items-center`}
                onClick={toggleMode}
              >
                {isAdvanced ? "Adv" : "Std"}
                {isAdvanced ? (
                  <BsToggleOn style={{ color: "black" }} size={15} />
                ) : (
                  <BsToggleOff style={{ color: "black" }} size={15} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={css.filterTop}>
          {/* Manufacturer Section */}
          <div className={`${css.interSection}`}>
            <div>
              <h6>Manufacturer</h6>
              <button
                type="button"
                onClick={() => toggleSection("manufacturer")}
              >
                {collapsedSections.manufacturer ? "+" : "-"}
              </button>
            </div>
            {!collapsedSections.manufacturer && (
              <div className="h-[20rem]">
                {Object.entries(manufacturers).map(([label, count]) => (
                  <div key={label}>
                    {isAdvanced ? (
                      <>
                        <input
                          type="checkbox"
                          checked={filters.mfg.includes(label)}
                          onChange={() => handleCheckboxChange("mfg", label)}
                        />
                        <label>
                          {label} ({count})
                        </label>
                      </>
                    ) : (
                      <p
                        onClick={() => applySingleFilter("mfg", label)}
                        style={{ cursor: "pointer" }}
                      >
                        {label} ({count})
                      </p>
                    )}
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
              <div className="h-[20rem]">
                {Object.entries(conditions).map(([label, count]) => (
                  <div key={label}>
                    {isAdvanced ? (
                      <>
                        <input
                          type="checkbox"
                          checked={filters.cond.includes(label)}
                          onChange={() => handleCheckboxChange("cond", label)}
                        />
                        <label>
                          {label} ({count})
                        </label>
                      </>
                    ) : (
                      <p
                        onClick={() => applySingleFilter("cond", label)}
                        style={{ cursor: "pointer" }}
                      >
                        {label} ({count})
                      </p>
                    )}
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
              <div className="h-[20rem]">
                {Object.entries(regions).map(([label, count]) => (
                  <div key={label}>
                    {isAdvanced ? (
                      <>
                        <input
                          type="checkbox"
                          checked={filters.region.includes(label)}
                          onChange={() => handleCheckboxChange("region", label)}
                        />
                        <label>
                          {label} ({count})
                        </label>
                      </>
                    ) : (
                      <p
                        onClick={() => applySingleFilter("region", label)}
                        style={{ cursor: "pointer" }}
                      >
                        {label} ({count})
                      </p>
                    )}
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
              <div className="h-[20rem]">
                {Object.entries(countries).map(([label, count]) => (
                  <div key={label}>
                    {isAdvanced ? (
                      <>
                        <input
                          type="checkbox"
                          checked={filters.country.includes(label)}
                          onChange={() =>
                            handleCheckboxChange("country", label)
                          }
                        />
                        <label>
                          {label} ({count})
                        </label>
                      </>
                    ) : (
                      <p
                        onClick={() => applySingleFilter("country", label)}
                        style={{ cursor: "pointer" }}
                      >
                        {label} ({count})
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={css.interSection}>
            <div>
              <h6>Search History</h6>
              <button
                type="button"
                onClick={() => toggleSection("searchHistory")}
              >
                {collapsedSections.searchHistory ? "+" : "-"}
              </button>
            </div>
            {!collapsedSections.searchHistory && (
              <div className="h-[20rem]">
                {searchHistory.map((e) => {
                  const searchedDate = new Date(e.searched_at);
                  const referenceDate = new Date();
                  const isToday =
                    searchedDate.toDateString() ===
                    referenceDate.toDateString();
                  const notToday =
                    referenceDate.getDate() - searchedDate.getDate();

                  return (
                    <div key={e.id} className={css.querySec}>
                      <span
                        className="cursor-pointer"
                        onClick={() => handleSearchFromHistory(e.query)}
                      >
                        {e.query}
                      </span>
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
              <button
                type="button"
                onClick={() => toggleSection("partVariance")}
              >
                {collapsedSections.partVariance ? "+" : "-"}
              </button>
            </div>
            {!collapsedSections.partVariance && (
              <div className="h-[20rem]">
                {partVarianceState?.map((e, i) => (
                  <div key={i}>
                    <p
                      className="cursor-pointer"
                      onClick={() => handleSearchFromVariance(e)}
                    >
                      {e}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className=" p-1 flex justify-between items-center ">
          <div>
            {isAdvanced && (
              <input
                type="submit"
                id={css.applyFilter}
                value="Apply Filters"
                onClick={applyFilters}
                className="border-blue-500 text-lg rounded-lg "
              />
            )}
          </div>
          <div>
            <button
              type="button"
              className="text-[#444] text-xl  font-semibold"
            >
              <NavLink to={"/myprofile/Options"}>Customize Display</NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(FilterTop);

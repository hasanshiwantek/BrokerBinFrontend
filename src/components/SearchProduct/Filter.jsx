import React, { useState, memo } from "react";
import css from "@/styles/Filter.module.css";
import { partVariance } from "@/data/tableData";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  searchProductFilter,
  setFilterToggle,
  setAppliedFilters,
  clearSearchResponseMatched,
  searchProductQuery,
  // applyFilters
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

  const token = Cookies.get("token");
  const location = useLocation();
  // const searchString = location.state || {};
  const { searchResponseMatched, searchHistory } = useSelector(
    (store) => store.searchProductStore
  );

  // useEffect(() => {
  //   console.log("Updated searchResponseMatched in Filter:", searchResponseMatched);
  // }, [searchResponseMatched]);
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
  

  const manufacturerCount = {};

  Object.values(searchResponseMatched || []).forEach((item) => {
    // console.log("item", item);

    // Check if item contains an array under 'data'
    // const dataItems = Array.isArray(item?.data) ? item?.data : [item]; // If it's not an array, treat the item as a single object
    const dataItems = Array.isArray(item?.data) ? item?.data : [item]; // If it's not an array, treat the item as a single object
    console.log("DATA-ITEMS: ", dataItems);

    dataItems?.forEach((subItem) => {
      const manufacturer = subItem?.mfg;
      console.log("Item in Filter:", subItem);
      console.log("Manufacturer in Filter:", manufacturer);

      if (manufacturer) {
        manufacturerCount[manufacturer] =
          (manufacturerCount[manufacturer] || 0) + 1;
      }
    });
  });

  // Condition Count
  const conditionCount = {};
  Object.values(searchResponseMatched || {})
    .flatMap((item) => (item?.data ? item.data : [item]))
    .forEach((item) => {
      const condition = item?.cond;
      console.log("Condition in Filter:", condition);
      conditionCount[condition] = (conditionCount[condition] || 0) + 1;
      console.log("conditionCount", conditionCount);
    });

  // Region Count
  const regionCount = {};
  Object.values(searchResponseMatched || {})
    .flatMap((item) => (item?.data ? item.data : [item]))
    .forEach((item) => {
      const region = item?.company_region;
      // console.log("region ",region)
      regionCount[region] = (regionCount[region] || 0) + 1;
      // console.log("Region in Filter:", region + " RegionCount: " + regionCount[region]);
    });

  // Country Count
  const countryCount = {};
  Object.values(searchResponseMatched || {})
    .flatMap((item) => (item?.data ? item.data : [item]))
    .forEach((item) => {
      const country = item?.company_country;
      console.log("country ", country);
      countryCount[country] = (countryCount[country] || 0) + 1;
      console.log(
        "Country in Filter:",
        country + " CountryCount: " + countryCount[country]
      );
    });

  // const { searchString, partModel } = useSelector((store) => store.searchProductStore);
  // console.log("partModel from Props:", partModel);

  const submitProductFilter = (event) => {
    event.preventDefault();
    let filters = {};
    const formData = new FormData(event.target);

    formData.forEach((value, key) => {
      if (filters[key]) {
        filters[key].push(value);
      } else {
        filters[key] = [value];
      }
    });

    for (let key in filters) {
      if (Array.isArray(filters[key])) {
        filters[key] = filters[key].join(",");
      }
    }
    const partModels = Object.keys(searchResponseMatched || {});
    filters.partModel = partModels.join(",");

    console.log("filters ", filters);
    console.log("Filters Before Dispatch:", filters);
    // dispatch(searchProductFilter({ token, filters }));
    dispatch(setAppliedFilters(filters));
    dispatch(searchProductFilter({ token, filters }));
    // dispatch(applyFilters(filters));
    // console.log("Filters Applied:", filters);
  };

  const handleClearFilters = (event) => {
    event.preventDefault();
    dispatch(clearSearchResponseMatched());
    dispatch(setAppliedFilters({})); // Clear filters
    navigate(
      `/inventory/search?page=1&query=${encodeURIComponent(currentQuery)}`
    ); // Reset to initial query
    dispatch(searchProductQuery({ token, page: 1, search: currentQuery })); // Fetch initial query data
  };
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
      <form onSubmit={submitProductFilter}>
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
              {Object.entries(manufacturerCount).map(([mfg, count]) => (
                <div key={mfg}>
                  <input type="checkbox" name="mfg" value={mfg} id={mfg} />
                  <label htmlFor={mfg}>
                    {mfg} ({count})
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
              {Object.entries(conditionCount).map(([cond, count]) => (
                <div key={cond}>
                  <input type="checkbox" name="cond" value={cond} id={cond} />
                  <label htmlFor={cond}>
                    {cond} ({count})
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
              {Object.entries(regionCount).map(([region, count]) => (
                <div key={region}>
                  <input
                    type="checkbox"
                    name="company_region"
                    value={region}
                    id={region}
                  />
                  <label htmlFor={region}>
                    {region} ({count})
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
              {Object.entries(countryCount).map(([country, count]) => (
                <div key={country}>
                  <input
                    type="checkbox"
                    name="company_country"
                    value={country}
                    id={country}
                  />
                  <label htmlFor={country}>
                    {country} ({count})
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
        />
        {/* <button 
          className={`${css.applyFilterBtn}   !bg-[#f06622] !rounded`}
          onClick={handleClearFilters}>Clear filters</button> */}
      </form>

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

<<<<<<< HEAD
export default memo(Filter);
=======
export default memo(Filter);
















>>>>>>> 6537f1c6c9f0e00765958119c150f07dd4e41ca6

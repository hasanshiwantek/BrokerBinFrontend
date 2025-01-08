import React, { useState, memo,useEffect } from "react";
import css from "../styles/Filter.module.css";
import { partVariance } from "../data/tableData";
import { BsToggleOn } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  searchProductFilter,
  setFilterToggle,
} from "../ReduxStore/SearchProductSlice";
import { NavLink, useLocation } from "react-router-dom";

const Filter = () => {
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
  const searchString = location.state || {};
  const { searchResponseMatched, searchHistory } = useSelector(
    (store) => store.searchProductStore
  );

  useEffect(() => {
    console.log("Updated searchResponseMatched in Filter:", searchResponseMatched);
  }, [searchResponseMatched]);


  

  const dispatch = useDispatch();

  // Toggle section collapse state
  const toggleSection = (sectionName) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [sectionName]: !prevState[sectionName],
    }));
  };

  // Aggregate counts for filters
  // const manufacturerCount = {};
  // Object.values(searchResponseMatched || []).forEach(item => {
  //   console.log("item", item);
  //   console.log("itemMFG", item?.mfg);  
  //   if (Array.isArray(item.data)) 
  //     item.data.forEach(subItem => {
  //       const manufacturer = subItem?.mfg;
  //       console.log("Item in Filter:", subItem);
  //       console.log("Manufacturer in Filter:", manufacturer);
  
  //       if (manufacturer) {
  //         manufacturerCount[manufacturer] = (manufacturerCount[manufacturer] || 0) + 1;
  //       } else {
  //         console.log("Manufacturer is missing or undefined for item:", subItem);
  //       }
  //     });
  //    else {
  //     console.log("item.data is not an array or missing in item:", item);
  //   }
  // });
  // console.log("Manufacturer Count:", manufacturerCount);




  const manufacturerCount = {};

  Object.values(searchResponseMatched || []).forEach(item => {
    console.log("item", item);
  
    // Check if item contains an array under 'data'
    const dataItems = Array.isArray(item?.data) ? item?.data : [item];  // If it's not an array, treat the item as a single object
  
    dataItems.forEach(subItem => {
      const manufacturer = subItem?.mfg;
      console.log("Item in Filter:", subItem);
      console.log("Manufacturer in Filter:", manufacturer);
  
      if (manufacturer) {
        manufacturerCount[manufacturer] = (manufacturerCount[manufacturer] || 0) + 1;
      }
    });
  });
  
  console.log("Manufacturer Count:", manufacturerCount);
  

  

// Condition Count
const conditionCount = {};
Object.values(searchResponseMatched || {}).flatMap(item => item?.data ? item.data : [item]).forEach((item) => {
  const condition = item?.cond;
  console.log("Condition in Filter:", condition);   
  conditionCount[condition] = (conditionCount[condition] || 0) + 1;
  console.log("conditionCount", conditionCount);
});

// Region Count
const regionCount = {};
Object.values(searchResponseMatched || {}).flatMap(item => item?.data ? item.data : [item]).forEach((item) => {
  const region = item?.company_region;
  console.log("region ",region)
  regionCount[region] = (regionCount[region] || 0) + 1;
  console.log("Region in Filter:", region + " RegionCount: " + regionCount[region]);
});

// Country Count
const countryCount = {};
Object.values(searchResponseMatched || {}).flatMap(item => item?.data ? item.data : [item]).forEach((item) => {
  const country = item?.company_country;
  console.log("country ",country)
  countryCount[country] = (countryCount[country] || 0) + 1;
  console.log("Country in Filter:", country + " CountryCount: " + countryCount[country]);
});









const submitProductFilter = (event) => {
  event.preventDefault();

  let filters = {};
  const formData = new FormData(event.target);

  // Process form data into the filters object
  formData.forEach((value, key) => {
    if (filters[key]) {
      filters[key].push(value);
    } else {
      filters[key] = [value];
    }
  });

  // Convert array values in filters to comma-separated strings
  for (let key in filters) {
    if (Array.isArray(filters[key])) {
      filters[key] = filters[key].join(",");
    }
  }


  console.log("Filters with Part Models:", filters);

  // Dispatch the action with the updated filters
  dispatch(searchProductFilter({ token, filters })).then((response) => {
    console.log("Response from searchProductFilter action:", response);
  });
};


  
  const totalCount=searchResponseMatched?.totalCount;
  const pageSize=searchResponseMatched?.pageSize;
  console.log("Total Count from Filter Page:", totalCount);
  console.log("Page Size from Filter Page:", pageSize);

  const totalPages = Math.ceil(totalCount / pageSize);

  console.log("Total Pages from Filter Page:", totalPages);
  return (
      <div className={css.filterSection}>
        <div id={css.advancedFilters}>
          <div>
            <button
              type="button"
              style={{ color: "#428bca", fontWeight: "600" ,fontSize:"14px" }}
              onClick={() => dispatch(setFilterToggle())}
            >
              Advanced Filters
              <FaWindowClose style={{ color: "#444" }} />
            </button>
          </div>
          <div>
            <p>Adv</p>
            <button type="button">
              <BsToggleOn />
            </button>
          </div>
        </div>
        <form onSubmit={submitProductFilter}>
          {/* Manufacturer Section */}
          <div className={css.interSection}>
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

          {/* Region Section */}
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

          {/* Submit Button */}
          
          <input type="submit" id={css.applyFilter} value="Apply Filters" className={css.applyFilterBtn} />
        </form>

        {/* Search History Section */}
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
            <button
              type="button"
              onClick={() => toggleSection("partVariance")}
            >
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
              <NavLink to={"/myprofile/Options"}>
              Customize Display
              </NavLink>
              </button>
          </span>
        </div>
      </div>
  );
};

export default memo(Filter);

import { React, memo } from "react";
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

const Filter = () => {
  const token = Cookies.get("token");
  const { searchResponse, searchHistory } = useSelector(
    (store) => store.searchProductStore
  );

  const dispatch = useDispatch();

  const manufacturerCount = {};
  searchResponse?.data?.forEach((item) => {
    const manufacturer = item.mfg;
    manufacturerCount[manufacturer] =
      (manufacturerCount[manufacturer] || 0) + 1;
  });

  const conditionCount = {};
  searchResponse?.data?.forEach((item) => {
    const condition = item.cond;
    conditionCount[condition] = (conditionCount[condition] || 0) + 1;
  });

  const regionCount = {};
  searchResponse?.data?.forEach((item) => {
    const region = item?.addedBy?.company?.country;
    regionCount[region] = (regionCount[region] || 0) + 1;
  });

  const countryCount = {};
  searchResponse?.data?.forEach((item) => {
    const country = item?.addedBy?.company?.region;
    countryCount[country] = (countryCount[country] || 0) + 1;
  });

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

    dispatch(searchProductFilter({ token, filters }));
  };

  return (
    <div className={css.filterSection}>
      <div id={css.advancedFilters}>
        <div>
          <button type="button" onClick={() => dispatch(setFilterToggle())}>
            advanced filters
            <FaWindowClose />
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
        <div className={css.interSection}>
          <div>
            <h6>Manufacturer</h6>
            <button type="button">-</button>
          </div>
          <div>
            {Object.entries(manufacturerCount).map(([mfg, count]) => {
              return (
                <div key={mfg}>
                  <input type="checkbox" name="mfg" value={mfg} id={mfg} />
                  <label htmlFor={mfg}>
                    {mfg} ({count})
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={css.interSection}>
          <div>
            <h6>Condition</h6>
            <button type="button">-</button>
          </div>
          <div>
            {Object.entries(conditionCount).map(([cond, count]) => {
              return (
                <div key={cond}>
                  <input type="checkbox" name="cond" value={cond} id={cond} />
                  <label htmlFor={cond}>
                    {cond} ({count})
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className={css.interSection}>
          <div>
            <h6>Region</h6>
            <button type="button">-</button>
          </div>
          <div>
            {Object.entries(regionCount).map(([region, count]) => {
              return (
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
              );
            })}
          </div>
        </div>
        <div className={css.interSection}>
          <div>
            <h6>Country</h6>
            <button type="button">-</button>
          </div>
          <div>
            {Object.entries(countryCount).map(([country, count]) => {
              return (
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
              );
            })}
          </div>
        </div>
        <input type="submit" id={css.applyFilter} value="Apply Filter" />
      </form>

      <div className={css.interSection}>
        <div>
          <h6>Search History</h6>
          <button type="button">-</button>
        </div>
        <div className={css.searchHistory}>
          {searchHistory.map((e) => {
            const searchedDate = new Date(e.searched_at);
            const referenceDate = new Date();

            // Check if both dates are on the same day
            const isToday =
              searchedDate.toDateString() === referenceDate.toDateString();

            const notToday =
              referenceDate.getDate() -
              searchedDate.getDate();

            return (
              <div key={e.id}>
                <span>{e.query}</span>
                {isToday && <span>today</span>}
                {!isToday && <span>{notToday}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className={css.interSection}>
        <div>
          <h6>Part # / HECI Variance</h6>
          <button type="button">-</button>
        </div>
        <div className={css.searchHistory}>
          {partVariance.map((e, i) => {
            return <div key={i}>{e}</div>;
          })}
        </div>
        <span id={css.customizeDisplayBtn}>
          <button type="button">Customize Display</button>
        </span>
      </div>
    </div>
  );
};

export default memo(Filter);

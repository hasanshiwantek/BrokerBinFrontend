import { React, memo } from "react";
import css from "../styles/Filter.module.css";
import { counts, partVariance, searchHistory } from "../data/tableData";
import { BsToggleOn } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { setFilterToggle } from "../ReduxStore/SearchProductSlice";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const { searchResponse } = useSelector((store) => store.searchProductStore);
  console.log(searchResponse);
  const dispatch = useDispatch();

  const manufacturerCount = {};
  searchResponse.forEach((item) => {
    const manufacturer = item.mfg;
    manufacturerCount[manufacturer] =
      (manufacturerCount[manufacturer] || 0) + 1;
  });

  const conditionCount = {};
  searchResponse.forEach((item) => {
    const condition = item.cond;
    conditionCount[condition] = (conditionCount[condition] || 0) + 1;
  });

  const regionCount = {};
  searchResponse.forEach((item) => {
    const region = item.region;
    regionCount[region] = (regionCount[region] || 0) + 1;
  });

  const countryCount = {};
  searchResponse.forEach((item) => {
    const country = item.country;
    countryCount[country] = (countryCount[country] || 0) + 1;
  });

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
      <div className={css.interSection}>
        <div>
          <h6>Manufacturer</h6>
          <button type="button">-</button>
        </div>
        <div>
          {Object.entries(manufacturerCount).map(([key, value]) => {
            return (
              <div key={key}>
                <input type="checkbox" name={key} />
                <p>
                  {key} ({value})
                </p>
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
          {Object.entries(conditionCount).map(([key, value]) => {
            return (
              <div key={key}>
                <input type="checkbox" name={key} />
                <p>
                  {key} ({value})
                </p>
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
          {Object.entries(regionCount).map(([key, value]) => {
            return (
              <div key={key}>
                <input type="checkbox" name={key} />
                <p>
                  {key} ({value})
                </p>
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
          {Object.entries(countryCount).map(([key, value]) => {
            return (
              <div key={key}>
                <input type="checkbox" name={key} />
                <p>
                  {key} ({value})
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <button type="button" id={css.applyFilter}>
        apply filters
      </button>
      <div className={css.interSection}>
        <div>
          <h6>Search History</h6>
          <button type="button">-</button>
        </div>
        <div className={css.searchHistory}>
          {searchHistory.map((e, i) => {
            return (
              <div key={i}>
                <span>{e.product.slice(0, 15)}</span>
                <span>{e.time}</span>
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

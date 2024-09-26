import React from "react";
import css from "../../../styles/Menu/Reports/Company.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  searchProductHistory,
  setSelectedProducts,
} from "../../../ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";
import {
  getMatchYourHits,
  getSupplyAndDemand,
} from "../../../ReduxStore/Reports";
const Company = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchProduct = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    // split by " " and turn into array of string.

    if (formData.searchStrings.trim() === "") {
      alert("Blank search is not allowed");
      return;
    }

    const searchString = formData.searchStrings.split("\n").join(",");

    // Clear selected products
    dispatch(setSelectedProducts([]));

    // Search products history.
    dispatch(searchProductHistory({ token }));

    // Navigate to the search results page with 'page' and 'search' parameters
    const url = `/inventory/search?page=1&search=${encodeURIComponent(
      searchString
    )}`;
    navigate(url, { replace: true });
  };

  const goToMatchYourHits = () => {
    dispatch(getMatchYourHits({ token }));
    navigate("/reports/MatchYourHits", { replace: true });
  };
  const goToSupplyAndDemand = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const supplyAndDemandQuery = Object.fromEntries(formData.entries());
    dispatch(getSupplyAndDemand({ token, supplyAndDemandQuery }));
    navigate(
      `/reports/SupplyAndDemand?query=${supplyAndDemandQuery.partModel}`,
      { replace: true }
    );
  };

  return (
    <div className={css.container}>
      {/* Navigation Tabs */}
      <div className={css.navTabs}>
        <ul>
          <li>
            <Link to={"/reports/Company"}>Company</Link>
          </li>
          <li>
            <Link to={"/reports/sitewide"}>Site Wide</Link>
          </li>
          <li>
            <Link to={"/reports/email"}>Email</Link>
          </li>
          <li>
            <Link>Stats</Link>
          </li>
        </ul>
      </div>

      {/* Overview Section */}
      <div className={css.mainBody}>
        <div className={css.overview}>
          <div className={css.overviewItem}>
            <h3>Overview</h3>
            <p>Our Inventory Count: 0</p>
            <p>Last Uploaded: Today</p>
            <p>Will Expire In: 9 Days</p>
            <p>Want To Sell: 0</p>
            <p>Want To Buy: 0</p>
          </div>
          <div className={css.overviewItem}>
            <h3>My Inventory</h3>
            <p>My Inventory: 0</p>
            <p>Last Uploaded: Today</p>
            <p>Will Expire In: 9 Days</p>
            <p>Want To Sell: 0</p>
            <p>Want To Buy: 0</p>
          </div>
        </div>

        {/* Match Your Hits Section */}
        <div className={css.matchHits}>
          <h3>Match Your Hits</h3>
          <div>
            <Link to={"/reports/MatchYourHits"}>
              <button className={css.basicButton} onClick={goToMatchYourHits}>
                Basic
              </button>
            </Link>
            <Link to={"/reports/MatchYourHits"}>
              <button className={css.basicButton} onClick={goToMatchYourHits}>
                Detailed
              </button>
            </Link>
          </div>
        </div>

        {/* Supply and Demand Section */}
        <div className={css.supplyDemand}>
          <h3>Supply And Demand</h3>
          <form onSubmit={goToSupplyAndDemand}>
            <div>
              <label htmlFor="partModel">Search*</label>
              <input
                type="text"
                id="partModel"
                name="partModel"
                placeholder="Exact Matches Only"
              />
            </div>
            <button className={css.submitButton} type="submit">
              Submit
            </button>
          </form>
        </div>

        {/* Multiple Part Search Section */}
        <div className={css.multiplePartSearch}>
          <h3>Multiple Part Search</h3>
          <form onSubmit={searchProduct}>
            <div>
              <label htmlFor="searchStrings">Search**</label>
              <textarea
                name="searchStrings"
                id="searchStrings"
                rows={2}
              ></textarea>
            </div>
            <input type="submit" className={css.submitButton} value="Submit" />
          </form>
        </div>

        {/* My Vendors Section */}
        <div className={css.myVendors}>
          <h3>My Vendors</h3>
          <Link to={"/myprofile/MyVendors"}>Show My Vendors</Link>
        </div>
      </div>
    </div>
  );
};

export default Company;

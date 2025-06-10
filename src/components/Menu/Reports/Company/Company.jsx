import React from "react";
import css from "../../../../styles/Menu/Reports/Company.module.css";
import { Link, useNavigate,NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  searchProductHistory,
  setSelectedProducts,
} from "../../../../ReduxStore/SearchProductSlice";
import Cookies from "js-cookie";
import {
  getMatchYourHits,
  getSupplyAndDemand,
} from "../../../../ReduxStore/Reports";
import myProfile from "../../../../styles/Menu/Manage/MyProfile.module.css";

const Company = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchProduct = (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const formData = Object.fromEntries(form.entries());
  if (!formData.searchStrings.trim()) {
    alert("Blank search is not allowed");
    return;
  }
  // ✅ Clean input: split by newline, trim each line, remove blanks

  const searchString = formData.searchStrings.trim().split(/\s+/).join(" ");
  if (!searchString) {
  alert("Please enter at least one valid part.");
  return;
}
  dispatch(setSelectedProducts([]));
  dispatch(searchProductHistory({ token }));
  const url = `/inventory/search?page=1&query=${encodeURIComponent(searchString)}`;
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
      <div className={myProfile.profileInfo_links}>
            <ul>
              <li>
                <NavLink
                  to="/reports/Company"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Company</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports/sitewide"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Site Wide</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports/email"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Email</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/reports/serviceStats"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Stats</span>
                </NavLink>
              </li> */}
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

import React,{useEffect} from "react";
import css from "../../../../styles/Menu/Reports/Company.module.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
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
import { fetchBroadCastCount } from "@/ReduxStore/BroadCast";

const Company = () => {
  const { broadcastCount } = useSelector(
      (state) => state.broadcastStore
    );
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
    const rawInput = formData.searchStrings || "";
    // ✅ Clean input: split by newline, trim each line, remove blanks
    const searchString = rawInput
      .trim()
      .split(/[\s\n]+/)
      .filter(Boolean)
      .join(",");
    if (!searchString) {
      alert("Please enter at least one valid part.");
      return;
    }
    dispatch(setSelectedProducts([]));
    dispatch(searchProductHistory({ token }));
    const url = `/inventory/search?page=1&query=${encodeURIComponent(
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


  useEffect(() => {
    dispatch(fetchBroadCastCount({ token }));
  }, []);

  console.log("Broadcast Count From  Company page: ",broadcastCount);
  

  return (
    <div>
      <div className={css.container}>
        {/* Navigation Tabs */}
        <div className={myProfile.profileInfo_links}>
          <ul>
            <li>
              <NavLink
                to="/reports/Company"
                className={({ isActive }) => (isActive ? myProfile.active : "")}
              >
                <span>Company</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports/sitewide"
                className={({ isActive }) => (isActive ? myProfile.active : "")}
              >
                <span>Site Wide</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reports/email"
                className={({ isActive }) => (isActive ? myProfile.active : "")}
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
          <h3>Overview</h3>
          <div className={css.overview}>
            <div className={css.overviewItem}>
              <ul>
                <li>Our Inventory Count: {broadcastCount?.data?.companyCount}</li>
                <li>Last Uploaded: Today</li>
                <li>Will Expire In: 9 Days</li>
                <li>Want To Sell: {broadcastCount?.data?.wtsCount}</li>
                <li>Want To Buy: {broadcastCount?.data?.wtbCount}</li>
              </ul>
            </div>
            <div className={css.overviewItem}>
              <ul>
                <li>My Inventory Count: {broadcastCount?.data?.inventoryCount}</li>
                <li>Last Uploaded: {broadcastCount?.data?.lastUploaded ? "Today" : 0}</li>
                <li>Will Expire In: 9 Days</li>
                <li>Want To Sell: {broadcastCount?.data?.wtsUser}</li>
                <li>Want To Buy: {broadcastCount?.data?.wtbUser}</li>
              </ul>
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
              <div className="flex justify-start items-center gap-5">
                <label htmlFor="partModel" className="!text-[#444]">
                  Search <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="partModel"
                  name="partModel"
                  placeholder="Exact Matches Only"
                />
              </div>
              <div className="text-right">
                <button className={css.submitButton} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Multiple Part Search Section */}
          <div className={css.multiplePartSearch}>
            <h3>Multiple Part Search</h3>
            <form onSubmit={searchProduct}>
              <div className="flex justify-start items-center gap-5">
                <label htmlFor="searchStrings" className="!text-[#444]">
                  Search <span className="text-red-500">**</span>
                </label>
                <textarea
                  name="searchStrings"
                  id="searchStrings"
                  rows="2"
                ></textarea>
              </div>
              <div></div>
              <div className="text-right">
                <button className={css.submitButton} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* My Vendors Section */}
          <div className={css.myVendors}>
            <h3>My Vendors</h3>
            <Link to={"/myprofile/MyVendors"}>Show My Vendors</Link>
          </div>
        </div>
      </div>

      <div>
        <div className={css.companyInfo}>
          <ul>
            <li>
              <span className="text-red-600">*</span> Displays hit count, qty,
              search, and members searching for a particular Part #
            </li>
            <li>
              <span className="text-red-600"> ** </span> Cut and paste multiple
              part numbers out of Excel or enter manually with a space between
              part numbers.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Company;

import React, { useState } from "react";
import css from "../../../styles/Menu/Reports/SiteWide.module.css";
import style from "../../../styles/Menu/Reports/Company.module.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getSupplyAndDemand,
  getTopSearch,
  getTopSearchByManufacturer,
} from "../../../ReduxStore/Reports";
import Cookies from "js-cookie";
import SearchCompanyInventory from "./SearchCompanyInventory";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { initialMFGs } from "@/data/services";
const SiteWide = () => {
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  console.log(selectedManufacturer);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const goToTopSearches = (e, parameter) => {
    console.log("Why Im Running?", e, parameter);
    e.preventDefault();
    // console.log(parameter)
    dispatch(getTopSearch({ token, parameter }));
    navigate(`/reports/topSearches?query=${parameter}`, {
      replace: true,
    });
  };

  const goToTopSearchesWithManufacturer = (e, parameter) => {
    e.preventDefault();
    if (!selectedManufacturer || selectedManufacturer === "Pick One") {
      alert("Please select a manufacturer before performing the search.");
      return;
    }
    dispatch(
      getTopSearchByManufacturer({
        token,
        parameter,
        mfg: selectedManufacturer,
      })
    );
    navigate(
      `/reports/topSearchWithManufacturer?query=${parameter}&manufacturer=${encodeURIComponent(
        selectedManufacturer
      )}`,
      { replace: true }
    );
  };

  return (
    <>
      <div className={style.container}>
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

        <div className={style.mainBody}>
          {/* Top 200 Searched Parts For */}
          <div className={css.section}>
            <h3>Top 200 Searched Parts For</h3>
            <div className={css.buttons}>
              <button
                className={css.orangeButton}
                onClick={(e) => goToTopSearches(e, "yesterday")}
              >
                Yesterday
              </button>
              <button
                className={css.orangeButton}
                onClick={(e) => goToTopSearches(e, "last_7_days")}
              >
                Last 7 Days
              </button>
              <button
                className={css.orangeButton}
                onClick={(e) => goToTopSearches(e, "last_month")}
              >
                Last 30 Days
              </button>
            </div>
          </div>

          {/* Top 200 Searched Parts For with Manufacturer Search */}
          <div className={css.section}>
            <h3>Top 200 Searched Parts For with Manufacturer Search</h3>
            <div className={css.display}>
              <label htmlFor="manufacturer">Manufacturer Search</label>
              <select
                name="platform"
                id="manufacturer"
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
              >
                <option value="Pick One"> Pick One </option>
                {initialMFGs.map((mfg) => (
                  <option key={mfg} value={mfg}>
                    {mfg}
                  </option>
                ))}
              </select>
            </div>
            <div className={css.buttons}>
              <button
                className={css.orangeButton}
                onClick={(e) => goToTopSearchesWithManufacturer(e, "yesterday")}
              >
                Yesterday
              </button>
              <button
                className={css.orangeButton}
                onClick={(e) =>
                  goToTopSearchesWithManufacturer(e, "last_7_days")
                }
              >
                Last 7 Days
              </button>
              <button
                className={css.orangeButton}
                onClick={(e) =>
                  goToTopSearchesWithManufacturer(e, "last_month")
                }
              >
                Last 30 Days
              </button>
            </div>
          </div>

          {/* Supply And Demand */}
          <div className={css.section}>
            <h3>Supply And Demand</h3>
            <form onSubmit={goToSupplyAndDemand}>
              <div className={css.display}>
                <label htmlFor="partModel">
                  Part Search <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="partModel"
                  id="partModel"
                  placeholder="Exact Matches Only"
                />
              </div>
              <div className={css.buttons}>
                <button className={css.orangeButton}>Submit</button>
              </div>
            </form>
          </div>

          {/* Quantities */}
          <div className={css.section}>
            <h3>Quantities</h3>
            <div className={css.section_qualities}>
              <span>
                <p>Want To Buy:</p>
                <p>0</p>
              </span>
              <span>
                <p>Want To Sell:</p>
                <p>0</p>
              </span>
              <span>
                <p>Total Brokercell Items Listed:</p>
                <p>0</p>
              </span>
              <span>
                <p>Total Members Listed:</p>
                <p>0</p>
              </span>
            </div>
          </div>

          {/* View A Company's Inventory */}
          <div className={css.section}>
            <h3>View A Company's Inventory</h3>
            <div className={css.display}>
              <SearchCompanyInventory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteWide;

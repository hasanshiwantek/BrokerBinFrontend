import React, { useEffect, useState } from "react";
import css from "../../../styles/Menu/Reports/TopSearches.module.css";
import style from "../../../styles/Menu/Reports/Company.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import {
  getTopSearch,
  getTopSearchByManufacturer,
  getTopSearchByMfg,
} from "../../../ReduxStore/Reports";
import Cookies from "js-cookie";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { initialMFGs } from "@/data/services";
const TopSearches = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { topSearchData, loading, error } = useSelector(
    (store) => store.reports
  );
  console.log("Top Search Data: ", topSearchData);
  const [selectedMFG, setSelectedMFG] = useState("Show All");

  // Extract 'query' from URL
  const queryParams = new URLSearchParams(location.search);
  const parameter = queryParams.get("query") || "";
  //   console.log(supplyAndDemandData);

  useEffect(() => {
    dispatch(getTopSearch({ token, range: parameter }));
  }, []);

  const goToTopSearches = (e, parameter) => {
    e.preventDefault();
    dispatch(getTopSearch({ token, range: parameter }));
    navigate(`/reports/topSearches?query=${parameter}`, {
      replace: true,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4 text-blue-600 text-lg font-medium"></span>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
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
              className={"text-[var(--primary-color)] font-semibold"}
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
      {/* Recent Searches Section */}
      <div className={css.topSearches}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-[10pt] text-white font-semibold">
              Top 200 Searches {parameter}:
            </h3>
          </div>
          <div className="flex justify-start gap-2 items-center">
            <label htmlFor="manufacturer" className="text-[8pt]">
              Manufacturer:
            </label>
            <select
              name="manufacturer"
              id="manufacturer"
              className="p-2 border-2 border-gray-300"
              value={selectedMFG}
              onChange={(e) => {
                const mfg = e.target.value;
                setSelectedMFG(mfg);
                dispatch(
                  getTopSearchByMfg({ token, range: parameter, mfg: mfg })
                );
              }}
            >
              <option value="showall">Show All</option>
              {initialMFGs?.map((mfg) => (
                <option key={mfg} value={mfg}>
                  {mfg}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>rank</th>
              <th># of hits</th>
              <th>Part #/HECI</th>
              <th>Mfg</th>
              <th>Qty Available</th>
              <th>Avg Price</th>
              <th>Description (Random)</th>
            </tr>
          </thead>
          <tbody>
            {topSearchData.length > 0 ? (
              topSearchData.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>{item.rank}</td>
                    <td>{item.hits}</td>
                    <td>{item.partModel}</td>
                    <td>{item.mfg}</td>
                    <td>{item.qty_available}</td>
                    <td>{item.avg_price}</td>
                    <td>{item.description}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="!text-center !text-red-600 !font-semibold"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>rank</th>
              <th># of hits</th>
              <th>Part #/HECI</th>
              <th>Mfg</th>
              <th>Qty Available</th>
              <th>Avg Price</th>
              <th>Description (Random)</th>
            </tr>
          </tfoot>
        </table>
        <div className={css.topSearchButtons}>
          <button
            type="button"
            className={style.basicButton}
            onClick={(e) => goToTopSearches(e, "last_30_days")}
          >
            Last 30 Days
          </button>
          <button
            type="button"
            className={style.basicButton}
            onClick={(e) => goToTopSearches(e, "last_7_days")}
          >
            Last 7 Days
          </button>
          <button
            type="button"
            className={style.basicButton}
            onClick={(e) => goToTopSearches(e, "yesterday")}
          >
            Yesterday
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSearches;

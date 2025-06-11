import React, { useEffect } from "react";
import css from "../../../styles/Menu/Reports/TopSearches.module.css";
import style from "../../../styles/Menu/Reports/Company.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  getTopSearch,
  getTopSearchByManufacturer,
} from "../../../ReduxStore/Reports";
import Cookies from "js-cookie";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { initialMFGs } from "@/data/services";
const TopSearchWithManufacturer = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { topSearchData, loading, error } = useSelector(
    (store) => store.reports
  );

  // Extract 'query' from URL
  const queryParams = new URLSearchParams(location.search);
  const parameter = queryParams.get("query") || "";
  const mfg = queryParams.get("manufacturer") || "";
  console.log(parameter, mfg);
  console.log("Top search MFG data: ", topSearchData);

  useEffect(() => {
    dispatch(
      getTopSearchByManufacturer({
        token,
        parameter,
        mfg: mfg,
      })
    );
  }, [parameter, mfg]);

  const goToTopSearchesWithManufacturer = (e, parameter) => {
    e.preventDefault();
    // console.log(parameter)
    getTopSearchByManufacturer({
      token,
      parameter,
      mfg: mfg,
    });
    navigate(
      `/reports/topSearchWithManufacturer?query=${parameter}&manufacturer=${encodeURIComponent(
        mfg
      )}`,
      { replace: true }
    );
  };

  const dummyData = [
    {
      id: 1,
      search_count: 245,
      partModel: "HX8357C",
      mfg: "Samsung",
      quantity: 320,
      price: "$5.40",
      productDescription: "7-inch TFT Display Driver",
    },
    {
      id: 2,
      search_count: 198,
      partModel: "STM32F407",
      mfg: "STMicroelectronics",
      quantity: 150,
      price: "$3.75",
      productDescription: "ARM Cortex M4 MCU",
    },
  ];

  if (loading) return <p>Loading...</p>;

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
      {/* Recent Searches Section */}
      <div className={css.topSearches}>
             <div className="flex justify-between items-center">
               <div>
                 <h3 className="text-[10pt] text-white font-semibold">Top 200 Searches {parameter}:</h3>
               </div>
               <div className="flex justify-start gap-2 items-center">
                 <label htmlFor="manufacturer" className="text-[8pt]">Manufacturer:</label>
                 <select name="manufacturer" id="manufacturer" className="p-2 border-2 border-gray-300 ">
                   {initialMFGs?.map((mfg) => (
                     <div key={mfg}>
                       <option value="Show All">Show All</option>
                       <option value={mfg}>{mfg}</option>
                     </div>
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
            {dummyData.length > 0 ? (
              dummyData.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.search_count}</td>
                    <td>{item.partModel}</td>
                    <td>{item.mfg}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.productDescription}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No data found for this manufacturer.
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
            onClick={(e) => goToTopSearchesWithManufacturer(e, "last_month")}
          >
            Last 30 Days
          </button>
          <button
            type="button"
            className={style.basicButton}
            onClick={(e) => goToTopSearchesWithManufacturer(e, "7days")}
          >
            Last 7 Days
          </button>
          <button
            type="button"
            className={style.basicButton}
            onClick={(e) => goToTopSearchesWithManufacturer(e, "yesterday")}
          >
            Yesterday
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSearchWithManufacturer;

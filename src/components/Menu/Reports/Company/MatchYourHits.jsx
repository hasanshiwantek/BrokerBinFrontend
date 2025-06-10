import React, { useEffect } from "react";
import css from "../../../../styles/Menu/Reports/MatchYourHits.module.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMatchYourHits } from "../../../../ReduxStore/Reports";
import Cookies from "js-cookie";
import styles from "../../../Menu/Broadcast/BroadCast.module.css";
import style from "@/styles/Menu/Manage/MyProfile.module.css";

const MatchYourHits = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { matchYourHits, loading, error } = useSelector(
    (store) => store.reports
  );
  const data = [
    {
      detailed: "Detailed",
      D: 71,
      W: 258,
      partmodel: "P00330-B21",
      age: "0 Hrs",
      cond: "REF",
      Clei: "CTS Point Inc.",
      Price: "185",
      Low: "185",
      Heigh: "185",
      Avg: "185",
      mfg: "HP",
      qty: 2,
      description: "Good Model",
    },
  ];
  console.log(data);
  useEffect(() => {
    dispatch(getMatchYourHits({ token }));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className={css.container}>
        {/* Navigation Tabs */}

        <div className={style.profileInfo_links}>
          <ul>
            <li>
              <NavLink
                to={"/reports/Company"}
                end // This ensures the exact match for /myprofile
                className="text-[#2c83ec]"
              >
                <span>Company</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/reports/sitewide"}
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Site Wide</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/reports/email"}
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Email</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/reports/serviceStats"}
                className={({ isActive }) => (isActive ? css.active : "")}
              >
                <span>Stats</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={css.searchBar}>
          <div className={css.searchSec}>
            <h2>Match Your Hits Basic</h2>
            <div>
              <label className="p-4" htmlFor="search" id="search">
                Search By Manufacturer
              </label>
              <input type="text" id="search" className="p-2" />
            </div>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Detailed</th>
              <th>D</th>
              <th>W</th>
              <th>M</th>
              <th>Part#HECLI</th>
              <th>Cond</th>
              <th>Clei</th>
              <th>Price</th>
              <th>Low</th>
              <th>Avg</th>
              <th>High</th>
              <th>Qty </th>
              <th>Mfg</th>
              <th>Age</th>
              <th>Product Description</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate("/reports/detailed", {
                        state: { partModel: item.partmodel },
                      })
                    }
                  >
                    Detailed
                  </td>
                  <td>{item.D}</td>
                  <td>{item.W}</td>
                  <td>{item.M}</td>
                  <td>{item.partmodel}</td>
                  <td>{item.cond}</td>
                  <td>{item.Clei}</td>
                  <td>{item.Price}</td>
                  <td>{item.Low}</td>
                  <td>{item.Avg}</td>
                  <td>{item.Heigh}</td>
                  <td>{item.qty}</td>
                  <td>{item.mfg}</td>
                  <td>{item.age}</td>
                  <td>{item.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="15"
                  className="text-center text-red-600 font-semibold py-4"
                >
                  Part not in your inventory, please try our Site Wide Supply
                  And Demand!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={css.myhInfo}>
        <ul>
          <li>
            <span className="text-red-600">*</span>Hit stats are part number
            based and not MFG or Condition specific
          </li>
          <li>
            <span className="text-red-600"> * </span>D - Searches for the day
          </li>
          <li>
            <span className="text-red-600"> * </span>W - Searches for the week
          </li>
          <li>
            <span className="text-red-600"> * </span>M - Searches for the month
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MatchYourHits;

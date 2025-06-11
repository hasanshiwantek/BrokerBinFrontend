import React, { useEffect, useRef, useState } from "react";
import css from "../../../../styles/Menu/Reports/MatchYourHits.module.css";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMatchYourHits } from "../../../../ReduxStore/Reports";
import Cookies from "js-cookie";
import styles from "../../../Menu/Broadcast/BroadCast.module.css";
import style from "@/styles/Menu/Manage/MyProfile.module.css";
import { initialMFGs } from "@/data/services";
const MatchYourHits = () => {
  const token = Cookies.get("token");
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { matchYourHits, loading, error } = useSelector(
    (store) => store.reports
  );

  const data = matchYourHits || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMFGs, setFilteredMFGs] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const myhData = data?.inventory;
  console.log("Match your hits data: ", myhData);
  useEffect(() => {
    dispatch(getMatchYourHits({ token }));
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredMFGs([]);
      setShowSuggestions(false);
    } else {
      const matches = initialMFGs.filter((mfg) =>
        mfg.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMFGs(matches.slice(0, 10)); // show top 10
      setShowSuggestions(true);
      console.log("Mfgs: ", filteredMFGs);
    }
  };

  const handleSuggestionClick = (mfg) => {
    setSearchTerm(mfg);
    setShowSuggestions(false);
    // Optionally: trigger filter, fetch data etc.
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
              <div className="flex items-start gap-2 w-full max-w-lg">
                <label className="whitespace-nowrap pt-2" htmlFor="search">
                  Search By Manufacturer
                </label>

                <div ref={wrapperRef} className="relative w-full">
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded w-full"
                    autoComplete="off"
                  />

                  {showSuggestions && filteredMFGs.length > 0 && (
                    <ul className="absolute left-0 z-10 w-full bg-white border border-gray-300 max-h-60 overflow-y-auto rounded shadow-md">
                      {filteredMFGs.map((mfg, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(mfg)}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white text-[8pt]"
                        >
                          {mfg}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
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
            {myhData?.length > 0 ? (
              myhData?.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ cursor: "pointer" }}
                    // onClick={() =>
                    //   navigate("/reports/detailed", {
                    //     state: { partModel: item.partmodel },
                    //   })
                    // }
                    onClick={() =>
                      navigate(
                        `/reports/detailed?partModel=${encodeURIComponent(
                          item?.partModel
                        )}&cond=${item?.cond}&mfg=${item?.mfg}`,
                        {
                          state: {
                            partModel: item?.partModel,
                            cond: item?.cond,
                            mfg: item?.mfg,
                          },
                        }
                      )
                    }
                  >
                    Detailed
                  </td>
                  <td>{item.D}</td>
                  <td>{item.W}</td>
                  <td>{item.M}</td>
                  <td>{item.partmodel}</td>
                  <td>{item.cond}</td>
                  <td>{item.heciClei}</td>
                  <td>{item.price}</td>
                  <td>{item.price_stats?.low}</td>
                  <td>{item.price_stats?.average}</td>
                  <td>{item.price_stats?.high}</td>
                  <td>{item.quantity}</td>
                  <td>{item.mfg}</td>
                  <td>{item.age}</td>
                  <td>{item.productDescription}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="15"
                  className="!text-center !text-red-600 !font-semibold !py-4"
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

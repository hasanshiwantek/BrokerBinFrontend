import React, { useEffect } from "react";
import css from "../../../styles/Menu/Reports/TopSearches.module.css";
import style from "../../../styles/Menu/Reports/Company.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getTopSearch } from "../../../ReduxStore/Reports";
import Cookies from "js-cookie";

const TopSearches = () => {
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
  //   console.log(supplyAndDemandData);

  useEffect(() => {
    dispatch(getTopSearch({ token, parameter }));
  }, []);

  const goToTopSearches = (e, parameter) => {
    e.preventDefault();
    // console.log(parameter)
    dispatch(getTopSearch({ token, parameter }));
    navigate(`/reports/topSearches?query=${parameter}`, {
      replace: true,
    });
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={css.container}>
      <div className={style.navTabs}>
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
      {/* Recent Searches Section */}
      <div className={css.topSearches}>
        <h3>Top 200 Searches {parameter}:</h3>
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
            {topSearchData.map((item, i) => {
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
            })}
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
            onClick={(e) => goToTopSearches(e, "last_month")}
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

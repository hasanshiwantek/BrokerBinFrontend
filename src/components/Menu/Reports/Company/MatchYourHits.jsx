import React, { useEffect } from "react";
import css from "../../../../styles/Menu/Reports/MatchYourHits.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMatchYourHits } from "../../../../ReduxStore/Reports";
import Cookies from "js-cookie";
import styles from "../../../Menu/Broadcast/BroadCast.module.css"

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
      description: "Good Model"
    }
  ];
  console.log(data)
  useEffect(() => {
    dispatch(getMatchYourHits({ token }));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

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
            <Link to={"/reports/serviceStats"}>Stats</Link>
          </li>
        </ul>
      </div>


      <div className={css.searchBar}  >
        <div className={css.searchSec}>
          <h2>Match Your Hits Basic</h2>
          <div>
            <label className="p-4" htmlFor="search" id="search">Search By Manufacturer</label>
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
        <tbody>
          {
            data.map((item, index) => (

              <tr key={index} >
                <td
                  style={{ cursor: "pointer",  }}
                  onClick={() =>
                    navigate("/reports/detailed", {
                      state: { partModel: item.partmodel }
                    })
                  }
                >
                  Detailed
                </td>
                <td>{item.D}</td>
                <td>{item.W}</td>
                <td>{item.M}</td>
                <td>{item.partmodel}</td>
                <td>{item.Clei}</td>
                <td>{item.cond}</td>
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

          }
        </tbody>
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
      </table>
    </div>
  );
};

export default MatchYourHits;

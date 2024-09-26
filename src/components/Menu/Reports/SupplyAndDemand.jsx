import React, { useEffect } from "react";
import css from "../../../styles/Menu/Reports/SupplyAndDemand.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { getSupplyAndDemand } from "../../../ReduxStore/Reports";

const SupplyAndDemand = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const dispatch = useDispatch();
  const { supplyAndDemandData, loading, error } = useSelector(
    (store) => store.reports
  );

  // Extract 'page' and 'searchString' from URL
  const queryParams = new URLSearchParams(location.search);
  const searchString = queryParams.get("query") || "";
  const supplyAndDemandQuery = { partModel: searchString };
  //   console.log(supplyAndDemandData);

  useEffect(() => {
    dispatch(getSupplyAndDemand({ token, supplyAndDemandQuery }));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={css.supplyAndDemand}>
      <h1>Supply And Demand</h1>
      {/* Recent Searches Section */}
      <div className={css.recentSearches}>
        <h3>Recent Searches:</h3>
        <table>
          <thead>
            <tr>
              <th>Yesterday</th>
              <th>Last 7 Days</th>
              <th>Last 30 Days</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{supplyAndDemandData?.searches?.yesterday}</td>
              <td>{supplyAndDemandData?.searches?.last_7_days}</td>
              <td>{supplyAndDemandData?.searches?.last_month}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Site Stock Section */}
      <div className={css.siteStock}>
        <h3>Site Stock:</h3>
        <table>
          <thead>
            <tr>
              <th>History</th>
              <th>Mfg</th>
              <th>Cond</th>
              <th>Clei</th>
              <th>Qty</th>
              <th>Low</th>
              <th>Avg</th>
              <th>Hi</th>
            </tr>
          </thead>
          <tbody>
            {supplyAndDemandData?.vendor_inventories?.map((inventory) => {
              return (
                <tr key={inventory.id}>
                  <td>Detailed</td>
                  <td>{inventory.mfg}</td>
                  <td>{inventory.cond}</td>
                  <td>{inventory.heciClei}</td>
                  <td>{inventory.quantity}</td>

                  <td>{supplyAndDemandData.price_stats.low}</td>
                  <td>{supplyAndDemandData.price_stats.average}</td>
                  <td>{supplyAndDemandData.price_stats.high}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Company Stock Section */}
      <div className={css.companyStock}>
        <h3>Company Stock:</h3>
        <table>
          <thead>
            <tr>
              <th>History</th>
              <th>Mfg</th>
              <th>Cond</th>
              <th>Clei</th>
              <th>Qty</th>
              <th>Our Price</th>
              <th>Low</th>
              <th>Avg</th>
              <th>Hi</th>
            </tr>
          </thead>
          <tbody>
            {supplyAndDemandData?.inventory?.map((inventory) => {
              return (
                <tr key={inventory.id}>
                  <td>Detailed</td>
                  <td>{inventory.mfg}</td>
                  <td>{inventory.cond}</td>
                  <td>{inventory.heciClei}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.price}</td>
                  <td>{supplyAndDemandData.price_stats.low}</td>
                  <td>{supplyAndDemandData.price_stats.average}</td>
                  <td>{supplyAndDemandData.price_stats.high}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplyAndDemand;

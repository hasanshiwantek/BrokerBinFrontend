import React, { useEffect, useState } from "react";
import css from "../../../styles/Menu/Reports/SupplyAndDemand.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getSupplyAndDemand } from "../../../ReduxStore/Reports";

const SupplyAndDemand = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputPart, setInputPart] = useState("");
  const { supplyAndDemandData, loading, error } = useSelector(
    (store) => store.reports
  );
  console.log("Supply and Demand Data: ", supplyAndDemandData);

  // Extract 'page' and 'searchString' from URL
  const queryParams = new URLSearchParams(location.search);
  const searchString = queryParams.get("query") || "";
  const supplyAndDemandQuery = { partModel: searchString };
  //   console.log(supplyAndDemandData);

  const handleSearch = () => {
    if (inputPart.trim()) {
      navigate(`/reports/supplyanddemand?query=${encodeURIComponent(inputPart.trim())}`);
    }
  };

  useEffect(() => {
    dispatch(getSupplyAndDemand({ token, supplyAndDemandQuery }));
  }, [token, searchString]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <span className="ml-4 text-blue-600 text-lg font-medium">
          Loading Supply & Demand Data...
        </span>
      </div>
    );
  }

  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={css.supplyAndDemand}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#2c83ec] text-[1.8rem] font-semibold">
            Supply And Demand
          </h1>
        </div>
        <div>
          <div className="flex justify-start items-center gap-4">
            <input
              type="text"
              value={inputPart}
              onChange={(e) => setInputPart(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter Part #"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
      <hr className="border-[2px] border-gray-300 " />
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
            {supplyAndDemandData?.vendor_inventories?.length > 0 ? (
              supplyAndDemandData.vendor_inventories.map((inventory) => (
                <tr key={inventory.id}>
                  <td
                    style={{ cursor: "pointer", fontWeight: "600" }}
                    onClick={() =>
                      navigate(
                        `/reports/detailed?partModel=${encodeURIComponent(
                          inventory.partModel
                        )}`,
                        {
                          state: { cond: inventory.cond, mfg: inventory.mfg },
                        }
                      )
                    }
                  >
                    Detailed
                  </td>
                  <td>{inventory.mfg}</td>
                  <td>{inventory.cond}</td>
                  <td>{inventory.heciClei}</td>
                  <td>{inventory.quantity}</td>
                  <td>{supplyAndDemandData.price_stats?.low}</td>
                  <td>{supplyAndDemandData.price_stats?.average}</td>
                  <td>{supplyAndDemandData.price_stats?.high}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="!text-center !text-red-600 !font-semibold"
                >
                  Part not found, please try another Part!
                </td>
              </tr>
            )}
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
            {supplyAndDemandData?.inventory?.length > 0 ? (
              supplyAndDemandData.inventory.map((inventory) => (
                <tr key={inventory.id}>
                  <td>Detailed</td>
                  <td>{inventory.mfg}</td>
                  <td>{inventory.cond}</td>
                  <td>{inventory.heciClei}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.price}</td>
                  <td>{inventory.price_stats.low}</td>
                  <td>{inventory.price_stats.average}</td>
                  <td>{inventory.price_stats.high}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", color: "red" }}>
                  Part not found in your company inventory!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplyAndDemand;
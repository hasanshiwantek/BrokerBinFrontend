import React, { useState, useEffect } from "react";
import css from "../../../../styles/Menu/Reports/MatchYourHits.module.css";
import styles from "../../../Menu/Broadcast/BroadCast.module.css";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import style from "@/styles/Menu/Manage/MyProfile.module.css";
import { setTogglePopUp } from "@/ReduxStore/SearchProductSlice";
import CompanyDetails from "@/components/Popups/CompanyDetails/CompanyDetails";
import { setPopupCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import SearchProduct from "@/components/SearchProduct/SearchProduct";

const Detailed = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const state = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  // const partModel = location.state?.partModel || ""; // Passed from navigation
  const partModel = queryParams.get("partModel");
  const dispatch = useDispatch();

  const regionsList = [
    { label: "All Regions", value: "All Regions", id: "All Regions" },
    { label: "North America", value: "North America", id: "NorthAmerica" },
    { label: "Middle East", value: "Middle East", id: "MiddleEast" },
    { label: "South America", value: "South America", id: "SouthAmerica" },
    { label: "Europe", value: "Europe", id: "Europe" },
    { label: "Africa", value: "Africa", id: "Africa" },
    { label: "Oceania", value: "Oceania", id: "Oceania" },
    { label: "Asia", value: "Asia", id: "Asia" },
  ];

  const [tableData, setTableData] = useState([]);

  // Simulated fetch — replace with real API call later
  useEffect(() => {
    if (partModel && state.mfg && state.cond) {
      // Call your detailed API here
    }

    // const mockData = [
    //   {
    //     partmodel: partModel,
    //     mfg: "HP",
    //     cond: "REF",
    //     Clei: "CTS Point Inc.",
    //     Price: "185",
    //     qty: 2,
    //     age: "0 Hrs",
    //     description: "Good Model",
    //     D: 71,
    //     W: 258,
    //   },
    // ];
    // setTableData(mockData);
  }, [partModel, state.mfg, state.cond]);

  // COMPANY MODAL LOGIC
  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  const openCompanyModal = (company) => {
    console.log("Opening Company Modal with Company:", company);
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  return (
    <>
      <div className={`${css.container} `}>
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
        {/* Filters Section */}
        <div className={css.searchBar}>
          <div className={css.searchSec}>
            <h2>Match Your Hits Detailed</h2>
            <div className="flex">
              <div>
                <label className="p-4" htmlFor="manufacturer">
                  View Stocked:
                </label>
                <select id="manufacturer" className="p-2">
                  <option value="any">Any</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label className="p-4" htmlFor="product">
                  View:
                </label>

                <select id="product" className="p-2">
                  {regionsList.map((region) => (
                    <option key={region.id} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="p-4" htmlFor="search">
                  Part Search
                </label>
                <input type="text" id="search" className="p-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Table 1: Stock Details */}
        <table className={`${styles.table} mb-3`}>
          <thead>
            <tr>
              <th>Hits (3 months)</th>
              <th>Part #/HECI</th>
              <th>Mfg</th>
              <th>Cond</th>
              <th>Clei</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Age</th>
              <th>Product Description</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tableData.map((item, index) => (
              <tr key={`main-${index}`}>
                <td></td>
                <td>{item.partmodel}</td>
                <td>{item.mfg}</td>
                <td>{item.cond}</td>
                <td>{item.Clei}</td>
                <td>{item.Price}</td>
                <td>{item.qty}</td>
                <td>{item.age}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table 2: Contact Details */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>Age</th>
              <th>Query</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Direct Phone</th>
              <th>Fax</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tableData.map((item, index) => (
              <tr key={`contact-${index}`}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.D}</td>
                <td>{item.W}</td>
                <td>—</td>
                <td>{item.partmodel}</td>
                <td>{item.Clei}</td>
                <td>{item.cond}</td>
                <td>{item.Price}</td>
                <td>{item.qty}</td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr>
              <th></th>
              <th>Age</th>
              <th>Query</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Direct Phone</th>
              <th>Fax</th>
              <th>Qty</th>
            </tr>
          </thead>
        </table>
        <div>
          <div className={css.buttonSec}>
            <button type="button">Send Email</button>
            <button type="button">Check All</button>
          </div>
        </div>
      </div>

      {/* Render search result for the partModel.. */}
      <div>
        <p className="ml-20 !text-[9pt] text-[#444]">Part Search Results</p>
        <hr className=" border-gray-600 " />

        <SearchProduct />
      </div>

      {/* {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
      <ToastContainer position="top-center" autoClose={2000} /> */}
      {/* <Detailed/> */}
    </>
  );
};

export default Detailed;

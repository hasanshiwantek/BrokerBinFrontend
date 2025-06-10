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
import { useSelector,useDispatch } from "react-redux";
import SearchProduct from "@/components/SearchProduct/SearchProduct";

// const Detailed = () => {

//     const data = [
//         {
//           detailed:"Detailed",
//           D:71,
//           W:258,
//           partmodel: "P00330-B21",
//           age: "0 Hrs",
//           cond: "REF",
//           Clei: "CTS Point Inc.",
//           Price: "185",
//           Low: "185",
//           Heigh: "185",
//           Avg: "185",
//           mfg:"HP",
//           qty: 2,
//           description:"Good Model"
//         }
//       ];

//     return (
//         <>
//          <div className={css.container}>
//       {/* {/ Navigation Tabs /} */}
//       <div className={css.navTabs}>
//         <ul>
//           <li>
//             <Link to={"/reports/Company"}>Company</Link>
//           </li>
//           <li>
//             <Link to={"/reports/sitewide"}>Site Wide</Link>
//           </li>
//           <li>
//             <Link to={"/reports/email"}>Email</Link>
//           </li>
//           <li>
//             <Link to={"/reports/serviceStats"}>Stats</Link>
//           </li>
//         </ul>
//       </div>
//       <div className={css.searchBar}  >
//         <div className={css.searchSec}>
//         <h2>Match Your Hits Detailed</h2>
//         <div className="flex">
//         <div>
//             <label className="p-4" htmlFor="manufacturer">View Stocked:</label>
//             <select id="manufacturer" className="p-2">
//                 <option value="">Any</option>
//                 <option value="manufacturer1">Any</option>
//                 <option value="manufacturer2">Any</option>
//                 <option value="manufacturer3">Any</option>
//             </select>
//         </div>

//         <div>
//         <label className="p-4" htmlFor="product">View: </label>
//         <select id="product" className="p-2">
//             <option value="">All Regions</option>
//             <option value="product1"></option>
//             <option value="product2"></option>
//             <option value="product3">3</option>
//         </select>
//         </div>
//         <div>
//           <label className="p-4" htmlFor="search" id="search">Part Search</label>
//           <input type="text" id="search" className="p-2" />
//         </div>
//         </div>

//         </div>
//       </div>

//       <table className={styles.table}>
//           <thead>
//             <tr>

//               <th>Hits (3 months) </th>
//               <th>Part #/HECI</th>
//               <th>Mfg</th>
//               <th>Cond</th>
//               <th>Clei</th>
//               <th>Price</th>
//               <th>Qty</th>
//               <th>Age</th>
//               <th>Product Description</th>

//             </tr>
//           </thead>
//           <tbody>
//            {
//               data.map((item, index) => (

//                   <tr key={index} >
//                     <td></td>
//                     <td>{item.partmodel}</td>
//                     <td>{item.mfg}</td>
//                     <td>{item.cond}</td>
//                     <td>{item.Clei}</td>
//                     <td>{item.Price}</td>
//                     <td>{item.qty}</td>
//                     <td>{item.age}</td>
//                     <td>{item.description}</td>

//                   </tr>

//               ))

//             }
//           </tbody>

//         </table>

//       <table className={styles.table}>
//           <thead>
//             <tr>

//               <th></th>
//               <th>Age</th>
//               <th>Query</th>
//               <th>Contact</th>
//               <th>Company</th>
//               <th>Phone</th>
//               <th>Direct Phone</th>
//               <th>Fax</th>
//               <th>Qty</th>

//             </tr>
//           </thead>
//           <tbody>
//            {
//               data.map((item, index) => (

//                   <tr key={index} >
//                        <td>
//                       <input
//                         type="checkbox"
//                         // checked={!!selectedBroadcast[item.id]}
//                         // onChange={() => handleCheckboxChange(item)}
//                       />
//                     </td>
//                     <td>{item.D}</td>
//                     <td>{item.W}</td>
//                     <td>{item.M}</td>
//                     <td>{item.partmodel}</td>
//                     <td>{item.Clei}</td>
//                     <td>{item.cond}</td>
//                     <td>{item.Price}</td>
//                     <td>{item.Low}</td>

//                   </tr>

//               ))

//             }
//           </tbody>
//           <thead>
//             <tr>
//             <th></th>
//               <th>Age</th>
//               <th>Query</th>
//               <th>Contact</th>
//               <th>Company</th>
//               <th>Phone</th>
//               <th>Direct Phone</th>
//               <th>Fax</th>
//               <th>Qty</th>
//             </tr>
//           </thead>
//         </table>
//     </div>
//         </>
//     );
// };

const Detailed = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const state = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  // const partModel = location.state?.partModel || ""; // Passed from navigation
  const partModel = queryParams.get("partModel");
  const dispatch=useDispatch()

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
                <td >{item.partmodel}</td>
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
      {/* {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
      <ToastContainer position="top-center" autoClose={2000} /> */}
      {/* <Detailed/> */}
      {/* Render search result for the partModel.. */}
      <p>Part Search Results</p>
      <SearchProduct />
    </>
  );
};

export default Detailed;

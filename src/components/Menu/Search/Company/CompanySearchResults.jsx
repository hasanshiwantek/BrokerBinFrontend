import React, { useState, useEffect } from "react";
import css from "../../../../styles/SearchProducts.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import sheildImage from "../../../../assets/shield-img.png";
import { NavLink } from "react-router-dom";
import styles from "../../../../styles/Menu/Manage/MyProfile.module.css";
import {
  setPopupCompanyDetail,
  setTogglePopUp,
} from "../../../../ReduxStore/SearchProductSlice";
import CompanyDetails from "../../../Popups/CompanyDetails/CompanyDetails";
import { inventorySearch } from "../../../../ReduxStore/InventorySlice";
import inventory from "../../../../styles/Menu/Manage/Inventory/Inventory.module.css";
import Cookies from "js-cookie";
import LeafletMap from "./LeafletMap";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { error } from "jquery";
import { CiSearch } from "react-icons/ci";
import RightSidebar from "./RightSidebar";
import MapComponent from "./MapComponent";
import { brokerAPI } from "@/components/api/BrokerEndpoint";

const CompanySearchResults = () => {
  const location = useLocation();
  const [companyData, setCompanyData] = useState(
    location.state?.searchResults || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const token = Cookies.get("token");

  console.log("COMPANY DATA", companyData);

  const handleFiltersUpdate = (filters) => {
    setFilteredData(filters.length > 0 ? filters : companyData); // ✅ Fallback to original data
  };

  const handleSearch = async () => {
    if (searchQuery.length > 2) {
      try {
        const { data: result } = await axios.post(
          `${brokerAPI}company/company-search`,
          {
            data: {
              company: searchQuery,
              keywords: searchQuery,
              location: searchQuery,
            },
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (result.companies.length > 0) {
          console.log("API Response:", result);
          console.log("Before update:", companyData);
          setFilteredData(null);
          setCompanyData(result); // ✅ Update Map with new location
          console.log("Updated companyData:", result.companies[0]);
        }
        console.log("COMPANY RESULTS", companyData);
      } catch (error) {
        console.log("ERROR while searching", error);
      }
    }
  };



  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className={`${styles.main} mr-[auto] ml-[auto] mt-20  !bg-[#e8e8e8] w-[100rem] 2xl:w-[120rem]  `}
    >
      <div className={styles.profileInfo_links}>
        <ul>
          <li>
            <NavLink
              to="/search/Inventory"
              end
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <span>Inventory</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search/Company"
              className={({ isActive }) => (isActive ? css.active : "")}
              style={{ color: "#2c83ec" }}
            >
              <span>Company</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/person"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <span>Person</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <div className="grid grid-cols-[3fr_1fr] border-4 border-gray-300 ">
          <div className="relative">
            {/* Dark Overlay with Centered Search Bar */}
            <div className=" w-full bg-black gap-2 items-center bg-opacity-50 p-6 flex justify-center">
              <input
                type="text"
                placeholder="Search Company / Location / Keywords"
                className="w-full p-2 rounded bg-white text-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <div
                className={`p-3 rounded-sm cursor-pointer transition duration-300 
              ${isClicked
                    ? "bg-blue-700 outline outline-blue-300"
                    : "bg-gray-400 hover:bg-blue-500"
                  }`}
                onClick={() => {
                  setIsClicked(true);
                  handleSearch();
                  setTimeout(() => setIsClicked(false), 200); // Reset after 200ms
                }}
              >
                <CiSearch size={25} className="text-white" />
              </div>
            </div>

            {/* {companyData ? <LeafletMap company={filteredData || companyData} /> : <p>No company data found</p>} */}
            {companyData ? (
              <MapComponent company={filteredData || companyData} />
            ) : (
              <p>No company data found</p>
            )}
          </div>
          <RightSidebar
            company={companyData}
            filteredData={filteredData}
            setFilteredData={setFilteredData}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanySearchResults;

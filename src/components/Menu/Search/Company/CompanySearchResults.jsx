import React, { useState, useEffect } from "react";
import css from "../../../../styles/SearchProducts.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import sheildImage from "../../../../assets/shield-img.png";
import { NavLink } from "react-router-dom";
import styles from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { setPopupCompanyDetail, setTogglePopUp } from "../../../../ReduxStore/SearchProductSlice";
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

const CompanySearchResults = () => {

    const location = useLocation();
    const [companyData, setCompanyData] = useState(location.state?.searchResults || null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(null);

    console.log("COMPANY DATA", companyData)

    const handleFiltersUpdate = (filters) => {
        setFilteredData(filters.length > 0 ? filters : companyData); // ✅ Fallback to original data
    };

    const handleSearch = async () => {
        if (searchQuery.length > 2) {
            try {
                const { data: result } = await axios.get(
                    `http://localhost:5000/companies?company=${searchQuery}`
                );

                if (result.length > 0) {
                    setCompanyData(result[0]); // ✅ Update Map with new location
                }
            } catch (error) {
                console.log("ERROR while searching", error)
            }
        }
    };

    return (
        <div className={`${styles.main} m-28 !bg-[#e8e8e8]`}>
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
                            className={({ isActive }) => (isActive ? css.active : '')}
                        >
                            <span>Company</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/person" className={({ isActive }) => (isActive ? styles.active : "")}>
                            <span>Person</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* <div>
                <h2>Company Location</h2>
                {companyData ? <LeafletMap company={companyData} /> : <p>No company data found</p>}
            </div> */}
            <div className="">

                <div className="grid grid-cols-[3fr_1fr] ">
                    {/* Left: Map Section */}
                    <div className="relative">
                        {/* Dark Overlay with Centered Search Bar */}
                        <div className=" w-full bg-black gap-2 items-center bg-opacity-50 p-6 flex justify-center">
                            <input
                                type="text"
                                placeholder="Search Company / Location / Keywords"
                                className="w-1/3 p-2 rounded bg-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <CiSearch
                                onClick={handleSearch}
                                size={25}
                                className="text-white cursor-pointer" />
                        </div>

                        {/* Leaflet Map */}
                        {companyData ? <LeafletMap company={filteredData || companyData} /> : <p>No company data found</p>}
                    </div>

                    {/* <div className="bg-gray-200 ">
                    <div className=" w-full bg-black bg-opacity-50 p-7 text-white flex text-[1vw]">
                    <h1>{companyData?.company} Result from </h1>
                    </div>
                </div> */}

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
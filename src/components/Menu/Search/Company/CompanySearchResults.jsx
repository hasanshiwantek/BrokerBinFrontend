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
import MapComponent from "./MapComponent";
import { brokerAPI } from "@/components/api/BrokerEndpoint";


const CompanySearchResults = () => {

    const location = useLocation();
    const [companyData, setCompanyData] = useState(location.state?.searchResults || null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    const token = Cookies.get("token");

    console.log("COMPANY DATA", companyData)

    const handleFiltersUpdate = (filters) => {
        setFilteredData(filters.length > 0 ? filters : companyData); // ✅ Fallback to original data
    };

    const handleSearch = async () => {
        if (searchQuery.length > 2) {
            try {
                const { data: result } = await axios.post(
                    `${brokerAPI}company/company-search`,
                    { data: { 
                        company: searchQuery,
                        keywords: searchQuery,
                        location: searchQuery,
                    }},
                    {headers: {Authorization: `Bearer ${token}`}}
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

            <div className="">
                <div className="grid grid-cols-[3fr_1fr] ">
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

                        {/* {companyData ? <LeafletMap company={filteredData || companyData} /> : <p>No company data found</p>} */}
                        {companyData ? <MapComponent company={filteredData || companyData} /> : <p>No company data found</p>}
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
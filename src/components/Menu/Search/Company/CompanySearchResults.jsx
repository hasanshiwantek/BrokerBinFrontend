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
import CompanyMap from "./CompanyMap"
import LeafletMap from "./LeafletMap";

const CompanySearchResults = () => {

    const location = useLocation();
    const companyData = location.state?.searchResults?.[0] || null;
    
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

            <div>
                <h2>Company Location</h2>
                {/* {companyData ? <CompanyMap company={companyData} /> : <p>No company data found</p>} */}
                {companyData ? <LeafletMap company={companyData} /> : <p>No company data found</p>}
            </div>
        
            {/* {togglePopUp && <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />} */}
        </div>
    );
};

export default CompanySearchResults;
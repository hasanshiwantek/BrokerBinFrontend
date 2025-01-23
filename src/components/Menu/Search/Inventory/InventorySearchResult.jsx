import React, { useState } from "react";
import css from "../../../../styles/SearchProducts.module.css";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import sheildImage from "../../../../assets/shield-img.png";
import { NavLink } from "react-router-dom";
import styles from "../../../../styles/Menu/Manage/MyProfile.module.css";

const InventorySearchResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchResults } = location.state;
    const { data, pagination } = searchResults;

    // State to manage current page
    const [currentPage, setCurrentPage] = useState(pagination.currentPage);
    const [selectedRows, setSelectedRows] = useState([]);


    // Handle page change
    const handlePageChange = (newPage) => {
        // Guard to prevent navigation out of valid range
        if (newPage < 1 || newPage > pagination.totalPages) return;

        setCurrentPage(newPage);
        // Optionally, here you could fetch new data based on `newPage`
        // navigate('/path-to-fetch-new-data', { state: { page: newPage } });
    };

    const handleReply = () => {
        if (selectedRows.length === 0) {
            alert("Please select at least one row to reply.");
            return;
        }
        navigate("/rfq/create", { state: { selectedRows } });
    };
    

      const handleCheckboxChange = (rowData) => {
        setSelectedRows((prev) =>
            prev.some((row) => row.id === rowData.id)
                ? prev.filter((row) => row.id !== rowData.id) // Remove if already selected
                : [...prev, rowData] // Add if not selected
        );
    };
    

    return (
        <>
            <div className={`${css.productTableDetail} m-28 !bg-[#e8e8e8]`}>
                <div className={styles.profileInfo_links}>
                    <ul>
                        <li>
                            <NavLink
                                to="/advance"
                                end  // This ensures the exact match for /myprofile
                                className={({ isActive }) => (isActive ? styles.active : '')}
                            >
                                <span>Inventory</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/person"
                                className={({ isActive }) => (isActive ? styles.active : '')}
                            >
                                <span>Person</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={`${css.tableContainer} !bg-[#bfbfbf]`}>
                    <h3 className="m-5 p-3 text-2xl text-white">Inventory Search</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Cart</th>
                                <th>
                                    <img
                                        src={sheildImage}
                                        alt="Shield"
                                        style={{ width: "18px", fontWeight: "bold" }}
                                    />
                                </th>
                                <th>Company</th>
                                <th>PVR</th>
                                <th>Ctry</th>
                                <th>Part / Model</th>
                                <th>TS</th>
                                <th>HECI / CLEI</th>
                                <th>Mfg</th>
                                <th>Cond</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Age</th>
                                <th>Product Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults?.data?.length > 0 ? (searchResults?.data?.map((val, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox"
                                    onChange={() => handleCheckboxChange(val)}
                                    checked={selectedRows.some((row) => row.id === val.id)} /></td>
                                    <td></td>
                                    <td>{val.addedBy.company.name}</td>
                                    <td>10</td>
                                    <td>{val.company_region}</td>
                                    <td>{val.partModel}</td>
                                    <td>No</td>
                                    <td>{val.heciClei}</td>
                                    <td>{val.mfg}</td>
                                    <td>{val.cond}</td>
                                    <td>{val.price}</td>
                                    <td>{val.quantity}</td>
                                    <td>{val.age}</td>
                                    <td>{val.productDescription}</td>
                                </tr>
                            ))) : <tr><td colSpan="15"><h1 className="text-red-700 text-center font-bold">No Result Found</h1></td></tr>}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Cart</th>
                                <th></th>
                                <th>Company</th>
                                <th>PVR</th>
                                <th>Ctry</th>
                                <th>Part / Model</th>
                                <th>TS</th>
                                <th>HECI / CLEI</th>
                                <th>Mfg</th>
                                <th>Cond</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Age</th>
                                <th>Product Description</th>
                            </tr>
                        </tfoot>
                    </table>
                    <div className={css.tablePagination}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="text-gray-600 text-lg font-bold"
                        >
                            Prev
                        </button>
                        <span className="text-white text-lg font-bold">
                            {currentPage}/{pagination.totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === pagination.totalPages}
                            className="text-gray-600 text-lg font-bold"
                        >
                            Next
                        </button>
                        <button type="button" onClick={handleReply} className={`${css.productTableBtn}`}>
                            RFQ
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InventorySearchResult;

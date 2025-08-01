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
import { setHoverCompanyDetail } from "@/ReduxStore/SearchProductSlice";
import LoadingState from "../../../../LoadingState";
import { setBlurWhileLoading } from "@/ReduxStore/ProfleSlice";
import useDefaultSettings from "@/components/hooks/UseDefaultSettings";
import HoverDropdown from "@/HoverDropdown";
import EyeDropdown from "@/EyeDropDown";
import { FaEye } from "react-icons/fa";

const InventorySearchResult = () => {
  const { togglePopUp } = useSelector((store) => store.searchProductStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alternateRowColors, showBorders } = useDefaultSettings();

  const { blurWhileLoading } = useSelector((state) => state.profileStore);

  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 10]); // Start with pages 1 to 10
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "" });

  const token = Cookies.get("token");

  useEffect(() => {
    if (location.state) {
      dispatch(setBlurWhileLoading(false));
      const { searchResults, pagination, filters } = location.state;
      setSearchResults(searchResults.data || []);
      setPagination(pagination);
      setFilters(filters);
      setCurrentPage(filters.page || 1);
      dispatch(setBlurWhileLoading(true));
    } else {
      const params = new URLSearchParams(location.search);
      const fallbackFilters = {};

      for (const [key, value] of params.entries()) {
        fallbackFilters[key] = value;
      }

      fallbackFilters.pageSize = 20;
      const page = parseInt(fallbackFilters.page) || 1;
      setCurrentPage(page);
      fetchPageData(page, fallbackFilters);
      setFilters(fallbackFilters);
    }
  }, []);

  const fetchPageData = async (newPage, customFilters = filters) => {
    dispatch(setBlurWhileLoading(false));
    setLoading(true);
    try {
      const updatedFilters = { ...customFilters, page: newPage };

      const result = await dispatch(
        inventorySearch({ data: updatedFilters, token })
      ).unwrap();

      setSearchResults(result.data || []);
      setPagination(result.pagination || {});
      setFilters(updatedFilters);
      setCurrentPage(newPage);

      const params = new URLSearchParams();
      Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      navigate(`/inventorysearch?${params.toString()}`, { replace: true });
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      setLoading(false);
      dispatch(setBlurWhileLoading(true));
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
      fetchPageData(page);

      // Extend pagination range when reaching the end of the current range
      if (page === visiblePages[1] && page !== pagination.totalPages) {
        setVisiblePages([
          visiblePages[1] + 1,
          Math.min(visiblePages[1] + 10, pagination.totalPages),
        ]);
      }

      // Shrink pagination range when reaching the beginning of the current range
      if (page === visiblePages[0] && page > 1) {
        setVisiblePages([
          Math.max(visiblePages[0] - 10, 1),
          visiblePages[0] - 1,
        ]);
      }
    }
  };

  // Handle Previous Button
  const handlePrevious = () => {
    if (visiblePages[0] > 1) {
      setVisiblePages([Math.max(visiblePages[0] - 10, 1), visiblePages[0] - 1]);
      handlePageChange(visiblePages[0] - 1);
    }
  };

  // Handle Next Button
  const handleNext = () => {
    if (visiblePages[1] < pagination.totalPages) {
      setVisiblePages([
        visiblePages[1] + 1,
        Math.min(visiblePages[1] + 10, pagination.totalPages),
      ]);
      handlePageChange(visiblePages[1] + 1);
    }
  };

  // Handle RFQ creation
  const handleReply = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one row to reply.");
      return;
    }
    navigate("/rfq/create", { state: { selectedRows: selectedRows } });
  };

  // Company Modal Handler
  const handleShowPopupCompanyDetails = (company) => {
    dispatch(setPopupCompanyDetail([company])); // Dispatch company details to Redux store
    dispatch(setTogglePopUp()); // Show company modal
  };

  const handleCheckboxChange = (rowData) => {
    setSelectedRows((prev) => {
      const updatedRows = prev.some((row) => row.id === rowData.id)
        ? prev.filter((row) => row.id !== rowData.id)
        : [...prev, rowData];
      console.log("Updated Selected Rows:", updatedRows); // Correctly logs updated state
      return updatedRows;
    });
  };

  const handleHoverCompanyDetail = (company) => {
    dispatch(setHoverCompanyDetail(company)); // Dispatch company details to Redux store}
  };

  const handleSort = (column) => {
    const newOrder = sortConfig.sortOrder === "asc" ? "desc" : "asc";
    const newSort = { sortBy: column, sortOrder: newOrder };
    setSortConfig(newSort);

    const newFilters = { ...filters, ...newSort };
    fetchPageData(1, newFilters);
  };

  console.log("CURRENT PAGE", currentPage);
  console.log("searchResults", searchResults)

  return (
    <>
      {!blurWhileLoading ? (
        <LoadingState />
      ) : (
        <div
          className={`${css.productTableDetail} m-28 !bg-[#e8e8e8] rounded-lg !p-[6px]`}
        >
          <div className={styles.profileInfo_links}>
            <ul>
              <li>
                <NavLink
                  to="/search/Inventory"
                  end
                  className={`${({ isActive }) =>
                    isActive ? styles.active : ""} !text-[#2c83ec]`}
                >
                  <span>Inventory</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/search/Company" end className={"text-[#444]"}>
                  <span>Company</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/person" className={"text-[#444]"}>
                  <span>Person</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={`${css.tableContainer} !bg-[#bfbfbf]`}>
            <h3 className=" p-2 text-2xl text-white">Inventory Search</h3>
            <table className={showBorders ? css.withBorders : ""}>
              <thead>
                <tr>
                  <th>Cart</th>
                  <th onClick={() => handleSort("company")}>Company</th>
                  <th onClick={() => handleSort("company")}>PVR</th>
                  <th onClick={() => handleSort("company_country")}>Ctry</th>
                  <th onClick={() => handleSort("partModel")}>Part / Model</th>
                  <th onClick={() => handleSort("heciClei")}>HECI / CLEI</th>
                  <th onClick={() => handleSort("mfg")}>Mfg</th>
                  <th onClick={() => handleSort("cond")}>Cond</th>
                  <th onClick={() => handleSort("price")}>Price</th>
                  <th onClick={() => handleSort("quantity")}>Quantity</th>
                  <th onClick={() => handleSort("age")}>Age</th>
                  <th onClick={() => handleSort("productDescription")}>
                    Product Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults?.length > 0 ? (
                  searchResults.map((val, index) => (
                    <tr
                      key={index}
                      className="!whitespace-normal"
                      style={
                        alternateRowColors & (index % 2 === 0)
                          ? { backgroundColor: "#f5f5f5" }
                          : { backgroundColor: "#ffff" }
                      }
                    >
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(val)}
                          checked={selectedRows.some(
                            (row) => row.id === val.id
                          )}
                        />
                      </td>
                      <td>
                        <HoverDropdown
                          type="company"
                          id={val?.addedBy?.company?.id}
                          company={val?.addedBy?.company}
                          triggerElement={
                            <a
                              style={{ color: "#428bca", fontWeight: "600" }}
                              onClick={() =>
                                handleShowPopupCompanyDetails(val?.addedBy?.company)
                              }
                              onMouseEnter={() =>
                                handleHoverCompanyDetail(val.addedBy.company)
                              }
                            >
                              {val?.addedBy?.company?.name}
                            </a>
                          }
                        />
                      </td>
                      <td className="cursor-pointer">
                        <EyeDropdown
                          rowData={val}
                          triggerElement={
                            <div>
                              <FaEye />
                            </div>
                          }
                        />
                      </td>
                      <td>{val.company_region}</td>
                      <td className="cursor-pointer">
                        <HoverDropdown
                          type="part"
                          id={val?.id}
                          rowData={val}
                          triggerElement={<div>{val?.partModel}</div>}
                        />
                      </td>
                      <td>{val.heciClei}</td>
                      <td>{val.mfg}</td>
                      <td>{val.cond}</td>
                      <td>{val.price}</td>
                      <td>{val.quantity}</td>
                      <td>{val.age}</td>
                      <td>{val.productDescription}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="15" className="bg-[#ffff]">
                      <h1 className="text-red-700 text-center font-bold">
                        No Result Found
                      </h1>
                    </td>
                  </tr>
                )}
              </tbody>
              <thead>
                <tr>
                  <th>Cart</th>
                  <th>Company</th>
                  <th>PVR</th>
                  <th>Ctry</th>
                  <th>Part / Model</th>
                  <th>HECI / CLEI</th>
                  <th>Mfg</th>
                  <th>Cond</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Age</th>
                  <th>Product Description</th>
                </tr>
              </thead>
            </table>
            {/* Pagination Controls */}
            <div className=" flex justify-between items-center">
              <button
                type="button"
                onClick={handleReply}
                className="!text-xl !flex !justify-start !gap-8 !py-[0.6rem] !px-8 !bg-blue-500 !text-white !capitalize"
              >
                RFQ
              </button>

              <span className="text-orange-700 text-lg m-3">
                Page <span className="text-blue-800">{currentPage}</span> of{" "}
                <span className="text-blue-800">{pagination.totalPages}</span>
              </span>
              <div className="flex items-center">
                <button
                  onClick={handlePrevious}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md mx-1 ${
                    visiblePages[0] === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                  disabled={visiblePages[0] === 1 || loading}
                >
                  Previous
                </button>

                {/* Dynamic Page Buttons */}
                {[...Array(pagination.totalPages || 1).keys()]
                  .map((page) => page + 1)
                  .filter(
                    (page) => page >= visiblePages[0] && page <= visiblePages[1]
                  )
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 mx-1 rounded-md ${
                        currentPage === page
                          ? "bg-blue-700 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                      }`}
                      disabled={loading}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  onClick={handleNext}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md mx-1 ${
                    visiblePages[1] === pagination.totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                  disabled={
                    visiblePages[1] === pagination.totalPages || loading
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {togglePopUp && (
        <CompanyDetails closeModal={() => dispatch(setTogglePopUp())} />
      )}
    </>
  );
};

export default InventorySearchResult;

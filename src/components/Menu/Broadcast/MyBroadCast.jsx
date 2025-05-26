import React, { useEffect, useState } from "react";
import "../../Menu/Main/MenuBar.css";
import { Link, NavLink } from "react-router-dom";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import styles from "./BroadCast.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchBroadCastData,
  filterBroadCastPartModel,
  fetchBroadCastSortedData,
} from "../../../ReduxStore/BroadCast";
import Cookies from "js-cookie";
import shieldImage from "../../../assets/shield-img.png";
import bullImage from "../../../assets/bullhornn.png";
import {
  computers,
  telecom,
  mobileDevice,
  servicesList,
  initialMFGs,
  scrap,
} from "../../../data/services";
import { useNavigate } from "react-router-dom";
import BroadcastFileModal from "./Send/Field Components/BroadcastFileModal";
import CompanyDetails from "../../Popups/CompanyDetails/CompanyDetails";
import {
  setPopupCompanyDetail,
  setTogglePopUp,
} from "../../../ReduxStore/SearchProductSlice";
import { FaFileAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import SortableTableHeader from "@/components/Tables/SortableHeader";

const BroadCast = () => {
  const broadcastItems = useSelector(
    (state) => state.broadcastStore.broadCastData
  );
  const { togglePopUp, popupCompanyDetail } = useSelector(
    (state) => state.searchProductStore
  );
  const { pagination = {} } = broadcastItems || {}; // Default to empty object if undefined
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlType = searchParams.get("type");

  const { filterBroadcastPartModelData } = useSelector(
    (state) => state.broadcastStore
  );
  const token = Cookies.get("token");
  const currentUserID = Cookies.get("user_id");
  const dispatch = useDispatch();

  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newselectedBroadcast, newsetSelectedBroadcast] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [options, setOptions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [buyInFilters, setBuyInFilters] = useState([]);
  const [inputSearchTerm, setInputSearchTerm] = useState(""); // Temporary state for input field
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMfg, setSelectedMfg] = useState("all");
  const [selectedBroadcast, setSelectedBroadcast] = useState({});
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBroadcast, setFilteredBroadcasts] = useState([]);

  useEffect(() => {
    if (urlType) {
      setFilterType(urlType);
    }
  }, [urlType]);

  // Fetch filtered data when `searchTerm` changes
  useEffect(() => {
    if (searchTerm) {
      console.log("Fetching filtered data for PartModel:", searchTerm);
      setLoading(true);
      dispatch(filterBroadCastPartModel({ token, partModel: searchTerm }))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [dispatch, token, searchTerm]);

  // Extract unique MFGs
  const uniqueMfgs =
    broadcastItems && broadcastItems.broadcasts
      ? [
          ...new Set(
            broadcastItems.broadcasts.map((item) => item.mfg).filter(Boolean)
          ),
        ]
      : [];

  // Pagination Handlers
  // const handlePageChange = (page) => {
  //   if (
  //     page !== currentPage &&
  //     page >= 1 &&
  //     page <= (pagination.last_page || 1)
  //   ) {
  //     console.log("Changing to page:", page); // Debugging
  //     setCurrentPage(page);
  //   }
  // };
  // console.log("Current Page State:", currentPage); // Debugging

  const Regions = [
    "North America",
    "South America",
    "Europe",
    "Asia",
    "Africa",
    "Middle East",
    "Oceania",
  ];

  // Handle region selection
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const filteredBroadcasts = searchTerm
    ? filterBroadcastPartModelData?.broadcasts?.filter(
        (broadcast) =>
          (filterType === "all" || broadcast.type === filterType) && // Filter by type
          (selectedMfg === "all" || broadcast.mfg === selectedMfg) && // Filter by Manufacturer
          (selectedRegion === "all" ||
            broadcast.selectedRegion?.includes(selectedRegion)) && // Filter by Region
          (buyInFilters.length === 0 ||
            buyInFilters.includes(broadcast.buy_in)) && // Filter by Buy-In
          (selectedCategory === "all" || // No category filtering
            (selectedCategory === "selectedComputer" &&
              (!selectedSubCategory ||
                broadcast.selectedComputer?.includes(selectedSubCategory))) ||
            (selectedCategory === "selectedTelecom" &&
              (!selectedSubCategory ||
                broadcast.selectedTelecom?.includes(selectedSubCategory))) ||
            (selectedCategory === "selectedScrap" &&
              (!selectedSubCategory ||
                broadcast.selectedScrap?.includes(selectedSubCategory))) ||
            (selectedCategory === "selectedMobileDevices" &&
              (!selectedSubCategory ||
                broadcast.selectedMobileDevices?.includes(
                  selectedSubCategory
                ))) ||
            (selectedCategory === "selectedCompanies" &&
              (!selectedSubCategory ||
                broadcast.selectedCompanies?.includes(selectedSubCategory))) ||
            (selectedCategory === "service" &&
              (!selectedSubCategory ||
                broadcast.service?.includes(selectedSubCategory))))
      )
    : broadcastItems?.broadcasts?.filter(
        (broadcast) =>
          (filterType === "all" || broadcast.type === filterType) && // Filter by type
          (selectedMfg === "all" || broadcast.mfg === selectedMfg) && // Filter by Manufacturer
          (selectedRegion === "all" ||
            broadcast.selectedRegion?.includes(selectedRegion)) && // Filter by Region
          (searchTerm === "" ||
            broadcast.partModel
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())) && // Filter by Search Term
          (buyInFilters.length === 0 ||
            buyInFilters.includes(broadcast.buy_in)) && // Filter by Buy-In
          (selectedCategory === "all" || // No category filtering
            (selectedCategory === "selectedComputer" &&
              (!selectedSubCategory ||
                broadcast.selectedComputer?.includes(selectedSubCategory))) ||
            (selectedCategory === "selectedTelecom" &&
              (!selectedSubCategory ||
                broadcast.selectedTelecom?.includes(selectedSubCategory))) ||
            (selectedCategory === "selectedMobileDevices" &&
              (!selectedSubCategory ||
                broadcast.selectedMobileDevices?.includes(
                  selectedSubCategory
                ))) ||
            (selectedCategory === "selectedScrap" &&
              (!selectedSubCategory ||
                broadcast.selectedScrap?.includes(selectedSubCategory))) ||
            (selectedCategory === "selectedCompanies" &&
              (!selectedSubCategory ||
                broadcast.selectedCompanies?.includes(selectedSubCategory))) ||
            (selectedCategory === "service" &&
              (!selectedSubCategory ||
                broadcast.service?.includes(selectedSubCategory))))
      );

  console.log("Filtered Broadcasts:", filteredBroadcasts);
  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Subcategory:", selectedSubCategory);
    console.log("Options:", options);
    console.log("Filtered Broadcasts:", filteredBroadcasts);
  }, [selectedCategory, selectedSubCategory, options, filteredBroadcasts]);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  // Handler for BuyIns
  const handleBuyInChange = (event) => {
    const { name, checked } = event.target;
    setBuyInFilters((prevFilters) => {
      if (checked) {
        // Add the filter
        return [...prevFilters, name];
      } else {
        // Remove the filter
        return prevFilters.filter((filter) => filter !== name);
      }
    });
  };
  // Handle input change for search term
  const handleInputChange = (event) => {
    setInputSearchTerm(event.target.value);
  };

  // Search Button Handler to apply the search term
  const handleSearchClick = () => {
    setSearchTerm(inputSearchTerm.trim()); // Update the main search term to trigger filtering
    setIsSorted(false);
    setCurrentPage(1);
  };

  // Trigger search on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  // Handle Category Change
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubCategory(""); // Reset subcategory when category changes

    if (!broadcastItems?.broadcasts) return;

    switch (category) {
      case "selectedComputer":
        setOptions(
          [
            ...new Set(
              broadcastItems.broadcasts.flatMap(
                (broadcast) => broadcast.selectedComputer || []
              )
            ),
          ].map((subCategory, index) => ({
            id: index,
            value: subCategory,
            label: subCategory,
          }))
        );
        break;
      case "selectedTelecom":
        setOptions(
          [
            ...new Set(
              broadcastItems.broadcasts.flatMap(
                (broadcast) => broadcast.selectedTelecom || []
              )
            ),
          ].map((subCategory, index) => ({
            id: index,
            value: subCategory,
            label: subCategory,
          }))
        );
        break;
      case "selectedMobileDevices":
        setOptions(
          [
            ...new Set(
              broadcastItems.broadcasts.flatMap(
                (broadcast) => broadcast.selectedMobileDevices || []
              )
            ),
          ].map((subCategory, index) => ({
            id: index,
            value: subCategory,
            label: subCategory,
          }))
        );
        break;
      case "selectedScrap":
        setOptions(
          [
            ...new Set(
              broadcastItems.broadcasts.flatMap(
                (broadcast) => broadcast.selectedScrap || []
              )
            ),
          ].map((subCategory, index) => ({
            id: index,
            value: subCategory,
            label: subCategory,
          }))
        );
        break;
      case "selectedCompanies":
        setOptions(
          [
            ...new Set(
              broadcastItems.broadcasts.flatMap(
                (broadcast) => broadcast.selectedCompanies || []
              )
            ),
          ].map((subCategory, index) => ({
            id: index,
            value: subCategory,
            label: subCategory,
          }))
        );
        break;
      case "service":
        setOptions(
          [
            ...new Set(
              broadcastItems.broadcasts.flatMap(
                (broadcast) => broadcast.service || []
              )
            ),
          ].map((subCategory, index) => ({
            id: index,
            value: subCategory,
            label: subCategory,
          }))
        );
        break;
      default:
        setOptions([]); // Clear options if no category is selected
        break;
    }
  };

  const handleCheckboxChange = (broadcast) => {
    setSelectedBroadcast((prevSelected) => ({
      ...prevSelected,
      [broadcast.id]: !prevSelected[broadcast.id], // Toggle the checkbox
    }));
  };

  // Handle Subcategory Change
  const handleSubCategoryChange = (event) => {
    const subCategory = event.target.value;
    setSelectedSubCategory(subCategory);
  };

  const navigate = useNavigate();
  const handleReplyClick = () => {
    const selectedBroadcastIds = Object.keys(selectedBroadcast).filter(
      (id) => selectedBroadcast[id]
    );

    if (selectedBroadcastIds.length === 0) {
      alert("Please select a broadcast to reply to.");
      return;
    }

    if (selectedBroadcastIds.length > 1) {
      alert("You can only reply to one broadcast at a time.");
      return;
    }

    // If only one broadcast is selected, proceed with navigation
    const selected = filteredBroadcasts.find(
      (item) => item.id === parseInt(selectedBroadcastIds[0])
    );
    navigate("/ReplyBroad", { state: { broadcast: selected } });
  };

  const openModal = (broadcast) => {
    newsetSelectedBroadcast(broadcast);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    newsetSelectedBroadcast(null);
  };

  // Company Modal
  const openCompanyModal = (company) => {
    dispatch(setPopupCompanyDetail([company]));
    setIsCompanyModalOpen(true); // Set modal visibility to true
    console.log(
      "Popup company details:",
      company,
      "Toggle State:",
      isCompanyModalOpen
    );
  };

  // Function to close Company modal
  const closeCompanyModal = () => {
    setIsCompanyModalOpen(false); // Set modal visibility to false
  };

  const handleFileDownload = (file) => {
    if (!file) {
      alert("No file available for download.");
      return;
    }

    // Handler for MFG selection
    const handleMfgChange = (event) => {
      setSelectedMfg(event.target.value);
    };

    // Create a new anchor element dynamically
    const anchor = document.createElement("a");
    anchor.href = file; // Set href to the file URL
    anchor.download = file.split("/").pop(); // Suggests a filename to save as, extracting from URL
    document.body.appendChild(anchor); // Append to body
    anchor.click(); // Programmatically click the anchor to trigger download
    document.body.removeChild(anchor); // Clean up and remove the anchor
  };

  useEffect(() => {
    console.log("togglePopUp in BroadCast:", togglePopUp);
  }, [togglePopUp]);

  // SORTING LOGIC

  const headers = [
    { key: "cart", label: "Cart", sortable: false },
    { key: "posted", label: "Posted", sortable: false },
    { key: "shield", label: "", sortable: false },
    { key: "company", label: "Company", sortable: true },
    { key: "country", label: "Ctry", sortable: true },
    { key: "type", label: "Type", sortable: true },
    { key: "view", label: "View", sortable: false },
    { key: "partModel", label: "Part / Model", sortable: true },
    { key: "heciClei", label: "HECI / CLEI", sortable: true },
    { key: "mfg", label: "Mfg", sortable: true },
    { key: "cond", label: "Cond", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "quantity", label: "Quantity", sortable: true },
    { key: "description", label: "Product Description", sortable: true },
  ];

  const extraIcons = {
    shield: shieldImage,
  };

  const [isSorted, setIsSorted] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageNumber, setPageNumber] = useState(1);

  const handleSort = (columnKey) => {
    const newSortOrder =
      sortBy === columnKey && sortOrder === "asc" ? "desc" : "asc";

    setSortBy(columnKey);
    setSortOrder(newSortOrder);
    setIsSorted(true);

    dispatch(
      fetchBroadCastSortedData({
        token,
        sortBy: columnKey,
        sortOrder: newSortOrder,
        pageNumber: 1,
      })
    );
  };

  const handlePageChange = (page) => {
    if (
      page !== currentPage &&
      page >= 1 &&
      page <= (pagination.last_page || 1)
    ) {
      console.log("Changing to page:", page);
      setCurrentPage(page);

      if (isSorted) {
        dispatch(
          fetchBroadCastSortedData({
            token,
            sortBy,
            sortOrder,
            pageNumber: page,
          })
        );
      } else {
        dispatch(fetchBroadCastData({ token, pageNumber: page }));
      }
    }
  };

  // Fetch data when currentPage changes

  useEffect(() => {
    console.log("Fetching data for pageNumber:", currentPage);
    setLoading(true);

    const action = isSorted
      ? fetchBroadCastSortedData({
          token,
          sortBy,
          sortOrder,
          pageNumber: currentPage,
        })
      : fetchBroadCastData({ token, pageNumber: currentPage });

    dispatch(action)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, token, currentPage, sortBy, sortOrder, isSorted]);

  return (
    <>
      <main className={styles.mainSec}>
        <nav className="menu-bar !text-sm">
          <div className={`${myProfile.profileInfo_links} !text-sm`}>
            <ul className="py-0 !h-[7vh] !text-sm">
              <li className="!text-[.7.8vw]">
                <button onClick={handleReplyClick} style={{ color: "black" }}>
                  Reply
                </button>
              </li>
              <li className="!text-[.7.8vw]">
                <NavLink
                  to="/sendbroad"
                  className={({ isActive }) =>
                    isActive ? myProfile.active : ""
                  }
                >
                  <span>Send</span>
                </NavLink>
              </li>
              <li className="!text-[.7.8vw]">
                <NavLink
                  to="/broadcasts"
                  className={({ isActive }) =>
                    isActive ? myProfile.active : ""
                  }
                >
                  <span onClick={() => window.location.reload(200)}>View</span>
                </NavLink>
              </li>
              <li className="!text-[.7.8vw]">
                <NavLink
                  to="/myprofile/broadcastfilter"
                  className={({ isActive }) =>
                    isActive ? myProfile.active : ""
                  }
                >
                  <span>Set Filters</span>
                </NavLink>
              </li>
              <li className="!text-[.7.8vw]">
                <NavLink
                  to="/broadcasthistory"
                  className={({ isActive }) =>
                    isActive ? myProfile.active : ""
                  }
                >
                  <span>History</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className={styles.headerSec}>
          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              {/* MFG Dropdown */}
              <div className={styles.manufacturerDropdown}>
                <span>Manufacturer:&nbsp;</span>
                <select
                  value={selectedMfg}
                  onChange={(e) => setSelectedMfg(e.target.value)}
                  className="w-60"
                >
                  <option value="all">All Manufacturers</option>
                  {initialMFGs.map((mfg, index) => (
                    <option key={index} value={mfg}>
                      {mfg.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              {/* First Dropdown for Category Selection */}
              <div className={styles.manufacturerDropdown}>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="all">All Categories</option>
                  <option value="selectedComputer">Computer</option>
                  <option value="selectedTelecom">Telecom</option>
                  <option value="selectedMobileDevices">Mobile Devices</option>
                  <option value="selectedScrap">Scrap/Recycle</option>

                  {/* <option value="selectedCompanies">Companies</option> */}
                  {/* <option value="service">Services</option> */}
                </select>
              </div>

              {/* Second Dropdown for Dynamic Options */}
              <div>
                <select
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                >
                  {selectedCategory === "all" ? (
                    <option value="">--Choose One--</option>
                  ) : (
                    <option value="">Select Subcategory</option>
                  )}
                  {options.map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.manufacturerDropdown}>
                <select onChange={handleFilterChange}>
                  <option value="all">Type</option>
                  <option value="wts">WTS</option>
                  <option value="wtb">WTB</option>
                  <option value="rfq">RFQ</option>
                </select>
              </div>
              <div className={styles.manufacturerDropdown}>
                {/* <label htmlFor="region">Region:&nbsp;</label> */}
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <option value="all">Regions</option>
                  {Regions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="bulk">Bulk</label>
                <input
                  type="checkbox"
                  name="bulk"
                  id="bulk"
                  onChange={handleBuyInChange}
                />
              </div>
              <div>
                <label htmlFor="wholeUnit">Whole Unit</label>
                <input
                  type="checkbox"
                  name="wholeUnit"
                  id="wholeUnit"
                  onChange={handleBuyInChange}
                />
              </div>
              <div>
                <label htmlFor="container">Container</label>
                <input
                  type="checkbox"
                  name="container"
                  id="container"
                  onChange={handleBuyInChange}
                />
              </div>
              <div>
                <label htmlFor="pallet">Pallet</label>
                <input
                  type="checkbox"
                  name="pallet"
                  id="pallet"
                  onChange={handleBuyInChange}
                />
              </div>

              <div className={styles.searchBroadcastSec}>
                <input
                  type="text"
                  placeholder="Search Broadcasts"
                  value={inputSearchTerm}
                  onChange={handleInputChange} // Updates input field only
                  onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearchClick}>Search</button>
              </div>
            </div>
          </div>
        </div>
        <table className={styles.table}>
          <SortableTableHeader
            headers={headers}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            extraIcons={extraIcons}
          />
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="14" style={{ textAlign: "center" }}>
                  Loading broadcasts...
                </td>
              </tr>
            ) : filteredBroadcasts?.length > 0 ? (
              filteredBroadcasts.map((item, index) =>
                item && item.id ? (
                  <tr
                    key={index}
                    style={
                      item.user_id && String(item.user_id.id) === currentUserID
                        ? { backgroundColor: "#ffb" }
                        : null
                    }
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={!!selectedBroadcast[item.id]}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </td>
                    <td>{item.created_at}</td>
                    <td></td>
                    <td>
                      <span
                        onClick={() => openCompanyModal(item.user_id.company)}
                      >
                        {item.user_id.company.name}
                      </span>
                    </td>
                    <td style={{ textTransform: "uppercase" }}>
                      {item.user_id.company.country}
                    </td>
                    <td
                      className={
                        item.type === "wtb"
                          ? styles["type-wtb"]
                          : item.type === "wts"
                          ? styles["type-wts"]
                          : item.type === "rfq"
                          ? styles["type-rfq"]
                          : ""
                      }
                    >
                      {item.type}
                    </td>
                    <td className="flex">
                      <img
                        src={bullImage}
                        alt=""
                        onClick={() => openModal(item)}
                        style={{ width: "18px", fontWeight: "bold" }}
                      />
                      {item.file && (
                        <div className={styles.tooltipWrapper}>
                          <FaFileAlt
                            onClick={() => handleFileDownload(item.file)}
                            style={{ cursor: "pointer", marginLeft: "8px" }}
                            className={styles.fileIcon}
                          />
                          <span className={styles.tooltip}>Download File</span>
                        </div>
                      )}
                    </td>
                    <td style={{ textTransform: "uppercase" }}>
                      {item.partModel}
                    </td>
                    <td>{item.heciClei}</td>
                    <td>{item.mfg}</td>
                    <td>{item.cond}</td>
                    <td style={{ color: "blue" }}>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.description}</td>
                  </tr>
                ) : null
              )
            ) : (
              <tr>
                <td colSpan="14" style={{ textAlign: "center", color: "red" }}>
                  No broadcasts found for the selected type.
                </td>
              </tr>
            )}
          </tbody>
          <SortableTableHeader
            headers={headers}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            extraIcons={extraIcons}
          />
        </table>
        {/* PAGINATION */}
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </button>

          {[...Array(pagination.last_page || 1).keys()]
            .map((page) => page + 1)
            .filter((page) => {
              // Display logic for pagination
              if (currentPage === 1) {
                return page <= 3; // Show pages 1, 2, 3 when on the first page
              } else if (currentPage === pagination.last_page) {
                return page >= pagination.last_page - 2; // Show the last three pages
              } else {
                return page >= currentPage - 1 && page <= currentPage + 1; // Show the previous, current, and next page
              }
            })
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${styles.pageButton} ${
                  currentPage === page ? styles.active : ""
                }`}
                disabled={loading}
              >
                {page}
              </button>
            ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.last_page || loading}
          >
            Next
          </button>
        </div>
        <div className={styles.replyBtnSec}>
          <button className={styles.replyBtn} onClick={handleReplyClick}>
            Reply
          </button>
        </div>

        {/* Render CompanyDetails Modal Conditionally */}
        {isCompanyModalOpen && popupCompanyDetail.length > 0 && (
          <CompanyDetails closeModal={closeCompanyModal} /> // Pass close function as prop
        )}

        <BroadcastFileModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          broadcast={newselectedBroadcast}
          handleReply={handleReplyClick}
        />
      </main>
    </>
  );
};

export default BroadCast;


import React, { useEffect, useState } from 'react'
import "../../Menu/Main/MenuBar.css"
import { Link, NavLink } from 'react-router-dom'
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import styles from "./BroadCast.module.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchBroadCastData } from '../../../ReduxStore/BroadCast'
import Cookies from "js-cookie";
import shieldImage from "../../../assets/shield-img.png"
import bullImage from "../../../assets/bullhornn.png"
import { computers, telecom, mobileDevice, servicesList } from '../../../data/services'
import { useNavigate } from 'react-router-dom'
import BroadcastFileModal from './Send/Field Components/BroadcastFileModal'
import CompanyDetails from '../../Popups/CompanyDetails/CompanyDetails'
import { setPopupCompanyDetail, setTogglePopUp } from '../../../ReduxStore/SearchProductSlice'
import { FaFileAlt } from "react-icons/fa";

const BroadCast = () => {
  const broadcastItems = useSelector((state) => state.broadcastStore.broadCastData)
  const { pagination = {} } = broadcastItems || {}; // Default to empty object if undefined

  const { togglePopUp, popupCompanyDetail } = useSelector((state) => state.searchProductStore);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newselectedBroadcast, newsetSelectedBroadcast] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [options, setOptions] = useState([]);
  const token = Cookies.get("token");
  const [filterType, setFilterType] = useState('all');
  const [buyInFilters, setBuyInFilters] = useState([]);
  const [inputSearchTerm, setInputSearchTerm] = useState(''); // Temporary state for input field
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBroadcast, setSelectedBroadcast] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const currentUserID = Cookies.get("user_id");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch()

  // Fetch data when currentPage changes
  useEffect(() => {
    console.log("Fetching data for pageNumber:", currentPage);
    setLoading(true);
    dispatch(fetchBroadCastData({ token, pageNumber: currentPage }))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, token, currentPage]); // Make sure `currentPage` is in the dependency array
  
  
// Pagination Handlers
const handlePageChange = (page) => {
  if (page !== currentPage && page >= 1 && page <= (pagination.last_page || 1)) {
    console.log("Changing to page:", page); // Debugging
    setCurrentPage(page);
  }
};

console.log("Current Page State:", currentPage); // Debugging
  const filteredBroadcasts = broadcastItems && broadcastItems.broadcasts
    ? broadcastItems.broadcasts.filter(broadcast =>
      (filterType === 'all' || broadcast.type === filterType) && // Add this condition
      (buyInFilters.length === 0 || buyInFilters.includes(broadcast.buy_in))
      &&
      (searchTerm === '' || broadcast.partModel && broadcast.partModel.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : [];
    console.log("Filtered Broadcasts:", filteredBroadcasts);

  // const filterFiles = filteredBroadcasts.map((item) => {
  //   return item.file

  // })
  // console.log("Files...", filterFiles)
  // Get Logged in IDS
  const uniqueCompanyIds = [...new Set(filteredBroadcasts.map((item) => item.user_id.id))];
  console.log(uniqueCompanyIds.toString());

  // Handler for Types like wtb,wts,rfq...
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  // Handler for BuyIns
  const handleBuyInChange = (event) => {
    const { name, checked } = event.target;
    setBuyInFilters(prevFilters => {
      if (checked) {
        // Add the filter
        return [...prevFilters, name];
      } else {
        // Remove the filter
        return prevFilters.filter(filter => filter !== name);
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
  };

  // Trigger search on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  // Update options based on selected category
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    switch (category) {
      case "computer":
        setOptions(computers);
        break;
      case "telecom":
        setOptions(telecom);
        break;
      case "mobileDevices":
        setOptions(mobileDevice);
        break;
      case "services":
        setOptions(servicesList)
        break;
      default:
        setOptions([]);
        break;
    }
  };

  const handleCheckboxChange = (broadcast) => {
    setSelectedBroadcast((prevSelected) => ({
      ...prevSelected,
      [broadcast.id]: !prevSelected[broadcast.id] // Toggle the checkbox
    }));
  };

  const navigate = useNavigate();
  const handleReplyClick = () => {
    const selectedBroadcastIds = Object.keys(selectedBroadcast).filter(id => selectedBroadcast[id]);

    if (selectedBroadcastIds.length === 0) {
      alert('Please select a broadcast to reply to.');
      return;
    }

    if (selectedBroadcastIds.length > 1) {
      alert('You can only reply to one broadcast at a time.');
      return;
    }

    // If only one broadcast is selected, proceed with navigation
    const selected = filteredBroadcasts.find(item => item.id === parseInt(selectedBroadcastIds[0]));
    navigate('/ReplyBroad', { state: { broadcast: selected } });
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
    console.log("Popup company details:", company, "Toggle State:", isCompanyModalOpen);
  };

  // Function to close Company modal
  const closeCompanyModal = () => {
    setIsCompanyModalOpen(false); // Set modal visibility to false
  };

  const handleFileDownload = (file) => {
    if (!file) {
      alert('No file available for download.');
      return;
    }

    // Create a new anchor element dynamically
    const anchor = document.createElement('a');
    anchor.href = file;  // Set href to the file URL
    anchor.download = file.split('/').pop();  // Suggests a filename to save as, extracting from URL
    document.body.appendChild(anchor);  // Append to body
    anchor.click();  // Programmatically click the anchor to trigger download
    document.body.removeChild(anchor);  // Clean up and remove the anchor
  };

  useEffect(() => {
    console.log("togglePopUp in BroadCast:", togglePopUp);
  }, [togglePopUp]);
  return (
    <>
      <main className={styles.mainSec}>
        <nav className='menu-bar'>
          <div className={myProfile.profileInfo_links}>
            <ul>
              <li>
                <button onClick={handleReplyClick} style={{ color: "black" }}>Reply</button>
              </li>
              <li>
                <NavLink
                  to="/sendbroad"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Send</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/broadcasts"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>View</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myprofile/broadcastfilter"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Set Filters</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/broadcasthistory"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
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
              <div className={styles.manufacturerDropdown}>
                <span> View By:&nbsp;</span>
                <select>
                  <option value="all">Manufacturer</option>
                </select>
              </div>
              {/* First Dropdown for Category Selection */}
              <div className={styles.manufacturerDropdown}>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="all">All</option>
                  <option value="computer">Computers</option>
                  <option value="telecom">Telecom</option>
                  <option value="services">Services</option>
                  <option value="mobileDevices">Mobile Devices</option>
                </select>
              </div>
              {/* Second Dropdown for Dynamic Options */}
              <div>
                <select>
                  {selectedCategory === "all" ? (
                    <option value="">- -Choose one</option>
                  ) : (
                    <option value="">Sub Category</option>
                  )}
                  {options.map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.manufacturerDropdown} >
                <select onChange={handleFilterChange}>
                  <option value="all">Type</option>
                  <option value="wts">WTS</option>
                  <option value="wtb">WTB</option>
                  <option value="rfq">RFQ</option>
                </select>
              </div>
              <div className={styles.manufacturerDropdown}>
                <select>
                  <option value="all">Region</option>
                </select>
              </div>
              <div>
                <label htmlFor="bulk">Bulk</label>
                <input type="checkbox" name="bulk" id="bulk" onChange={handleBuyInChange} />
              </div>
              <div>
                <label htmlFor="wholeUnit">Whole Unit</label>
                <input type="checkbox" name="wholeUnit" id="wholeUnit" onChange={handleBuyInChange} />
              </div>
              <div>
                <label htmlFor="container">Container</label>
                <input type="checkbox" name="container" id="container" onChange={handleBuyInChange} />
              </div>
              <div>
                <label htmlFor="pallet">Pallet</label>
                <input type="checkbox" name="pallet" id="pallet" onChange={handleBuyInChange} />
              </div>
              <div className={styles.searchBroadcastSec}>
                <input
                  type="text"
                  placeholder='Search Broadcasts'
                  value={inputSearchTerm}
                  onChange={handleInputChange} // Updates input field only
                  onKeyDown={handleKeyDown} />
                <button onClick={handleSearchClick}>Search</button>
              </div>
            </div>
          </div>

        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cart</th>
              <th>Posted</th>
              <th><img src={shieldImage} alt="" srcset="" style={{ width: "18px", fontWeight: "bold" }} /> </th>
              <th>Company</th>
              <th>Ctry</th>
              <th>Type</th>
              <th>View</th>
              <th>Part / Model</th>
              <th>HECI/CLEI</th>
              <th>Mfg</th>
              <th>Cond</th>
              <th>Price</th>
              <th>Qty </th>
              <th>Product Description</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="14" style={{ textAlign: "center" }}>Loading broadcasts...</td>
              </tr>
            ) : filteredBroadcasts.length > 0 ? (
              filteredBroadcasts.map((item, index) => (
                item && item.id ? (
                  <tr key={index} style={item.user_id && String(item.user_id.id) === currentUserID ? { color: "red" } : null}>
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
                      <span onClick={() => openCompanyModal(item.user_id.company)}>
                        {item.user_id.company.name}
                      </span>
                    </td>
                    <td>{item.user_id.company.country}</td>
                    <td className={
                      item.type === 'wtb' ? styles['type-wtb'] :
                        item.type === 'wts' ? styles['type-wts'] :
                          item.type === 'rfq' ? styles['type-rfq'] : ''
                    }>
                      {item.type}
                    </td>
                    <td className='flex'>
                      <img src={bullImage} alt="" onClick={() => openModal(item)} style={{ width: "18px", fontWeight: "bold" }} />
                      {
                        item.file ? (
                          <>
                            <FaFileAlt
                              onClick={() => handleFileDownload(item.file)}
                              style={{ cursor: "pointer", marginLeft: "8px" }}
                              className={styles.fileIcon}
                            />
                          </>
                        ) : null
                      }
                    </td>
                    <td style={{ textTransform: "uppercase" }}>{item.partModel}</td>
                    <td>{item.heciClei}</td>
                    <td>{item.mfg}</td>
                    <td>{item.cond}</td>
                    <td style={{ color: "blue" }}>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.description}</td>
                  </tr>
                ) : null
              ))
            ) : (
              <tr>
                <td colSpan="14" style={{ textAlign: "center" }}>
                  No broadcasts found for the selected type.
                </td>
              </tr>
            )}
          </tbody>
          <thead>
            <tr>
              <th>Cart</th>
              <th>Posted</th>
              <th><img src={shieldImage} alt="" srcset="" style={{ width: "18px", fontWeight: "bold" }} /> </th>
              <th>Company</th>
              <th>Ctry</th>
              <th>Type</th>
              <th>View</th>
              <th>Part / Model</th>
              <th>HECI/CLEI</th>
              <th>Mfg</th>
              <th>Cond</th>
              <th>Price</th>
              <th>Qty </th>
              <th>Product Description</th>
            </tr>
          </thead>
        </table>
  {/* Pagination */}
  {/* <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        {[...Array(pagination.last_page || 1).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={currentPage === page + 1 ? 'active' : ''}
            disabled={loading}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.last_page || loading}
        >
          Next
        </button>
      </div> */}











<div className={styles.pagination}>
    <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
    >
        Previous
    </button>

    {/* Calculate the start and end of the displayed page range */}
    {[...Array(pagination.last_page || 1).keys()].slice(
        Math.max(0, currentPage - 1), // Start at currentPage - 1 or 0
        Math.min(currentPage + 2, pagination.last_page) // Show next two pages
    ).map((page) => (
        <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`${styles.pageButton} ${currentPage === page + 1 ? styles.active : ''}`}
            disabled={loading}
        >
            {page + 1}
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
          <button
            className={styles.replyBtn}
            onClick={handleReplyClick}>
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
      </main >
    </>
  )
}

export default BroadCast
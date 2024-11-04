
import React, { useEffect, useState } from 'react';
import css from "../../../styles/Menu/Manage/BroadcastFilters/BroadCastHistory.module.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { fetchBroadCastData } from '../../../ReduxStore/BroadCast';

const BroadCastHistory = () => {
  const broadcastItems = useSelector((state) => state.broadcastStore.broadCastData);
  const loggedInUserId = Cookies.get("user_id");
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState("all"); // State to track selected broadcast type
  const [inputSearchTerm, setInputSearchTerm] = useState(''); // Temporary state for input field
  const [searchTerm, setSearchTerm] = useState('');

  const token = Cookies.get("token");

  useEffect(() => {
    dispatch(fetchBroadCastData({ token }));
  }, [dispatch, token]);

  // Filter broadcasts for the logged-in user
  const userBroadcasts = broadcastItems.broadcasts?.filter(
    (item) => item.user_id.id.toString() === loggedInUserId.toString()
  );

  // Further filter by selectedType if it's not "all"
  const filteredBroadcasts = userBroadcasts
  ?.filter((item) => selectedType === "all" || item.type === selectedType.toLowerCase())
  .filter((item) =>
    searchTerm === '' ||
    item.partModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mfg?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleTypeChange = (event) => {
    setSelectedType(event.target.value); // Update selected type based on dropdown selection
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

  const handleDelete = () => {

  }

  return (
    <>
      <div className={css.container}>
        {/* Tabs */}
        <div className={css.tabs}>
          <ul>
            <li>
              <Link to="/sendbroad">Send</Link>
            </li>
            <li>
              <Link to="/broadcasts">View</Link>
            </li>
            <li>
              <Link to="/myprofile/broadcastfilter">Set Filters</Link>
            </li>
            <li>
              <Link to="/broadcasthistory" className={css.activeTab}>History</Link>
            </li>
          </ul>
        </div>

        {/* Table Section */}
        <div className={css.tableWrapper}>
          <div className={css.tableHeader}>
            <div>
              <button className={css.tabTitle}>BroadCast</button>
            </div>

            {/* Filter by Type Dropdown */}
            <div className={css.manufacturerDropdown}>
              <span> View:&nbsp;</span>
              <select onChange={handleTypeChange} value={selectedType}>
                <option value="all">All Broadcasts</option>
                <option value="WTB">WTB</option>
                <option value="WTS">WTS</option>
                <option value="RFQ">RFQ</option>
              </select>
            </div>

            {/* Part Search */}
            <div className={css.searchBroadcastSec}>
              <input
                type="text"
                placeholder='Search Broadcasts'
                value={inputSearchTerm}
                onChange={handleInputChange} // Updates input field only
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSearchClick}>Search</button>
            </div>



          </div>

          {/* Table */}
          <table className={css.table}>
            <thead>
              <tr>
                <th>cart</th>
                <th>Last Posted</th>
                <th>Type</th>
                <th>View</th>
                <th>Part / Model</th>
                <th>HECI / CLEI</th>
                <th>Mfg</th>
                <th>Price</th>
                <th>QTY</th>
                <th>Product Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredBroadcasts && filteredBroadcasts.length > 0 ? (
                filteredBroadcasts.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{item.created_at}</td>
                    <td className={
                  item.type === 'wtb' ? css['type-wtb'] :
                    item.type === 'wts' ? css['type-wts'] :
                      item.type === 'rfq' ? css['type-rfq'] :
                        ''
                }>
                  {item.type}
                </td>
                    <td>---</td>
                    <td>{item.partModel}</td>
                    <td>{item.heciClei}</td>
                    <td>{item.mfg}</td>
                    <td style={{color:"blue"}}>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No broadcasts found for this type.</td>
                </tr>
              )}
            </tbody>
            <thead>
              <tr>
                <th>cart</th>
                <th>Last Posted</th>
                <th>Type</th>
                <th>View</th>
                <th>Part / Model</th>
                <th>HECI / CLEI</th>
                <th>Mfg</th>
                <th>Price</th>
                <th>QTY</th>
                <th>Product Description</th>
              </tr>
            </thead>
          </table>

          {/* Action Buttons */}
          <div className={css.actionButtons}>
            <button className={css.deleteButton}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BroadCastHistory;

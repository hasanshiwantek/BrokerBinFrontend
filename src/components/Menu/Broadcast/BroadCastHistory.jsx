
import React, { useEffect, useState } from 'react';
import css from "../../../styles/Menu/Manage/BroadcastFilters/BroadCastHistory.module.css";
import { Link,NavLink } from 'react-router-dom';
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { fetchBroadCastData } from '../../../ReduxStore/BroadCast';
import { deleteBroadCastData } from '../../../ReduxStore/BroadCast';

const BroadCastHistory = () => {
  const broadcastItems = useSelector((state) => state.broadcastStore.broadCastData);
  const loggedInUserId = Cookies.get("user_id");
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState("all"); // State to track selected broadcast type
  const [inputSearchTerm, setInputSearchTerm] = useState(''); // Temporary state for input field
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBroadcasts, setSelectedBroadcasts] = useState([]);
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


  // Checkbox Handler
  const handleCheckboxChange = (id) => {
    setSelectedBroadcasts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };


  // Delete Handler
  // const handleDeleteClick = () => {
  //   selectedBroadcasts.forEach(id => {
  //     dispatch(deleteBroadCastData({ token, id }));
  //   });
  //   setSelectedBroadcasts([]); // Clear selections
  // };
  


  // const handleDeleteClick = () => {
  //   if (selectedBroadcasts.length > 0) {
  //     dispatch(deleteBroadCastData({ token, ids: selectedBroadcasts }));
  //     setSelectedBroadcasts([]); // Clear selections after dispatch
  //     alert("Broadcast Deleted")
  //   } else {
  //     console.log("No broadcasts selected for deletion.");
  //   }
  // };
  


  const handleDeleteClick = () => {
    if (selectedBroadcasts.length > 0) {
      dispatch(deleteBroadCastData({ token, ids: selectedBroadcasts })).then(() => {
        dispatch(fetchBroadCastData({ token }));
      });
      setSelectedBroadcasts([]); // Clear selections after dispatch
      alert("Broadcast Deleted");
    } else {
      console.log("No broadcasts selected for deletion.");
    }
  };
  

  return (
    <>
      <div className={css.container}>
        {/* Tabs */}
        <div className={myProfile.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/sendbroad"
                    end  // This ensures the exact match for /myprofile
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

        {/* Table Section */}
        <div className={css.tableWrapper}>
          <div className={css.tableHeader}>
            <div>
              <Link 
              className={css.tabTitle}
              to={'/broadcasts'}>
                BroadCast
              </Link>
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
                      <input type="checkbox"
                       checked={selectedBroadcasts.includes(item.id)}
                       onChange={() => handleCheckboxChange(item.id)}
                       />
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
                  <td colSpan="9">Loading...</td>
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
            <button className={css.deleteButton} onClick={handleDeleteClick} >Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BroadCastHistory;

import React, { useEffect, useState } from 'react'
import "../../Menu/Main/MenuBar.css"
import { Link } from 'react-router-dom'
import styles from "./BroadCast.module.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchBroadCastData } from '../../../ReduxStore/BroadCast'
import Cookies from "js-cookie";
import shieldImage from "../../../assets/shield-img.png"
import bullImage from "../../../assets/bullhornn.png"
import { computers, telecom, mobileDevice, servicesList } from '../../../data/services'

const BroadCast = () => {

  const broadcastItems = useSelector((state) => state.broadcastStore.broadCastData)

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [options, setOptions] = useState([]);

  const token = Cookies.get("token");
  const [filterType, setFilterType] = useState('all');
  const [buyInFilters, setBuyInFilters] = useState([]);
  const [inputSearchTerm, setInputSearchTerm] = useState(''); // Temporary state for input field
  const [searchTerm, setSearchTerm] = useState('');
  // const broadcasts = useSelector(state => state.broadcastStore.broadCastData);
  // const currentUser = useSelector(state => state.auth.currentUser);
  const currentUserID = Cookies.get("user_id");



  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBroadCastData({ token }))

  }, [dispatch, token])



  const filteredBroadcasts = broadcastItems && broadcastItems.broadcasts
    ? broadcastItems.broadcasts.filter(broadcast =>
      (filterType === 'all' || broadcast.type === filterType) && // Add this condition
      (buyInFilters.length === 0 || buyInFilters.includes(broadcast.buy_in))
      &&
      (searchTerm === '' || broadcast.partModel.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : [];


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

  return (
    <>
      <main className={styles.mainSec}>
        <nav className='menu-bar'>
          <ul>
            <li>
              <Link to={'/'}>Reply</Link>
            </li>
            <li>
              <Link to={'/sendbroad'}>Send</Link>
            </li>
            <li>
              <Link to={'/broadcasts"'}>View</Link>
            </li>
            <li>
              <Link to={"/myprofile/broadcastfilter"}>
                Set Filters
              </Link>

            </li>
            <li>
              <Link to={'/broadcasthistory'}>History</Link>
            </li>
          </ul>
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
                  onKeyDown={handleKeyDown}
                />
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
              <th>City</th>
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



            {filteredBroadcasts.map((item, index) => (
              <tr key={index} style={String(item.user_id.id) === currentUserID ? { color: "red" } : null}>
                <td>
                  <input type="checkbox" />
                </td>

                <td>{item.created_at}</td>
                <td></td>
                <td>{item.user_id.company.name}</td>
                <td>{item.user_id.company.country}</td>
                <td className={
                  item.type === 'wtb' ? styles['type-wtb'] :
                    item.type === 'wts' ? styles['type-wts'] :
                      item.type === 'rfq' ? styles['type-rfq'] :
                        ''
                }>
                  {item.type}
                </td>
                <td > <img src={bullImage} alt="" srcset="" style={{ width: "18px", fontWeight: "bold" }} /></td>
                <td style={{textTransform:"uppercase"}}>{item.partModel}</td>
                <td>{item.heciClei}</td>
                <td>{item.mfg}</td>
                <td>{item.cond}</td>
                <td style={{ color: "blue" }}>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.description}</td>
              </tr>

            ))}

          </tbody>

          <thead>
            <tr>
              <th>Cart</th>
              <th>Posted</th>
              <th><img src={shieldImage} alt="" srcset="" style={{ width: "18px", fontWeight: "bold" }} /> </th>
              <th>Company</th>
              <th>City</th>
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

        <div className={styles.replyBtnSec}>
          <button className={styles.replyBtn}>Reply</button>
        </div>
      </main >

    </>
  )
}

export default BroadCast
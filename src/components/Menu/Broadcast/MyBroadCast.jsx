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
import Footer from '../../Footer/Footer'


const BroadCast = () => {


  const token = Cookies.get("token");
  const [filterType, setFilterType] = useState('all');
  const [buyInFilters, setBuyInFilters] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBroadCastData({ token }))

  }, [dispatch, token])

  const broadcastItems = useSelector((state) => state.broadcastStore.broadCastData)
  // console.log("Data:", broadcastItems.broadcasts);


  if (broadcastItems && broadcastItems.broadcasts) {
    const buy_ins = broadcastItems.broadcasts.map(item => item.buy_in)
    console.log("Buy-in values:", buy_ins);
  }
  const filteredBroadcasts = broadcastItems && broadcastItems.broadcasts
  ? broadcastItems.broadcasts.filter(broadcast =>
      (filterType === 'all' || broadcast.type === filterType) && // Add this condition
      (buyInFilters.length === 0 || buyInFilters.includes(broadcast.buy_in))
    )
  : [];

  console.log(filteredBroadcasts);

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
              <Link to={'/'}>View</Link>
            </li>
            <li>
              <Link to={"/myprofile/broadcastfilter"}>
                Set Filters
              </Link>

            </li>
            <li>
              <Link to={'/'}>History</Link>
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

              <div className={styles.manufacturerDropdown}>
                <select>
                  <option value="all">All</option>

                </select>
              </div>

              <div className={styles.manufacturerDropdown}>
                <select>
                  <option value="all">Sub-categories</option>

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
              <th>Mfg</th>
              <th>Cond</th>
              <th>Price</th>
              <th>Qty </th>
              <th>Product Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredBroadcasts.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>

                <td>{item.created_at}</td>
                <td></td>
                <td>{item.user_id.company.name}</td>
                <td>{item.user_id.company.country}</td>
                <td style={{ color: "red" }}>{item.type}</td>
                <td > <img src={bullImage} alt="" srcset="" style={{ width: "18px", fontWeight: "bold" }} /></td>
                <td>{item.partModel}</td>
                <td>{item.mfg}</td>
                <td>{item.cond}</td>
                <td style={{ color: "blue" }}>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </main >

    </>
  )
}

export default BroadCast
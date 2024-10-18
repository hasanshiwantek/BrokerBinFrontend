import React from 'react'
import css from "../../../styles/Menu/Manage/BroadcastFilters/BroadCastHistory.module.css"
import { Link } from 'react-router-dom'
const BroadCastHistory = () => {
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
            <div >
              <button className={css.tabTitle}>BroadCast</button>
       
            </div>


            {/* Manufacturer Dropdown */}
            <div className={css.manufacturerDropdown}>
              <span> View:&nbsp;</span>
              <select>
                <option value="BroadCasts">BroadCasts</option>
                <option value="WTB">WTB</option>
                <option value="WTS">WTS</option>
                <option value="RFQ">RFQ</option>
              </select>
            </div>


            <div className={css.partSearchSec}>
            <span> PartSearch:&nbsp;</span>
            <input type="text" />
            <button className={css.broadcastButton}>Search</button>
            </div>
          </div>

          {/* Table */}
          <table className={css.table}>
            <thead>
              <tr>
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

                    <tr >
                    

                      <td>1</td>
                      <td>4</td>
                      <td>---</td>
                      <td>55</td>
                      <td>tyty</td>
                      <td>978979</td>
                      <td>7676</td>
                      <td>---</td>
                      <td>---</td>
                      
                  
                    </tr>
                  </tbody>

          </table>

          <div className={css.actionButtons}>
     
          <button className={css.deleteButton}>Delete</button>
          </div>


        </div>

      </div>

    </>
  )
}

export default BroadCastHistory
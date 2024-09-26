import { React, useEffect } from 'react';
import css from '../../../styles/Menu/Tools/HotListView.module.css'; // Assuming you have styles in CSS module
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";

import { showHotListItem } from '../../../ReduxStore/ToolsSlice';
const HotListView = () => {

  const items = useSelector((state) => state.toolsStore.myHotListItems) 
  console.log("items:", items);

  const dispatch = useDispatch()
  const token = Cookies.get("token");


  useEffect(() => {
    dispatch(showHotListItem({ token }));
  }, [dispatch, token]);

  return (
    <>
      <div className={css.container}>
        {/* Tabs */}
        <div className={css.tabs}>
          <ul>
            <li>
              <Link to="/hotlist/view" className={css.activeTab}>View</Link>
            </li>
            <li>
              <Link to="/hotlist/add">Add</Link>
            </li>
            <li>
              <Link to="/hotlist/edit">Edit</Link>
            </li>
          </ul>
        </div>

        {/* Table Section */}
        <div className={css.tableWrapper}>
          <div className={css.tableHeader}>
            <button className={css.tabTitle}>Telecom</button>
            <span className={css.subTitle} >Email Reports</span>

            {/* Manufacturer Dropdown */}
            <div className={css.manufacturerDropdown}>
              <span> Manufacturer:&nbsp;</span>
              <select>
                <option value="all">Show All</option>
                <option value="hp">HP</option>
                <option value="dell">Dell</option>
                <option value="lenovo">Lenovo</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <table className={css.table}>
            <thead>
              <tr>
                <th>Details</th>
                <th>D</th>
                <th>W</th>
                <th>M</th>
                <th>Part / Model</th>
                <th>HECI / CLEI</th>
                <th>Mfg</th>
                <th>Cond</th>
                <th>Low</th>
                <th>Avg</th>
                <th>High</th>
                <th>CLP</th>
                <th>Product Description</th>
                <th>Details</th>
              </tr>
            </thead>
              {
                items?.map((item, index) => {
                  return(
                    <tbody key={index}>

                  <tr >
                    <td>
                      <input type="checkbox" />
                    </td>


                    <td>1</td>
                    <td>4</td>
                    <td>---</td>
                    <td>{item.part_model}</td>
                    <td>{item.heciClei}</td>
                    <td>{item.manufacturer}</td>
                    <td>{item.condition}</td>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>6</td>
                    <td>{item.product_description}</td>
                    <td>
                      <button className={css.broadcastButton}>Broadcast</button>
                    </td>
                  </tr>
            </tbody>

                  )


                })
              }





              {/* <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>SP1350ACAG</td>
              <td>---</td>
              <td>---</td>    
              <td>Used</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>0</td>
              <td>---</td>
              <td>
                <button className={css.broadcastButton}>Broadcast</button>
              </td>
            </tr> */}
          </table>

          <div className={css.actionButtons}>
            <button className={css.deleteButton}>Delete</button>
            <button className={css.previewButton}>Preview/Print</button>
          </div>


        </div>

        <div className={css.learnMore}>
          <a href="/learnmore">Learn More</a>
        </div>
      </div>

    </>


  );
};

export default HotListView;

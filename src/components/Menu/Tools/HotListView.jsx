import { React, useEffect } from 'react';
import css from '../../../styles/Menu/Tools/HotListView.module.css'; // Assuming you have styles in CSS module
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import styles from "../../../styles/Menu/Tools/Tools.module.css"
import {  showHotListItem } from '../../../ReduxStore/ToolsSlice';
const HotListView = () => {
  // const [selectedItems, setSelectedItems] = useState([]);
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
            <div >
              <button className={css.tabTitle}>Telecom</button>
              <Link to={"/reports/email"}>
                <button className={css.subTitle} >Email Reports</button>
              </Link>
            </div>


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
                return (
                  <tbody key={index}>

                    <tr >
                      <td>
                        <input type="checkbox"/>
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

    

            <div className={css.guideContainer}>
            <h2>The Hot List</h2>
            <p>
                The Hot List will display detailed statistics for selected part numbers.
                Track and view extensive data for any Part Number or Model of interest! We remove all
                repetitive daily searching with one click. Don't forget you can click on the Details
                to see who's been searching that item!
            </p>
            <div className={css.instructions}>
                <ul>
                    <li>1. Mouse over any part number.</li>
                    <li>2. When menu appears click on Hot List Link (Item is then added).</li>
                    <li>3. Click on the Hot List Icon next to the MyVen link to view.</li>
                </ul>
                <ul style={{marginTop:"10px"}}>
                    <li>1. Click on the Hot List Icon next to the MyVen link.</li>
                    <li>2. Click on Add to add items, click on Edit to edit items or add notes, click on View to view items, or select a part to delete with the Delete button.</li>
                </ul>
                <div style={{marginTop:"10px"}} >
                    <ol>
                    <li>1. Search for items</li>
                        <li>2. Select items to add to your Part Cart</li>
                        <li>3. View your Part Cart</li>
                        <li>4. Select item(s) to add to your Hot List</li>
                    </ol>
                    <p>
                        <strong>*D</strong> - Searches are number based and not MFG or Condition specific<br/>
                        <strong>*W</strong> - Searches for the week<br/>
                        <strong>*M</strong> - Searches for the month<br/>
                        <strong>*CLP</strong> - Companies Listing Part #<br/>
                        Gray lines indicate items you have in stock.
                    </p>
                </div>
            </div>
        </div>
        <footer>
      
      <div className={styles.footerlinks}>
          <li><a href="/">Advertising Programs</a></li>
          <li><a href="/">Business Solutions</a></li>
          <li><a href="/">About BrokerBin.com</a></li>
          <li>©2024 Privacy</li>
      </div>
              </footer>
    </>


  );
};

export default HotListView;
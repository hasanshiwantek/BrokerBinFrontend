import css from "../../../../styles/Menu/Reports/MatchYourHits.module.css";
import styles from "../../../Menu/Broadcast/BroadCast.module.css"
import { Link, useNavigate } from "react-router-dom";


const Detailed = () => {

    const data = [
        {
          detailed:"Detailed",
          D:71,
          W:258,
          partmodel: "P00330-B21",
          age: "0 Hrs",
          cond: "REF",
          Clei: "CTS Point Inc.",
          Price: "185",
          Low: "185",
          Heigh: "185",
          Avg: "185",
          mfg:"HP",
          qty: 2,
          description:"Good Model"
        }
      ];

    return (
        <>
         <div className={css.container}>
      {/* Navigation Tabs */}
      <div className={css.navTabs}>
        <ul>
          <li>
            <Link to={"/reports/Company"}>Company</Link>
          </li>
          <li>
            <Link to={"/reports/sitewide"}>Site Wide</Link>
          </li>
          <li>
            <Link to={"/reports/email"}>Email</Link>
          </li>
          <li>
            <Link to={"/reports/serviceStats"}>Stats</Link>
          </li>
        </ul>
      </div>
      <div className={css.searchBar}  >
        <div className={css.searchSec}>
        <h2>Match Your Hits Detailed</h2>
        <div className="flex">
        <div>
            <label className="p-4" htmlFor="manufacturer">View Stocked:</label>
            <select id="manufacturer" className="p-2">
                <option value="">Any</option>
                <option value="manufacturer1">Any</option>
                <option value="manufacturer2">Any</option>
                <option value="manufacturer3">Any</option>
            </select>
        </div>

        <div>
        <label className="p-4" htmlFor="product">View: </label>
        <select id="product" className="p-2">
            <option value="">All Regions</option>
            <option value="product1"></option>
            <option value="product2"></option>
            <option value="product3">3</option>
        </select>
        </div>
        <div>
          <label className="p-4" htmlFor="search" id="search">Part Search</label>
          <input type="text" id="search" className="p-2" />
        </div>
        </div>

        </div>
      </div>

      <table className={styles.table}>
          <thead>
            <tr>

              <th>Hits (3 months) </th>
              <th>Part #/HECI</th>
              <th>Mfg</th>
              <th>Cond</th>
              <th>Clei</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Age</th>
              <th>Product Description</th>

            </tr>
          </thead>
          <tbody>
           {
              data.map((item, index) => (
               
                  <tr key={index} >
                    <td></td>
                    <td>{item.partmodel}</td>
                    <td>{item.mfg}</td>
                    <td>{item.cond}</td>
                    <td>{item.Clei}</td>
                    <td>{item.Price}</td>
                    <td>{item.qty}</td>
                    <td>{item.age}</td>
                    <td>{item.description}</td>
                   
                  </tr>
               
              ))
      
            }
          </tbody>
  
        </table>

      <table className={styles.table}>
          <thead>
            <tr>

              <th></th>
              <th>Age</th>
              <th>Query</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Direct Phone</th>
              <th>Fax</th>
              <th>Qty</th>

            </tr>
          </thead>
          <tbody>
           {
              data.map((item, index) => (
               
                  <tr key={index} >
                       <td>
                      <input
                        type="checkbox"
                        // checked={!!selectedBroadcast[item.id]}
                        // onChange={() => handleCheckboxChange(item)}
                      />
                    </td>
                    <td>{item.D}</td>
                    <td>{item.W}</td>
                    <td>{item.M}</td>
                    <td>{item.partmodel}</td>
                    <td>{item.Clei}</td>
                    <td>{item.cond}</td>
                    <td>{item.Price}</td>
                    <td>{item.Low}</td>
                   
                  </tr>
               
              ))
      
            }
          </tbody>
          <thead>
            <tr>
            <th></th>
              <th>Age</th>
              <th>Query</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Direct Phone</th>
              <th>Fax</th>
              <th>Qty</th>
            </tr>
          </thead>
        </table>
    </div>
        </>
    );
};

export default Detailed;
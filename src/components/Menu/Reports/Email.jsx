import React from "react";
import css from "../../../styles/Menu/Reports/Email.module.css"; // Adjust the path as needed
import { Link } from "react-router-dom";

const Email = () => {
  return (
    <>
      <div className={css.mainContainer}>
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
        
        <div className={css.mainBody}>
          <div className={css.container}>
            <div className={css.emailSec}>
              <h4>Select the Email Reports you would like to receive</h4>
            </div>
            <form>
              {/* Daily Broadcast Summary Section */}
              <div className={css.section}>
                <h1>Daily Broadcast Summary</h1>
                <label >Send</label>
                <select>
                  <option>Normal</option>
                  <option>Off</option>
                </select>
              </div>

              {/* Match Your Hits Section */}
              <div className={css.section}>
                <h1>Match Your Hits</h1>
                <div className={css.checkboxGroup}>
                  <label><input type="checkbox" /> Hourly</label>
                  <label><input type="checkbox" /> Daily</label>
                </div>
              </div>

              {/* Hot List Updates Section */}
              <div className={css.section}>
                <h1>Hot List Updates</h1>
                <div className={css.checkboxGroup}>
                  <label><input type="checkbox" /> Hourly <span  style={{color:'#900'}}>MYH</span></label>
                  <label><input type="checkbox" /> Daily <span style={{color:'#900'}}>MYH</span></label>
                  <label><input type="checkbox" /> Daily <span style={{color:'#900'}}>S&D</span> </label>
                </div>
              </div>

              {/* Broadcast Alerts Section */}
              <div className={css.section}>
                <h1>Broadcast Alerts</h1>
                <div className={css.checkboxGroup}>
                  <label><input type="checkbox" /> WTB</label>
                  <label><input type="checkbox" /> RFQ</label>
                  <label><input type="checkbox" /> WTS</label>
                </div>
              </div>

              {/* My Vendors Section */}
              <div className={css.section}>
                <h1>My Vendors</h1>
                <div>
                  <label style={{fontWeight:"bold"}}>Email My Vendor Inventory Updates</label>
                </div>
              </div>

              {/* RFQ Summaries Section */}
              <div className={css.section}>
                <h1>RFQ Summaries</h1>
                <label>Type</label>
                <select>
                  <option>Off</option>
                  <option>Basic</option>
                  <option>Detailed</option>
                </select>
                <label>Occurrence</label>
                <select>
                  <option>Off</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              {/* Service Directory Stats Section */}
              <div className={css.section}>
                <h1>Service Directory Stats</h1>
                <label >Send</label>

                <select>
                  <option>Never</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>

              {/* My Company's Top 200 Items Section */}
              <div className={css.section}>
                <h1>My Company's Top 200 Items</h1>
                <div className={css.checkboxGroup}>
                  <label><input type="checkbox" /> Daily</label>
                  <label><input type="checkbox" /> Weekly</label>
                  <label><input type="checkbox" /> Monthly</label>
                </div>
              </div>

              {/* Top 200 Searches By Part# Section */}
              <div className={css.section}>
                <h1>Top 200 Searches By Part#</h1>
                <div className={css.checkboxGroup}>
                  <label><input type="checkbox" /> Daily</label>
                  <label><input type="checkbox" /> Weekly</label>
                  <label><input type="checkbox" /> Monthly</label>
                </div>
              </div>
<div className={css.serviceSection}>

              <div className={css.section}>
                <h1>Top 200 Searches Per Manufacturer</h1>
                <h2>Send Emails</h2>
                <div className={css.checkboxGroup}>
                  <label><input type="checkbox" /> Daily</label>
                  <label><input type="checkbox" /> Weekly</label>
                  <label><input type="checkbox" /> Monthly</label>
                </div>
              </div>

              <div className={css.section}>
                <h1>Include These MFG's</h1>
                <select multiple>
                  <option>3COM</option>
                  <option>IBM</option>
                  <option>3rd PARTY</option>
                  <option>JUNIPER</option>
                </select>
              </div>
              </div>

              {/* Save Changes Button */}
              <div className={css.section}>
                <button type="submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <footer>
                <div className={css.footerlinks}>
                    <li><a href="/">Advertising Programs</a></li>
                    <li><a href="/">Business Solutions</a></li>
                    <li><a href="/">About BrokerBin.com</a></li>
                    <li>©2024 Privacy</li>
                </div>
            </footer>
    </>
  );
};

export default Email;

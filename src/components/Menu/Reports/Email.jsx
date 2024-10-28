// import React from "react";
// import css from "../../../styles/Menu/Reports/Email.module.css"; // Adjust the path as needed
// import { Link } from "react-router-dom";

// const Email = () => {
//   return (
//     <>
//       <div className={css.mainContainer}>
//         {/* Navigation Tabs */}
//         <div className={css.navTabs}>
//           <ul>
//             <li>
//               <Link to={"/reports/Company"}>Company</Link>
//             </li>
//             <li>
//               <Link to={"/reports/sitewide"}>Site Wide</Link>
//             </li>
//             <li>
//               <Link to={"/reports/email"}>Email</Link>
//             </li>
//             <li>
//               <Link to={"/reports/serviceStats"}>Stats</Link>
//             </li>
//           </ul>
//         </div>

//         <div className={css.mainBody}>
//           <div className={css.container}>
//             <div className={css.emailSec}>
//               <h4>Select the Email Reports you would like to receive</h4>
//             </div>
//             <form>
//               {/* Daily Broadcast Summary Section */}
//               <div className={css.section}>
//                 <h1>Daily Broadcast Summary</h1>
//                 <label >Send</label>
//                 <select>
//                   <option>Normal</option>
//                   <option>Off</option>
//                 </select>
//               </div>

//               {/* Match Your Hits Section */}
//               <div className={css.section}>
//                 <h1>Match Your Hits</h1>
//                 <div className={css.checkboxGroup}>
//                   <label><input type="checkbox" /> Hourly</label>
//                   <label><input type="checkbox" /> Daily</label>
//                 </div>
//               </div>

//               {/* Hot List Updates Section */}
//               <div className={css.section}>
//                 <h1>Hot List Updates</h1>
//                 <div className={css.checkboxGroup}>
//                   <label><input type="checkbox" /> Hourly <span  style={{color:'#900'}}>MYH</span></label>
//                   <label><input type="checkbox" /> Daily <span style={{color:'#900'}}>MYH</span></label>
//                   <label><input type="checkbox" /> Daily <span style={{color:'#900'}}>S&D</span> </label>
//                 </div>
//               </div>

//               {/* Broadcast Alerts Section */}
//               <div className={css.section}>
//                 <h1>Broadcast Alerts</h1>
//                 <div className={css.checkboxGroup}>
//                   <label><input type="checkbox" /> WTB</label>
//                   <label><input type="checkbox" /> RFQ</label>
//                   <label><input type="checkbox" /> WTS</label>
//                 </div>
//               </div>

//               {/* My Vendors Section */}
//               <div className={css.section}>
//                 <h1>My Vendors</h1>
//                 <div>
//                   <label style={{fontWeight:"bold"}}>Email My Vendor Inventory Updates</label>
//                 </div>
//               </div>

//               {/* RFQ Summaries Section */}
//               <div className={css.section}>
//                 <h1>RFQ Summaries</h1>
//                 <label>Type</label>
//                 <select>
//                   <option>Off</option>
//                   <option>Basic</option>
//                   <option>Detailed</option>
//                 </select>
//                 <label>Occurrence</label>
//                 <select>
//                   <option>Off</option>
//                   <option>Daily</option>
//                   <option>Weekly</option>
//                   <option>Monthly</option>
//                 </select>
//               </div>

//               {/* Service Directory Stats Section */}
//               <div className={css.section}>
//                 <h1>Service Directory Stats</h1>
//                 <label >Send</label>

//                 <select>
//                   <option>Never</option>
//                   <option>Daily</option>
//                   <option>Weekly</option>
//                 </select>
//               </div>

//               {/* My Company's Top 200 Items Section */}
//               <div className={css.section}>
//                 <h1>My Company's Top 200 Items</h1>
//                 <div className={css.checkboxGroup}>
//                   <label><input type="checkbox" /> Daily</label>
//                   <label><input type="checkbox" /> Weekly</label>
//                   <label><input type="checkbox" /> Monthly</label>
//                 </div>
//               </div>

//               {/* Top 200 Searches By Part# Section */}
//               <div className={css.section}>
//                 <h1>Top 200 Searches By Part#</h1>
//                 <div className={css.checkboxGroup}>
//                   <label><input type="checkbox" /> Daily</label>
//                   <label><input type="checkbox" /> Weekly</label>
//                   <label><input type="checkbox" /> Monthly</label>
//                 </div>
//               </div>
// <div className={css.serviceSection}>

//               <div className={css.section}>
//                 <h1>Top 200 Searches Per Manufacturer</h1>
//                 <h2>Send Emails</h2>
//                 <div className={css.checkboxGroup}>
//                   <label><input type="checkbox" /> Daily</label>
//                   <label><input type="checkbox" /> Weekly</label>
//                   <label><input type="checkbox" /> Monthly</label>
//                 </div>
//               </div>

//               <div className={css.section}>
//                 <h1>Include These MFG's</h1>
//                 <select multiple>
//                   <option>3COM</option>
//                   <option>IBM</option>
//                   <option>3rd PARTY</option>
//                   <option>JUNIPER</option>
//                 </select>
//               </div>
//               </div>

//               {/* Save Changes Button */}
//               <div className={css.section}>
//                 <button type="submit">Save Changes</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>


//       <footer>
//                 <div className={css.footerlinks}>
//                     <li><a href="/">Advertising Programs</a></li>
//                     <li><a href="/">Business Solutions</a></li>
//                     <li><a href="/">About BrokerBin.com</a></li>
//                     <li>©2024 Privacy</li>
//                 </div>
//             </footer>
//     </>
//   );
// };

// export default Email;







import React, { useState, useEffect } from "react";
import css from "../../../styles/Menu/Reports/Email.module.css";
import { Link } from "react-router-dom";

const Email = () => {
  // State to store checkbox selections
  const [checkboxes, setCheckboxes] = useState({
    dailyBroadcast: "Normal",
    matchYourHits: {
      hourly: false,
      daily: false,
    },
    hotListUpdates: {
      hourlyMyh: false,
      dailyMyh: false,
      dailySd: false,
    },
    broadcastAlerts: {
      wtb: false,
      rfq: false,
      wts: false,
    },
    rfqSummaries: {
      type: "Off",
      occurrence: "Off",
    },
    serviceDirectoryStats: "Never",
    top200Items: {
      daily: false,
      weekly: false,
      monthly: false,
    },
    top200Searches: {
      daily: false,
      weekly: false,
      monthly: false,
    },
    top200PerManufacturer: {
      daily: false,
      weekly: false,
      monthly: false,
    },
    includeMFGs: ["3COM", "IBM"], // Example default MFGs
  });

  // On component mount, retrieve data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("checkboxSettings");
    if (storedData) {
      setCheckboxes(JSON.parse(storedData)); // Populate state from local storage if available
    }
  }, []);

  // Handle checkbox changes
  const handleCheckboxChange = (section, key) => {
    setCheckboxes((prevState) => {
      const updatedState = {
        ...prevState,
        [section]: {
          ...prevState[section],
          [key]: !prevState[section][key],
        },
      };
      // Store updated state in local storage
      localStorage.setItem("checkboxSettings", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  // Handle select dropdown changes
  const handleSelectChange = (section, value) => {
    setCheckboxes((prevState) => {
      const updatedState = {
        ...prevState,
        [section]: value,
      };
      // Store updated state in local storage
      localStorage.setItem("checkboxSettings", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  // Handle form submission to save changes (also dispatch to API)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate an API call to save the data
    console.log("Updated settings:", checkboxes);

    // Dispatch the form data to your API
    // dispatch(postApiCall(checkboxes)); // Example API call

    // Ensure the state is also stored in local storage
    localStorage.setItem("checkboxSettings", JSON.stringify(checkboxes));
  };

  return (
    <>
      <div className={css.mainContainer}>
        {/* Navigation Tabs */}
        <div className={css.navTabs}>
          <ul>
            <li><Link to={"/reports/Company"}>Company</Link></li>
            <li><Link to={"/reports/sitewide"}>Site Wide</Link></li>
            <li><Link to={"/reports/email"}>Email</Link></li>
            <li><Link to={"/reports/serviceStats"}>Stats</Link></li>
          </ul>
        </div>

        <div className={css.mainBody}>
          <div className={css.container}>
            <div className={css.emailSec}>
              <h4>Select the Email Reports you would like to receive</h4>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Daily Broadcast Summary Section */}
              <div className={css.section}>
                <h1>Daily Broadcast Summary</h1>
                <label>Send</label>
                <select
                  value={checkboxes.dailyBroadcast}
                  onChange={(e) => handleSelectChange("dailyBroadcast", e.target.value)}
                >
                  <option value="Normal">Normal</option>
                  <option value="Off">Off</option>
                </select>
              </div>

              {/* Match Your Hits Section */}
              <div className={css.section}>
                <h1>Match Your Hits</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.matchYourHits.hourly}
                      onChange={() => handleCheckboxChange("matchYourHits", "hourly")}
                    /> Hourly
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.matchYourHits.daily}
                      onChange={() => handleCheckboxChange("matchYourHits", "daily")}
                    /> Daily
                  </label>
                </div>
              </div>

              {/* Hot List Updates Section */}
              <div className={css.section}>
                <h1>Hot List Updates</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.hotListUpdates.hourlyMyh}
                      onChange={() => handleCheckboxChange("hotListUpdates", "hourlyMyh")}
                    /> Hourly <span style={{ color: "#900" }}>MYH</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.hotListUpdates.dailyMyh}
                      onChange={() => handleCheckboxChange("hotListUpdates", "dailyMyh")}
                    /> Daily <span style={{ color: "#900" }}>MYH</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.hotListUpdates.dailySd}
                      onChange={() => handleCheckboxChange("hotListUpdates", "dailySd")}
                    /> Daily <span style={{ color: "#900" }}>S&D</span>
                  </label>
                </div>
              </div>

              {/* Broadcast Alerts Section */}
              <div className={css.section}>
                <h1>Broadcast Alerts</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.broadcastAlerts.wtb}
                      onChange={() => handleCheckboxChange("broadcastAlerts", "wtb")}
                    /> WTB
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.broadcastAlerts.rfq}
                      onChange={() => handleCheckboxChange("broadcastAlerts", "rfq")}
                    /> RFQ
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.broadcastAlerts.wts}
                      onChange={() => handleCheckboxChange("broadcastAlerts", "wts")}
                    /> WTS
                  </label>
                </div>
              </div>

              {/* RFQ Summaries Section */}
              <div className={css.section}>
                <h1>RFQ Summaries</h1>
                <label>Type</label>
                <select
                  value={checkboxes.rfqSummaries.type}
                  onChange={(e) => handleSelectChange("rfqSummaries", { ...checkboxes.rfqSummaries, type: e.target.value })}
                >
                  <option value="Off">Off</option>
                  <option value="Basic">Basic</option>
                  <option value="Detailed">Detailed</option>
                </select>
                <label>Occurrence</label>
                <select
                  value={checkboxes.rfqSummaries.occurrence}
                  onChange={(e) => handleSelectChange("rfqSummaries", { ...checkboxes.rfqSummaries, occurrence: e.target.value })}
                >
                  <option value="Off">Off</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              {/* Service Directory Stats Section */}
              <div className={css.section}>
                <h1>Service Directory Stats</h1>
                <label>Send</label>
                <select
                  value={checkboxes.serviceDirectoryStats}
                  onChange={(e) => handleSelectChange("serviceDirectoryStats", e.target.value)}
                >
                  <option value="Never">Never</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>

              {/* Top 200 Items Section */}
              <div className={css.section}>
                <h1>My Company's Top 200 Items</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Items.daily}
                      onChange={() => handleCheckboxChange("top200Items", "daily")}
                    /> Daily
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Items.weekly}
                      onChange={() => handleCheckboxChange("top200Items", "weekly")}
                    /> Weekly
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Items.monthly}
                      onChange={() => handleCheckboxChange("top200Items", "monthly")}
                    /> Monthly
                  </label>
                </div>
              </div>

              {/* Top 200 Searches By Part# Section */}
              <div className={css.section}>
                <h1>Top 200 Searches By Part#</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Searches.daily}
                      onChange={() => handleCheckboxChange("top200Searches", "daily")}
                    /> Daily
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Searches.weekly}
                      onChange={() => handleCheckboxChange("top200Searches", "weekly")}
                    /> Weekly
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200Searches.monthly}
                      onChange={() => handleCheckboxChange("top200Searches", "monthly")}
                    /> Monthly
                  </label>
                </div>
              </div>

              {/* Top 200 Searches Per Manufacturer Section */}
              <div className={css.section} style={{border:"1px solid black"}}>
                <h1>Top 200 Searches Per Manufacturer</h1>
                <h1>Send Emails</h1>
                <div className={css.checkboxGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200PerManufacturer.daily}
                      onChange={() => handleCheckboxChange("top200PerManufacturer", "daily")}
                    /> Daily
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200PerManufacturer.weekly}
                      onChange={() => handleCheckboxChange("top200PerManufacturer", "weekly")}
                    /> Weekly
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={checkboxes.top200PerManufacturer.monthly}
                      onChange={() => handleCheckboxChange("top200PerManufacturer", "monthly")}
                    /> Monthly
                  </label>
                </div>
                 {/* Include MFG's Section */}
              <div className={css.section}>
                <h1>Include These MFG's</h1>
                <select
                  multiple
                  value={checkboxes.includeMFGs}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                    handleSelectChange("includeMFGs", selectedOptions);
                  }}
                >
                  <option value="3COM">3COM</option>
                  <option value="IBM">IBM</option>
                  <option value="3rd PARTY">3rd PARTY</option>
                  <option value="JUNIPER">JUNIPER</option>
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


    </>
  );
};

export default Email;

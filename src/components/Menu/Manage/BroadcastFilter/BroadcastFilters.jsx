import React, { useState, useEffect } from "react";
import myProfile from "../../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";
import Categories from "./Categories";
import style from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setOptionFormData } from "../../../../ReduxStore/ProfleSlice";
import { Link } from "react-router-dom";
import { setBroadcastFilters } from "../../../../ReduxStore/ToolsSlice";
import { broadCastFilters, fetchBroadCastFilters } from "../../../../ReduxStore/BroadCast";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";


const Options = () => {

  // Categories Section logic


  const [onlyReceiveMatch, setOnlyReceiveMatch] = useState({
    computers: true,
    telecom: false,
    mobileDevice: false,
  });

  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleOnlyReceiveMatch = (type) => {
    setOnlyReceiveMatch({
      computers: false,
      telecom: false,
      mobileDevice: false,
      [type]: true,
    });
  };

  const handleCheckboxChange = (value) => {
    const updatedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((item) => item !== value)
      : [...selectedCategories, value];
    setSelectedCategories(updatedCategories);
  };

  const toggleAllCheckboxes = (items, checkAll) => {
    if (checkAll) {
      // Add all items from this category
      const newItems = items.filter(item => !selectedCategories.includes(item));
      setSelectedCategories([...selectedCategories, ...newItems]);
    } else {
      // Remove all items from this category
      const remainingItems = selectedCategories.filter(item => !items.includes(item));
      setSelectedCategories(remainingItems);
    }
  };

  const computers = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Middle East",
    "Oceania",
    "Asia",
  ];

  const telecom = [
    "Aruba",
    "Afghanistan",
    "Angola",
    "Anguilla",
    "Albania",
    "Andorra",
    "Netherlands Antilles",
    "United Arab Emirates",
    "Argentina",
    "Armenia",
    "American Samoa",
    "Antarctica",
    "French Southern Territories",
    "Antigua and Barbuda",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Burundi",
    "Belgium",
    "Benin",
    "Burkina Faso",
    "Bangladesh",
    "Bulgaria",
    "Bahrain",
    "Bahamas",
    "Bosnia and Herzegowina",
    "Belarus",
    "Belize",
    "Bermuda",
    "Bolivia",
    "Brazil",
    "Barbados",
    "Brunei Darussalam",
    "Bhutan",
    "Bouvet Island",
    "Botswana",
    "Central African Republic",
    "Canada",
    "Cocos (Keeling) Islands",
    "Switzerland",
    "Chile",
    "China",
    "Cote d'Ivoire",
    "Cameroon",
    "Democratic Republic of the Congo",
    "Congo",
    "Cook Islands",
    "Colombia",
    "Comoros",
    "Cape Verde",
    "Costa Rica",
    "Christmas Island",
    "Cayman Islands",
    "Cyprus",
    "Czech Republic",
    "Germany",
    "Djibouti",
    "Dominica",
    "Denmark",
    "Dominican Republic",
    "Algeria",
    "Ecuador",
    "Egypt",
    "Eritrea",
    "Western Sahara",
    "Spain",
    "Estonia",
    "Ethiopia",
    "Finland",
    "Fiji",
    "Falkland Islands (Malvinas)",
    "France",
    "Faroe Islands",
    "Micronesia, Federated States of",
    "France, Metropolitan",
    "Gabon",
    "United Kingdom",
    "Georgia",
    "Ghana",
    "Gibraltar",
    "Guinea",
    "Guadeloupe",
    "Gambia",
    "Guinea-Bissau",
    "Equatorial Guinea",
    "Greece",
    "Grenada",
    "Greenland",
    "Guatemala",
    "French Guiana",
    "Guam",
    "Guyana",
    "Hong Kong",
    "Heard and Mc Donald Islands",
    "Honduras",
    "Croatia (local name: Hrvatska)",
    "Haiti",
    "Hungary",
    "Indonesia",
    "India",
    "British Indian Ocean Territory",
    "Ireland",
    "Iraq",
    "Iceland",
    "Israel",
    "Italy",
    "Jamaica",
    "Jordan",
    "Japan",
    "Kazakhstan",
    "Kenya",
    "Kyrgyzstan",
    "Cambodia",
    "Kiribati",
    "Saint Kitts and Nevis",
    "Korea, Republic of",
    "Kosova, Republic of",
    "Kuwait",
    "Lao People's Democratic Republic",
    "Lebanon",
    "Liberia",
    "Libya",
    "Saint Lucia",
    "Liechtenstein",
    "Sri Lanka",
    "Lesotho",
    "Lithuania",
    "Luxembourg",
    "Latvia",
    "Macau",
    "Morocco",
    "Monaco",
    "Moldova, Republic of",
    "Madagascar",
    "Maldives",
    "Mexico",
    "Marshall Islands",
    "Macedonia, The Former Yugoslav Republic of",
    "Mali",
    "Malta",
    "Myanmar",
    "Mongolia",
    "Northern Mariana Islands",
    "Mozambique",
    "Mauritania",
    "Montserrat",
    "Martinique",
    "Mauritius",
    "Malawi",
    "Malaysia",
    "Mayotte",
    "Namibia",
    "New Caledonia",
    "Niger",
    "Norfolk Island",
    "Nigeria",
    "Nicaragua",
    "Niue",
    "Netherlands",
    "Norway",
    "Nepal",
    "Nauru",
    "New Zealand",
    "Oman",
    "Pakistan",
    "Panama",
    "Pitcairn",
    "Peru",
    "Philippines",
    "Palau",
    "Papua New Guinea",
    "Poland",
    "Puerto Rico",
    "Portugal",
    "Paraguay",
    "French Polynesia",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saudi Arabia",
    "Sudan",
    "Senegal",
    "Singapore",
    "South Georgia and the South Sandwich Islands",
    "St. Helena",
    "Svalbard and Jan Mayen Islands",
    "Solomon Islands",
    "Sierra Leone",
    "El Salvador",
    "San Marino",
    "Somalia",
    "St. Pierre and Miquelon",
    "Serbia",
    "South Sudan",
    "Sao Tome and Principe",
    "Suriname",
    "Slovakia (Slovak Republic)",
    "Slovenia",
    "Sweden",
    "Swaziland",
    "Seychelles",
    "Turks and Caicos Islands",
    "Chad",
    "Togo",
    "Thailand",
    "Tajikistan",
    "Tokelau",
    "Turkmenistan",
    "East Timor",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Tuvalu",
    "Taiwan",
    "Tanzania, United Republic of",
    "Uganda",
    "Ukraine",
    "United States Minor Outlying Islands",
    "Uruguay",
    "United States",
    "Uzbekistan",
    "Vatican City State (Holy See)",
    "Saint Vincent and the Grenadines",
    "Venezuela",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Vietnam",
    "Vanuatu",
    "Wallis and Futuna Islands",
    "Samoa",
    "Yemen",
    "Yugoslavia",
    "South Africa",
    "Zaire",
    "Zambia",
    "Zimbabwe",
  ];

  const mobileDevice = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  // End Categories logic
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [dailyBroadcast, setDailyBroadcast] = useState(false);
  const [broadcasts, setBroadcasts] = useState(false);

  const items = useSelector(state => state.broadcastStore.filters);
  console.log("Filters:", items);
  
  useEffect(() => {
    if(token){
      dispatch(fetchBroadCastFilters({ token }))
    }
    
  }, [dispatch,token]);
 





  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    // Convert '1' or '0' from the select element directly to boolean
    const booleanValue = value === '1';
    if (name === "daily_broadcast") {
      setDailyBroadcast(booleanValue);
    } else if (name === "broadcasts") {
      setBroadcasts(booleanValue);
    }
  };


 

  const submitBroadcastFilters = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Get all values from checkboxes or multi-select inputs
    const categories = formData.getAll('categories');
    const services = formData.getAll('services');
    const groupings = formData.getAll('groupings');
    const region = formData.getAll('regions');
    const country = formData.getAll('broadcountry_from');
    const type_of_broadcast = formData.getAll('type_of_broadcast');


    // Package the data
    const transformedData = {
      daily_broadcast: dailyBroadcast, // direct boolean value
      broadcasts: broadcasts, // direct boolean value
      type_of_broadcast,  // Already an array from getAll if checkboxes are named correctly
      categories,
      services,
      groupings,
      region,
      country
    };


  
    const data = transformedData
      
   
    dispatch(broadCastFilters({ data, token }))

    console.log(transformedData);




    

  }

  return (
    <>
      <div className={myProfile.profileLayout}>
        <form onSubmit={submitBroadcastFilters}>
          <div className={myProfile.profileBtn}>
            <p>my profile</p>
            <span>
              <input type="submit" value="submit changes" />
              <button type="button">view profile</button>
            </span>
          </div>
          <div className={myProfile.profileInfo}>
            <div className={myProfile.profileInfo_links}>
              <ul>
                <li>
                  <Link to={"/myprofile"}>
                    <span>Personal Info</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/myprofile/Options"}>
                    <span>Options</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/myprofile/MyVendors"}>
                    <span>My Vendors</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/myprofile/MyContact"}>
                    <span>My Contacts</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/myprofile/broadcastfilter"}>
                    <span>Broadcast Filters</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={css.broadcastFilters}>
              <h1>Standard Filters</h1>
              <div className={css.broadcastFilters_emailSettings}>
                <h3>Email Settings</h3>
                <div>
                  <div>
                    <label>Daily Broadcast Summary</label>
                    <select name="daily_broadcast" value={dailyBroadcast ? "1" : "0"} onChange={handleSelectChange}>
                      <option value="0">Off</option>
                      <option value="1">On</option>
                    </select>
                  </div>


                  <div>
                    <label>Broadcast</label>
                    <select name="broadcasts" value={broadcasts ? "1" : "0"} onChange={handleSelectChange}>
                      <option value="0">Off</option>
                      <option value="1" >On</option>
                    </select>
                  </div>





                  <span>
                    <label htmlFor="multicast">Multicast</label>
                    <select name="multicast" id="multicast">
                      <option selected="selected" value="0">
                        Off
                      </option>
                      <option value="1">On</option>
                    </select>
                  </span>
                  <span>
                    <label htmlFor="servicecast">Servicecast</label>
                    <select name="servicecast" id="servicecast">
                      <option value="0">Off</option>
                      <option selected="selected" value="1">
                        On
                      </option>
                    </select>
                  </span>
                </div>
              </div>
              <div className={css.broadcastFilters_typeOfBroadcast}>
                <h3>Receive The Following Type Of Broadcast</h3>
                <div>
                  <span>
                    <label htmlFor="wtb">Want To Buy (WTB)</label>
                    <input type="checkbox" name="type_of_broadcast" value="wtb" id="wtb" />
                  </span>
                  <span>
                    <label htmlFor="rfq">Request For Quote (RFQ)</label>
                    <input type="checkbox" name="type_of_broadcast" value="wts" id="wts" />
                  </span>
                  <span>
                    <label htmlFor="wts">Want To Sell (WTS)</label>
                    <input type="checkbox" name="type_of_broadcast" value="rfq" id="rfq" />
                  </span>
                </div>
                <div className={css.checkBtn}>
                  <button type="button">check all</button>
                  <button type="button">uncheck all</button>
                </div>
              </div>
              <div className={css.broadcastFilters_categories}>
                <h3>In The Following Categories</h3>
                {/* <Categories /> */}

                {/*   Categories Data */}



                <div className={css.onlyReceiveMatch}>
                  <div className={css.categoriesToggleButton}>
                    <button type="button" onClick={() => toggleOnlyReceiveMatch("computers")}>computers</button>
                    <button type="button" onClick={() => toggleOnlyReceiveMatch("telecom")}>telecom</button>
                    <button type="button" onClick={() => toggleOnlyReceiveMatch("mobileDevice")}>mobileDevice</button>
                  </div>
                  {onlyReceiveMatch.computers && (
                    <div>
                      <ul className={css.checkbox}>
                        {computers.map((item) => (
                          <li key={item}>
                            <input
                              type="checkbox"
                              id={"comp_" + item}
                              name="categories"
                              value={item}
                              checked={selectedCategories.includes(item)}
                              onChange={() => handleCheckboxChange(item)}
                            />
                            <label htmlFor={"comp_" + item}>{item}</label>
                          </li>
                        ))}
                      </ul>
                      <button type="button" onClick={() => toggleAllCheckboxes(computers, true)}>Check All</button>
                      <button type="button" onClick={() => toggleAllCheckboxes(computers, false)}>Uncheck All</button>
                    </div>
                  )}
                  {onlyReceiveMatch.telecom && (
                    <div>
                      <ul className={css.checkbox}>
                        {telecom.map((item) => (
                          <li key={item}>
                            <input
                              type="checkbox"
                              id={"tele_" + item}
                              name="categories"
                              value={item}
                              checked={selectedCategories.includes(item)}
                              onChange={() => handleCheckboxChange(item)}
                            />
                            <label htmlFor={"tele_" + item}>{item}</label>
                          </li>
                        ))}
                      </ul>
                      <button type="button" onClick={() => toggleAllCheckboxes(telecom, true)}>Check All</button>
                      <button type="button" onClick={() => toggleAllCheckboxes(telecom, false)}>Uncheck All</button>
                    </div>
                  )}
                  {onlyReceiveMatch.mobileDevice && (
                    <div>
                      <ul className={css.checkbox}>
                        {mobileDevice.map((item) => (
                          <li key={item}>
                            <input
                              type="checkbox"
                              id={"mobile_" + item}
                              name="categories"
                              value={item}
                              checked={selectedCategories.includes(item)}
                              onChange={() => handleCheckboxChange(item)}
                            />
                            <label htmlFor={"mobile_" + item}>{item}</label>
                          </li>
                        ))}
                      </ul>
                      <button type="button" onClick={() => toggleAllCheckboxes(mobileDevice, true)}>Check All</button>
                      <button type="button" onClick={() => toggleAllCheckboxes(mobileDevice, false)}>Uncheck All</button>
                    </div>
                  )}
                </div>


              </div>
              <div className={css.broadcastFilters_services}>
                <h3>For The Following Services</h3>
                <ul>
                  <li>
                    <span>
                      <label htmlFor="asset_recovery">Asset Recovery</label>
                      <input type="checkbox" name="services" value="Asset Recovery" id="asset_recovery" />
                    </span>
                    <span>
                      <label htmlFor="backup">Backup</label>
                      <input type="checkbox" name="services" value="Backup" id="backup" />
                    </span>
                    <span>
                      <label htmlFor="call_center">Call Center</label>
                      <input type="checkbox" name="services" value="Call Center" id="call_center" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="cloud_assessment">Cloud Assessment</label>
                      <input type="checkbox" name="services" value="Cloud Assessment" id="cloud_assessment" />
                    </span>
                    <span>
                      <label htmlFor="cloud_migration">Cloud Migration</label>
                      <input type="checkbox" name="services" value="Cloud Migration" id="cloud_migration" />
                    </span>
                    <span>
                      <label htmlFor="cloud_services">Cloud Services</label>
                      <input type="checkbox" name="services" value="Cloud Services" id="cloud_services" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="conferencing">Conferencing</label>
                      <input type="checkbox" name="services" value="Conferencing" id="conferencing" />
                    </span>
                    <span>
                      <label htmlFor="daas">DaaS</label>
                      <input type="checkbox" name="services" value="DaaS" id="daas" />
                    </span>
                    <span>
                      <label htmlFor="data_destruction">Data Destruction</label>
                      <input type="checkbox" name="services" value="Data Destruction" id="data_destruction" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="data_recovery">Data Recovery</label>
                      <input type="checkbox" name="services" value="Data Recovery" id="data_recovery" />
                    </span>
                    <span>
                      <label htmlFor="deinstallation">Deinstallation</label>
                      <input type="checkbox" name="services" value="Deinstallation" id="deinstallation" />
                    </span>
                    <span>
                      <label htmlFor="delivery_duty_paid">Delivery Duty Paid</label>
                      <input type="checkbox" name="services" value="Delivery Duty Paid" id="delivery_duty_paid" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="disaster_recovery">Disaster Recovery</label>
                      <input type="checkbox" name="services" value="Disaster Recovery" id="disaster_recovery" />
                    </span>
                    <span>
                      <label htmlFor="engineering">Engineering</label>
                      <input type="checkbox" name="services" value="Engineering" id="engineering" />
                    </span>
                    <span>
                      <label htmlFor="fiber">Fiber</label>
                      <input type="checkbox" name="services" value="Fiber" id="fiber" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="hardware_audits">Hardware Audits</label>
                      <input type="checkbox" name="services" value="Hardware Audits" id="hardware_audits" />
                    </span>
                    <span>
                      <label htmlFor="hosted_exchange">Hosted Exchange</label>
                      <input type="checkbox" name="services" value="Hosted Exchange" id="hosted_exchange" />
                    </span>
                    <span>
                      <label htmlFor="hosting">Hosting</label>
                      <input type="checkbox" name="services" value="Hosting" id="hosting" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="iaas">IaaS</label>
                      <input type="checkbox" name="services" value="IaaS" id="iaas" />
                    </span>
                    <span>
                      <label htmlFor="import_export">Import/Export</label>
                      <input type="checkbox" name="services" value="Import/Export" id="import_export" />
                    </span>
                    <span>
                      <label htmlFor="import_export_record">Import/Export of Record</label>
                      <input type="checkbox" name="services" value="Import/Export of Record" id="import_export_record" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="installation">Installation</label>
                      <input type="checkbox" name="services" value="Installation" id="installation" />
                    </span>
                    <span>
                      <label htmlFor="internet">Internet</label>
                      <input type="checkbox" name="services" value="Internet" id="internet" />
                    </span>
                    <span>
                      <label htmlFor="inventory_management">Inventory Management</label>
                      <input type="checkbox" name="services" value="Inventory Management" id="inventory_management" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="it_management">IT Management</label>
                      <input type="checkbox" name="services" value="IT Management" id="it_management" />
                    </span>
                    <span>
                      <label htmlFor="itad">ITAD</label>
                      <input type="checkbox" name="services" value="ITAD" id="itad" />
                    </span>
                    <span>
                      <label htmlFor="leasing">Leasing</label>
                      <input type="checkbox" name="services" value="Leasing" id="leasing" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="logistics">Logistics</label>
                      <input type="checkbox" name="services" value="Logistics" id="logistics" />
                    </span>
                    <span>
                      <label htmlFor="maintenance">Maintenance</label>
                      <input type="checkbox" name="services" value="Maintenance" id="maintenance" />
                    </span>
                    <span>
                      <label htmlFor="managed_services">Managed Services</label>
                      <input type="checkbox" name="services" value="Managed Services" id="managed_services" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="network_management">Network Management</label>
                      <input type="checkbox" name="services" value="Network Management" id="network_management" />
                    </span>
                    <span>
                      <label htmlFor="networking">Networking</label>
                      <input type="checkbox" name="services" value="Networking" id="networking" />
                    </span>
                    <span>
                      <label htmlFor="packaging">Packaging</label>
                      <input type="checkbox" name="services" value="Packaging" id="packaging" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="pay_per_click">Pay Per Click</label>
                      <input type="checkbox" name="services" value="Pay Per Click" id="pay_per_click" />
                    </span>
                    <span>
                      <label htmlFor="recycling_scrap">Recycling / Scrap</label>
                      <input type="checkbox" name="services" value="Recycling / Scrap" id="recycling_scrap" />
                    </span>
                    <span>
                      <label htmlFor="rental">Rental</label>
                      <input type="checkbox" name="services" value="Rental" id="rental" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="repair">Repair</label>
                      <input type="checkbox" name="services" value="Repair" id="repair" />
                    </span>
                    <span>
                      <label htmlFor="sdn">SDN</label>
                      <input type="checkbox" name="services" value="SDN" id="sdn" />
                    </span>
                    <span>
                      <label htmlFor="security">Security</label>
                      <input type="checkbox" name="services" value="Security" id="security" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="seo">SEO</label>
                      <input type="checkbox" name="services" value="SEO" id="seo" />
                    </span>
                    <span>
                      <label htmlFor="shipping">Shipping</label>
                      <input type="checkbox" name="services" value="Shipping" id="shipping" />
                    </span>
                    <span>
                      <label htmlFor="software">Software</label>
                      <input type="checkbox" name="services" value="Software" id="software" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="solutions">Solutions</label>
                      <input type="checkbox" name="services" value="Solutions" id="solutions" />
                    </span>
                    <span>
                      <label htmlFor="sort_and_settle">Sort and Settle</label>
                      <input type="checkbox" name="services" value="Sort and Settle" id="sort_and_settle" />
                    </span>
                    <span>
                      <label htmlFor="storage">Storage</label>
                      <input type="checkbox" name="services" value="Storage" id="storage" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="testing_facility">Testing Facility</label>
                      <input type="checkbox" name="services" value="Testing Facility" id="testing_facility" />
                    </span>
                    <span>
                      <label htmlFor="vdi">VDI</label>
                      <input type="checkbox" name="services" value="VDI" id="vdi" />
                    </span>
                    <span>
                      <label htmlFor="voip">VoIP</label>
                      <input type="checkbox" name="services" value="VoIP" id="voip" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="wan_mpls">WAN / MPLS</label>
                      <input type="checkbox" name="services" value="WAN / MPLS" id="wan_mpls" />
                    </span>
                    <span>
                      <label htmlFor="tems">TEMs</label>
                      <input type="checkbox" name="services" value="TEMs" id="tems" />
                    </span>
                    <span>
                      <label htmlFor="web_services">Web Services</label>
                      <input type="checkbox" name="services" value="Web Services" id="web_services" />
                    </span>
                  </li>
                </ul>
                <div className={css.checkBtn}>
                  <button type="button">check all</button>
                  <button type="button">uncheck all</button>
                </div>
              </div>
              <div className={css.broadcastFilters_grouping}>
                <h3>With The Following Groupings</h3>
                <ul>
                  <li>
                    <span>
                      <label htmlFor="bulk">Bulk</label>
                      <input type="checkbox" name="groupings" value="Bulk" id="bulk" />
                    </span>
                    <span>
                      <label htmlFor="container">Container</label>
                      <input type="checkbox" name="groupings" value="Container" id="container" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="pallet">Pallet</label>
                      <input type="checkbox" name="groupings" value="Pallet" id="pallet" />
                    </span>
                    <span>
                      <label htmlFor="wholeUnit">Whole Unit</label>
                      <input type="checkbox" name="groupings" value="Whole Unit" id="wholeUnit" />
                    </span>
                  </li>
                </ul>
                <div className={css.checkBtn}>
                  <button type="button">check all</button>
                  <button type="button">uncheck all</button>
                </div>
              </div>
              <div className={css.broadcastFilters_AdvancedFilters}>
                <h1>Advanced Filters</h1>
                <div className={css.broadcastFilters_regionCountry}>
                  <h3>From The Following Regions / Country</h3>
                  <ul>
                    <li>
                      <span>
                        <label htmlFor="NorthAmerica">North America</label>
                        <input type="checkbox" name="regions" value="North America" id="NorthAmerica" />
                      </span>
                      <span>
                        <label htmlFor="MiddleEast">Middle East</label>
                        <input type="checkbox" name="regions" value="Middle East" id="MiddleEast" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="SouthAmerica">South America</label>
                        <input type="checkbox" name="regions" value="South America" id="SouthAmerica" />
                      </span>
                      <span>
                        <label htmlFor="Europe">Europe</label>
                        <input type="checkbox" name="regions" value="Europe" id="Europe" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="Africa">Africa</label>
                        <input type="checkbox" name="regions" value="Africa" id="Africa" />
                      </span>
                      <span>
                        <label htmlFor="Oceania">Oceania</label>
                        <input type="checkbox" name="regions" value="Oceania" id="Oceania" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="Asia">Asia</label>
                        <input type="checkbox" name="regions" value="Asia" id="Asia" />
                      </span>
                    </li>
                    <li>
                      <label htmlFor="orCountry">or country</label>
                      <select name="broadcountry_from" id="broadcountry_from">
                        <option value="">N/A </option>
                        <option value="USA">USA </option>
                        <option value="ALB">ALBANIA </option>
                        <option value="DZA">ALGERIA </option>
                        <option value="ASM">AMERICAN SAMOA </option>
                        <option value="AND">ANDORRA </option>
                        <option value="AGO">ANGOLA </option>
                        <option value="AIA">ANGUILLA </option>
                        <option value="ATA">ANTARCTICA </option>
                        <option value="ATG">ANTIGUA AND BARBUDA </option>
                        <option value="ARG">ARGENTINA </option>
                        <option value="ARM">ARMENIA </option>
                        <option value="ABW">ARUBA </option>
                        <option value="AUS">AUSTRALIA </option>
                        <option value="AUT">AUSTRIA </option>
                        <option value="AZE">AZERBAIJAN </option>
                        <option value="BHS">BAHAMAS </option>
                        <option value="BHR">BAHRAIN </option>
                        <option value="BGD">BANGLADESH </option>
                        <option value="BRB">BARBADOS </option>
                        <option value="BLR">BELARUS </option>
                        <option value="BEL">BELGIUM </option>
                        <option value="BLZ">BELIZE </option>
                        <option value="BEN">BENIN </option>
                        <option value="BMU">BERMUDA </option>
                        <option value="BTN">BHUTAN </option>
                        <option value="BOL">BOLIVIA </option>
                        <option value="BIH">BOSNIA AND HERZEGOWINA </option>
                        <option value="BWA">BOTSWANA </option>
                        <option value="BVT">BOUVET ISLAND </option>
                        <option value="BRA">BRAZIL </option>
                        <option value="IOT">
                          BRITISH INDIAN OCEAN TERRITORY{" "}
                        </option>
                        <option value="BRN">BRUNEI DARUSSALAM </option>
                        <option value="BGR">BULGARIA </option>
                        <option value="BFA">BURKINA FASO </option>
                        <option value="BDI">BURUNDI </option>
                        <option value="KHM">CAMBODIA </option>
                        <option value="CMR">CAMEROON </option>
                        <option value="CAN">CANADA </option>
                        <option value="CPV">CAPE VERDE </option>
                        <option value="CYM">CAYMAN ISLANDS </option>
                        <option value="CAF">CENTRAL AFRICAN REPUBLIC </option>
                        <option value="TCD">CHAD </option>
                        <option value="CHL">CHILE </option>
                        <option value="CHN">CHINA </option>
                        <option value="CXR">CHRISTMAS ISLAND </option>
                        <option value="CCK">COCOS (KEELING) ISLANDS </option>
                        <option value="COL">COLOMBIA </option>
                        <option value="COM">COMOROS </option>
                        <option value="COG">CONGO </option>
                        <option value="COK">COOK ISLANDS </option>
                        <option value="CRI">COSTA RICA </option>
                        <option value="CIV">COTE D'IVOIRE </option>
                        <option value="HRV">
                          CROATIA (local name Hrvatska){" "}
                        </option>
                        <option value="CYP">CYPRUS </option>
                        <option value="CZE">CZECH REPUBLIC </option>
                        <option value="DNK">DENMARK </option>
                        <option value="DJI">DJIBOUTI </option>
                        <option value="DMA">DOMINICA </option>
                        <option value="DOM">DOMINICAN REPUBLIC </option>
                        <option value="TMP">EAST TIMOR </option>
                        <option value="ECU">ECUADOR </option>
                        <option value="EGY">EGYPT </option>
                        <option value="SLV">EL SALVADOR </option>
                        <option value="GNQ">EQUATORIAL GUINEA </option>
                        <option value="ERI">ERITREA </option>
                        <option value="EST">ESTONIA </option>
                        <option value="ETH">ETHIOPIA </option>
                        <option value="FLK">
                          FALKLAND ISLANDS (MALVINAS){" "}
                        </option>
                        <option value="FRO">FAROE ISLANDS </option>
                        <option value="FJI">FIJI </option>
                        <option value="FIN">FINLAND </option>
                        <option value="FRA">FRANCE </option>
                        <option value="FXX">FRANCE, METROPOLITAN </option>
                        <option value="GUF">FRENCH GUIANA </option>
                        <option value="PYF">FRENCH POLYNESIA </option>
                        <option value="ATF">
                          FRENCH SOUTHERN TERRITORIES{" "}
                        </option>
                        <option value="GAB">GABON </option>
                        <option value="GMB">GAMBIA </option>
                        <option value="GEO">GEORGIA </option>
                        <option value="DEU">GERMANY </option>
                        <option value="GHA">GHANA </option>
                        <option value="GIB">GIBRALTAR </option>
                        <option value="GRC">GREECE </option>
                        <option value="GRL">GREENLAND </option>
                        <option value="GRD">GRENADA </option>
                        <option value="GLP">GUADELOUPE </option>
                        <option value="GUM">GUAM </option>
                        <option value="GTM">GUATEMALA </option>
                        <option value="GIN">GUINEA </option>
                        <option value="GNB">GUINEA-BISSAU </option>
                        <option value="GUY">GUYANA </option>
                        <option value="HTI">HAITI </option>
                        <option value="HMD">
                          HEARD AND MC DONALD ISLANDS{" "}
                        </option>
                        <option value="HND">HONDURAS </option>
                        <option value="HKG">HONG KONG </option>
                        <option value="HUN">HUNGARY </option>
                        <option value="ISL">ICELAND </option>
                        <option value="IND">INDIA </option>
                        <option value="IDN">INDONESIA </option>
                        <option value="IRQ">IRAQ </option>
                        <option value="IRL">IRELAND </option>
                        <option value="ISR">ISRAEL </option>
                        <option value="ITA">ITALY </option>
                        <option value="JAM">JAMAICA </option>
                        <option value="JPN">JAPAN </option>
                        <option value="JOR">JORDAN </option>
                        <option value="KAZ">KAZAKHSTAN </option>
                        <option value="KEN">KENYA </option>
                        <option value="KIR">KIRIBATI </option>
                        <option value="KOR">KOREA, REPUBLIC OF </option>
                        <option value="KWT">KUWAIT </option>
                        <option value="KGZ">KYRGYZSTAN </option>
                        <option value="LAO">
                          LAO PEOPLE'S DEMOCRATIC REPUBLIC{" "}
                        </option>
                        <option value="LVA">LATVIA </option>
                        <option value="LBN">LEBANON </option>
                        <option value="LSO">LESOTHO </option>
                        <option value="LBR">LIBERIA </option>
                        <option value="LBY">LIBYA </option>
                        <option value="LIE">LIECHTENSTEIN </option>
                        <option value="LTU">LITHUANIA </option>
                        <option value="LUX">LUXEMBOURG </option>
                        <option value="MAC">MACAU </option>
                        <option value="MKD">
                          MACEDONIA, THE FORMER YUGOSLAV{" "}
                        </option>
                        <option value="MDG">MADAGASCAR </option>
                        <option value="MWI">MALAWI </option>
                        <option value="MYS">MALAYSIA </option>
                        <option value="MDV">MALDIVES </option>
                        <option value="MLI">MALI </option>
                        <option value="MLT">MALTA </option>
                        <option value="MHL">MARSHALL ISLANDS </option>
                        <option value="MTQ">MARTINIQUE </option>
                        <option value="MRT">MAURITANIA </option>
                        <option value="MUS">MAURITIUS </option>
                        <option value="MYT">MAYOTTE </option>
                        <option value="MEX">MEXICO </option>
                        <option value="FSM">
                          MICRONESIA, FEDERATED STATES OF{" "}
                        </option>
                        <option value="MDA">MOLDOVA, REPUBLIC OF </option>
                        <option value="MCO">MONACO </option>
                        <option value="MNG">MONGOLIA </option>
                        <option value="MSR">MONTSERRAT </option>
                        <option value="MAR">MOROCCO </option>
                        <option value="MOZ">MOZAMBIQUE </option>
                        <option value="MMR">MYANMAR </option>
                        <option value="NAM">NAMIBIA </option>
                        <option value="NRU">NAURU </option>
                        <option value="NPL">NEPAL </option>
                        <option value="NLD">NETHERLANDS </option>
                        <option value="ANT">NETHERLANDS ANTILLES </option>
                        <option value="NCL">NEW CALEDONIA </option>
                        <option value="NZL">NEW ZEALAND </option>
                        <option value="NIC">NICARAGUA </option>
                        <option value="NER">NIGER </option>
                        <option value="NGA">NIGERIA </option>
                        <option value="NIU">NIUE </option>
                        <option value="NFK">NORFOLK ISLAND </option>
                        <option value="MNP">NORTHERN MARIANA ISLANDS </option>
                        <option value="NOR">NORWAY </option>
                        <option value="OMN">OMAN </option>
                        <option value="PAK">PAKISTAN </option>
                        <option value="PLW">PALAU </option>
                        <option value="PAN">PANAMA </option>
                        <option value="PNG">PAPUA NEW GUINEA </option>
                        <option value="PRY">PARAGUAY </option>
                        <option value="PER">PERU </option>
                        <option value="PHL">PHILIPPINES </option>
                        <option value="PCN">PITCAIRN </option>
                        <option value="POL">POLAND </option>
                        <option value="PRT">PORTUGAL </option>
                        <option value="PRI">PUERTO RICO </option>
                        <option value="QAT">QATAR </option>
                        <option value="REU">REUNION </option>
                        <option value="ROM">ROMANIA </option>
                        <option value="RUS">RUSSIAN FEDERATION </option>
                        <option value="RWA">RWANDA </option>
                        <option value="KNA">SAINT KITTS AND NEVIS </option>
                        <option value="LCA">SAINT LUCIA </option>
                        <option value="VCT">
                          SAINT VINCENT AND THE GRENADIN{" "}
                        </option>
                        <option value="WSM">SAMOA </option>
                        <option value="SMR">SAN MARINO </option>
                        <option value="STP">SAO TOME AND PRINCIPE </option>
                        <option value="SAU">SAUDI ARABIA </option>
                        <option value="SEN">SENEGAL </option>
                        <option value="SRB">SERBIA </option>
                        <option value="SYC">SEYCHELLES </option>
                        <option value="SLE">SIERRA LEONE </option>
                        <option value="SGP">SINGAPORE </option>
                        <option value="SVK">SLOVAKIA (Slovak Republic) </option>
                        <option value="SVN">SLOVENIA </option>
                        <option value="SLB">SOLOMON ISLANDS </option>
                        <option value="SOM">SOMALIA </option>
                        <option value="ZAF">SOUTH AFRICA </option>
                        <option value="SGS">
                          SOUTH GEORGIA AND THE SOUTH SA{" "}
                        </option>
                        <option value="ESP">SPAIN </option>
                        <option value="LKA">SRI LANKA </option>
                        <option value="SHN">ST. HELENA </option>
                        <option value="SPM">ST. PIERRE AND MIQUELON </option>
                        <option value="SDN">SUDAN </option>
                        <option value="SUR">SURINAME </option>
                        <option value="SJM">
                          SVALBARD AND JAN MAYEN ISLANDS{" "}
                        </option>
                        <option value="SWZ">SWAZILAND </option>
                        <option value="SWE">SWEDEN </option>
                        <option value="CHE">SWITZERLAND </option>
                        <option value="TWN">TAIWAN </option>
                        <option value="TJK">TAJIKISTAN </option>
                        <option value="TZA">
                          TANZANIA, UNITED REPUBLIC OF{" "}
                        </option>
                        <option value="THA">THAILAND </option>
                        <option value="TGO">TOGO </option>
                        <option value="TKL">TOKELAU </option>
                        <option value="TON">TONGA </option>
                        <option value="TTO">TRINIDAD AND TOBAGO </option>
                        <option value="TUN">TUNISIA </option>
                        <option value="TUR">TURKEY </option>
                        <option value="TKM">TURKMENISTAN </option>
                        <option value="TCA">TURKS AND CAICOS ISLANDS </option>
                        <option value="TUV">TUVALU </option>
                        <option value="UGA">UGANDA </option>
                        <option value="UKR">UKRAINE </option>
                        <option value="ARE">UNITED ARAB EMIRATES </option>
                        <option value="GBR">UNITED KINGDOM </option>
                        <option value="USA">USA </option>
                        <option value="UMI">
                          UNITED STATES MINOR OUTLYING I{" "}
                        </option>
                        <option value="URY">URUGUAY </option>
                        <option value="UZB">UZBEKISTAN </option>
                        <option value="VUT">VANUATU </option>
                        <option value="VAT">
                          VATICAN CITY STATE (HOLY SEE){" "}
                        </option>
                        <option value="VEN">VENEZUELA </option>
                        <option value="VNM">VIET NAM </option>
                        <option value="VGB">VIRGIN ISLANDS (BRITISH) </option>
                        <option value="VIR">VIRGIN ISLANDS (U.S.) </option>
                        <option value="WLF">WALLIS AND FUTUNA ISLANDS </option>
                        <option value="ESH">WESTERN SAHARA </option>
                        <option value="YEM">YEMEN </option>
                        <option value="YUG">YUGOSLAVIA </option>
                        <option value="ZAR">ZAIRE </option>
                        <option value="ZMB">ZAMBIA </option>
                        <option value="ZWE">ZIMBABWE </option>
                      </select>
                    </li>
                  </ul>
                  <div className={css.checkBtn}>
                    <button type="button">check all</button>
                    <button type="button">uncheck all</button>
                  </div>
                </div>
                <div className={css.broadcastFilters_outgoing}>
                  <h3>Default Outgoing Settings</h3>
                  <ul>
                    <li>
                      <span>
                        <label htmlFor="NorthAmerica">North America</label>
                        <input type="checkbox" name="regions" value="North America" id="NorthAmerica" />
                      </span>
                      <span>
                        <label htmlFor="MiddleEast">Middle East</label>
                        <input type="checkbox" name="regions" value="Middle East" id="MiddleEast" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="SouthAmerica">South America</label>
                        <input type="checkbox" name="regions" value="South America" id="SouthAmerica" />
                      </span>
                      <span>
                        <label htmlFor="Europe">Europe</label>
                        <input type="checkbox" name="regions" value="Europe" id="Europe" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="Africa">Africa</label>
                        <input type="checkbox" name="regions" value="Africa" id="Africa" />
                      </span>
                      <span>
                        <label htmlFor="Oceania">Oceania</label>
                        <input type="checkbox" name="regions" value="Oceania" id="Oceania" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="Asia">Asia</label>
                        <input type="checkbox" name="regions" value="Asia" id="Asia" />
                      </span>
                    </li>
                    <li>
                      <label htmlFor="orCountry">or country</label>
                      <select name="broadcountry_from" id="broadcountry_from">
                        <option value="">N/A </option>
                        <option value="USA">USA </option>
                        <option value="ALB">ALBANIA </option>
                        <option value="DZA">ALGERIA </option>
                        <option value="ASM">AMERICAN SAMOA </option>
                        <option value="AND">ANDORRA </option>
                        <option value="AGO">ANGOLA </option>
                        <option value="AIA">ANGUILLA </option>
                        <option value="ATA">ANTARCTICA </option>
                        <option value="ATG">ANTIGUA AND BARBUDA </option>
                        <option value="ARG">ARGENTINA </option>
                        <option value="ARM">ARMENIA </option>
                        <option value="ABW">ARUBA </option>
                        <option value="AUS">AUSTRALIA </option>
                        <option value="AUT">AUSTRIA </option>
                        <option value="AZE">AZERBAIJAN </option>
                        <option value="BHS">BAHAMAS </option>
                        <option value="BHR">BAHRAIN </option>
                        <option value="BGD">BANGLADESH </option>
                        <option value="BRB">BARBADOS </option>
                        <option value="BLR">BELARUS </option>
                        <option value="BEL">BELGIUM </option>
                        <option value="BLZ">BELIZE </option>
                        <option value="BEN">BENIN </option>
                        <option value="BMU">BERMUDA </option>
                        <option value="BTN">BHUTAN </option>
                        <option value="BOL">BOLIVIA </option>
                        <option value="BIH">BOSNIA AND HERZEGOWINA </option>
                        <option value="BWA">BOTSWANA </option>
                        <option value="BVT">BOUVET ISLAND </option>
                        <option value="BRA">BRAZIL </option>
                        <option value="IOT">
                          BRITISH INDIAN OCEAN TERRITORY{" "}
                        </option>
                        <option value="BRN">BRUNEI DARUSSALAM </option>
                        <option value="BGR">BULGARIA </option>
                        <option value="BFA">BURKINA FASO </option>
                        <option value="BDI">BURUNDI </option>
                        <option value="KHM">CAMBODIA </option>
                        <option value="CMR">CAMEROON </option>
                        <option value="CAN">CANADA </option>
                        <option value="CPV">CAPE VERDE </option>
                        <option value="CYM">CAYMAN ISLANDS </option>
                        <option value="CAF">CENTRAL AFRICAN REPUBLIC </option>
                        <option value="TCD">CHAD </option>
                        <option value="CHL">CHILE </option>
                        <option value="CHN">CHINA </option>
                        <option value="CXR">CHRISTMAS ISLAND </option>
                        <option value="CCK">COCOS (KEELING) ISLANDS </option>
                        <option value="COL">COLOMBIA </option>
                        <option value="COM">COMOROS </option>
                        <option value="COG">CONGO </option>
                        <option value="COK">COOK ISLANDS </option>
                        <option value="CRI">COSTA RICA </option>
                        <option value="CIV">COTE D'IVOIRE </option>
                        <option value="HRV">
                          CROATIA (local name Hrvatska){" "}
                        </option>
                        <option value="CYP">CYPRUS </option>
                        <option value="CZE">CZECH REPUBLIC </option>
                        <option value="DNK">DENMARK </option>
                        <option value="DJI">DJIBOUTI </option>
                        <option value="DMA">DOMINICA </option>
                        <option value="DOM">DOMINICAN REPUBLIC </option>
                        <option value="TMP">EAST TIMOR </option>
                        <option value="ECU">ECUADOR </option>
                        <option value="EGY">EGYPT </option>
                        <option value="SLV">EL SALVADOR </option>
                        <option value="GNQ">EQUATORIAL GUINEA </option>
                        <option value="ERI">ERITREA </option>
                        <option value="EST">ESTONIA </option>
                        <option value="ETH">ETHIOPIA </option>
                        <option value="FLK">
                          FALKLAND ISLANDS (MALVINAS){" "}
                        </option>
                        <option value="FRO">FAROE ISLANDS </option>
                        <option value="FJI">FIJI </option>
                        <option value="FIN">FINLAND </option>
                        <option value="FRA">FRANCE </option>
                        <option value="FXX">FRANCE, METROPOLITAN </option>
                        <option value="GUF">FRENCH GUIANA </option>
                        <option value="PYF">FRENCH POLYNESIA </option>
                        <option value="ATF">
                          FRENCH SOUTHERN TERRITORIES{" "}
                        </option>
                        <option value="GAB">GABON </option>
                        <option value="GMB">GAMBIA </option>
                        <option value="GEO">GEORGIA </option>
                        <option value="DEU">GERMANY </option>
                        <option value="GHA">GHANA </option>
                        <option value="GIB">GIBRALTAR </option>
                        <option value="GRC">GREECE </option>
                        <option value="GRL">GREENLAND </option>
                        <option value="GRD">GRENADA </option>
                        <option value="GLP">GUADELOUPE </option>
                        <option value="GUM">GUAM </option>
                        <option value="GTM">GUATEMALA </option>
                        <option value="GIN">GUINEA </option>
                        <option value="GNB">GUINEA-BISSAU </option>
                        <option value="GUY">GUYANA </option>
                        <option value="HTI">HAITI </option>
                        <option value="HMD">
                          HEARD AND MC DONALD ISLANDS{" "}
                        </option>
                        <option value="HND">HONDURAS </option>
                        <option value="HKG">HONG KONG </option>
                        <option value="HUN">HUNGARY </option>
                        <option value="ISL">ICELAND </option>
                        <option value="IND">INDIA </option>
                        <option value="IDN">INDONESIA </option>
                        <option value="IRQ">IRAQ </option>
                        <option value="IRL">IRELAND </option>
                        <option value="ISR">ISRAEL </option>
                        <option value="ITA">ITALY </option>
                        <option value="JAM">JAMAICA </option>
                        <option value="JPN">JAPAN </option>
                        <option value="JOR">JORDAN </option>
                        <option value="KAZ">KAZAKHSTAN </option>
                        <option value="KEN">KENYA </option>
                        <option value="KIR">KIRIBATI </option>
                        <option value="KOR">KOREA, REPUBLIC OF </option>
                        <option value="KWT">KUWAIT </option>
                        <option value="KGZ">KYRGYZSTAN </option>
                        <option value="LAO">
                          LAO PEOPLE'S DEMOCRATIC REPUBLIC{" "}
                        </option>
                        <option value="LVA">LATVIA </option>
                        <option value="LBN">LEBANON </option>
                        <option value="LSO">LESOTHO </option>
                        <option value="LBR">LIBERIA </option>
                        <option value="LBY">LIBYA </option>
                        <option value="LIE">LIECHTENSTEIN </option>
                        <option value="LTU">LITHUANIA </option>
                        <option value="LUX">LUXEMBOURG </option>
                        <option value="MAC">MACAU </option>
                        <option value="MKD">
                          MACEDONIA, THE FORMER YUGOSLAV{" "}
                        </option>
                        <option value="MDG">MADAGASCAR </option>
                        <option value="MWI">MALAWI </option>
                        <option value="MYS">MALAYSIA </option>
                        <option value="MDV">MALDIVES </option>
                        <option value="MLI">MALI </option>
                        <option value="MLT">MALTA </option>
                        <option value="MHL">MARSHALL ISLANDS </option>
                        <option value="MTQ">MARTINIQUE </option>
                        <option value="MRT">MAURITANIA </option>
                        <option value="MUS">MAURITIUS </option>
                        <option value="MYT">MAYOTTE </option>
                        <option value="MEX">MEXICO </option>
                        <option value="FSM">
                          MICRONESIA, FEDERATED STATES OF{" "}
                        </option>
                        <option value="MDA">MOLDOVA, REPUBLIC OF </option>
                        <option value="MCO">MONACO </option>
                        <option value="MNG">MONGOLIA </option>
                        <option value="MSR">MONTSERRAT </option>
                        <option value="MAR">MOROCCO </option>
                        <option value="MOZ">MOZAMBIQUE </option>
                        <option value="MMR">MYANMAR </option>
                        <option value="NAM">NAMIBIA </option>
                        <option value="NRU">NAURU </option>
                        <option value="NPL">NEPAL </option>
                        <option value="NLD">NETHERLANDS </option>
                        <option value="ANT">NETHERLANDS ANTILLES </option>
                        <option value="NCL">NEW CALEDONIA </option>
                        <option value="NZL">NEW ZEALAND </option>
                        <option value="NIC">NICARAGUA </option>
                        <option value="NER">NIGER </option>
                        <option value="NGA">NIGERIA </option>
                        <option value="NIU">NIUE </option>
                        <option value="NFK">NORFOLK ISLAND </option>
                        <option value="MNP">NORTHERN MARIANA ISLANDS </option>
                        <option value="NOR">NORWAY </option>
                        <option value="OMN">OMAN </option>
                        <option value="PAK">PAKISTAN </option>
                        <option value="PLW">PALAU </option>
                        <option value="PAN">PANAMA </option>
                        <option value="PNG">PAPUA NEW GUINEA </option>
                        <option value="PRY">PARAGUAY </option>
                        <option value="PER">PERU </option>
                        <option value="PHL">PHILIPPINES </option>
                        <option value="PCN">PITCAIRN </option>
                        <option value="POL">POLAND </option>
                        <option value="PRT">PORTUGAL </option>
                        <option value="PRI">PUERTO RICO </option>
                        <option value="QAT">QATAR </option>
                        <option value="REU">REUNION </option>
                        <option value="ROM">ROMANIA </option>
                        <option value="RUS">RUSSIAN FEDERATION </option>
                        <option value="RWA">RWANDA </option>
                        <option value="KNA">SAINT KITTS AND NEVIS </option>
                        <option value="LCA">SAINT LUCIA </option>
                        <option value="VCT">
                          SAINT VINCENT AND THE GRENADIN{" "}
                        </option>
                        <option value="WSM">SAMOA </option>
                        <option value="SMR">SAN MARINO </option>
                        <option value="STP">SAO TOME AND PRINCIPE </option>
                        <option value="SAU">SAUDI ARABIA </option>
                        <option value="SEN">SENEGAL </option>
                        <option value="SRB">SERBIA </option>
                        <option value="SYC">SEYCHELLES </option>
                        <option value="SLE">SIERRA LEONE </option>
                        <option value="SGP">SINGAPORE </option>
                        <option value="SVK">SLOVAKIA (Slovak Republic) </option>
                        <option value="SVN">SLOVENIA </option>
                        <option value="SLB">SOLOMON ISLANDS </option>
                        <option value="SOM">SOMALIA </option>
                        <option value="ZAF">SOUTH AFRICA </option>
                        <option value="SGS">
                          SOUTH GEORGIA AND THE SOUTH SA{" "}
                        </option>
                        <option value="ESP">SPAIN </option>
                        <option value="LKA">SRI LANKA </option>
                        <option value="SHN">ST. HELENA </option>
                        <option value="SPM">ST. PIERRE AND MIQUELON </option>
                        <option value="SDN">SUDAN </option>
                        <option value="SUR">SURINAME </option>
                        <option value="SJM">
                          SVALBARD AND JAN MAYEN ISLANDS{" "}
                        </option>
                        <option value="SWZ">SWAZILAND </option>
                        <option value="SWE">SWEDEN </option>
                        <option value="CHE">SWITZERLAND </option>
                        <option value="TWN">TAIWAN </option>
                        <option value="TJK">TAJIKISTAN </option>
                        <option value="TZA">
                          TANZANIA, UNITED REPUBLIC OF{" "}
                        </option>
                        <option value="THA">THAILAND </option>
                        <option value="TGO">TOGO </option>
                        <option value="TKL">TOKELAU </option>
                        <option value="TON">TONGA </option>
                        <option value="TTO">TRINIDAD AND TOBAGO </option>
                        <option value="TUN">TUNISIA </option>
                        <option value="TUR">TURKEY </option>
                        <option value="TKM">TURKMENISTAN </option>
                        <option value="TCA">TURKS AND CAICOS ISLANDS </option>
                        <option value="TUV">TUVALU </option>
                        <option value="UGA">UGANDA </option>
                        <option value="UKR">UKRAINE </option>
                        <option value="ARE">UNITED ARAB EMIRATES </option>
                        <option value="GBR">UNITED KINGDOM </option>
                        <option value="USA">USA </option>
                        <option value="UMI">
                          UNITED STATES MINOR OUTLYING I{" "}
                        </option>
                        <option value="URY">URUGUAY </option>
                        <option value="UZB">UZBEKISTAN </option>
                        <option value="VUT">VANUATU </option>
                        <option value="VAT">
                          VATICAN CITY STATE (HOLY SEE){" "}
                        </option>
                        <option value="VEN">VENEZUELA </option>
                        <option value="VNM">VIET NAM </option>
                        <option value="VGB">VIRGIN ISLANDS (BRITISH) </option>
                        <option value="VIR">VIRGIN ISLANDS (U.S.) </option>
                        <option value="WLF">WALLIS AND FUTUNA ISLANDS </option>
                        <option value="ESH">WESTERN SAHARA </option>
                        <option value="YEM">YEMEN </option>
                        <option value="YUG">YUGOSLAVIA </option>
                        <option value="ZAR">ZAIRE </option>
                        <option value="ZMB">ZAMBIA </option>
                        <option value="ZWE">ZIMBABWE </option>
                      </select>
                    </li>
                  </ul>
                  <div className={css.checkBtn}>
                    <button type="button">check all</button>
                    <button type="button">uncheck all</button>
                  </div>
                </div>
                <div className={css.broadcastFilters_outgoingVendor}>
                  <h3>Outgoing Vendor Filters</h3>
                  <ul>
                    <li>
                      <span>
                        <label htmlFor="toMyVendorOnly">
                          To My Vendor Only
                        </label>
                        <input
                          type="checkbox"
                          id="toMyVendorOnly"
                          name="toMyVendorOnly"
                          value="toMyVendorOnly"
                        />
                      </span>
                    </li>
                  </ul>
                </div>
                <div className={css.broadcastFilters_companyFilter}>
                  <h3>
                    Company Filters (Max of 25/Overrides My Vendor settings.)
                  </h3>
                  <ul>
                    <li>
                      <span>
                        <label htmlFor="companySearch">Company Search</label>
                        <input
                          type="search"
                          id="companySearch"
                          name="companySearch"
                          value="companySearch"
                        />
                        <button type="button">add</button>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Options;














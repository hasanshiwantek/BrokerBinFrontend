import React, { useState } from "react";
import myProfile from "../../../../styles/Menu/Manage/MyProfile.module.css";
import css from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";
import Categories from "./Categories";
import { useDispatch, useSelector } from "react-redux";
import { setOptionFormData } from "../../../../ReduxStore/ProfleSlice";
import { Link } from "react-router-dom";

const Options = () => {
  const { broadcastFilters } = useSelector((state) => state.toolsStore);
  const dispatch = useDispatch();

  // // Handler for sorting changes
  // const handleSortingChange = (index, field, value) => {
  //   // Make a copy of sortPreferences and update the field
  //   const updatedSortPreferences = [...optionFormData.sortPreferences];
  //   updatedSortPreferences[index] = {
  //     ...updatedSortPreferences[index],
  //     [field]: value,
  //   };

  //   // Dispatch the updated sortPreferences array
  //   dispatch(
  //     setOptionFormData({
  //       sortPreferences: updatedSortPreferences,
  //     })
  //   );
  // };

  // // General change handler for inputs
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   // For checkboxes, use `checked` value, otherwise use `value`
  //   dispatch(
  //     setOptionFormData({
  //       ...optionFormData,
  //       [name]: type === "checkbox" ? checked : value,
  //     })
  //   );
  // };

  // // Form submit handler
  const submitBroadcastFilters = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    // You can send the `formData` to your backend here.
  };

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
                  <span>
                    <label htmlFor="summary">Daily Broadcast Summary</label>
                    <select name="summary" id="summary">
                      <option selected="selected" value="0">
                        Off
                      </option>
                      <option value="1">Normal</option>
                    </select>
                  </span>
                  <span>
                    <label htmlFor="broadcast">Broadcast</label>
                    <select name="broadcast" id="broadcast">
                      <option selected="selected" value="0">
                        Off
                      </option>
                      <option value="1">On</option>
                    </select>
                  </span>
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
                    <input type="checkbox" name="wtb" id="wtb" />
                  </span>
                  <span>
                    <label htmlFor="rfq">Request For Quote (RFQ)</label>
                    <input type="checkbox" name="rfq" id="rfq" />
                  </span>
                  <span>
                    <label htmlFor="wts">Want To Sell (WTS)</label>
                    <input type="checkbox" name="wts" id="wts" />
                  </span>
                </div>
                <div className={css.checkBtn}>
                  <button type="button">check all</button>
                  <button type="button">uncheck all</button>
                </div>
              </div>
              <div className={css.broadcastFilters_categories}>
                <h3>In The Following Categories</h3>
                <Categories />
              </div>
              <div className={css.broadcastFilters_services}>
                <h3>For The Following Services</h3>
                <ul>
                  <li>
                    <span>
                      <label htmlFor="asset_recovery">Asset Recovery</label>
                      <input type="checkbox" name="asset_recovery" />
                    </span>
                    <span>
                      <label htmlFor="backup">Backup</label>
                      <input type="checkbox" name="backup" />
                    </span>
                    <span>
                      <label htmlFor="call_center">Call Center</label>
                      <input type="checkbox" name="call_center" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="cloud_assessment">Cloud Assessment</label>
                      <input type="checkbox" name="cloud_assessment" />
                    </span>
                    <span>
                      <label htmlFor="cloud_migration">Cloud Migration</label>
                      <input type="checkbox" name="cloud_migration" />
                    </span>
                    <span>
                      <label htmlFor="cloud_services">Cloud Services</label>
                      <input type="checkbox" name="cloud_services" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="conferencing">Conferencing</label>
                      <input type="checkbox" name="conferencing" />
                    </span>
                    <span>
                      <label htmlFor="daas">DaaS</label>
                      <input type="checkbox" name="daas" />
                    </span>
                    <span>
                      <label htmlFor="data_destruction">Data Destruction</label>
                      <input type="checkbox" name="data_destruction" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="data_recovery">Data Recovery</label>
                      <input type="checkbox" name="data_recovery" />
                    </span>
                    <span>
                      <label htmlFor="deinstallation">Deinstallation</label>
                      <input type="checkbox" name="deinstallation" />
                    </span>
                    <span>
                      <label htmlFor="delivery_duty_paid">
                        Delivery Duty Paid
                      </label>
                      <input type="checkbox" name="delivery_duty_paid" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="disaster_recovery">
                        Disaster Recovery
                      </label>
                      <input type="checkbox" name="disaster_recovery" />
                    </span>
                    <span>
                      <label htmlFor="engineering">Engineering</label>
                      <input type="checkbox" name="engineering" />
                    </span>
                    <span>
                      <label htmlFor="fiber">Fiber</label>
                      <input type="checkbox" name="fiber" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="hardware_audits">Hardware Audits</label>
                      <input type="checkbox" name="hardware_audits" />
                    </span>
                    <span>
                      <label htmlFor="hosted_exchange">Hosted Exchange</label>
                      <input type="checkbox" name="hosted_exchange" />
                    </span>
                    <span>
                      <label htmlFor="hosting">Hosting</label>
                      <input type="checkbox" name="hosting" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="iaas">IaaS</label>
                      <input type="checkbox" name="iaas" />
                    </span>
                    <span>
                      <label htmlFor="import_export">Import / Export</label>
                      <input type="checkbox" name="import_export" />
                    </span>
                    <span>
                      <label htmlFor="import_export_record">
                        Import / Export of Record
                      </label>
                      <input type="checkbox" name="import_export_record" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="installation">Installation</label>
                      <input type="checkbox" name="installation" />
                    </span>
                    <span>
                      <label htmlFor="internet">Internet</label>
                      <input type="checkbox" name="internet" />
                    </span>
                    <span>
                      <label htmlFor="inventory_management">
                        Inventory Management
                      </label>
                      <input type="checkbox" name="inventory_management" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="it_management">IT Management</label>
                      <input type="checkbox" name="it_management" />
                    </span>
                    <span>
                      <label htmlFor="itad">ITAD</label>
                      <input type="checkbox" name="itad" />
                    </span>
                    <span>
                      <label htmlFor="leasing">Leasing</label>
                      <input type="checkbox" name="leasing" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="logistics">Logistics</label>
                      <input type="checkbox" name="logistics" />
                    </span>
                    <span>
                      <label htmlFor="maintenance">Maintenance</label>
                      <input type="checkbox" name="maintenance" />
                    </span>
                    <span>
                      <label htmlFor="managed_services">Managed Services</label>
                      <input type="checkbox" name="managed_services" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="network_management">
                        Network Management
                      </label>
                      <input type="checkbox" name="network_management" />
                    </span>
                    <span>
                      <label htmlFor="networking">Networking</label>
                      <input type="checkbox" name="networking" />
                    </span>
                    <span>
                      <label htmlFor="packaging">Packaging</label>
                      <input type="checkbox" name="packaging" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="pay_per_click">Pay Per Click</label>
                      <input type="checkbox" name="pay_per_click" />
                    </span>
                    <span>
                      <label htmlFor="recycling_scrap">Recycling / Scrap</label>
                      <input type="checkbox" name="recycling_scrap" />
                    </span>
                    <span>
                      <label htmlFor="rental">Rental</label>
                      <input type="checkbox" name="rental" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="repair">Repair</label>
                      <input type="checkbox" name="repair" />
                    </span>
                    <span>
                      <label htmlFor="sdn">SDN</label>
                      <input type="checkbox" name="sdn" />
                    </span>
                    <span>
                      <label htmlFor="security">Security</label>
                      <input type="checkbox" name="security" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="seo">SEO</label>
                      <input type="checkbox" name="seo" />
                    </span>

                    <span>
                      <label htmlFor="shipping">Shipping</label>
                      <input type="checkbox" name="shipping" />
                    </span>

                    <span>
                      <label htmlFor="software">Software</label>
                      <input type="checkbox" name="software" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="solutions">Solutions</label>
                      <input type="checkbox" name="solutions" />
                    </span>
                    <span>
                      <label htmlFor="sort_and_settle">Sort and Settle</label>
                      <input type="checkbox" name="sort_and_settle" />
                    </span>
                    <span>
                      <label htmlFor="storage">Storage</label>
                      <input type="checkbox" name="storage" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="testing_facility">Testing Facility</label>
                      <input type="checkbox" name="testing_facility" />
                    </span>
                    <span>
                      <label htmlFor="vdi">VDI</label>
                      <input type="checkbox" name="vdi" />
                    </span>
                    <span>
                      <label htmlFor="voip">VoIP</label>
                      <input type="checkbox" name="voip" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="wan_mpls">WAN / MPLS</label>
                      <input type="checkbox" name="wan_mpls" />
                    </span>
                    <span>
                      <label htmlFor="tems">TEMs</label>
                      <input type="checkbox" name="tems" />
                    </span>
                    <span>
                      <label htmlFor="web_services">Web Services</label>
                      <input type="checkbox" name="web_services" />
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
                      <label htmlFor="bulk">bulk</label>
                      <input type="checkbox" name="bulk" id="bulk" />
                    </span>
                    <span>
                      <label htmlFor="container">container</label>
                      <input type="checkbox" name="container" id="container" />
                    </span>
                  </li>
                  <li>
                    <span>
                      <label htmlFor="pallet">pallet</label>
                      <input type="checkbox" name="pallet" id="pallet" />
                    </span>
                    <span>
                      <label htmlFor="wholeUnit">wholeUnit</label>
                      <input type="checkbox" name="wholeUnit" id="wholeUnit" />
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
                        <input
                          type="checkbox"
                          name="NorthAmerica"
                          id="NorthAmerica"
                        />
                      </span>
                      <span>
                        <label htmlFor="MiddleEast">Middle East</label>
                        <input
                          type="checkbox"
                          name="MiddleEast"
                          id="MiddleEast"
                        />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="SouthAmerica">South America</label>
                        <input
                          type="checkbox"
                          name="SouthAmerica"
                          id="SouthAmerica"
                        />
                      </span>
                      <span>
                        <label htmlFor="Europe">Europe</label>
                        <input type="checkbox" name="Europe" id="Europe" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="Africa">Africa</label>
                        <input type="checkbox" name="Africa" id="Africa" />
                      </span>
                      <span>
                        <label htmlFor="Oceania">Oceania</label>
                        <input type="checkbox" name="Oceania" id="Oceania" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="Asia">Asia</label>
                        <input type="checkbox" name="Asia" id="Asia" />
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
                  <h3>From The Following Regions / Country</h3>
                  <ul>
                    <li>
                      <span>
                        <label htmlFor="NorthAmerica">North America</label>
                        <input
                          type="checkbox"
                          name="NorthAmerica"
                          id="NorthAmerica"
                        />
                      </span>
                      <span>
                        <label htmlFor="MiddleEast">Middle East</label>
                        <input
                          type="checkbox"
                          name="MiddleEast"
                          id="MiddleEast"
                        />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="SouthAmerica">South America</label>
                        <input
                          type="checkbox"
                          name="SouthAmerica"
                          id="SouthAmerica"
                        />
                      </span>
                      <span>
                        <label htmlFor="Europe">Europe</label>
                        <input type="checkbox" name="Europe" id="Europe" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="Africa">Africa</label>
                        <input type="checkbox" name="Africa" id="Africa" />
                      </span>
                      <span>
                        <label htmlFor="Oceania">Oceania</label>
                        <input type="checkbox" name="Oceania" id="Oceania" />
                      </span>
                    </li>
                    <li>
                      <span>
                        <label htmlFor="Asia">Asia</label>
                        <input type="checkbox" name="Asia" id="Asia" />
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

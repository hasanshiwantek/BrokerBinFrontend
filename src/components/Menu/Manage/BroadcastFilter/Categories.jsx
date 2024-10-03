import React, { useState } from "react";
import css from "../../../../styles/Menu/Manage/Options.module.css";

import style from "../../../../styles/Menu/Manage/BroadcastFilters/BroadcastFilters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBroadcastFilters } from "../../../../ReduxStore/ToolsSlice";

const Categories = () => {
  const { broadcastFilters } = useSelector((state) => state.toolsStore);

  const dispatch = useDispatch();

  const [onlyReceiveMatch, setOnlyReceiveMatch] = useState({
    computers: true,
    telecom: false,
    mobileDevice: false,
  });

  const toggleOnlyReceiveMatch = (type) => {
    const updatedStates = {
      computers: false,
      telecom: false,
      mobileDevice: false,
    };

    setOnlyReceiveMatch((prev) => ({
      ...updatedStates,
      [type]: true,
    }));
  };

  // Function to handle checkbox changes for computers, countries, or states
  const handleCheckboxChange = (category, value) => {
    // Get the current array of selected items for the category
    const selectedItems = broadcastFilters[category];

    // Determine if the value is already selected
    let updatedItems;
    if (selectedItems.includes(value)) {
      // If selected, remove it
      updatedItems = selectedItems.filter((item) => item !== value);
    } else {
      // Otherwise, add it
      updatedItems = [...selectedItems, value];
    }

    // Dispatch the updated data
    dispatch(setBroadcastFilters({ [category]: updatedItems }));
  };

  const toggleAllCheckboxes = (category, items, checkAll) => {
    // Set all checkboxes to checked or unchecked
    console.log(items);
    const updatedItems = checkAll ? items : [];

    // Dispatch the updated data
    dispatch(setBroadcastFilters({ [category]: updatedItems }));
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

  return (
    <div className={css.onlyReceiveMatch}>
      <div className={style.categoriesToggleButton}>
        <button
          type="button"
          onClick={() => toggleOnlyReceiveMatch("computers")}
        >
          computers
        </button>
        <button type="button" onClick={() => toggleOnlyReceiveMatch("telecom")}>
          telecom
        </button>
        <button
          type="button"
          onClick={() => toggleOnlyReceiveMatch("mobileDevice")}
        >
          mobileDevice
        </button>
      </div>
      {onlyReceiveMatch.computers && (
        <div>
          <div className={css.checkboxContainer}>
            <ul className={css.checkbox}>
              {computers.map((comp) => (
                <li key={comp}>
                  <input
                    type="checkbox"
                    id={"my_" + comp}
                    name="computers"
                    value={comp}
                    checked={broadcastFilters.categories.includes(comp)}
                    onChange={() => handleCheckboxChange("categories", comp)}
                  />
                  <label htmlFor={"my_" + comp}>{comp}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.checkBtn}>
            <button
              type="button"
              onClick={() => toggleAllCheckboxes("categories", computers, true)}
            >
              Check All
            </button>
            <button
              type="button"
              onClick={() =>
                toggleAllCheckboxes("categories", computers, false)
              }
            >
              Uncheck All
            </button>
          </div>
        </div>
      )}
      {onlyReceiveMatch.telecom && (
        <div>
          <div className={css.checkboxContainer}>
            <ul className={css.checkbox}>
              {telecom.map((telecom) => (
                <li key={telecom}>
                  <input
                    type="checkbox"
                    id={"my_" + telecom}
                    name="telecom"
                    value={telecom}
                    checked={broadcastFilters.categories.includes(telecom)}
                    onChange={() => handleCheckboxChange("categories", telecom)}
                  />
                  <label htmlFor={"my_" + telecom}>{telecom}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.checkBtn}>
            <button
              type="button"
              onClick={() => toggleAllCheckboxes("categories", telecom, true)}
            >
              Check All
            </button>
            <button
              type="button"
              onClick={() => toggleAllCheckboxes("categories", telecom, false)}
            >
              Uncheck All
            </button>
          </div>
        </div>
      )}
      {onlyReceiveMatch.mobileDevice && (
        <div>
          <div className={css.checkboxContainer}>
            <ul className={css.checkbox}>
              {mobileDevice.map((device) => (
                <li key={device}>
                  <input
                    type="checkbox"
                    id={"my_" + device}
                    name="mobileDevice"
                    value={device}
                    checked={broadcastFilters.categories.includes(device)}
                    onChange={() => handleCheckboxChange("categories", device)}
                  />
                  <label htmlFor={"my_" + device}>{device}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.checkBtn}>
            <button
              type="button"
              onClick={() =>
                toggleAllCheckboxes("categories", mobileDevice, true)
              }
            >
              Check All
            </button>
            <button
              type="button"
              onClick={() =>
                toggleAllCheckboxes("categories", mobileDevice, false)
              }
            >
              Uncheck All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
















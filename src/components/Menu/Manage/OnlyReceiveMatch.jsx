import React, { useState } from "react";
import css from "../../../styles/Menu/Manage/Options.module.css";
import { setOptionFormData } from "../../../ReduxStore/ProfleSlice";
import { useDispatch, useSelector } from "react-redux";

const OnlyReceiveMatch = () => {



  const { optionFormData } = useSelector((state) => state.profileStore);

  const dispatch = useDispatch();

  const [onlyReceiveMatch, setOnlyReceiveMatch] = useState({
    region: true,
    country: false,
    state: false,
  });

  const toggleOnlyReceiveMatch = (type) => {
    const updatedStates = {
      region: false,
      country: false,
      state: false,
    };

    setOnlyReceiveMatch((prev) => ({
      ...updatedStates,
      [type]: true,
    }));
  };

  // Function to handle checkbox changes for regions, countries, or states
  const handleCheckboxChange = (category, value) => {
    // Get the current array of selected items for the category
    const selectedItems = optionFormData[category];

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
    dispatch(setOptionFormData({ [category]: updatedItems }));
  };

  const toggleAllCheckboxes = (category, items, checkAll) => {
    // Set all checkboxes to checked or unchecked
    const updatedItems = checkAll ? items : [];

    // Dispatch the updated data
    dispatch(setOptionFormData({ [category]: updatedItems }));
  };

  const regions = [
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Middle East",
    "Oceania",
    "Asia",
  ];

  const countryNames = [
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

  const states = [
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
      <div className={css.onlyReceiveMatchBtn}>
        <button type="button" onClick={() => toggleOnlyReceiveMatch("region")} >
          Region
        </button>
        <button type="button" onClick={() => toggleOnlyReceiveMatch("country")}>
          Country
        </button>
        <button type="button" onClick={() => toggleOnlyReceiveMatch("state")}>
          State
        </button>
      </div>
      {onlyReceiveMatch.region && (
        <div>
          <div className={css.checkboxContainer}>
            <ul className={css.checkbox}>
              {regions.map((region) => (
                <li key={region}>
                  <input
                    type="checkbox"
                    id={"my_" + region}
                    name="regions"
                    value={region}
                    checked={optionFormData.my_regions_filter.includes(region)}
                    onChange={() =>
                      handleCheckboxChange("my_regions_filter", region)
                    }
                  />
                  <label htmlFor={"my_" + region}>{region}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={css.checkbox_btn}>
            <button
              type="button"
              onClick={() =>
                toggleAllCheckboxes("my_regions_filter", regions, true)
              }
            >
              Check All
            </button>
            <button
              type="button"
              onClick={() =>
                toggleAllCheckboxes("my_regions_filter", regions, false)
              }
            >
              Uncheck All
            </button>
          </div>
        </div>
      )}
      {onlyReceiveMatch.country && (
        <div>
          <div className={css.checkboxContainer}>
            <ul className={css.checkbox}>
              {countryNames.map((country) => (
                <li key={country}>
                  <input
                    type="checkbox"
                    id={"my_" + country}
                    name="countries"
                    value={country}
                    checked={optionFormData.my_countries_filter.includes(
                      country
                    )}
                    onChange={() =>
                      handleCheckboxChange("my_countries_filter", country)
                    }
                  />
                  <label htmlFor={"my_" + country}>{country}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={css.checkbox_btn}>
            <button
              type="button"
              onClick={() =>
                toggleAllCheckboxes("my_countries_filter", countryNames, true)
              }
            >
              Check All
            </button>
            <button
              type="button"
              onClick={() =>
                toggleAllCheckboxes("my_countries_filter", countryNames, false)
              }
            >
              Uncheck All
            </button>
          </div>
        </div>
      )}
      {onlyReceiveMatch.state && (
        <div>
          <div className={css.checkboxContainer}>
            <ul className={css.checkbox}>
              {states.map((state) => (
                <li key={state}>
                  <input
                    type="checkbox"
                    id={"my_" + state}
                    name="states"
                    value={state}
                    checked={optionFormData.my_states_filter.includes(state)}
                    onChange={() =>
                      handleCheckboxChange("my_states_filter", state)
                    }
                  />
                  <label htmlFor={"my_" + state}>{state}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className={css.checkbox_btn}>
            <button
              type="button"
              onClick={() =>
                toggleAllCheckboxes("my_states_filter", states, true)
              }
            >
              Check All
            </button>
            <button
              type="button"
              onClick={() =>
                toggleAllCheckboxes("my_states_filter", states, false)
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

export default OnlyReceiveMatch;

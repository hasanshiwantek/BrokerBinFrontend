import React, { useState } from "react";
import css from "../../../styles/Menu/Manage/Options.module.css";
import { setOptionFormData } from "../../../ReduxStore/ProfleSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const OnlyReceiveMatch = () => {
  const { optionFormData } = useSelector((state) => state.profileStore);

  const dispatch = useDispatch();

  const [onlyReceiveMatch, setOnlyReceiveMatch] = useState({
    region: true,
    country: false,
    state: false,
  });

  const toggleOnlyReceiveMatch = (type) => {
    setOnlyReceiveMatch({
      region: type === "region",
      country: type === "country",
      state: type === "state",
    });
  };

  // Function to handle checkbox changes for regions, countries, or states
  const handleCheckboxChange = (category, value) => {
    const selectedItems = optionFormData.onlyReceiveMatch[category] || [];
    const updatedItems = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    dispatch(
      setOptionFormData({
        onlyReceiveMatch: {
          ...optionFormData.onlyReceiveMatch,
          [category]: updatedItems,
        },
      })
    );
  };

  const toggleAllCheckboxes = (category, items, checkAll) => {
    dispatch(
      setOptionFormData({
        onlyReceiveMatch: {
          ...optionFormData.onlyReceiveMatch,
          [category]: checkAll ? items : [],
        },
      })
    );
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
        <button
          type="button"
          onClick={() => toggleOnlyReceiveMatch("region")}
          className={`${css.button} ${
            onlyReceiveMatch.region ? css.active : ""
          }`}
        >
          Region
        </button>
        <button
          type="button"
          onClick={() => toggleOnlyReceiveMatch("country")}
          className={`${css.button} ${
            onlyReceiveMatch.country ? css.active : ""
          }`}
        >
          Country
        </button>
        <button
          type="button"
          onClick={() => toggleOnlyReceiveMatch("state")}
          className={`${css.button} ${
            onlyReceiveMatch.state ? css.active : ""
          }`}
        >
          State
        </button>
      </div>

      {onlyReceiveMatch.region && (
        <CheckboxList
          items={regions}
          category="my_regions_filter"
          selected={optionFormData.onlyReceiveMatch.my_regions_filter || []}
          onToggle={handleCheckboxChange}
          onToggleAll={toggleAllCheckboxes}
        />
      )}
      {onlyReceiveMatch.country && (
        <CheckboxList
          items={countryNames}
          category="my_countries_filter"
          selected={optionFormData.onlyReceiveMatch.my_countries_filter || []}
          onToggle={handleCheckboxChange}
          onToggleAll={toggleAllCheckboxes}
        />
      )}
      {onlyReceiveMatch.state && (
        <CheckboxList
          items={states}
          category="my_states_filter"
          selected={optionFormData.onlyReceiveMatch.my_states_filter || []}
          onToggle={handleCheckboxChange}
          onToggleAll={toggleAllCheckboxes}
        />
      )}
    </div>
  )
}

  const CheckboxList = ({
    items,
    category,
    selected,
    onToggle,
    onToggleAll,
  }) => (
    <>
      <div className={css.checkboxContainer}>
        <ul className={css.checkbox}>
          {items.map((val) => (
            <li key={val}>
              <input
                type="checkbox"
                 id={`${category}_${val}`}
                checked={selected.includes(val)}
                onChange={() => onToggle(category, val)}
              />
              <label htmlFor={`${category}_${val}`}>{val}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className={css.checkbox_btn}>
        <button
          type="button"
          onClick={() => onToggleAll(category, items, true)}
        >
          Check All
        </button>
        <button
          type="button"
          onClick={() => onToggleAll(category, items, false)}
        >
          Uncheck All
        </button>
      </div>
    </>
  );


export default OnlyReceiveMatch;

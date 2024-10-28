import React, { useState } from "react";
import css from "../../styles/LoginRegister/Register.module.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formPassword, setFormPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [responseOk, setResponseOk] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormPassword({
      ...formPassword,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (formPassword.password.trim() === "") {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formPassword.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formPassword.confirmPassword.trim() === "") {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formPassword.confirmPassword !== formPassword.password) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    // 'use server';
    e.preventDefault();
    if (validate()) {
      const formData = new FormData(e.currentTarget);
      const formDataObject = Object.fromEntries(formData.entries());

      // Convert checkbox values to an array of selected values
      formDataObject.companyCategory = formData.getAll("companyCategory");

      formDataObject.memberCheck = formDataObject.memberCheck === "yes" ? 1 : 0;
      formDataObject.termsOfService =
        formDataObject.termsOfService === "on" ? 1 : 0;

      try {
        const response = await fetch(
          "https://phplaravel-1343027-4927440.cloudwaysapps.com/api/user/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObject),
          }
        );

        const result = await response.json();

        if (response.ok) {
          console.log("Registration successful", result);
          setResponseOk(true);
          setTimeout(() => {
            setResponseOk(false);
            navigate("/");
          }, 5000);
          // Handle successful registration (e.g., redirect to another page, show success message, etc.)
        } else {
          console.error("Registration failed", result);
          setErrors({
            ...errors,
            form: result.message || "Registration failed, please try again.",
          });
        }
      } catch (error) {
        console.error("Error during registration", error);
        setErrors({
          ...errors,
          form: "An error occurred, please try again later.",
        });
      }
    }
  };

  return responseOk ? (
    <div className={css.responseOk}>
      <h1>Congratulations 🎉, you are registered successfully</h1>
      <h3>Now you are redirection to login page!</h3>
    </div>
  ) : (
    <div className={css.body}>
      <div className={css.layout}>
        <div className={css.layout_head}>
          <h1>JOIN THE NETWORK</h1>
          <h3>FREE TRIAL (NEW COMPANY)</h3>
          <p>
            If you're a broker, reseller, wholesaler or VAR, we invite you to
            try a BrokerBin.com membership for free. Enjoy unlimited access,
            searches, uploads, users, listings and reports. See who is viewing
            your inventory and what they're viewing most. Track items of
            interest and choose preferred vendors to view.
          </p>
          <ul>
            <li>No Obligation Offer</li>
            <li>No Credit Card</li>
            <li>Completely Risk Free</li>
          </ul>
          <hr />
        </div>
        <form className={css.contact_form} onSubmit={handleRegister}>
          <div className={css.formLayout}>
            <div className={css.company}>
              <span className={css.contact_form_fields}>
                <label htmlFor="company name">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Enter your company name"
                  required
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  required
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  required
                />
              </span>
              <span
                className={`${css.contact_form_fields} ${css.contact_form_fields_row}`}
              >
                <span>
                  <label htmlFor="state">State</label>
                  <select id="state" name="state" required>
                    <option value="N/A">N/A</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    <option value="---">--------</option>
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NF">Newfoundland</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="NU">Nunavut</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="YT">Yukon Territory</option>
                  </select>
                </span>
                <span>
                  <label htmlFor="zip code">Zip Code</label>
                  <input
                    type="text"
                    name="zipcode"
                    placeholder="Enter your zip code"
                    required
                  />
                </span>
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="country">Country</label>
                <select id="country" name="country" required>
                  <option value="USA">UNITED STATES</option>
                  <option value="ALB">ALBANIA</option>
                  <option value="DZA">ALGERIA</option>
                  <option value="ASM">AMERICAN SAMOA</option>
                  <option value="AND">ANDORRA</option>
                  <option value="AGO">ANGOLA</option>
                  <option value="AIA">ANGUILLA</option>
                  <option value="ATA">ANTARCTICA</option>
                  <option value="ATG">ANTIGUA AND BARBUDA</option>
                  <option value="ARG">ARGENTINA</option>
                  <option value="ARM">ARMENIA</option>
                  <option value="ABW">ARUBA</option>
                  <option value="AUS">AUSTRALIA</option>
                  <option value="AUT">AUSTRIA</option>
                  <option value="AZE">AZERBAIJAN</option>
                  <option value="BHS">BAHAMAS</option>
                  <option value="BHR">BAHRAIN</option>
                  <option value="BGD">BANGLADESH</option>
                  <option value="BRB">BARBADOS</option>
                  <option value="BLR">BELARUS</option>
                  <option value="BEL">BELGIUM</option>
                  <option value="BLZ">BELIZE</option>
                  <option value="BEN">BENIN</option>
                  <option value="BMU">BERMUDA</option>
                  <option value="BTN">BHUTAN</option>
                  <option value="BOL">BOLIVIA</option>
                  <option value="BIH">BOSNIA AND HERZEGOWINA</option>
                  <option value="BWA">BOTSWANA</option>
                  <option value="BVT">BOUVET ISLAND</option>
                  <option value="BRA">BRAZIL</option>
                  <option value="IOT">BRITISH INDIAN OCEAN TERRITORY</option>
                  <option value="BRN">BRUNEI DARUSSALAM</option>
                  <option value="BGR">BULGARIA</option>
                  <option value="BFA">BURKINA FASO</option>
                  <option value="BDI">BURUNDI</option>
                  <option value="KHM">CAMBODIA</option>
                  <option value="CMR">CAMEROON</option>
                  <option value="CAN">CANADA</option>
                  <option value="CPV">CAPE VERDE</option>
                  <option value="CYM">CAYMAN ISLANDS</option>
                  <option value="CAF">CENTRAL AFRICAN REPUBLIC</option>
                  <option value="TCD">CHAD</option>
                  <option value="CHL">CHILE</option>
                  <option value="CHN">CHINA</option>
                  <option value="CXR">CHRISTMAS ISLAND</option>
                  <option value="CCK">COCOS (KEELING) ISLANDS</option>
                  <option value="COL">COLOMBIA</option>
                  <option value="COM">COMOROS</option>
                  <option value="COG">CONGO</option>
                  <option value="COK">COOK ISLANDS</option>
                  <option value="CRI">COSTA RICA</option>
                  <option value="CIV">COTE D'IVOIRE</option>
                  <option value="HRV">CROATIA (local name: Hrvatska)</option>
                  <option value="CYP">CYPRUS</option>
                  <option value="CZE">CZECH REPUBLIC</option>
                  <option value="DNK">DENMARK</option>
                  <option value="DJI">DJIBOUTI</option>
                  <option value="DMA">DOMINICA</option>
                  <option value="DOM">DOMINICAN REPUBLIC</option>
                  <option value="TMP">EAST TIMOR</option>
                  <option value="ECU">ECUADOR</option>
                  <option value="EGY">EGYPT</option>
                  <option value="SLV">EL SALVADOR</option>
                  <option value="GNQ">EQUATORIAL GUINEA</option>
                  <option value="ERI">ERITREA</option>
                  <option value="EST">ESTONIA</option>
                  <option value="ETH">ETHIOPIA</option>
                  <option value="FLK">FALKLAND ISLANDS (MALVINAS)</option>
                  <option value="FRO">FAROE ISLANDS</option>
                  <option value="FJI">FIJI</option>
                  <option value="FIN">FINLAND</option>
                  <option value="FRA">FRANCE</option>
                  <option value="FXX">FRANCE, METROPOLITAN</option>
                  <option value="GUF">FRENCH GUIANA</option>
                  <option value="PYF">FRENCH POLYNESIA</option>
                  <option value="ATF">FRENCH SOUTHERN TERRITORIES</option>
                  <option value="GAB">GABON</option>
                  <option value="GMB">GAMBIA</option>
                  <option value="GEO">GEORGIA</option>
                  <option value="DEU">GERMANY</option>
                  <option value="GHA">GHANA</option>
                  <option value="GIB">GIBRALTAR</option>
                  <option value="GRC">GREECE</option>
                  <option value="GRL">GREENLAND</option>
                  <option value="GRD">GRENADA</option>
                  <option value="GLP">GUADELOUPE</option>
                  <option value="GUM">GUAM</option>
                  <option value="GTM">GUATEMALA</option>
                  <option value="GIN">GUINEA</option>
                  <option value="GNB">GUINEA-BISSAU</option>
                  <option value="GUY">GUYANA</option>
                  <option value="HTI">HAITI</option>
                  <option value="HMD">HEARD AND MC DONALD ISLANDS</option>
                  <option value="HND">HONDURAS</option>
                  <option value="HKG">HONG KONG</option>
                  <option value="HUN">HUNGARY</option>
                  <option value="ISL">ICELAND</option>
                  <option value="IND">INDIA</option>
                  <option value="IDN">INDONESIA</option>
                  <option value="IRQ">IRAQ</option>
                  <option value="IRL">IRELAND</option>
                  <option value="ISR">ISRAEL</option>
                  <option value="ITA">ITALY</option>
                  <option value="JAM">JAMAICA</option>
                  <option value="JPN">JAPAN</option>
                  <option value="JOR">JORDAN</option>
                  <option value="KAZ">KAZAKHSTAN</option>
                  <option value="KEN">KENYA</option>
                  <option value="KIR">KIRIBATI</option>
                  <option value="KOR">KOREA, REPUBLIC OF</option>
                  <option value="KWT">KUWAIT</option>
                  <option value="KGZ">KYRGYZSTAN</option>
                  <option value="LAO">LAO PEOPLE'S DEMOCRATIC REPUBL</option>
                  <option value="LVA">LATVIA</option>
                  <option value="LBN">LEBANON</option>
                  <option value="LSO">LESOTHO</option>
                  <option value="LBR">LIBERIA</option>
                  <option value="LBY">LIBYAN ARAB JAMAHIRIYA</option>
                  <option value="LIE">LIECHTENSTEIN</option>
                  <option value="LTU">LITHUANIA</option>
                  <option value="LUX">LUXEMBOURG</option>
                  <option value="MAC">MACAU</option>
                  <option value="MKD">MACEDONIA, THE FORMER YUGOSLAV</option>
                  <option value="MDG">MADAGASCAR</option>
                  <option value="MWI">MALAWI</option>
                  <option value="MYS">MALAYSIA</option>
                  <option value="MDV">MALDIVES</option>
                  <option value="MLI">MALI</option>
                  <option value="MLT">MALTA</option>
                  <option value="MHL">MARSHALL ISLANDS</option>
                  <option value="MTQ">MARTINIQUE</option>
                  <option value="MRT">MAURITANIA</option>
                  <option value="MUS">MAURITIUS</option>
                  <option value="MYT">MAYOTTE</option>
                  <option value="MEX">MEXICO</option>
                  <option value="FSM">MICRONESIA, FEDERATED STATES OF</option>
                  <option value="MDA">MOLDOVA, REPUBLIC OF</option>
                  <option value="MCO">MONACO</option>
                  <option value="MNG">MONGOLIA</option>
                  <option value="MSR">MONTSERRAT</option>
                  <option value="MAR">MOROCCO</option>
                  <option value="MOZ">MOZAMBIQUE</option>
                  <option value="MMR">MYANMAR</option>
                  <option value="NAM">NAMIBIA</option>
                  <option value="NRU">NAURU</option>
                  <option value="NPL">NEPAL</option>
                  <option value="NLD">NETHERLANDS</option>
                  <option value="ANT">NETHERLANDS ANTILLES</option>
                  <option value="NCL">NEW CALEDONIA</option>
                  <option value="NZL">NEW ZEALAND</option>
                  <option value="NIC">NICARAGUA</option>
                  <option value="NER">NIGER</option>
                  <option value="NGA">NIGERIA</option>
                  <option value="NIU">NIUE</option>
                  <option value="NFK">NORFOLK ISLAND</option>
                  <option value="MNP">NORTHERN MARIANA ISLANDS</option>
                  <option value="NOR">NORWAY</option>
                  <option value="OMN">OMAN</option>
                  <option value="PAK">PAKISTAN</option>
                  <option value="PLW">PALAU</option>
                  <option value="PAN">PANAMA</option>
                  <option value="PNG">PAPUA NEW GUINEA</option>
                  <option value="PRY">PARAGUAY</option>
                  <option value="PER">PERU</option>
                  <option value="PHL">PHILIPPINES</option>
                  <option value="PCN">PITCAIRN</option>
                  <option value="POL">POLAND</option>
                  <option value="PRT">PORTUGAL</option>
                  <option value="PRI">PUERTO RICO</option>
                  <option value="QAT">QATAR</option>
                  <option value="REU">REUNION</option>
                  <option value="ROM">ROMANIA</option>
                  <option value="RUS">RUSSIAN FEDERATION</option>
                  <option value="RWA">RWANDA</option>
                  <option value="KNA">SAINT KITTS AND NEVIS</option>
                  <option value="LCA">SAINT LUCIA</option>
                  <option value="VCT">SAINT VINCENT AND THE GRENADIN</option>
                  <option value="WSM">SAMOA</option>
                  <option value="SMR">SAN MARINO</option>
                  <option value="STP">SAO TOME AND PRINCIPE</option>
                  <option value="SAU">SAUDI ARABIA</option>
                  <option value="SEN">SENEGAL</option>
                  <option value="SRB">SERBIA</option>
                  <option value="SYC">SEYCHELLES</option>
                  <option value="SLE">SIERRA LEONE</option>
                  <option value="SGP">SINGAPORE</option>
                  <option value="SVK">SLOVAKIA (Slovak Republic)</option>
                  <option value="SVN">SLOVENIA</option>
                  <option value="SLB">SOLOMON ISLANDS</option>
                  <option value="SOM">SOMALIA</option>
                  <option value="ZAF">SOUTH AFRICA</option>
                  <option value="SGS">SOUTH GEORGIA AND THE SOUTH SA</option>
                  <option value="ESP">SPAIN</option>
                  <option value="LKA">SRI LANKA</option>
                  <option value="SHN">ST. HELENA</option>
                  <option value="SPM">ST. PIERRE AND MIQUELON</option>
                  <option value="SDN">SUDAN</option>
                  <option value="SUR">SURINAME</option>
                  <option value="SJM">SVALBARD AND JAN MAYEN ISLANDS</option>
                  <option value="SWZ">SWAZILAND</option>
                  <option value="SWE">SWEDEN</option>
                  <option value="CHE">SWITZERLAND</option>
                  <option value="TWN">TAIWAN</option>
                  <option value="TJK">TAJIKISTAN</option>
                  <option value="TZA">TANZANIA, UNITED REPUBLIC OF</option>
                  <option value="THA">THAILAND</option>
                  <option value="TGO">TOGO</option>
                  <option value="TKL">TOKELAU</option>
                  <option value="TON">TONGA</option>
                  <option value="TTO">TRINIDAD AND TOBAGO</option>
                  <option value="TUN">TUNISIA</option>
                  <option value="TUR">TURKEY</option>
                  <option value="TKM">TURKMENISTAN</option>
                  <option value="TCA">TURKS AND CAICOS ISLANDS</option>
                  <option value="TUV">TUVALU</option>
                  <option value="UGA">UGANDA</option>
                  <option value="UKR">UKRAINE</option>
                  <option value="ARE">UNITED ARAB EMIRATES</option>
                  <option value="GBR">UNITED KINGDOM</option>
                  <option value="UMI">UNITED STATES MINOR OUTLYING I</option>
                  <option value="URY">URUGUAY</option>
                  <option value="UZB">UZBEKISTAN</option>
                  <option value="VUT">VANUATU</option>
                  <option value="VAT">VATICAN CITY STATE (HOLY SEE)</option>
                  <option value="VEN">VENEZUELA</option>
                  <option value="VNM">VIETNAM</option>
                  <option value="VGB">VIRGIN ISLANDS (BRITISH)</option>
                  <option value="VIR">VIRGIN ISLANDS (U.S.)</option>
                  <option value="WLF">WALLIS AND FUTUNA ISLANDS</option>
                  <option value="ESH">WESTERN SAHARA</option>
                  <option value="YEM">YEMEN</option>
                  <option value="YUG">YUGOSLAVIA</option>
                  <option value="ZAR">ZAIRE</option>
                  <option value="ZMB">ZAMBIA</option>
                  <option value="ZWE">ZIMBABWE</option>
                </select>
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="region">Region</label>
                <select id="region" name="region" required>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Middle East">Middle East</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Asia">Asia</option>
                </select>
              </span>
              <span
                className={`${css.contact_form_fields} ${css.contact_form_fields_row}`}
              >
                <span>
                  <label htmlFor="phone number">Phone Number</label>
                  <input type="text" name="phoneNumber" required />
                </span>
                <span>
                  <label htmlFor="fax number">Fax Number</label>
                  <input type="text" name="faxNumber" required />
                </span>
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="website">Website</label>
                <input type="text" name="website" required />
              </span>
              <span
                className={`${css.contact_form_fields} ${css.contact_form_fields_question}`}
              >
                <label>Have you ever been a member of BrokerBin.com?</label>
                <span>
                  <span>
                    <input
                      type="radio"
                      name="memberCheck"
                      value="yes"
                      required
                    />
                    <label htmlFor="yes">Yes</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="memberCheck"
                      value="no"
                      required
                    />
                    <label htmlFor="no">No</label>
                  </span>
                </span>
              </span>
            </div>
            <div className={css.contact}>
              <span className={css.contact_form_fields}>
                <label htmlFor="first name">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  required
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="last name">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  required
                />
              </span>

              <span className={css.contact_form_fields}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="Desired User Id">Desired User Id</label>
                <input
                  type="text"
                  name="userId"
                  placeholder="Enter your Desired User Id"
                  required
                />
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  // value={formPassword.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="confirmPassword">Verify Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  // value={formPassword.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                )}
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="promotion">
                  PLEASE SELECT HOW YOU HEARD ABOUT US
                </label>
                <select id="promotion" name="heard" required>
                  <option value="">Select One</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Yahoo Search">Yahoo Search</option>
                  <option value="Other Web Search">
                    Other Web Search (specify below)
                  </option>
                  <option value="Tradeshow/Roadshow">Tradeshow/Roadshow</option>
                  <option value="Magazine">Magazine (specify below)</option>
                  <option value="Sales Call">Sales Call (specify below)</option>
                  <option value="Direct Mail">
                    Direct Mail (specify below)
                  </option>
                  <option value="Other">Other (specify below)</option>
                  <option value="ICBin.com">ICBin.com</option>
                </select>
              </span>
              <span className={css.contact_form_fields}>
                <label htmlFor="comments">Other Comments</label>
                <textarea
                  name="comments"
                  id="comments"
                  cols="30"
                  rows="10"
                ></textarea>
              </span>
            </div>
          </div>
          <div className={css.contact_companyCategory}>
            <span className={css.contact_form_fields}>
              <h3>COMPANY CATEGORY(S)</h3>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Reseller"
                  id="Reseller"
                />
                <label htmlFor="Reseller">Reseller</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Broker"
                  id="Broker"
                />
                <label htmlFor="Broker">Broker</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Dealer"
                  id="Dealer"
                />
                <label htmlFor="Dealer">Dealer</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="VAR"
                  id="VAR"
                />
                <label htmlFor="VAR">VAR</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Distributor"
                  id="Distributor"
                />
                <label htmlFor="Distributor">Distributor</label>
              </span>
            </span>
            <span className={css.contact_form_fields}>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Service Center"
                  id="Service Center"
                />
                <label htmlFor="Service Center">Service Center</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input type="checkbox" name="companyCategory" value="Mfg" />
                <label htmlFor="Mfg">Mfg</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Integrator"
                  id="Integrator"
                />
                <label htmlFor="Integrator">Integrator</label>
              </span>
              <span className={css.contact_form_fields_companyCategory}>
                <input
                  type="checkbox"
                  name="companyCategory"
                  value="Retail"
                  id="Retail"
                />
                <label htmlFor="Retail">Retail</label>
              </span>
            </span>
          </div>
          <div className={css.submitBtn}>
            <span>
              <input
                type="checkbox"
                name="termsOfService"
                id="termsOfService"
                required
              />
              <label htmlFor="termsOfService">Agree to our</label>
              <a href="#">Terms of Service</a>
            </span>
            {errors.form && <p style={{ color: "red" }}>{errors.form}</p>}
            <button type="submit">Submit Application</button>
            <p className={css.submitBtn_login}>
              Already have an account?
              <a href="/login">
                <u>Login</u>
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

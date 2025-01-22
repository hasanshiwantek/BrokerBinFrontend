import React, { useEffect, useState } from "react";
import css from "../../../../styles/Menu/Manage/MyProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../../../../styles/Menu/Search/Person.module.css"
import FiltersSearchCompanyInventory from "../../Reports/FiltersSearchCompanyInventory";
import CompanySearch from "./CompanySearch";
import { submitUserSearch } from "../../../../ReduxStore/ProfleSlice";
import { inventorySearch } from "../../../../ReduxStore/InventorySlice";
import Cookies from "js-cookie";
import { countriesList, regionsList } from "../../../../data/services";

const InventorySearch = () => {

  const [loading, setLoading] = useState(false); // To track API call status
  const [buttonText, setButtonText] = useState("Submit");
  const token = Cookies.get("token");
  const { inventorySearchData } = useSelector((state) => state.inventoryStore);
  console.log(inventorySearchData)
  const [formData, setFormData] = useState({
    part: '',
    heci: '',
    description: '',
    manufacturer: '',
    partHeci: '',
    keyword: '',
    condition: '',
    category: '',
    company: '',
    state: '',
    country: '',
    region: '',
    shipDeadline: '',
  });






  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Preserve other field values
      [name]: value // Update current field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData); // Check the values being sent
    setButtonText("Processing..."); // Set the button text to "Processing..."
    setLoading(true); // Start loading

    try {
      const result = await dispatch(inventorySearch({ data: formData, token })).unwrap();

      console.log("API Result:", result);
      if (result.length === 0) {
        alert('No matching records found.');
        setFormData({
          part: '',
          heci: '',
          description: '',
          manufacturer: '',
          keyword: '',
          condition: '',
          category: '',
          company: '',
          state: '',
          country: '',
          region: '',
          shipDeadline: '',
        });
      }
      else {
        navigate('/inventory-searchResult', { state: { searchResults: result } });
      }
    } catch (error) {
      console.error('Error fetching user search data:', error);
      alert('An error occurred while fetching data.');
    } finally {
      setLoading(false); // End loading
      setButtonText("Submit"); // Reset the button text
    }
  };

  const resetHandler = () => {
    setFormData({
      part: '',
      heci: '',
      description: '',
      manufacturer: '',
      keyword: '',
      condition: '',
      category: '',
      company: '',
      state: '',
      country: '',
      region: '',
      shipDeadline: '',
    });
  }

  return (
    <>
      <div className={css.profileLayout}>
        <form onSubmit={handleSubmit}>
          <div className={css.profileInfo}>
            <div className={css.profileInfo_links}>
              <ul>
                <li>
                  <NavLink
                    to="/advance"
                    end  // This ensures the exact match for /myprofile
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Inventory</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/person"
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Person</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className={css.profileInfo_form}>
              <h2 style={{ margin: "" }}>Inventory Search</h2>
              <div className={'!flex !flex-col'}>
                <div className={`flex flex-col !text-right px-[5vw] gap-[.5vw] `}>
                  <span>
                    <label htmlFor="part">Part#</label>
                    <input
                      type="text"
                      name="part"
                      id="firstName"
                      onChange={handleChange}
                      value={formData.part}
                    />
                  </span>
                  <span>
                    <label htmlFor="heci">HECI</label>
                    <input
                      type="text"
                      name="heci"
                      id="lastName"
                      onChange={handleChange}
                      value={formData.heci}
                    />
                  </span>
                  <span>
                    <label htmlFor="Description">Description</label>
                    <input
                      type="text"
                      name="description"
                      id="position"
                      onChange={handleChange}
                      value={formData.description}
                    />
                  </span>
                  <span>
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input
                      type="text"
                      name="manufacturer"
                      id="specialty"
                      onChange={handleChange}
                      value={formData.manufacturer}
                    />
                  </span>
                  <h2>Keyword Searches</h2>
                  {/* <span>
                    <label htmlFor="partHeci">Part #/HECI</label>
                    <input
                      type="text"
                      name="partHeci"
                      id="email"
                      onChange={handleChange}
                      value={formData.partHeci}
                    />
                  </span> */}
                  <span>
                    <label htmlFor="keyword">Keyword</label>
                    <input
                      type="text"
                      name="keyword"
                      id="email"
                      onChange={handleChange}
                      value={formData.keyword}
                    />
                  </span>
                  <div className={''}>
                    <label htmlFor="condition">Condition</label>
                    <select
                      name="condition"
                      id="region"
                      value={formData.condition}
                      onChange={handleChange}
                      className="border-2"
                    >
                      <option value="">All</option>
                      <option value="NorthAmerica">NEW</option>
                      <option value="SouthAmerica">ASIS</option>
                      <option value="Africa">EXC</option>
                      <option value="MiddleEast">F/S</option>
                      <option value="Europe">NOB</option>
                      <option value="Oceania">REF</option>
                      <option value="Asia">OEMREF</option>
                      <option value="Asia">REP</option>
                      <option value="Asia">USED</option>
                    </select>
                  </div>
                  <span>
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      name="category"
                      id="specialty"
                      onChange={handleChange}
                      value={formData.category}
                    />
                  </span>
                  <span>
                    <CompanySearch setFormData={setFormData} formData={formData} />
                  </span>

                  <span className={"flex flex-col gap-2 "}>
                    <label htmlFor="Country">Country</label>
                    <select
                      name="country"
                      className="border-2"
                      id="region"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      {
                        countriesList.map((country) => <option key={country.value} value={country.value}>{country.label}</option>)
                      }

                    </select>
                    <label htmlFor="Region">Region</label>
                    <select
                      name="region"
                      id="region"
                      className="border-2"
                      value={formData.region}
                      onChange={handleChange}
                    >
                      {
                        regionsList.map((region) => <option  key={region.value} value={region.value}>{region.label}</option>)
                      }
                    </select>
                    <div className="Ship Deadline">
                      <label htmlFor="ShipDeadline">ShipDeadline</label>
                      <select
                        name="ShipDeadline"
                        className="border-2"
                        id="region"
                        value={formData.region}
                        onChange={handleChange}
                      >
                        <option value="">All</option>
                      </select>

                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg bg-[#2c83ec]"
               onClick={resetHandler} type="button">Reset</button>
              <button
                type="submit"
                disabled={loading} // Disable the button while processing
                className={`transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg ${loading ? "bg-[#2c83ec]" : "bg-[#2c83ec]"
                  }`}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InventorySearch;
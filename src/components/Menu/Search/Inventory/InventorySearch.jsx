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
import CompanySearchInventory from "./CompanySearchInventory";

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
    company: '',
    state: '',
    country: '',
    region: '',
    shipDeadline: '',
    multiplePartSearch: '',
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
      // Include page and pageSize in the formData
      const updatedFormData = { ...formData, page: 1, pageSize: 20 };

      const result = await dispatch(inventorySearch({ data: updatedFormData, token })).unwrap();

      console.log("API Result:", result);
      if (result.length === 0) {
        alert("No matching records found.");
        resetHandler(); // Reset form data if no results
      } else {
        const pagination = result.pagination;
        console.log("pagination", pagination);

        // Pass the updated formData and results to the results page
        navigate("/inventory-searchResult", {
          state: { searchResults: result, pagination, filters: updatedFormData },
        });
      }
    } catch (error) {
      console.error("Error fetching user search data:", error);
      alert("An error occurred while fetching data.");
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
      partHeci: '',
      company: '',
      state: '',
      country: '',
      region: '',
      shipDeadline: '',
      multiplePartSearch: '',
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
                    to="/search/Inventory"
                    end  // This ensures the exact match for /myprofile
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Inventory</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/search/Company"
                    className={({ isActive }) => (isActive ? css.active : '')}
                  >
                    <span>Company</span>
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

            <div className={`${css.profileInfo_form} !flex !flex-col`}>
              <h2 style={{ margin: "" }}>Inventory Search</h2>
              <div className={'!flex !flex-col '}>
                <div className={`!flex !flex-col !text-right !px-[5vw] !gap-[.5vw] `}>
                  <span className="!flex !justify-end ">
                    <label htmlFor="part">Part#</label>
                    <input
                      type="text"
                      name="part"
                      id="firstName"
                      onChange={handleChange}
                      value={formData.part}
                      className="ml-[1vw]"
                    />
                  </span>
                  <span className="!flex !justify-end ">
                    <label htmlFor="part">Multiple Part Search</label>
                    <input
                      type="text"
                      name="multiplePartSearch"
                      id="multiplePartSearch"
                      onChange={handleChange}
                      value={formData.part}
                      className="ml-[1vw]"
                    />
                  </span>
                  <span  className="!flex !justify-end ">
                    <label htmlFor="heci">HECI</label>
                    <input
                      type="text"
                      name="heci"
                      id="lastName"
                      onChange={handleChange}
                      value={formData.heci}
                      className="ml-[1vw]"
                    />
                  </span>
                  <span  className="!flex !justify-end ">
                    <label htmlFor="Description">Description</label>
                    <input
                      type="text"
                      name="description"
                      id="position"
                      onChange={handleChange}
                      value={formData.description}
                      className="ml-[1vw]"

                    />
                  </span>
                  <span  className="!flex !justify-end ">
                    <label htmlFor="manufacturer">Manufacturer</label>
                    <input
                      type="text"
                      name="manufacturer"
                      id="specialty"
                      onChange={handleChange}
                      value={formData.manufacturer}
                      className="ml-[1vw]"

                    />
                  </span>
                  <h2>Keyword Searches</h2>
                  <span className="!flex !justify-end ">
                    <label htmlFor="partHeci">Part #/HECI</label>
                    <input
                      type="text"
                      name="partHeci"
                      id="email"
                      onChange={handleChange}
                      value={formData.partHeci}
                    />
                  </span>
                  <span  className="!flex !justify-end ">
                    <label htmlFor="keyword">Keyword</label>
                    <input
                      type="text"
                      name="keyword"
                      id="email"
                      onChange={handleChange}
                      value={formData.keyword}
                      className="ml-[1vw]"

                    />
                  </span>
                  <div   className="!flex !justify-end ">
                    <label htmlFor="condition">Condition</label>
                    <select
                      name="condition"
                      id="region"
                      value={formData.condition}
                      onChange={handleChange}
                      className="ml-[1vw] border-2"

                    >
                      <option value="">All</option>
                      <option value="NEW">NEW</option>
                      <option value="ASIS">ASIS</option>
                      <option value="EXC">EXC</option>
                      <option value="F/S">F/S</option>
                      <option value="NOB">NOB</option>
                      <option value="REF">REF</option>
                      <option value="OEMREF">OEMREF</option>
                      <option value="REP">REP</option>
                      <option value="USED">USED</option>
                    </select>
                  </div>
                
                  <span  className="!flex !justify-end ">
                    <CompanySearchInventory setFormData={setFormData} formData={formData} />
                  </span>

                  <div className={"flex flex-col gap-4"}>
                    <div>
                      <label htmlFor="Country">Country</label>
                      <select
                        name="country"
                        id="region"
                        value={formData.country}
                        onChange={handleChange}
                        className="ml-[1vw] w-72 border-2"

                      >
                        {
                          countriesList.map((country) => <option key={country.value} value={country.value}>{country.label}</option>)
                        }

                      </select>
                    </div>
                    <div  className="!flex !justify-end ">

                      <label htmlFor="Region">Region</label>
                      <select
                        name="region"
                        id="region"
                        value={formData.region}
                        onChange={handleChange}
                        className="ml-[1vw] w-72 border-2"
                      >
                        {
                          regionsList.map((region) => <option key={region.value} value={region.value}>{region.label}</option>)
                        }
                      </select>
                    </div>

                    <div   className="!flex !justify-end ">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg bg-[#2c83ec]"
                onClick={resetHandler} type="button">Reset</button>
              <button
                type="submit"
                disabled={loading} // Disable the button while processing
                className={`transform active:scale-90 transition-all duration-100 cursor-pointer p-3 text-white border rounded-lg ${loading ? "bg-[#2c83ec] opacity-50 " : "bg-[#2c83ec]"
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